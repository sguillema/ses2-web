<template>
  <v-dialog v-model="state" persistent max-width="290">
    <div id="attendanceKey" class="modal-mask">
      <section class="headings">
        <h2 class="title">Mark Attendance</h2>
      </section>
      <div class="modal-wrapper">
        <v-card class="contents">
          <v-divider class="divider" />
          <div class="modal-container">
            <p>
              The class key only lasts for 15 minutes. Please make sure to be on
              time for you class by arriving 10 minutes prior to your booking.
            </p>

            <v-text-field
              class="keyinput"
              label=""
              placeholder="Enter Class Key"
              outline
            />
            <center>
              <v-btn color="primary" @click="showModal = false">
                Mark
              </v-btn>
            </center>
          </div>
        </v-card>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  props: {
    state: Boolean
  },
  data() {
    return {
      dialog: false
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

  width: 500px;
  align-items: center;
  position: absolute;
  vertical-align: middle;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -9em; /*set to a negative number 1/2 of your height*/
  margin-left: -15em; /*set to a negative number 1/2 of your width*/
  border: 1px solid #ccc;
  background-color: #f3f3f3;
}

.contents {
  padding: 5px;
  padding-left: 40px;
}

.divider {
  padding-block: 5px;
}

.keyinput {
  width: 400px;
}
</style>
