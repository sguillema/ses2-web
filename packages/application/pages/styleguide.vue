<template>
  <div id="page-index">
    <section class="section-container">
      <div class="container">
        <div class="reee">
          {{ reee }}
        </div>
        <h1>{{ heading }}</h1>
        <h2>{{ subheading }}</h2>
        <p>{{ paragraph }}</p>
        <a href="#">{{ linkText }}</a>
        <v-btn depressed color="primary">
          primary
        </v-btn>
        <v-btn depressed>
          secondary
        </v-btn>
        <v-btn depressed disabled>
          disabled
        </v-btn>
        <v-text-field label="Outline" placeholder="Placeholder" outline />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reee: '48px reeeeeee bold',
      heading: '24px heading 1 medium',
      subheading: '20px heading 2 medium',
      paragraph: '14px paragraph regular',
      linkText: 'link to new tab'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
