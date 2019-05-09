<template>
  <form>
    <Sheet class="sheet">
      <h2>Personal Details</h2>
      <div class="fields">
        <v-layout row wrap>
          <v-flex sm12 md4>
            <v-text-field
              v-model="preferredName"
              label="Preferred Name"
              outline
            />
          </v-flex>
          <v-flex sm12 md4>
            <v-text-field v-model="name" label="Student Name" outline />
          </v-flex>
          <v-flex sm12 md4>
            <v-text-field v-model="email" type="email" label="Email" outline />
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex sm12 md4>
            <v-text-field
              v-model="bestContactNo"
              label="Preferred Contact Number"
              type="number"
              outline
            />
          </v-flex>
          <v-flex sm12 md4>
            <v-text-field
              v-model="homePhone"
              label="Home Contact Number"
              type="number"
              outline
            />
          </v-flex>
          <v-flex sm12 md4>
            <v-text-field
              v-model="mobileNumber"
              label="Mobile Contact Number"
              type="number"
              outline
            />
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex sm12 md4>
            <v-select
              v-model="gender"
              :items="genders"
              label="Gender"
              outline
            />
          </v-flex>
          <v-flex sm12 md4>
            <DatePicker
              :date="DOB"
              label="Date of Birth"
              :change="val => (data.DOB = val)"
              outline
            />
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex sm12 md4>
            <v-autocomplete
              v-model="countryOfOrigin"
              :items="countries"
              label="Country of Origin"
              outline
            />
          </v-flex>
          <v-flex sm12 md4>
            <v-autocomplete
              v-model="firstLanguage"
              :items="languages"
              label="First Language"
              outline
            />
          </v-flex>
        </v-layout>
      </div>
    </Sheet>
    <Sheet class="sheet">
      <h2>Enrolment Details</h2>
      <div class="fields">
        <v-layout row wrap>
          <v-flex sm12 md4>
            <v-select
              v-model="degreeType"
              :items="degreeTypes"
              label="Degree Type"
              outline
            />
          </v-flex>
          <v-flex sm12 md4>
            <v-text-field v-model="course" label="Course" outline />
          </v-flex>
          <v-flex sm12 md4>
            <v-text-field v-model="faculty" label="Faculty" outline />
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex sm12 md4>
            <v-text-field
              v-model="enrolmentYear"
              label="Year of Study"
              type="number"
              outline
            />
          </v-flex>
          <v-flex sm12 md4>
            <v-select
              v-model="status"
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
          <p v-if="educationalBackground.length === 0">
            No educational background has been added
          </p>
          <span
            v-for="(item, index) in educationalBackground"
            :key="index"
            row
            wrap
          >
            <v-chip close @input="removeEducation(item)">
              <strong>{{ item.education }}</strong>
              &nbsp;
              <span>({{ item.mark }})</span>
            </v-chip>
          </span>
        </div>
      </div>
    </Sheet>
    <Sheet class="sheet">
      <h2>Disclaimer</h2>
      <div class="non-fields">
        <p>
          When you submit your writing to us, we would like to use it (after
          removing any of your personal details) for educational or research
          purposes.
        </p>
        <p>Is this okay with you?</p>
        <v-radio-group v-model="allowSubmissions" row>
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
    </Sheet>
    <v-btn color="primary" depressed @click="handleSubmit">Save</v-btn>
    <v-alert :value="!!message" outline type="success">
      {{ message }}
    </v-alert>
    <v-alert :value="!!errorMessage" outline type="error">
      {{ errorMessage }}
    </v-alert>
  </form>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'
import EdBackgroundDialog from '../../components/EdBackgroundDialog/EdBackgroundDialog'
import Sheet from '../Sheet/Sheet'
import DatePicker from '~/components/DatePicker/DatePicker'
import countries from '../../core/data/countries'
import languages from '../../core/data/languages'
import genders from '../../core/data/genders'
import degreeTypes from '../../core/data/degreeTypes'
import residencyStatuses from '../../core/data/residencyStatuses'

import {
  studentModule,
  PREFERRED_NAME,
  NAME,
  GENDER,
  DOB,
  COUNTRY_OF_ORIGIN,
  FIRST_LANGUAGE,
  EMAIL,
  HOME_PHONE,
  MOBILE_NUMBER,
  BEST_CONTACT_NO,
  CAF_COMPLETED,
  SPECIAL_NEEDS,
  DEGREE_TYPE,
  COURSE,
  FACULTY,
  ENROLMENT_YEAR,
  STATUS,
  EDUCATIONAL_BACKGROUND,
  ALLOW_SUBMISSIONS,
  REQUEST,
  ADD_BACKGROUND,
  REMOVE_BACKGROUND,
  SUBMIT
} from '../../store/student/methods'

const { mapFields } = createHelpers({
  getterType: studentModule('getField'),
  mutationType: studentModule('updateField')
})

export default {
  components: { DatePicker, EdBackgroundDialog, Sheet },
  props: {
    id: { type: String, required: true }
  },

  data() {
    return {
      message: '',
      errorMessage: '',
      genders: genders,
      countries: countries,
      languages: languages,
      degreeTypes: degreeTypes,
      residencyStatuses: residencyStatuses
    }
  },

  computed: {
    ...mapFields([
      NAME,
      PREFERRED_NAME,
      GENDER,
      DOB,
      COUNTRY_OF_ORIGIN,
      FIRST_LANGUAGE,
      EMAIL,
      HOME_PHONE,
      MOBILE_NUMBER,
      BEST_CONTACT_NO,
      CAF_COMPLETED,
      SPECIAL_NEEDS,
      DEGREE_TYPE,
      COURSE,
      FACULTY,
      ENROLMENT_YEAR,
      STATUS,
      EDUCATIONAL_BACKGROUND,
      ALLOW_SUBMISSIONS
    ])
  },

  async mounted() {
    await this.$store.dispatch(studentModule(REQUEST), { id: this.id })
  },

  methods: {
    async handleSubmit(e) {
      try {
        this.message = ''
        this.errorMessage = ''
        await this.$store.dispatch(studentModule(SUBMIT))
        this.message = 'Student Successfully Updated'
      } catch (e) {
        this.errorMessage = e.toString()
      }
    },

    addEducation(education) {
      this.$store.dispatch(studentModule(ADD_BACKGROUND), { education })
    },

    removeEducation(education) {
      this.$store.dispatch(studentModule(REMOVE_BACKGROUND), { education })
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
