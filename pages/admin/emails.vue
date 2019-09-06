<template>
  <div id="page-emails">
    <section class="container">
      <Sheet class="sheet" header="Select Email Template">
        <div class="sheet-content">
          <v-select
            :items="emails"
            return-object
            item-text="title"
            item-value="id"
            label="Email"
            class="email-select"
            :value="selectedEmail"
            @change="selectEmail"
          />
        </div>
      </Sheet>
      <Sheet class="sheet" header="Message Editor">
        <div class="sheet-content">
          <div v-if="!selectedEmail" class="none-selected-message">
            Please select an email template to edit.
          </div>
          <div v-else>
            <h3>{{ selectedEmail.title }}</h3>
            <Editor
              v-model="selectedEmail.template"
              :field-data="placeholders.consultation"
            />
            <div class="options">
              <div class="last-action-date">
                {{
                  moment(selectedEmail.lastUpdatedDate).format(
                    '[Last updated on] DD MMMM YYYY [at] h:mm:ss a'
                  )
                }}
              </div>
              <div class="buttons">
                <v-btn depressed @click="handleUpdateClick">Update</v-btn>
                <v-btn depressed @click="handleTestEmailClick">
                  Send Test Email
                </v-btn>
                <v-btn class="primary" depressed @click="handlePublishClick">
                  Publish
                </v-btn>
              </div>
            </div>
            <hr />
            <section class="instructions">
              <h4>Instructions</h4>
              <ul>
                <li>
                  <strong>Update Button</strong>
                  changes content of the email for preview/testing purposes.
                  Will not affect the current live email(s).
                </li>
                <li>
                  <strong>Send Test Email Button</strong>
                  sends the user an email with the updated content (with random
                  values from the database) for testing purposes. The email is
                  sent to the UTS account of the administrator who is currently
                  logged into the system.
                </li>
                <li>
                  <strong>Publish Button</strong>
                  publishes the updated content to the live system and replaces
                  the live email(s) with the new version.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </Sheet>
      <v-snackbar v-model="snackbar.active" top color="blue" timeout="3000">
        {{ snackbar.text }}
        <v-btn class="v-btn--flat b-btn--text" @click="snackbar.active = false">
          Close
        </v-btn>
      </v-snackbar>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { adminAuthenticated } from '~/middleware/authenticatedRoutes'
import Sheet from '~/components/Sheet/Sheet'
import Editor from '~/components/Editor/Editor'
import {
  REQUEST,
  EMAILS,
  UPDATE,
  PUBLISH,
  emailsModule
} from '../../store/emails/methods'

export default {
  components: { Sheet, Editor },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      selectedEmail: '',
      snackbar: {
        active: false,
        text: ''
      },
      placeholders: {
        consultation: [
          { text: 'Student Given Name', value: 'student_firstName' },
          { text: 'Student Surname', value: 'student_lastName' },
          { text: 'Date and Time', value: 'booking_dateTime' },
          { text: 'Date', value: 'booking_date' },
          { text: 'Start Time', value: 'booking_startTime' },
          { text: 'End Time', value: 'booking_endTime' },
          { text: 'Room', value: 'booking_room' },
          { text: 'Advisor Given Name', value: 'advisor_firstName' },
          { text: 'Advisor Surname', value: 'advisor_lastName' },
          { text: 'Advisor Email', value: 'advisor_email' }
        ]
      }
    }
  },
  computed: {
    emails: {
      get() {
        return this.$store.getters[emailsModule(EMAILS)]
      }
    }
  },
  watch: {
    emails(val) {
      if (this.selectedEmail) {
        const email = this.emails.find(
          email => email.id === this.selectedEmail.id
        )
        if (email !== undefined) this.selectEmail(email)
      }
    }
  },
  mounted() {
    this.$store.dispatch(emailsModule(REQUEST))
  },
  methods: {
    moment,
    selectEmail(email) {
      this.selectedEmail = { ...email }
    },
    async handleUpdateClick() {
      await this.$store.dispatch(emailsModule(UPDATE), this.selectedEmail)
      this.snackbar = {
        active: true,
        text: 'Template Updated Successfully!'
      }
    },
    async handleTestEmailClick() {
      console.log('test email')
    },
    async handlePublishClick() {
      await this.$store.dispatch(emailsModule(PUBLISH), this.selectedEmail.id)
      this.snackbar = {
        active: true,
        text: 'Published Successfully!'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

section.container {
  & > *:not(:last-child) {
    margin-bottom: 30px;
  }
}

.email-select {
  max-width: 500px;
  margin-left: 30px;
}

.none-selected-message {
  color: $color-darkgray;
  margin-left: 15px;
}

h3 {
  text-align: center;
  font-size: 14px;
}

.editor {
  margin: 20px 0 10px;
}

.options {
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .last-action-date {
    margin-right: 10px;
  }
}

.instructions {
  margin-top: 20px;
  line-height: 25px;
  h4,
  li strong {
    &::after {
      content: ':';
    }
  }
  ul {
    padding-left: 40px;
  }
}
</style>
