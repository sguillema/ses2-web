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
import LoginForm from '../components/LoginForm'

export default {
  components: { LoginForm },
  layout: 'blank'
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-index {
  height: 100%;
  background-color: $color-white;
}

.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrapper {
  width: 100%;
  max-width: 350px;
}
</style>
