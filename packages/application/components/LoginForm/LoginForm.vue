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
        prepend-inner-icon="lock"
        @click:append="changePasswordMask()"
      />
      <div class="loginOptions">
        <v-checkbox
          v-model="login.shouldRemember"
          :label="$messages.RememberLoginLabel"
        />
      </div>
      <v-btn type="submit" depressed color="primary" @click="handleSubmit">
        {{ $messages.SubmitLabel }}
      </v-btn>
      <v-alert :value="!!errorMessage" outline type="error">
        {{ errorMessage }}
      </v-alert>
    </form>
  </section>
</template>

<script>
import LoginHeading from './LoginHeading'
import { authModule, REQUEST, IS_REGISTERED } from '~/store/auth/methods'

export default {
  components: { LoginHeading },
  data() {
    return {
      login: {
        id: '12345678',
        password: 'password',
        rememberLogin: false
      },
      showPasswordMask: true,
      errorMessage: ''
    }
  },

  methods: {
    changePasswordMask() {
      this.showPasswordMask = !this.showPasswordMask
    },

    async handleSubmit(e) {
      e.preventDefault()
      try {
        this.errorMessage = ''
        await this.$store.dispatch(authModule(REQUEST), this.login)
        if (!this.$store.getters[authModule(IS_REGISTERED)])
          this.$router.push({ path: '/myinformation' })
        else this.$router.push({ path: '/dashboard' })
      } catch (e) {
        if (e.response && e.response.status === 401)
          this.errorMessage = this.$messages.IncorrectLogin
        else this.errorMessage = e.toString()
      }
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
