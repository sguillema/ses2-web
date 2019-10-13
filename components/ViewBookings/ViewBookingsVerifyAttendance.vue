<template>
  <div>
    <v-snackbar v-model="snackbar.active" :timeout="3000" top>
      {{ snackbar.message }}
      <v-btn color="primary" flat @click="snackbar.active = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-dialog v-model="state" max-width="500">
      <div id="attendanceKey" class="modal-mask">
        <section class="headings">
          <h2 class="title">Mark Attendance</h2>
        </section>
        <div class="modal-wrapper">
          <v-card class="contents">
            <v-divider class="divider" />
            <div class="modal-container">
              <p>
                The class key only lasts for 15 minutes. Please make sure to be
                on time for you class by arriving 10 minutes prior to your
                booking.
              </p>

              <v-text-field
                v-model="code"
                class="keyinput"
                placeholder="Enter Class Key"
                outline
                single-line
              />
              <v-btn
                color="primary"
                :disabled="loading"
                :loading="loading"
                depressed
                @click="submitCode()"
              >
                Mark
              </v-btn>
            </div>
          </v-card>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    bookingId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      state: this.dialog,
      snackbar: {
        active: false,
        message: ''
      },
      loading: false,
      code: ''
    }
  },
  watch: {
    // React to changes from v-dialog child component and ViewBookings parent component
    dialog() {
      this.state = this.dialog
    },
    state() {
      if (!this.state) {
        this.$emit('toggle-dialog')
      }
    }
  },
  methods: {
    async submitCode() {
      this.loading = true
      try {
        // The code service only needs the bookingId to confirm session as it will perform the session lookup there
        let result = await this.$axios.$get(
          `http://localhost:4000/codes?bookingId=${this.bookingId}&action=verify&code=${this.code}`
        )
        if (result) {
          this.snackbar.active = true
          this.snackbar.message =
            'You are now marked as attending! Refresh to see the update'
          this.state = false
        } else {
          throw new Error("Code doesn't exist")
        }
      } catch {
        this.snackbar.active = true
        this.snackbar.message = 'Sorry, invalid key'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#attendanceKey {
  .title {
    background-color: red;
    color: white;
    width: 500px;
    padding: 22px;
  }

  .subtitle {
    padding: 15px;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  background-color: #f3f3f3;
}

.contents {
  padding: 5px 40px;
  .modal-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.divider {
  padding-block: 5px;
}

.keyinput {
  width: 400px;
}
</style>
