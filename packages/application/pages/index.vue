<template>
  <div id="page-index">
    <section class="section-container">
      <div class="login-wrapper">
        <LoginForm />
      </div>
    </section>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm/LoginForm'
import { unauthenticated } from '../middleware/authenticatedRoutes'

export default {
  middleware: unauthenticated,
  components: { LoginForm }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-index {
  height: 100%;
  background-image: url('../static/login-background.png');
  background-size: cover;
}

.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrapper {
  width: 100%;
  max-width: 450px;
  padding: 20px 60px;
  background-color: $color-white;
}

@media screen and (max-width: $bp-xs) {
  .login-wrapper {
    max-width: unset;
    padding: 20px 20px;
    height: 100%;
  }
}
</style>
