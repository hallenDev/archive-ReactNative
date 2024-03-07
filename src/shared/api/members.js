import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import RoomActionType from '~/shared/types/RoomActionType'
import { FriendsType } from '~/components/friends/types'
import LastLoginMap from '~/shared/types/LastLoginMap'
import InterestMap from '~/shared/types/InterestMap'

import { SITE_URL, MEMBER_PATH } from '~/configs/constants'

const baseUrl = SITE_URL + MEMBER_PATH

export const changeAboutMeTextSchema = yup.object().shape({
  aboutMeText: yup.string().required().max(2000).label('About Me Text'),
})

export const changeAboutMeText = input =>
  axios.post(`${baseUrl}/account/editProfile`, { ...input })

export const changeAboutMeTextResolver = yupResolver(changeAboutMeTextSchema)

export const changeEmailSchema = yup.object().shape({
  email: yup.string().required().email().label('Email'),
})

export const changeEmail = input =>
  axios.post(`${baseUrl}/account/email`, { ...input })

export const changeEmailResolver = yupResolver(changeEmailSchema)

export const fetchGdprReasons = () =>
  axios.get(`${baseUrl}/account/gdpr/reasons`)

export const removeGdprReasonSchema = yup.object().shape({
  reasonId: yup.number().required().label('ReasonId'),
})

export const removeGdprReason = input =>
  axios.post(`${baseUrl}/account/gdpr/remove`, { ...input })

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required().label('CurrentPassword'),
  newPassword: yup.string().required().label('NewPassword'),
  newPasswordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword'), null], 'New password must match')
    .label('newPasswordConfirm'),
})

export const changePasswordResolver = yupResolver(changePasswordSchema)

export const changePassword = input =>
  axios.post(`${baseUrl}/account/password`, { ...input })

export const changeAccountPreferencesSchema = yup.object().shape({
  accept_growl: yup.boolean().optional().label('Accept growl'),
  discreet_profile: yup.boolean().optional().label('Discreet profile'),
  profile_disabled: yup.boolean().optional().label('Profile disabled'),
})

export const changeNickNameSchema = yup.object().shape({
  username: yup.string().trim().required().min(4).max(64).label('Username'),
})

export const changeNickNameResolver = yupResolver(changeNickNameSchema)

export const changeAccountPreferences = input =>
  axios.post(`${baseUrl}/account/preferences`, {
    ...input,
  })

export const fetchActivityCarousel = () =>
  axios.post(`${baseUrl}/activity/carousel`)

export const addBlockSchema = yup.object().shape({
  blockDuid: yup.number().required().label('blockDuid'),
})

export const addBlock = input =>
  axios.post(`${baseUrl}/block/add`, { ...input })

export const removeBlockSchema = yup.object().shape({
  blockDuid: yup.number().required().label('blockDuid'),
})

export const removeBlock = input =>
  axios.post(`${baseUrl}/block/remove`, { ...input })

export const fetchBlockSchema = yup.object().shape({
  page: yup.number().label('page'),
})

export const fetchBlock = input =>
  axios.get(`${baseUrl}/block`, { params: { ...input } })
// axios.get(`block${page >= 0 ? '/' + page : ''}`)

export const addFirebaseTokenSchema = yup.object().shape({
  token: yup.string().required().max(255).label('token'),
  deviceid: yup.string().required().max(40).label('deviceid'),
})

export const addFirebaseToken = input =>
  axios.post(`${baseUrl}/firebase/token`, { ...input })

export const refreshJwtToken = () => axios.post(`${baseUrl}/jwt/refresh`)

export const fetchCitites = ({ city = '' }) =>
  axios.get(`${baseUrl}/location/cities/${city}`)

export const fetchCountries = () => axios.get(`${baseUrl}/location/countries`)

export const fetchGeo = ({ latitude, longitude }) =>
  axios.get(`${baseUrl}/location/geo/${latitude}/${longitude}`)

export const changeLocationSchema = yup.object().shape({
  location_id: yup.string().required().label('location_id'),
  country_code: yup.string().required().label('country_code'),
})

export const changeLocationResolver = yupResolver(changeLocationSchema)

export const changeLocation = input =>
  axios.post(`${baseUrl}/location/update`, { ...input })

export const fetchMediaSchema = yup.object().shape({
  duid: yup.number().label('duid'),
  size: yup.string().min(1).max(1).default('L').label('size'), // Are using?
})

export const fetchMedia = ({ duid = -1 }) =>
  axios.get(`${baseUrl}/media${duid >= 0 ? '/' + duid : ''}`)

export const addMediaMedia = async input => {
  const headers = axios.defaults.headers.common

  const resp = await axios.post(`${baseUrl}/media/add/image`, input, {
    ...headers,
    'Content-Type': 'multipart/form-data',
  })

  return resp
}

