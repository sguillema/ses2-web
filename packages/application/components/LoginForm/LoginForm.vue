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
import userTypes from '../../core/userTypes'
import LoginHeading from './LoginHeading'
let storeModule, AUTH, REQUEST, TYPE

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

  created() {
    storeModule = this.$helpers.storeModule
    AUTH = this.$storeStrings.AUTH
    REQUEST = this.$storeStrings.REQUEST
    TYPE = this.$storeStrings.TYPE
  },

  methods: {
    changePasswordMask() {
      this.showPasswordMask = !this.showPasswordMask
    },

    async handleSubmit(e) {
      e.preventDefault()
      try {
        this.errorMessage = ''
        await this.$store.dispatch(storeModule(AUTH, REQUEST), this.login)
        if (this.$store.getters[storeModule(AUTH, TYPE)] === userTypes.ADMIN)
          this.$router.push({ path: '/students' })
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
