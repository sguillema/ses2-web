<template>
  <div id="edit-consultation">
    <section class="headings">
      <h2 class="title">Edit Consultation Information</h2>
      <h2 class="subtitle">Consultation Session Form</h2>
    </section>
    <v-divider class="divider" />
    <section class="contents">
      <p>
        <b>Please Note:</b>
        When chainging the session form detials you must notify the advisor
        and/or student through email of the change at least 24hr proir to the
        start time.
      </p>

      <div class="left">
        <section class="date">
          <v-text-field label="Date" placeholder="Today's Date" outline />
        </section>
        <section class="room">
          <v-select :items="selectItems" label="Room" outline />
        </section>
        <v-checkbox
          class="studentEmail"
          label="Email Student Consultation Update"
        />
      </div>

      <div class="right">
        <section class="startTime">
          <v-text-field label="Start Time" placeholder="Start Time" outline />
        </section>
        <section class="endTime">
          <v-text-field label="End Time" placeholder="End Time" outline />
        </section>
        <v-checkbox
          class="advisorEmail"
          label="Email Advisor Consultation Update"
        />
      </div>
    </section>
    <center>
      <v-btn depressed color="primary">Update</v-btn>
    </center>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#edit-consultation {
  .title {
    background-color: red;
    color: white;
    width: 780px;
    padding: 22px;
  }

  .subtitle {
    padding: 15px;
  }

  width: 750px;
  align-items: center;
  position: absolute;
}

.contents {
  padding: 5px;
  padding-left: 40px;
}

.divider {
  padding-block: 5px;
}

.date {
  width: 350px;
  margin-top: 10px;
}

.room {
  width: 350px;
  margin-top: -20px;
}

.startTime {
  width: 350px;
  margin-top: 20px;
}

.endTime {
  width: 350px;
  margin-top: -20px;
}

.left {
  float: left;
}

.right {
  margin-top: -10px;
  float: right;
}

.studentEmail {
  margin-top: -20px;
  padding-left: 20px;
}
.advisorEmail {
  margin-top: -20px;
  padding-left: 20px;
}

.update {
  align-self: auto;
  padding-block-start: 100px;
  position: center;
}
</style>
}
