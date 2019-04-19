<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      <a target="_blank" :href="item.link">{{ item.label }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: 'HELPS home and contact details',
          link: 'https://www.uts.edu.au/current-students/support/helps'
        },
        {
          label:
            'Like us on Facebook to keep up with what’s happening at HELPS',
          link: 'https://www.facebook.com/UTSHELPS'
        },
        {
          label: 'IT Help desk if you have login issues',
          link: 'https://servicedesk.uts.edu.au/CAisd/pdmweb.exe'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

ul {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-evenly;
  padding: 0;
}

li {
  margin: 0 3px;
}

a {
  color: $color-white;
  &:hover {
    text-decoration: underline;
  }
}
</style>
