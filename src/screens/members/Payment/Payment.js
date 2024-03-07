import React, { useEffect, useState, useContext } from 'react'
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  initConnection,
  endConnection,
  requestPurchase,
  useIAP,
  clearTransactionIOS,
} from 'react-native-iap'

import { UnmountPagesContext } from '~/context/UnmountPagesProvider'
import useSetHeader from '~/hooks/useSetHeader'
import { fetchCreditsPurchase, newPurchase } from '~/shared/api/members'

import Benefit from './Benefit'
import Package from './package'
import ErrorModal from './ErrorModal'
import SuccessModal from './SuccessModal'
import benefits from '~/shared/types/BuyCreditsType'
import PaymentSkeletonItem from './PaymentSkeletonItem'

import { AFLogEvent, AF_purchase } from '~/utils/AppsFlyer'
import { createEmptyArray } from '~/utils/createEmptyArray'

import { Container, Overlay, Placeholder, MainHeader } from '~/ui'
import { colors, typography } from '~/ui/theme'
import HeaderTitle from '~/components/HeaderTitle'

const SUCCESS_MODAL = 'SUCCESS_MODAL'
const ERROR_MODAL = 'ERROR_MODAL'

const SKELETON_LIST = createEmptyArray(3)

export default function Payment({ navigation }) {
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [modal, setModal] = useState()
  const [errorMessage, setErrorMessage] = useState('')

  const { onSetIsUnmount } = useContext(UnmountPagesContext)

  const queryClient = useQueryClient()
  const { data, isFetched } = useQuery('Payment', fetchCreditsPurchase)
  const { mutate, isLoading } = useMutation(newPurchase, {
    onSuccess: async (data, variables) => {
      if (!data?.status) {
        setModal(ERROR_MODAL)
        return null
      }

      await finishTransaction({ purchase: variables, isConsumable: true })

      if (Platform.OS === 'ios') {
        clearTransactionIOS()
      }

      queryClient.invalidateQueries('fetchBalance')

      setModal(SUCCESS_MODAL)

      AFLogEvent(AF_purchase, { af_content_id: variables._packageId })
    },
    onError: error => {
      setErrorMessage(error?.data?.errors)
      setModal(ERROR_MODAL)
    },
    onSettled: () => {
      setPaying(false)
    },
  })

  const { products, getProducts, finishTransaction } = useIAP()

  const goHome = () => {
    setModal(null)
    navigation.navigate('Trending')
  }

  useEffect(() => {
    async function fetchData() {
      const skus = data?.packages
        ?.map(pkg => pkg?.storeIds?.[Platform.OS])
        .filter(Boolean)

      await getProducts({ skus })

      setLoading(false)
    }

    if (isFetched) fetchData()
  }, [isFetched, data, getProducts])

  const lockedPurchase = paying || isLoading

  async function handlePay(sku) {
    if (lockedPurchase) return null

    setPaying(true)

    const params = Platform.OS === 'android' ? { skus: [sku] } : { sku }

    requestPurchase(params)
      .then(purchaseArray => {
        let purchase

        if (Platform.OS === 'android') {
          purchase = purchaseArray?.[0]
        } else {
          purchase = purchaseArray
        }

        purchase._packageId = sku

        mutate(purchase)
      })
      .catch(purchaseError => {
        if (!purchaseError) return

        setPaying(false)

        if (purchaseError?.code === 'E_USER_CANCELLED') return

        setErrorMessage(purchaseError?.message)
        setModal(ERROR_MODAL)
      })
  }

  useFocusEffect(
    React.useCallback(() => {
      onSetIsUnmount()

      initConnection().catch(() => {
        setLoading(false)
        setModal(ERROR_MODAL)
      })

      return () => {
        endConnection()
      }
    }, [onSetIsUnmount]),
  )

  useSetHeader(
    <MainHeader
      withBackBtn
      CenterComponent={() => <HeaderTitle title="Buy Credits" isMainTitle />}
    />,
    [],
  )

  return (
    <>
      <Container style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Get access to more features!</Text>
          <Text style={styles.title2}>Use credits to:</Text>
          <View style={styles.benefits}>
            {benefits.map((benefit, key) => (
              <Benefit title={benefit} key={key} />
            ))}
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.products} horizontal>
          {loading
            ? SKELETON_LIST.map((_, key) => <PaymentSkeletonItem key={key} />)
            : data?.packages?.map((pkg, index) => (
                <Package
                  key={index}
                  pkg={pkg}
                  products={products}
                  onPayPackage={() => handlePay(pkg?.storeIds?.[Platform.OS])}
                  isOfferBest={index === 2}
                  isOffer39={index === 1}
                  isOffer49={index === 2}
                />
              ))}
        </ScrollView>
      </Container>

      {paying && (
        <Overlay modal>
          <Placeholder large />
        </Overlay>
      )}

      {modal === ERROR_MODAL && (
        <ErrorModal
          closeAction={() => setModal(null)}
          action={goHome}
          errorMessage={errorMessage}
        />
      )}
      {modal === SUCCESS_MODAL && <SuccessModal action={goHome} />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  wrapper: {
    marginHorizontal: 20,
  },
  title: {
    ...typography.h3,
    color: colors.textMain,

    textAlign: 'center',
  },
  title2: {
    ...typography.p2,
    color: colors.textMain,

    textAlign: 'center',
    marginTop: 4,
  },
  benefits: {
    marginTop: 12,
  },
  products: {
    marginLeft: 20,
    marginTop: 25, // 50 by default but -50 for offer absolute market crop fix
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export const options = () => ({
  tabBarStyle: { display: 'none' },
  tabBarButton: () => null,
})
