import {
  postApiAuthLogin,
  postApiAuthLogout,
  getApiAuthMe,
} from '@/shared/api/generated'

export const authApi = {
  login: postApiAuthLogin,
  logout: postApiAuthLogout,
  me: getApiAuthMe,
}
