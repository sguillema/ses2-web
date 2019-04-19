<template>
  <div id="page-myinformation">
    <section class="container">
      <h1>My Information</h1>
      <form>
        <v-sheet class="sheet" elevation="6">
          <h2>Personal Details</h2>
          <div class="fields">
            <v-layout row wrap>
              <v-flex sm12 md4>
                <v-text-field
                  v-model="data.preferredName"
                  label="Preferred Name"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <v-text-field
                  v-model="data.studentName"
                  label="Student Name"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <v-text-field v-model="data.email" label="Email" outline />
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex sm12 md4>
                <v-text-field
                  v-model="data.preferredContactNum"
                  label="Preferred Contact Number"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <v-text-field
                  v-model="data.homeContactNum"
                  label="Home Contact Number"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <v-text-field
                  v-model="data.mobileContactNum"
                  label="Mobile Contact Number"
                  outline
                />
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex sm12 md4>
                <v-select
                  v-model="data.gender"
                  :items="genders"
                  label="Gender"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <DatePicker
                  :date="data.dateOfBirth"
                  label="Date of Birth"
                  :change="val => (data.dateOfBirth = val)"
                  outline
                />
              </v-flex>
            </v-layout>
          </div>
        </v-sheet>
      </form>
    </section>
  </div>
</template>

<script>
import { studentAuthenticated } from '../middleware/authenticatedRoutes'
import DatePicker from '~/components/DatePicker/DatePicker'

export default {
  components: { DatePicker },
  middleware: studentAuthenticated,
  layout: 'application',
  data() {
    return {
      data: {
        preferredName: '',
        studentName: '',
        email: '',
        preferredContactNum: '',
        homeContactNum: '',
        mobileContactNum: '',
        gender: '',
        dateOfBirth: ''
      },

      genders: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' },
        { value: 'other', text: 'Other' }
      ]
    }
  },

  computed: {
    binding() {
      const binding = {}
      binding.column = this.$vuetify.breakpoint.smAndDown
      return binding
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.sheet {
  padding: 24px 16px;
}

h2 {
  margin: 0 24px;
  padding: 0px 0px 16px 30px;
  border-bottom: 1px solid $color-divider;
}

.fields {
  padding-top: 18px;
  .column {
    padding: 0;
  }
  .flex {
    padding: 6px 24px 0;
  }
}
</style>
