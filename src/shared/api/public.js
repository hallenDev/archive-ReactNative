import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import GenderMap from '~/shared/types/GenderMap'
import InterestMap from '~/shared/types/InterestMap'

import { SITE_URL, PUBLIC_PATH } from '~/configs/constants'
import { APP_DISPLAY_NAME } from '../../configs/constants'

const baseUrl = SITE_URL + PUBLIC_PATH

export const loginSchema = yup.object().shape({
  email: yup.string().trim().required().email().label('Email'),
  password: yup.string().required().min(6).max(16).label('Password'),
})

export const loginResolver = yupResolver(loginSchema)

export const login = input => axios.post(`${baseUrl}/login`, { ...input })

export const logout = input =>
  axios.post(`${baseUrl}/logout`, {
    ...input,
  })

export const validate = input => axios.post(`${baseUrl}/validate`, { ...input })

export const registerSchema = yup.object().shape({
  birth_date: yup.string().required().label('Enter your birth date'),
  gender: yup.string().required().oneOf(Object.keys(GenderMap)).label('Gender'),
  username: yup
    .string()
    .trim()
    .required('Please enter a username')
    .label('Username'),
  seeking: yup
    .array()
    .required()
    .of(yup.string().oneOf(Object.keys(GenderMap)))
    .min(1)
    .nullable(true)
    .label('Seeking'),
  aboutMe: yup
    .string()
    .trim()
    .required()
    .default('')
    .min(50)
    .max(500)
    .label('About yourself'),
  question_id: yup.number().nullable(true).label('Question'),
  interested_in: yup
    .array()
    .required()
    .of(yup.string().oneOf(Object.keys(InterestMap)))
    .min(1)
    .default(Object.keys(InterestMap))
    .nullable(true)
    .label('Interested in'),
  answer: yup
    .string()
    .trim()
    .max(500)
    .when('question_id', question_id => {
      if (!question_id) return

      return yup.string().required().min(10)
    })
    .label('Your answer'),
  email: yup
    .string()
    .trim()
    .required('Please enter your email')
    .email()
    .label('Email'),
  password: yup
    .string()
    .required('Please enter a password')
    .min(6)
    .max(16)
    .label('Password'),
  advert: yup.string().default('noadvert').min(3).max(25).label('Advert'),
  seekingAge: yup.array().required().default([18, 99]).label('Age'),
  agree: yup
    .boolean()
    .default(true)
    .oneOf(
      [true],
      'You must agree to the terms, conditions and privacy policy',
    ),
  photos: yup
    .array()
    .default([])
    .min(
      1,
      `${APP_DISPLAY_NAME} requires all members to upload at least one photo`,
    ),
})

export const registerResolver = yupResolver(registerSchema)

export const register = input =>
  axios.post(`${baseUrl}/register`, {
    ...input,
  })

export const resetSchema = yup.object().shape({
  email: yup.string().required().email().trim().label('Email'),
})

export const resetResolver = yupResolver(resetSchema)

export const reset = input => axios.post(`${baseUrl}/reset`, { ...input })

export const resetconfirmSchema = yup.object().shape({
  duid: yup.number().required().label('Duid'),
  token: yup.string().required().label('Token'),
  newPassword: yup.string().required().min(6).max(20).label('New password'),
  newPasswordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword'), null], 'New password must match')
    .label('New password confirm'),
})

export const resetconfirmResolver = yupResolver(resetconfirmSchema)

export const resetconfirm = input =>
  axios.post(`${baseUrl}/resetconfirm`, { ...input })

export const fetchRoomEvents = () => axios.post(`${baseUrl}/rooms/events`)

export const sendSmsCodeSchema = yup.object().shape({
  phone_number: yup
    .string()
    .required()
    .matches('/\\+\\d+/')
    .label('Phone number'),
})

export const sendSmsCode = input =>
  axios.post(`${baseUrl}/send_sms_code`, { ...input })

export const validateSchema = yup.object().shape({
  fields: yup.array().required().label('Fields'),
  username: yup.array().optional(),
  email: yup.array().optional(),
  password: yup.array().optional(),
  birth_date: yup.array().optional(),
  membership: yup.array().optional(),
  location_id: yup.array().optional(),
  gender: yup.array().optional(),
  seeking: yup.array().optional(),
  interested_id: yup.array().optional(),
})

export const virifySchema = yup.object().shape({
  email: yup.string().required().trim().email().label('Email'),
  token: yup.string().required().length(6).label('Token'),
})
export const verifyResolver = yupResolver(virifySchema)

export const verify = input => axios.post(`${baseUrl}/verify`, { ...input })

export const verifySmsCodeSchema = yup.object().shape({
  phone_number: yup
    .string()
    .required()
    .matches('/\\+\\d+/')
    .label('Phone number'),
  code: yup.string().required().min(10).label('Code'),
})

export const verifySmsCode = input =>
  axios.post(`${baseUrl}/verify_sms_code`, { ...input })

export const fetchQuestions = () => axios.get(`${baseUrl}/questions`)

export const getQuestions = () => axios.get(`${baseUrl}/questions`)
