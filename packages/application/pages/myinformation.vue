<template>
  <div id="page-myinformation">
    <section class="container">
      <h1>My Information</h1>
      <form>
        <v-sheet class="sheet" elevation="3">
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
                <v-text-field
                  v-model="data.email"
                  type="email"
                  label="Email"
                  outline
                />
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex sm12 md4>
                <v-text-field
                  v-model="data.preferredContactNum"
                  label="Preferred Contact Number"
                  type="number"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <v-text-field
                  v-model="data.homeContactNum"
                  label="Home Contact Number"
                  type="number"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <v-text-field
                  v-model="data.mobileContactNum"
                  label="Mobile Contact Number"
                  type="number"
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
            <v-layout row wrap>
              <v-flex sm12 md4>
                <v-autocomplete
                  v-model="data.countryOfOrigin"
                  :items="countries"
                  label="Country of Origin"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <v-autocomplete
                  v-model="data.firstLanguage"
                  :items="languages"
                  label="First Language"
                  outline
                />
              </v-flex>
            </v-layout>
          </div>
        </v-sheet>
        <v-sheet class="sheet" elevation="3">
          <h2>Enrolment Details</h2>
          <div class="fields">
            <v-layout row wrap>
              <v-flex sm12 md4>
                <v-select
                  v-model="data.degreeType"
                  :items="degreeTypes"
                  label="Degree Type"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <v-text-field
                  v-model="data.courseCode"
                  label="Course"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <v-text-field v-model="data.faculty" label="Faculty" outline />
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex sm12 md4>
                <v-text-field
                  v-model="data.enrolmentYear"
                  label="Year of Study"
                  type="number"
                  outline
                />
              </v-flex>
              <v-flex sm12 md4>
                <v-select
                  v-model="data.residencyStatus"
                  :items="residencyStatuses"
                  label="Status"
                  outline
                />
              </v-flex>
            </v-layout>
          </div>
          <h2>
            Educational Background
            <v-spacer />
            <span>
              <ed-background-dialog :add="addEducation" />
            </span>
          </h2>
          <div class="non-fields">
            <div class="chips">
              <p v-if="data.educationBackgrounds.length === 0">
                No educational background has been added
              </p>
              <span
                v-for="(item, index) in data.educationBackgrounds"
                :key="index"
                row
                wrap
              >
                <v-chip close @input="removeEducation(item)">
                  <strong>{{ item.type }}</strong>
                  &nbsp;
                  <span>({{ item.mark }})</span>
                </v-chip>
              </span>
            </div>
          </div>
        </v-sheet>
        <v-sheet class="sheet" elevation="3">
          <h2>Disclaimer</h2>
          <div class="non-fields">
            <p>
              When you submit your writing to us, we would like to use it (after
              removing any of your personal details) for educational or research
              purposes.
            </p>
            <p>Is this okay with you?</p>
            <v-radio-group v-model="data.allowSubmissions" row>
              <v-radio label="Yes" value="true" />
              <v-radio label="No" value="false" />
            </v-radio-group>
            <p>
              UTS is committed to privacy. For more information, please visit
              <a href="https://www.uts.edu.au/about/uts-governance/privacy-uts">
                Privacy at UTS
              </a>
              .
            </p>
          </div>
        </v-sheet>
        <v-btn color="primary" depressed>Save</v-btn>
      </form>
    </section>
  </div>
</template>

<script>
import { studentAuthenticated } from '../middleware/authenticatedRoutes'
import EdBackgroundDialog from '../components/EdBackgroundDialog/EdBackgroundDialog'
import DatePicker from '~/components/DatePicker/DatePicker'
import countries from '../core/data/countries'
import languages from '../core/data/languages'
import genders from '../core/data/genders'
import degreeTypes from '../core/data/degreeTypes'
import residencyStatuses from '../core/data/residencyStatuses'

export default {
  components: { DatePicker, EdBackgroundDialog },
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
        dateOfBirth: '',
        countryOfOrigin: '',
        firstLanguage: '',
        degreeType: '',
        courseCode: '',
        faculty: '',
        enrolmentYear: '',
        residencyStatus: '',
        educationBackgrounds: [],
        allowSubmissions: ''
      },
      genders: genders,
      countries: countries,
      languages: languages,
      degreeTypes: degreeTypes,
      residencyStatuses: residencyStatuses
    }
  },

  methods: {
    addEducation(education) {
      this.data.educationBackgrounds.push(education)
    },

    removeEducation(education) {
      this.data.educationBackgrounds = this.removeItemFromArray(
        this.data.educationBackgrounds,
        education
      )
    },

    removeItemFromArray(arr, item) {
      arr.splice(arr.indexOf(item), 1)
      return [...arr]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.sheet {
  padding: 24px 16px;
  margin: 30px 0 50px;
}

h2 {
  display: flex;
  margin: 0 24px 18px;
  padding: 0px 0px 16px 30px;
  border-bottom: 1px solid $color-divider;
}

.fields .flex,
.non-fields {
  padding: 6px 24px 0;
}

.chips p {
  text-align: center;
}

.v-radio {
  padding-left: 20px;
}
</style>