export const changeMediaSchema = yup.object().shape({
  contentId: yup.number().required().label('contentId'),
  contentMediaId: yup.number().required().label('contentMediaId'),
  fileMd5: yup.string().required().label('fileMd5'),
  legacyId: yup.number().optional().label('legacyId'),
})

export const changeMedia = input =>
  axios.post(`${baseUrl}/media/mod`, { ...input })

export const deleteMedia = ({ contentId = '' }) =>
  axios.delete(`${baseUrl}/media/${contentId}`)

export const msgAcceptAttachTypeSchema = yup.object().shape({
  fromDuid: yup.number().required().label('fromDuid'),
  type: yup.string().required().label('type'),
})

export const msgAcceptAttachType = input =>
  axios.post(`${baseUrl}/msg/acceptAttachType`, { ...input })

export const fetchInboxSchema = yup.object().shape({
  last_msg_id: yup.number().label('last_msg_id'),
})

export const fetchInbox = input =>
  axios.get(`${baseUrl}/msg/inbox`, { params: { ...input } })

export const markAsReadSchema = yup.object().shape({
  otherUserId: yup.string().required().label('otherUserId'),
  threadId: yup.string().default('').label('threadId'),
})

export const markAsRead = input =>
  axios.post(`${baseUrl}/msg/read`, { ...input })

export const sendMessageSchema = yup.object().shape({
  otherUserId: yup.string().required().label('otherUserId'),
  message: yup.string().required().label('message'),
  msgId: yup.string().required().label('msgId'),
})

export const sendMessage = input =>
  axios.post(`${baseUrl}/msg/send`, { ...input })

export const addImageMediaUrl = `${baseUrl}/media/add/image`
export const addVideoMediaUrl = `${baseUrl}/media/add/video`
export const sendMsgAttach = `${baseUrl}/msg/attach`

