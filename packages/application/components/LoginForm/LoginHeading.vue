<template>
  <div class="login-heading">
    <h1 class="reee">{{ $messages.LoginHeading }}</h1>
    <h2>{{ $messages.LoginSubheading }}</h2>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.login-heading {
  text-align: center;
  margin: 30px 0;
  .reee {
    margin: 0;
    line-height: 100%;
    font-family: 'HelveticaNeue-CondensedBold', 'Helvetica Neue', 'Roboto';
    letter-spacing: 2px;
  }
}
</style>
