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
  .reee {
    margin: 0;
    line-height: 100%;
    font-family: 'HelveticaNeue-CondensedBold', 'Helvetica Neue';
    letter-spacing: 2px;
  }
}
</style>
