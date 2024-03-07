import axios from 'axios'
import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native'
import { Button, LinearGradient } from '~/ui'
import { colors } from '~/ui/theme'
import { useUser } from '~/context/UserContext'
import globalStyle from '~/ui/globalStyle'
import SettingType from '~/shared/types/SettingType'
import TitleHeaderWithBack from '~/ui/header/TitleHeaderWithBack'
import { VeriIcon } from '~/ui/icons'
import useProfile from '~/hooks/useProfile'
import getUrl from '~/utils/getUrl'
import CameraCapture from './CameraCapture'
import CameraCaptureVideo from './CameraCaptureVideo'
import { SITE_URL, MEMBER_PATH } from '~/configs/constants'
import { showNotificationSuccess } from '~/services/in-app-notifications'
import { userVerifyImageUrl } from '~/shared/api/members'
import CustomScrollbar from '~/ui/CustomScrollbar'

const baseUrl = SITE_URL + MEMBER_PATH

const verifyPoses = {
  pose1: 'https://www.fling.com/images/verify_poses/pose1.jpg',
  pose2: 'https://www.fling.com/images/verify_poses/pose2.jpg',
  pose3: 'https://www.fling.com/images/verify_poses/pose3.jpg',
  pose4: 'https://www.fling.com/images/verify_poses/pose4.jpg',
  pose5: 'https://www.fling.com/images/verify_poses/pose5.jpg',
}

