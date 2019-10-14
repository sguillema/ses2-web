<template>
  <div id="page-messages">
    <section class="container">
      <Sheet class="sheet" header="Select Message Template">
        <div class="sheet-content">
          <v-select
            :items="messages"
            return-object
            item-text="title"
            item-value="id"
            label="Messages"
            class="message-select"
            :value="selectedMessage"
            @change="selectMessage"
          />
        </div>
      </Sheet>
      <Sheet class="sheet" header="Message Editor">
        <div class="sheet-content">
          <div v-if="!selectedMessage" class="none-selected-message">
            Please select an Message template to edit.
          </div>
          <div v-else>
            <h3>{{ selectedMessage.title }}</h3>
            <Editor v-model="selectedMessage.template" />
            <div class="options">
              <div class="last-action-date">
                {{
                  moment(selectedMessage.lastUpdatedDate).format(
                    '[Last updated on] DD MMMM YYYY [at] h:mm:ss a'
                  )
                }}
              </div>
              <div class="buttons">
                <v-btn depressed @click="handleUpdateClick">Update</v-btn>
                <v-btn class="primary" depressed @click="handlePublishClick">
                  Publish
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </Sheet>
      <v-snackbar v-model="snackbar.active" top color="blue" :timeout="3000">
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
import { MessagesApi } from '../../core/Api'
import {
  REQUEST,
  MESSAGES,
  UPDATE,
  PUBLISH,
  messagesModule
} from '../../store/messages/methods'
import Sheet from '~/components/Sheet/Sheet'
import Editor from '~/components/Editor/Editor'
import { adminAuthenticated } from '~/middleware/authenticatedRoutes'

export default {
  components: { Sheet, Editor },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      selectedMessage: '',
      snackbar: {
        active: false,
        text: ''
      }
    }
  },
  computed: {
    messages: {
      get() {
        return this.$store.getters[messagesModule(MESSAGES)]
      }
    }
  },
  watch: {
    messages(val) {
      if (this.message) {
        const message = this.messages.find(
          message => message.id === this.message.id
        )
        if (message !== undefined) this.selectMessage(message)
      }
    }
  },
  mounted() {
    this.$store.dispatch(messagesModule(REQUEST))
  },
  methods: {
    moment,
    async selectMessage(message) {
      this.selectedMessage = { ...message }
    },
    async handleUpdateClick() {
      await this.$store.dispatch(messagesModule(UPDATE), this.selectedMessage)
      this.snackbar = {
        active: true,
        text: 'Template Updated Successfully!'
      }
    },
    async handlePublishClick() {
      await this.$store.dispatch(
        messagesModule(PUBLISH),
        this.selectedMessage.id
      )
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

.message-select {
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
</style>
