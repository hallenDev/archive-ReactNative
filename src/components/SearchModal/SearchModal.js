import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  Switch,
  Text,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  searchSchemaResolver as resolver,
  searchSchema as schema,
} from '~/shared/api/members'
import {
  SHOW_SEARCH_LOCATION,
  SHOW_SEARCH_RADIUS_LOCATION,
  SHOW_SEARCH_LAST_LOGIN,
  FILTER_DEFAULT_PARAMS,
} from '~/configs/constants'
import getLocationText from '~/utils/getLocationText'
import LastLoginMap from '~/shared/types/LastLoginMap'
import InterestMap from '~/shared/types/InterestMap'
import useProfile from '~/hooks/useProfile'
import useGetDefaultFilterParams from '~/hooks/useGetDefaultFilterParams'

import { colors, typography } from '~/ui/theme'

import {
  ButtonBackgroundGradient,
  Button,
  FilterModalSection,
  SliderField,
  SelectBoxField,
  SelectField,
  LocationField,
  FormErrors,
  InputField,
} from '~/ui'
import CustomScrollbar from '~/ui/CustomScrollbar'
import BackgroundGradient from '~/ui/background-gradient'
import PressableHighlight from '~/ui/PressableHighlight'
import { Close } from '~/ui/icons'
import { useUser } from '~/context/UserContext'
import { FlashMessageManager } from 'react-native-flash-message'
import FlashMessage from '~/services/in-app-notifications'
import HeaderTitle from '~/components/HeaderTitle'

const SearchForm = ({
  isMatchFilter = false,
  onSave,
  closeAction,
  disableUsername = false,
  defaultValues = {},
}) => {
  const [isShowFixedBtns, setShowFixedBtns] = useState(true)
  const insets = useSafeAreaInsets()

  const flashRef = useRef(null)

  const { data: user } = useProfile()

  const {
    user: { preferences },
  } = useUser()

  const getDefaultParams = useGetDefaultFilterParams()

  const form = useForm({
    resolver,
    defaultValues: {
      ...schema.cast(),
      location: getLocationText(user),
      location_id: user.locationId,
      interested_in: user.interested_in,
      seekingAge: [defaultValues.startAge, defaultValues.endAge],
      ignore_filters_for_voters: defaultValues.ignore_filters_for_voters,
      ...defaultValues,
    },
  })

  const handleShowAllVoted = value => {
    form.setValue('ignore_filters_for_voters', value ? 'Y' : 'N')
  }

  const showAllVoted = form.watch('ignore_filters_for_voters')

  const onSubmit = input => {
    const params = {
      startAge: input.seekingAge[0],
      endAge: input.seekingAge[1],
      interested_in: input.interested_in,
      ignore_filters_for_voters: input.ignore_filters_for_voters,
      username: input.username,
    }

    if (SHOW_SEARCH_LOCATION) {
      params.location_id = input.location_id
      params.location = input.location
    }
    if (SHOW_SEARCH_RADIUS_LOCATION) {
      params.radius = input.radius
    }
    if (SHOW_SEARCH_LAST_LOGIN) {
      params.last_login = input.last_login
    }

    onSave(params)
    closeAction()
  }

  const handleCancel = () => {
    const data = getDefaultParams()

    if (user.gender === 'WOMAN') {
      data.startAge = preferences?.ageStart
      data.endAge = preferences?.ageEnd
    }

    form.reset()
    onSave(data)
    closeAction()
  }

  const [[ageFrom, ageTo], radius, countryCode, username] = form.watch([
    'seekingAge',
    'radius',
    'country',
    'username',
  ])

  const captureFlashMessageRef = useCallback(ref => {
    if (ref !== null) {
      FlashMessageManager.hold(ref)
      flashRef.current = ref
    }
  }, [])

  const handleCloseModal = () => {
    if (!isShowFixedBtns) {
      Keyboard.dismiss()
      setTimeout(() => closeAction(), 500)
    } else {
      closeAction()
    }
  }

  useEffect(() => {
    return () => FlashMessageManager.unhold()
  }, [])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowFixedBtns(false)
      },
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowFixedBtns(true)
      },
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return (
    <BackgroundGradient>
      <FormProvider {...form}>
        <View style={[styles.container, { marginBottom: insets.bottom }]}>
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
          >
            <View
              style={[
                styles.header,
                { paddingTop: Platform.OS === 'ios' ? insets.top : 15 },
              ]}
            >
              <View style={styles.empty} />
              <HeaderTitle title="Filters" />
              <PressableHighlight
                onPress={handleCloseModal}
                style={styles.closeModal}
                backgroundColor={colors.semiTransparentWhite15}
              >
                <Close width="22" height="22" color={colors.textSub} />
              </PressableHighlight>
            </View>
            <CustomScrollbar
              contentContainerStyle={[styles.scroll, styles.pdb_30]}
              style={styles.scroll}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.scrollContainer}>
                {isMatchFilter && (
                  <View style={styles.showVotedWrap}>
                    <View>
                      <Text style={styles.textSectionTitle}>
                        Always show who liked me first
                      </Text>
                      <Text style={styles.textSub}>
                        (ignores all filters for these users)
                      </Text>
                    </View>
                    <Switch
                      value={showAllVoted === 'Y'}
                      thumbColor={
                        showAllVoted ? colors.primary : colors.semiGray
                      }
                      trackColor={{
                        false: colors.semiGray,
                        true: colors.semiGray,
                      }}
                      onValueChange={handleShowAllVoted}
                    />
                  </View>
                )}
                <FilterModalSection
                  title={`Age ${ageFrom}-${ageTo}`}
                  titleStyle={styles.titleStyle}
                >
                  <View style={styles.row}>
                    <SliderField
                      name="seekingAge"
                      width={Dimensions.get('window').width - 40}
                      gravity={'center'}
                      min={FILTER_DEFAULT_PARAMS.startAge}
                      max={FILTER_DEFAULT_PARAMS.endAge}
                      step={1}
                      style={styles.slider}
                    />
                  </View>
                </FilterModalSection>

                {!disableUsername && (
                  <FilterModalSection
                    title="Username search"
                    titleStyle={styles.titleStyle}
                  >
                    <View style={styles.row}>
                      <InputField
                        name="username"
                        placeholder="Type username..."
                        defaultValue={username}
                      />
                    </View>
                  </FilterModalSection>
                )}

                {SHOW_SEARCH_LOCATION && (
                  <FilterModalSection
                    title="Location"
                    titleStyle={styles.titleStyle}
                  >
                    <View style={styles.row}>
                      <LocationField
                        name="location"
                        locationFieldName="location_id"
                        countryCode={countryCode}
                        locationId={user.locationId}
                        onFocus={() => setShowFixedBtns(false)}
                      />
                    </View>
                  </FilterModalSection>
                )}

                {SHOW_SEARCH_RADIUS_LOCATION && (
                  <FilterModalSection
                    title="Radius from your location (miles)"
                    titleStyle={styles.titleStyle}
                  >
                    <View style={styles.row}>
                      <SliderField
                        name="radius"
                        width={Dimensions.get('window').width - 40}
                        gravity="center"
                        min={FILTER_DEFAULT_PARAMS.minRadiusLocation}
                        max={FILTER_DEFAULT_PARAMS.maxRadiusLocation}
                        single
                        tip={`${radius} miles`}
                        step={1}
                        style={styles.slider}
                      />
                    </View>
                  </FilterModalSection>
                )}

                {SHOW_SEARCH_LAST_LOGIN && (
                  <FilterModalSection
                    title="Last login"
                    titleStyle={styles.titleStyle}
                  >
                    <View style={styles.row}>
                      <SelectField
                        name="last_login"
                        values={LastLoginMap}
                        nullable={false}
                      />
                    </View>
                  </FilterModalSection>
                )}

                <FilterModalSection
                  title="Looking for"
                  titleStyle={styles.titleStyle}
                >
                  <View style={styles.row}>
                    <SelectBoxField
                      name="interested_in"
                      values={InterestMap}
                      multiple
                    />
                  </View>
                </FilterModalSection>
              </View>
              {isShowFixedBtns && (
                <View style={styles.actions}>
                  <Button
                    style={styles.btn}
                    onPress={form.handleSubmit(onSubmit)}
                  >
                    <ButtonBackgroundGradient className={styles.btnContainer}>
                      Apply
                    </ButtonBackgroundGradient>
                  </Button>
                  <Button
                    onPress={handleCancel}
                    type="transparent"
                    style={styles.btn}
                  >
                    Reset All
                  </Button>
                </View>
              )}
            </CustomScrollbar>
          </KeyboardAvoidingView>
          <FormErrors />
          <FlashMessage ref={captureFlashMessageRef} position="top" />
        </View>
      </FormProvider>
    </BackgroundGradient>
  )
}

