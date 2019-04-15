export default ({ app }, inject) => {
  let storeStrings = {
    AUTH: 'auth',
    AUTH_REQUEST: `request`,
    AUTH_SUCCESS: `success`,
    AUTH_ERROR: `error`,
    AUTH_LOGOUT: `logout`,
    AUTH_VALIDATE_COOKIE: `validateCookie`,
    AUTH_IS_VALIDATED: `isValidated`,
    AUTH_STATUS: `authStatus`
  }
  inject('storeStrings', storeStrings)
}