const VerifyProfileScreen = ({ navigation }) => {
  const { data: profile } = useProfile()
  const { user, setUser } = useUser()
  const uri = getUrl(profile?.profilePic)
  const location = `${profile?.city}, ${profile?.state_code}, ${profile?.country}`
  const [verifyMarkLeft] = useState(0)
  const [sizeAnimation] = useState(new Animated.Value(18))
  const [opacityAnimation] = useState(new Animated.Value(1))
  const [bottomAnimation] = useState(new Animated.Value(24))
  const [leftAnimation, setLeftAnimation] = useState()
  const leftAnimationRef = useRef()

  const [verifyMethod, setVerifyMethod] = useState('')

  const [verifyPose, setVerifyPose] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const verifyMarkAnim = {
    width: sizeAnimation,
    height: sizeAnimation,
    left: leftAnimation ? leftAnimation : verifyMarkLeft,
    bottom: bottomAnimation,
  }

  const profileStyle = {
    opacity: opacityAnimation,
  }

  const onLayout = event => {
    const { width } = event.nativeEvent.layout
    const leftAnim = new Animated.Value(width + 35)
    setLeftAnimation(leftAnim)
    leftAnimationRef.current = leftAnim

    startAnimate()
  }

  const startAnimate = () => {
    Animated.parallel([
      Animated.timing(sizeAnimation, {
        toValue: 200,
        duration: 1000,
        delay: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(bottomAnimation, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(leftAnimationRef.current, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 600,
        delay: 1000,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const uploadImage = async imageUri => {
    setIsUploading(true)

    try {
      const fd = new FormData()
      fd.append('image', {
        uri: imageUri,
        type: 'image/jpeg', //This is the file type .. you can define according to your requirement
        name: 'verify.jpeg', //File name you want to pass
      })
      fd.append('verify_pose', verifyPose)

      // TODO: should probably show progress bar animation while uploading?
      const resJson = await axios.post(userVerifyImageUrl, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (resJson?.success) {
        showNotificationSuccess({
          message: 'Verification image uploaded successfully!!',
        })

        navigation.pop()
      }
    } catch (error) {
    } finally {
      setIsUploading(false)
    }
  }

  const uploadVideo = async videoUri => {
    try {
      setIsUploading(true)
      const fd = new FormData()

      fd.append('files', {
        uri: videoUri,
        type: 'video/webm',
        name: 'verify.webm',
      })

      const uploadUrl = `${baseUrl}/user/verify/video`

      // TODO: should probably show progress bar animation while uploading?
      const resJson = await axios.post(uploadUrl, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (resJson?.success) {
        showNotificationSuccess({
          description: 'Verification video uploaded successfully!!',
        })

        navigation.pop()
      }
    } catch (error) {
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[globalStyle.flex, { backgroundColor: '#100526' }]}
    >
      <LinearGradient style={globalStyle.flex} colors={colors.bgGradient}>
        <CustomScrollbar
          contentContainerStyle={styles.contentContainer}
          overScrollMode="never"
        >
          <View style={styles.container}>
            <>
              <View
                style={[
                  styles.imageWrapper,
                  { display: verifyMethod ? 'none' : 'flex' },
                ]}
              >
                <View>
                  <Animated.View style={profileStyle}>
                    <Image style={styles.image} source={{ uri }} />
                    <View style={styles.profile}>
                      <View style={styles.userinfo}>
                        <Text
                          style={styles.username}
                          numberOfLines={1}
                          onLayout={onLayout}
                        >
                          {profile?.username}
                        </Text>
                        <Text style={styles.age}>, {profile?.age}</Text>
                      </View>
                      <Text style={styles.location}>{location}</Text>
                    </View>
                  </Animated.View>
                  <Animated.View style={[styles.verifyMark, verifyMarkAnim]}>
                    <VeriIcon
                      width="100%"
                      height="100%"
                      fill={colors.primary}
                    />
                  </Animated.View>
                </View>
              </View>
              {verifyMethod === '' && (
                <>
                  <Text style={styles.title}>
                    Get first priority in sorting by verifying your profile!
                  </Text>
                  <Text style={styles.description}>
                    Three easy ways to verify your profile in under 30 seconds
                  </Text>

                  <View style={styles.actiosnWrapper}>
                    <Button
                      type="primary"
                      style={styles.btn}
                      onPress={() => {
                        if (user.pose) {
                          setVerifyPose(user.pose)
                        } else {
                          const keys = Object.keys(verifyPoses)
                          const pose =
                            keys[Math.floor(Math.random() * keys.length)]
                          setUser({ ...user, pose })
                          setVerifyPose(pose)
                        }
                        setVerifyMethod('image')
                      }}
                    >
                      Take selfie
                    </Button>

                    <Button
                      type="primary"
                      style={styles.btn}
                      onPress={() => setVerifyMethod('video')}
                    >
                      Upload a video
                    </Button>

                    <Button
                      type="primary"
                      style={styles.btn}
                      onPress={() =>
                        navigation.navigate('MyAccountContactUsScreen')
                      }
                    >
                      Live chat with an agent
                    </Button>
                  </View>
                </>
              )}
            </>

            {verifyMethod === 'image' && (
              <>
                <Text style={styles.title}>
                  {`Upload a photo of yourself in this random pose so we know you're a real person.`}
                </Text>
                <View style={styles.poseImageWrapper}>
                  <Image
                    style={styles.poseImage}
                    source={{ uri: verifyPoses[verifyPose] }}
                  />
                </View>
                <CameraCapture
                  isUploading={isUploading}
                  uploadImage={uploadImage}
                />
                <View style={styles.actiosnWrapper}>
                  <Button
                    type="primary"
                    style={styles.btn}
                    onPress={() => setVerifyMethod('')}
                  >
                    Back
                  </Button>
                </View>
              </>
            )}

            {verifyMethod === 'video' && (
              <>
                <Text style={styles.title}>
                  {`Simply record a video of yourself saying hi and upload. It's that simple ;-)`}
                </Text>
                <CameraCaptureVideo
                  isUploading={isUploading}
                  uploadVideo={uploadVideo}
                />
                <View style={styles.actiosnWrapper}>
                  <Button
                    type="primary"
                    style={styles.btn}
                    onPress={() => setVerifyMethod('')}
                  >
                    Back
                  </Button>
                </View>
              </>
            )}
          </View>
        </CustomScrollbar>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomWidth: 1,
    paddingVertical: 0,
  },
  title: {
    fontSize: 20,
    lineHeight: 25.6,
    color: colors.textMain,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 25.6,
    letterSpacing: -0.5,
    fontWeight: '400',
    color: colors.textSub,
    flexGrow: 1,
    flexShrink: 1,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 16,
  },
  actiosnWrapper: {
    marginTop: 15,
  },
  btn: {
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 200,
  },
  profile: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  userinfo: {
    flexDirection: 'row',
    flexShrink: 1,
    width: '100%',
    paddingRight: 24,
  },
  username: {
    color: colors.white,
    fontSize: 13,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    flexShrink: 1,
  },
  age: {
    color: colors.white,
    fontSize: 13,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  location: {
    color: colors.white,
    fontSize: 11,
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  verifyMark: {
    position: 'absolute',
    width: 18,
    height: 18,
    bottom: 24,
    left: 0,
  },
  poseImageWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  poseImage: {
    width: 200,
    height: 'auto',
    aspectRatio: 1,
  },
  contentContainerStyle: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
})

export const options = ({ navigation }) => ({
  header: () => (
    <TitleHeaderWithBack
      title={SettingType.VERIFY_YOUR_PROFILE}
      backAction={() => {
        navigation.pop()
      }}
    />
  ),
})

export default VerifyProfileScreen
