<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="date"
        :label="label"
        persistent-hint
        :outline="outline"
        @input="change($event)"
        @blur="datePickerDate = parseDate(date)"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="datePickerDate"
      no-title
      @input="dateMenu = false"
    />
  </v-menu>
</template>

<script>
export default {
  props: {
    date: { type: String, default: '' },
    change: { type: Function, required: true },
    label: { type: String, default: 'Date' },
    outline: { type: Boolean, default: false }
  },

  data() {
    return {
      datePickerDate: new Date().toISOString().substr(0, 10),
      dateMenu: false
    }
  },

  watch: {
    datePickerDate() {
      this.change(this.formatDate(this.datePickerDate))
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
