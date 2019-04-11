<template>
  <section class="login-form">
    <LoginHeading />
    <form>
      <v-text-field
        v-model="login.username"
        outline
        label="Username"
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
      <v-btn depressed color="primary" @click="handleSubmit">
        {{ $messages.SubmitLabel }}
      </v-btn>
    </form>
  </section>
</template>

<script>
import { requiredRule } from '../utils/helpers.js'
import LoginHeading from './LoginHeading'

export default {
  components: { LoginHeading },
  data() {
    return {
      login: {
        username: '',
        password: '',
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

    handleSubmit() {
      console.log(this.login)
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
