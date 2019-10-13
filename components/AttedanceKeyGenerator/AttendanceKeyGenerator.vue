<template>
  <div>
    <v-snackbar v-model="snackbar.active" :timeout="3000" top>
      {{ snackbar.message }}
      <v-btn color="primary" flat @click="snackbar.active = false">
        Close
      </v-btn>
    </v-snackbar>
    <Sheet :header="attendanceHeading" color="red" alt centered>
      <div>
        <h3>Generate Attendance Key</h3>
        <v-text-field
          v-model="code"
          label="Session key"
          placeholder="Waiting to generate key..."
          outline
          disabled
        />
        <v-btn
          color="primary"
          block
          depressed
          :disabled="codeExists"
          @click="generateKey"
        >
          Generate
        </v-btn>
      </div>
    </Sheet>
  </div>
</template>

<script>
import Sheet from '../Sheet/Sheet'

export default {
  components: { Sheet },
  data() {
    return {
      attendanceHeading: 'Attendance',
      code: '',
      codeExists: true, // we assume code exists until server response
      snackbar: {
        active: false,
        message: ''
      }
    }
  },
  async mounted() {
    try {
      let result = await this.$axios.$get(
        `http://localhost:4000/codes?sessionId=${
          this.$route.params.id
        }&action=get`
      )
      if (result) {
        this.code = result
        this.codeExists = true
      } else {
        throw new Error("Code doesn't exist")
      }
    } catch {
      this.code = ''
      this.codeExists = false
    }
  },
  methods: {
    async generateKey() {
      try {
        const result = await this.$axios.$post(`http://localhost:4000/codes`, {
          sessionId: this.$route.params.id
        })
        this.code = result.code
        this.codeExists = true
        this.snackbar.active = true
        this.snackbar.message = 'Generated attendance key.'
      } catch {
        this.code = ''
        this.codeExists = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
