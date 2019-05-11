<template>
  <section class="login-form">
    <LoginHeading />
    <form>
      <v-text-field
        id="username"
        v-model="login.id"
        outline
        label="Student/Staff Number"
        prepend-inner-icon="account_box"
      />
      <v-text-field
        id="password"
        v-model="login.password"
        outline
        label="Password"
        prepend-innerss-icon="lock"
        :append-icon="showPasswordMask ? 'visibility_off' : 'visibility'"
        :type="showPasswordMask ? 'password' : 'text'"
        prepend-inner-icon="lock"
        @click:append="changePasswordMask()"
      />
      <v-btn
        class="btn-login"
        type="submit"
        depressed
        color="primary"
        @click="handleSubmit"
      >
        {{ $messages.SubmitLabel }}
      </v-btn>
      <div class="options">
        <v-checkbox
          v-model="login.shouldRemember"
          :label="$messages.RememberLoginLabel"
        />
      </div>
      <v-btn
        id="submitBtn"
        type="submit"
        depressed
        color="primary"
        @click="handleSubmit"
      >
        {{ $messages.SubmitLabel }}
      </v-btn>
      <div class="terms-and-conditions">
        By signing in, you are agreeing to the
        <router-link :to="`/terms-and-conditions`">
          terms and conditions
        </router-link>
        .
      </div>
      <v-alert :value="!!errorMessage" outline type="error">
        {{ errorMessage }}
      </v-alert>
    </form>
  </section>
</template>

<script>
import { authModule, REQUEST, IS_REGISTERED } from '../../store/auth/methods'
import LoginHeading from './LoginHeading'

export default {
  components: { LoginHeading },
  data() {
    return {
      login: {
        id: '14558877',
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
          this.$router.push({ path: '/student/myinformation' })
        else window.location.reload(true)
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

.btn-login {
  margin: 0;
  display: block;
  width: 100%;
  height: 56px;
  font-size: $font-cardtitle;
  font-weight: $fontweight-regular;
}

.options {
  margin-top: 20px;
}

.terms-and-conditions {
  font-size: $font-footer;
}
</style>
