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
        @blur="textFieldBlur(date)"
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
import moment from 'moment'

const DATE_PICKER_FORMAT = 'YYYY-MM-DD'
const INPUT_DISPLAY_FORMAT = 'DD/MM/YYYY'
const INPUT_PARSE_FORMAT = 'DD-MM-YYYY'

export default {
  props: {
    date: { type: String, default: '' },
    change: { type: Function, required: true },
    label: { type: String, default: 'Date' },
    outline: { type: Boolean, default: false }
  },

  data() {
    return {
      datePickerDate: moment().format(DATE_PICKER_FORMAT),
      dateMenu: false
    }
  },

  watch: {
    datePickerDate() {
      this.updatePropValue(this.datePickerDate)
    }
  },

  methods: {
    updatePropValue(val) {
      this.change(this.formatDate(val))
    },

    textFieldBlur(val) {
      const parsedDate = this.parseDate(val)
      this.datePickerDate = parsedDate
      this.updatePropValue(parsedDate)
    },

    formatDate(date) {
      return this.convertDateFormat(
        date,
        DATE_PICKER_FORMAT,
        INPUT_DISPLAY_FORMAT
      )
    },
    parseDate(date) {
      return this.convertDateFormat(
        date,
        INPUT_PARSE_FORMAT,
        DATE_PICKER_FORMAT
      )
    },

    convertDateFormat(date, formatFrom, formatTo) {
      const parsedDate = moment(date, formatFrom)
      if (!parsedDate.isValid()) return null
      return parsedDate.format(formatTo)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
