<template>
  <form>
    <Sheet class="sheet">
      <h2>Pogram Details</h2>
      <div v-if="program !== null" class="fields">
        <v-layout row wrap>
          <v-flex sm12 md4>
            <v-text-field v-model="program.title" label="Title" outline />
          </v-flex>
          <v-flex sm12 md4>
            <v-text-field
              v-model="program.description"
              label="Description"
              outline
            />
          </v-flex>
          <v-flex sm12 md4>
            <v-text-field
              v-model="program.skillsetId"
              label="Skill-set"
              outline
            />
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
import { ProgramApi } from '../../core/Api'

export default {
  props: {
    id: { type: String, required: true }
  },

  data() {
    return {
      program: null
    }
  },

  async mounted() {
    const response = await ProgramApi.getProgram(this.id)
    this.program = response.data
  },

  methods: {
    async handleSubmit(e) {
      try {
        this.message = ''
        this.errorMessage = ''
        const response = await ProgramApi.updateProgram(this.data.program)
        this.message = 'Program Successfully Updated'
      } catch (e) {
        this.errorMessage = e.toString()
      }
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
