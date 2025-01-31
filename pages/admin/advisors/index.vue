<template>
  <div id="page-advisors">
    <section class="container">
      <!-- <v-snackbar v-model="snackbar.active" :timeout="3000" top>
        {{ snackbar.message }}
        <v-btn color="primary" flat @click="snackbar.active = false">
          Close
        </v-btn>
      </v-snackbar> -->
      <Sheet header="Available Advisors" alt>
        <div>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              append-icon="search"
              placeholder="Search for Advisor"
            />
          </v-toolbar>
        </div>
        <v-data-table
          class="table-wrapper"
          :headers="headers"
          :items="advisors"
          :search="search"
          :items-per-page="-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>
              <router-link :to="`/admin/advisors/${props.item.id}`">
                Edit
              </router-link>
              <!-- <router-link :to="`/admin/advisors/${props.item.id}/history`">
                View History
              </router-link> -->
            </td>
          </template>
        </v-data-table>
        <section class="add-advisors-section">
          <p>
            To enter more advisors, please enter their details below and click
            ‘Add’.
            <br />
            <strong>Please note:</strong>
            All the fields are compulsory, otherwise that advisor will not be
            added.
          </p>
          <v-layout row wrap>
            <v-flex sm12 md4>
              <v-text-field
                v-model="addNew.id"
                label="Advisor ID"
                class="input-spacing"
                :rules="[addNew.rules.required]"
              />
            </v-flex>
            <v-flex sm12 md4>
              <v-text-field
                v-model="addNew.name"
                label="Name"
                class="input-spacing"
                :rules="[addNew.rules.required]"
              />
            </v-flex>
            <v-flex sm12 md4>
              <v-text-field
                v-model="addNew.email"
                label="Email"
                class="input-spacing"
                :rules="[addNew.rules.required]"
              />
            </v-flex>
          </v-layout>
          <v-btn depressed color="primary" @click="addAdvisor">
            Add
          </v-btn>
        </section>
      </Sheet>
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import {
  advisorsModule,
  REQUEST,
  ADVISORS,
  CREATE
} from '../../../store/advisors/methods'
import Sheet from '../../../components/Sheet/Sheet'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      headers: [
        { text: 'Staff ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: '', value: '' }
      ],
      addNew: {
        id: '',
        name: '',
        email: '',
        rules: {
          required: value => !!value || 'Required.'
        }
      }
    }
  },
  computed: {
    advisors: {
      get() {
        return this.$store.getters[advisorsModule(ADVISORS)]
      }
    }
  },

  async mounted() {
    this.$store.dispatch(advisorsModule(REQUEST))
  },

  methods: {
    async addAdvisor() {
      const { id, name, email } = this.addNew
      if (id !== '' && name !== '' && email !== '') {
        await this.$store.dispatch(advisorsModule(CREATE), this.addNew)
      } else {
        console.log(
          'You must enter an id, fullname and email in order to add an advisor'
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.layout.wrap {
  width: 100%;
}
.input-spacing {
  margin-left: 10px;
  margin-right: 10px;
}
.table-wrapper {
  border-bottom: 2px solid $color-divider;
  margin-bottom: 12px;

  thead {
    background: black;
    tr {
      &:first-child {
        border-bottom: 2px solid $color-divider;
      }
    }
  }
}

.add-advisors-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 14px;
  .inputs {
    display: flex;
  }
  p {
    width: 100%;
  }
}

a {
  color: #0f4beb;
  padding-right: 25px;
  &:hover {
    text-decoration: underline;
  }
}
</style>
