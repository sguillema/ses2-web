<template>
  <form>
    <Sheet class="sheet">
      <h2>Personal Details</h2>
      <div class="fields">
        <v-layout row wrap>
          <v-flex sm12 md4>
            <v-text-field
              v-model="TITLE"
              label="Title"
              outline
            />
          </v-flex>
          <v-flex sm12 md4>
            <v-text-field v-model="DESCRIPTION" label="Description" outline />
          </v-flex>
          <v-flex sm12 md4>
            <v-text-field v-model="SKILLSETID" label="Skill-set" outline />
          </v-flex>
        </v-layout>
    
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
  ID,
  SKILLSETID,
  TITLE,
  TRAGETGROUP,
  DESCRIPTION,
  REQUEST,
  SUBMIT
} from '../../store/program/methods'



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
      ID,
      SKILLSETID,
      TITLE,
      TRAGETGROUP,
      DESCRIPTION,
      REQUEST,
      SUBMIT
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