export const sendMediaMessage = formData =>
  axios.post(`${baseUrl}/msg/attach`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const fetchMsgThreadSchema = yup.object().shape({
  min_msg_id: yup.string().default('').label('min_msg_id'),
  thread_id: yup.string().default('').label('msgId'),
})

export const fetchMsgThread = input => {
  const { otherUserId = '' } = input

  return axios.get(
    `${baseUrl}/msg/thread${otherUserId ? '/' + otherUserId : ''}`,
  )
}

export const deleteMsgThread = ({ threadId = '' }) =>
  axios.delete(`${baseUrl}/msg/${threadId}`)

export const fetchPremiumLibrarySchema = yup.object().shape({
  duid: yup.number().label('duid'),
})

export const fetchPremiumLibrary = ({ duid = -1 }) =>
  axios.get(`${baseUrl}/premium/library${duid ? '/' + duid : ''}`)

export const fetchProfile = ({ duid = -1 }) =>
  axios.get(`${baseUrl}/profile${duid >= 0 ? '/' + duid : ''}`)

export const newPurchase = input =>
  axios.post(`${baseUrl}/purchase/new`, { ...input })

export const spendCredits = input =>
  axios.post(`${baseUrl}/credits/spend`, { ...input })

export const fetchCreditsPurchase = () =>
  axios.get(`${baseUrl}/credits/purchase`)

export const restorePurchase = input =>
  axios.post(`${baseUrl}/purchase/restore`, { ...input })

export const fetchQueueMatches = () => axios.get(`${baseUrl}/queue/matches`)

export const fetchLikedMe = () => axios.get(`${baseUrl}/queue/liked_me`)

export const fetchQueueLikesSchema = yup.object().shape({
  limit: yup.number().optional().default(0).label('limit'),
  page: yup.number().optional().default(0).label('page'),
})

export const fetchQueueLikes = input =>
  axios.get(`${baseUrl}/queue/likes`, { params: { ...input } })

const containsEmoji = string => /[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu.test(string)

export const searchSchema = yup.object().shape({
  seekingAge: yup.array().required().default([18, 100]).label('Age'),
  country: yup.string().trim().uppercase().label('Country'),
  randomize: yup.number().default(0),
  radius: yup
    .number()
    .required()
    .default(3000)
    .min(10)
    .max(3000)
    .label('Radius'),
  last_login: yup
    .string()
    .required()
    .default(2)
    .oneOf(Object.keys(LastLoginMap))
    .label('Last login'),
  interested_in: yup
    .array()
    .of(yup.string().oneOf(Object.keys(InterestMap)))
    .nullable(true)
    .label('Interested in'),
  show_all_voted: yup.boolean().nullable(true).label('Show all voted'),
  location_id: yup.string(),
  location: yup.string().test(
    'location',
    () => 'Valid location required',
    function (value, context) {
      return !containsEmoji(value) && (!value || !!context.parent.location_id)
    },
  ),
})

export const searchSchemaResolver = yupResolver(searchSchema)

/**
 *
 * @param {String} size M|L
 * @returns
 */
export const fetchQueuePlay = ({ count = 50, size = 'L', ...rest }) => {
  return axios.get(
    `${baseUrl}/queue/play${count >= 0 ? '/' + count : ''}${
      size ? '/' + size : ''
    }`,
    {
      params: {
        ...rest,
      },
    },
  )
}

export const voteQueueSchema = yup.object().shape({
  duid: yup.number().required().label('duid'),
  rating: yup.string().required().label('rating'),
  picNum: yup.string().default('').label('picNum'),
})

export const voteQueue = input =>
  axios.post(`${baseUrl}/queue/vote`, { ...input })

export const fetchQuickSearch = input =>
  axios.get(`${baseUrl}/quicksearch`, { params: { ...input } })

export const reportSchema = yup.object().shape({
  reportedDuid: yup.number().required().label('reportedDuid'),
  reportedUserReasonId: yup.number().required().label('reportedUserReasonId'),
  reportedFrom: yup.string().required().label('reportedFrom'),
  additionalInfo: yup.string().default('').label('additionalInfo'),
})

export const reportFormSchema = yup.object().shape({
  comment: yup.string().trim().default('').max(500).label('Your comments'),
  reason: yup.number().required().label('Reason'),
})

export const reportResolver = yupResolver(reportFormSchema)

export const report = input => axios.post(`${baseUrl}/report`, { ...input })

export const createRoomSchema = yup.object().shape({
  name: yup.string().required().min(2).max(100).label('name'),
  isPrivate: yup.boolean().required().label('isPrivate'),
  sendRequest: yup.boolean().required().label('sendRequest'),
  fromMsgThread: yup.boolean().optional().label('fromMsgThread'),
  duids: yup.array().label('duids'), // Array of numbers
})

export const createRoom = input =>
  axios.post(`${baseUrl}/rooms/create`, { ...input })

export const fetchListRooms = input => axios.get(`${baseUrl}/rooms/list`)

export const actionPrivateRoomSchema = yup.object().shape({
  action: yup.string().required().oneOf(RoomActionType).label('name'),
  text: yup.string().min(1).max(200).label('text'),
  name: yup
    .string()
    .min(5)
    .max(30)
    .matches('/[\\w_\\-\\ 0-9]+/u')
    .label('name'),
  duid: yup.number().label('duid'),
})

export const changePrivateRoom = ({ otherDuid = -1, ...rest }) =>
  axios.post(`${baseUrl}/rooms/private/${otherDuid}/action`, {
    ...rest,
  })

export const fetchPrivateRoomDetails = ({ otherDuid = -1 }) =>
  axios.get(`${baseUrl}/rooms/private/${otherDuid}/details`)

export const joinPrivateRoom = ({ otherDuid = -1 }) =>
  axios.get(`${baseUrl}/rooms/private/${otherDuid}/join`)

export const sendRequestPrivateRoom = ({ otherDuid = -1 }) =>
  axios.post(`${baseUrl}/rooms/private/${otherDuid}/sendRequest`)

export const actionRoomSchema = yup.object().shape({
  action: yup.string().required().oneOf(RoomActionType).label('name'),
  text: yup.string().min(1).max(200).label('text'),
  name: yup
    .string()
    .min(5)
    .max(30)
    .matches('/[\\w_\\-\\ 0-9]+/u')
    .label('name'),
  duid: yup.number().label('duid'),
})

export const changeRoom = ({ roomId = -1, ...rest }) =>
  axios.post(`${baseUrl}/rooms/${roomId}/action`, {
    ...rest,
  })

export const fetchRoomDetails = ({ roomId = -1 }) =>
  axios.get(`${baseUrl}/rooms/${roomId}/details`)

export const changeStateSchema = yup.object().shape({
  membership: yup.boolean().label('membership'),
  profile_pic: yup.boolean().label('profile_pic'),
})

export const changeState = input => axios.post(`${baseUrl}/state`, { ...input })

export const changeInterestsSchema = yup.object().shape({
  interested_in: yup
    .string()
    .required()
    .oneOf(Object.keys(InterestMap))
    .label('Interested in'),
  duid: yup.number().label('duid'),
})

export const changeInterests = input =>
  axios.post(`${baseUrl}/update/interests`, { ...input })

export const feedbackSchema = yup.object().shape({
  feedback: yup.string().required().max(300).trim().label('feedback'),
})

export const userVerifyImageUrl = `${baseUrl}/user/verify/image`

export const feedback = input =>
  axios.post(`${baseUrl}/user/feedback`, { ...input })

export const feedbackResolver = yupResolver(feedbackSchema)

export const fetchUserFeedbacks = () => axios.get(`${baseUrl}/user/feedback`)

export const changeUserLoginSchema = yup.object().shape({
  type: yup.string().trim().label('type'),
  code: yup.string().trim().label('code'),
})

export const changeUserLogin = input =>
  axios.post(`${baseUrl}/user/login_changed`, { ...input })

export const mediaAddImages = async ({ photos, sid }) => {
  let input = new FormData()

  photos.forEach(photo => {
    input.append('image[]', {
      uri: photo.uri,
      name: photo.fileName,
      type: photo.type,
    })
  })

  const resp = await fetch(`${baseUrl}/media/add/images`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${sid}`,
      'Content-Type': 'multipart/form-data',
    },
    body: input,
  })

  return await resp.json()

  //   const resp = await axios.post(`${baseUrl}/media/add/images`, input, {
  //     Authorization: `Bearer ${sid}`,
  //     'Content-Type': 'multipart/form-data',
  //   })

  //   return resp
}

export const fetchFavorites = input =>
  axios.get(`${baseUrl}/favorites/list`, { params: { ...input } })

export const addFavorites = input =>
  axios.post(`${baseUrl}/favorites/add`, { ...input })

export const removeFavorites = input =>
  axios.post(`${baseUrl}/favorites/remove`, { ...input })

export const fetchBalance = () => axios.get(`${baseUrl}/credits/balance`)

export const fetchActivityCounts = () => axios.get(`${baseUrl}/activity/counts`)

export const fetchProfileFeed = input =>
  axios.get(`${baseUrl}/user/content`, { params: { ...input } })

export const likePost = input =>
  axios.post(`${baseUrl}/content/like`, { ...input })

export const fetchContent = contentId =>
  axios.get(`${baseUrl}/content/${contentId}`)

export const fetchContentComments = (contentId, input = {}) =>
  axios.get(`${baseUrl}/content/${contentId}/comments`, {
    params: { ...input },
  })

export const commentSchema = yup.object().shape({
  content_id: yup.number().required(),
  content_duid: yup.number().required(),
  body: yup.string().required().max(500).label('Comment'),
  content_gender: yup.string(),
  content_type: yup.string(),
  media_type: yup.string(),
  parent_comment_id: yup.number(),
  parent_comment_duid: yup.number(),
})

export const commentResolver = yupResolver(commentSchema)

export const addComment = async input =>
  await axios.post(`${baseUrl}/content/comment`, { ...input })

export const deleteComment = ({ commentId = '' }) =>
  axios.delete(`${baseUrl}/content/comment/${commentId}`)

export const fetchTrending = input =>
  axios.post(`${baseUrl}/content/trending`, { ...input })

export const fetchFriendsSchema = yup.object().shape({
  page: yup.number().label('page'),
  type: yup.string().oneOf(Object.keys(FriendsType)).label('type'),
})

export const fetchFriends = input =>
  axios.get(`${baseUrl}/friends/list`, { params: { ...input } })

export const addFriend = input =>
  axios.post(`${baseUrl}/friends/add`, { ...input })

export const removeFriend = input =>
  axios.post(`${baseUrl}/friends/remove`, { ...input })

export const denyFriend = input =>
  axios.post(`${baseUrl}/friends/deny`, { ...input })

export const fetchContentLikes = (contentId, input) =>
  axios.get(`${baseUrl}/content/${contentId}/likes`, { params: { ...input } })

export const rateMsgThread = input =>
  axios.post(`${baseUrl}/msg/add/rating`, { ...input })

export const getGiftsList = input =>
  axios.get(`${baseUrl}/gifts`, { params: { ...input } })

export const postPurchaseGift = input =>
  axios.post(`${baseUrl}/gifts/purchase`, { ...input })

export const getVoiceAnswers = input =>
  axios.get(`${baseUrl}/user/answer/voice`, { params: { ...input } })

export const deleteVoiceAnswer = questionId =>
  axios.delete(`${baseUrl}/user/answer/voice/${questionId}`)

export const postVoiceAnswers = formData =>
  axios.post(`${baseUrl}/user/answer/voice`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

export const fetchProducts = () => axios.get(`${baseUrl}/credits/products`)

export const changeNickName = input =>
  axios.post(`${baseUrl}/account/username`, { ...input })

export const updateTextAnswer = input =>
  axios.post(`${baseUrl}/user/answer/text/mod`, { ...input })

export const fetchNotificationSettings = () =>
  axios.get(`${baseUrl}/account/notifications`)

export const updateNotificationSettings = input =>
  axios.post(`${baseUrl}/account/notifications`, { ...input })

export const checkFacePic = () => axios.get(`${baseUrl}/user/facepic`)
