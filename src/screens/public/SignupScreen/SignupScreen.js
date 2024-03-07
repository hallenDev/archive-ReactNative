import React, { useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useMutation } from 'react-query'
import { useForm, FormProvider } from 'react-hook-form'
import Swiper from 'react-native-swiper'

import { useUser } from '~/context/UserContext'

import {
  registerResolver as resolver,
  registerSchema,
  register,
} from '~/shared/api/public'

import { mediaAddImages } from '~/shared/api/members'

import WelcomeSlide from './ui/Slides/Welcome'
import UserNameSlide from './ui/Slides/UserName'
import EmailPasswordSlide from './ui/Slides/EmailPassword'
import AgeGenderSlide from './ui/Slides/AgeGender'
import InterestedInAgeSlide from './ui/Slides/InterestedInAge'
import InterestedInSlide from './ui/Slides/InterestedIn'
import AboutMeSlide from './ui/Slides/AboutMe'
import QuestionSlide from './ui/Slides/Question'
import LastStepSlide from './ui/Slides/LastStep'
import BirthdaySlide from './ui/Slides/Birthday'
import AgeRangeSlide from './ui/Slides/AgeRange'

import { AFLogEvent, AF_CompleteRegistration } from '~/utils/AppsFlyer'

import { colors } from '~/ui/theme'
import { FormErrors, KeyboardAvoidingView, LinearGradient } from '~/ui'
import useStorage from '~/hooks/useStorage'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const SignupScreen = () => {
  const swiper = useRef()
  const { setSearchFilter, setMatchFilter } = useStorage()
  const { updateUserWithSid } = useUser()
  const { bottom } = useSafeAreaInsets()

  const [index, setIndex] = useState(0)

  const { mutateAsync: regMutation } = useMutation(register)
  const { mutateAsync: mediaAddImageMutate } = useMutation(mediaAddImages)

  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver,
    defaultValues: registerSchema.cast(),
  })

  const triggerError = ({ data }) => {
    const errors = data?.errors || {}

    Object.keys(errors).forEach(key => {
      form.setError(key, {
        type: 'manual',
        message: errors[key],
      })
    })

    setLoading(false)
  }

  const onSubmit = values => {
    const input = {
      aboutMe: values.aboutMe,
      birth_date: values.birth_date,
      email: values.email,
      interested_in: values.interested_in,
      gender: values.gender,
      password: values.password,
      seeking: values.seeking,
      seekingAge: values.seekingAge,
      username: values.username,
      question_id: values.question_id,
      advert: values.advert,
      answer: values.question_id ? values.answer : undefined,
    }
    setLoading(true)

    regMutation(input)
      .then(data => {
        AFLogEvent(AF_CompleteRegistration, {
          af_registration_method: 'email',
        })

        const preferences = {
          startAge: data?.user?.preferences.ageStart,
          endAge: data?.user?.preferences.ageEnd,
        }

        setSearchFilter(preferences)
        setMatchFilter(preferences)

        mediaAddImageMutate({ photos: values.photos, sid: data?.sid })
          .then(({ images }) => {
            const primaryPicSet = images.find(item => item?.primaryPicSet)

            if (primaryPicSet) {
              data.user.primaryPicSet = true
            }

            setLoading(false)
          })
          .catch(triggerError)
          .finally(() => {
            form.reset()
            updateUserWithSid(data)
          })
      })
      .catch(error => {
        setLoading(false)
        triggerError(error)
      })
  }

  return (
    <FormProvider {...form}>
      <LinearGradient style={styles.background} colors={colors.bgGradient}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          keyboardVerticalOffset={-bottom}
        >
          <SafeAreaView
            style={[{ backgroundColor: colors.header }]}
            edges={['top']}
          />
          <SafeAreaView
            style={[styles.wrapper]}
            edges={['bottom', 'left', 'right']}
          >
            <Swiper
              ref={swiper}
              showsButtons={false}
              loop={false}
              onIndexChanged={setIndex}
              scrollEnabled={false}
              showsPagination={false}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
            >
              <WelcomeSlide
                nextAction={() => swiper.current.scrollTo(index + 1)}
              />
              <UserNameSlide
                backAction={() => swiper.current.scrollTo(index - 1)}
                nextAction={() => swiper.current.scrollTo(index + 1)}
              />
              <EmailPasswordSlide
                backAction={() => swiper.current.scrollTo(index - 1)}
                nextAction={() => swiper.current.scrollTo(index + 1)}
              />
              <BirthdaySlide
                backAction={() => swiper.current.scrollTo(index - 1)}
                nextAction={() => swiper.current.scrollTo(index + 1)}
              />
              <AgeGenderSlide
                backAction={() => swiper.current.scrollTo(index - 1)}
                nextAction={() => swiper.current.scrollTo(index + 1)}
              />
              <InterestedInAgeSlide
                backAction={() => swiper.current.scrollTo(index - 1)}
                nextAction={() => swiper.current.scrollTo(index + 1)}
              />
              <AgeRangeSlide
                backAction={() => swiper.current.scrollTo(index - 1)}
                nextAction={() => swiper.current.scrollTo(index + 1)}
              />
              <InterestedInSlide
                backAction={() => swiper.current.scrollTo(index - 1)}
                nextAction={() => swiper.current.scrollTo(index + 1)}
              />
              <QuestionSlide
                backAction={() => swiper.current.scrollTo(index - 1)}
                nextAction={() => swiper.current.scrollTo(index + 1)}
              />
              <AboutMeSlide
                backAction={() => swiper.current.scrollTo(index - 1)}
                nextAction={() => swiper.current.scrollTo(index + 1)}
              />
              <LastStepSlide
                loading={loading}
                backAction={() => swiper.current.scrollTo(index - 1)}
                nextAction={form.handleSubmit(onSubmit)}
              />
            </Swiper>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </LinearGradient>
      <FormErrors />
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
})

export default SignupScreen
