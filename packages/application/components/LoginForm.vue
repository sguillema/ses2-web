<template>
  <section class="login-form">
    <LoginHeading />
    <form>
      <v-text-field
        v-model="login.id"
        outline
        label="Student/Staff Number"
        prepend-inner-icon="account_box"
      />
      <v-text-field
        v-model="login.password"
        outline
        label="Password"
        prepend-innerss-icon="lock"
        :append-icon="showPasswordMask ? 'visibility_off' : 'visibility'"
        :type="showPasswordMask ? 'password' : 'text'"
        :rules="[requiredRule()]"
        prepend-inner-icon="lock"
        @click:append="changePasswordMask()"
      />
      <div class="loginOptions">
        <v-checkbox
          v-model="login.rememberLogin"
          :label="$messages.RememberLoginLabel"
        />
      </div>
      <v-btn type="submit" depressed color="primary" @click="handleSubmit">
        {{ $messages.SubmitLabel }}
      </v-btn>
    </form>
  </section>
</template>

<script>
import Cookies from 'js-cookie'
import moment from 'moment'
import { requiredRule } from '../utils/helpers'
import AuthApi from '../api/Api/AuthApi'
import LoginHeading from './LoginHeading'

export default {
  components: { LoginHeading },
  data() {
    return {
      login: {
        id: '12345678',
        password: 'password',
        rememberLogin: false
      },
      showPasswordMask: true
    }
  },

  methods: {
    requiredRule,
    changePasswordMask() {
      this.showPasswordMask = !this.showPasswordMask
    },

    async handleSubmit(e) {
      e.preventDefault()
      const response = await AuthApi.authenticateUser(this.login)
      const { user, token } = response.data
      const oneHour = moment()
        .add(1, 'hours')
        .toDate()
      this.$store.commit('updateToken', token)
      this.$store.commit('updateUserId', user.id)
      Cookies.set('token', token, { expires: oneHour })
      Cookies.set('user', user, { expires: oneHour })
      this.$router.push({ path: '/dashboard' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.login-form {
  width: 100%;
  form {
    margin: 10px 0;
    .v-input--selection-controls {
      margin-top: 0;
    }
  }
}
</style>
