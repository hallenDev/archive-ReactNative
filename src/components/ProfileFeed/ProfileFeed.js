import React, { memo } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '~/context/UserContext'
import { Button, LinearGradient, ButtonBackgroundGradient } from '~/ui'
import { Grid, FullPic } from '~/ui/icons'
import { MediaListType } from '~/shared/types/MediaListType'
import { colors, typography } from '~/ui/theme'

const ProfileFeed = ({ duid, onChangeListType, listType }) => {
  const navigation = useNavigation()

  const {
    user: { duid: myDuid },
  } = useUser()

  const handleGoToChat = () => {
    navigation.navigate('EditMedia')
  }

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <View style={styles.displayAs}>
          <Text style={styles.text}>Display as:</Text>
          <Button
            type="transparent"
            style={styles.displayBtn}
            onPress={() => onChangeListType(MediaListType.C_LIST)}
          >
            {listType === MediaListType.C_LIST && (
              <LinearGradient
                style={styles.btnContent}
                colors={colors.linerGradient}
                start={{ x: 1.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
              />
            )}
            <FullPic width={22} height={22} style={styles.svg} />
          </Button>
          <Button
            type="transparent"
            style={styles.displayBtn}
            onPress={() => onChangeListType(MediaListType.C_GRID)}
          >
            {listType === MediaListType.C_GRID && (
              <LinearGradient
                style={styles.btnContent}
                colors={colors.linerGradient}
                start={{ x: 1.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
              />
            )}
            <Grid width={22} height={22} style={styles.svg} />
          </Button>
        </View>
        {parseInt(myDuid) === duid && (
          <Button style={styles.btn} onPress={handleGoToChat}>
            <ButtonBackgroundGradient className={styles.btnGradient}>
              <Text style={styles.btnText}>Edit Media</Text>
            </ButtonBackgroundGradient>
          </Button>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  displayAs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    ...typography.c2,
    color: colors.textMain,
    marginRight: 8,
  },
  displayBtn: {
    width: 36,
    height: 36,
    borderRadius: 50,
    minHeight: 0,
    minWidth: 0,
    marginRight: 8,
    position: 'relative',
  },
  btnContent: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    position: 'absolute',
  },
  svg: {
    color: colors.textMain,
  },
  btn: {
    borderRadius: 10,
    minHeight: 0,
    width: 110,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnText: {
    ...typography.p3,
    color: colors.textMain,
  },
  btnGradient: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
})

export default memo(ProfileFeed)