const SearchModal = props => {
  const { modalVisible, closeAction } = props

  return (
    <Modal
      visible={modalVisible}
      onRequestClose={closeAction}
      presentationStyle="fullScreen"
      animationType="slide"
    >
      {modalVisible && <SearchForm {...props} closeAction={closeAction} />}
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: colors.bgHeader,
    borderBottomColor: colors.semiBlack25,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerTxt: {
    ...typography.h3,
    color: colors.textMain,
    textAlign: 'center',
  },
  closeModal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.semiBlack25,
    height: 32,
    width: 32,
    borderRadius: 32,
  },
  titleStyle: { paddingHorizontal: 20 },
  textSectionTitle: {
    ...typography.p1b,
    color: colors.textMain,
    paddingHorizontal: 20,
  },
  textSub: {
    fontSize: 12,
    color: colors.textMain,
    paddingHorizontal: 20,
  },
  showVotedWrap: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    paddingRight: 20,
  },
  scroll: {
    flexGrow: 1,
    paddingTop: 20,
  },
  pdb_30: { paddingBottom: 30 },
  scrollContainer: {
    flex: 1,
  },
  close: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: colors.semiBlack25,
    position: 'absolute',
    right: 20,
    zIndex: 5,
  },
  row: {
    padding: 20,
  },
  slider: {
    paddingVertical: 7,
  },

  actions: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: -4,
    padding: 20,
    paddingBottom: 42,
  },
  btn: {
    flex: 1,
    marginHorizontal: 4,
  },
  btnContainer: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    minHeight: 48,
    borderRadius: 10,
  },
  empty: {
    width: 32,
    height: 22,
  },
  wrapper: {
    flex: 1,
  },
})

export default SearchModal
