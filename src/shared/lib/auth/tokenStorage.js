const ACCESS = 'access_token'
const REFRESH = 'refresh_token'

export const tokenStorage = {
  getAccessToken() {
    return localStorage.getItem(ACCESS)
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH)
  },

  setTokens({ accessToken, refreshToken }) {
    localStorage.setItem(ACCESS, accessToken)
    localStorage.setItem(REFRESH, refreshToken)
  },

  clear() {
    localStorage.removeItem(ACCESS)
    localStorage.removeItem(REFRESH)
  },
}
