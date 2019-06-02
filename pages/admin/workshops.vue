<template>
  <div id="page-workshops">
    <section class="container">
      <div class="column-right">
        <Sheet class="sheet">
          <v-toolbar flat color="white">
            <v-toolbar-title>Upcoming Workshops</v-toolbar-title>
            <v-spacer />
            <v-dialog v-model="dialog" width="800">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">
                  Create Workshop
                </v-btn>
              </template>
              <v-card class="dialog">
                <v-card-title class="dialog-title-card">
                  <h1 class="dialog-title">Workshop Form</h1>
                </v-card-title>
                <v-divider />
                <v-card-text>
                  <v-form>
                    <div>
                      <v-text-field
                        v-model="newWorkshop.title"
                        class="input"
                        label="Title"
                        outline
                        required
                      />
                      <v-select
                        v-model="newWorkshop.programId"
                        label="Program"
                        :items="programs"
                        item-value="id"
                        item-text="title"
                        outline
                      />
                      <v-select
                        v-model="newWorkshop.staffId"
                        :items="staff"
                        item-value="id"
                        item-text="id"
                        label="Staff ID"
                        outline
                      />
                      <v-textarea
                        v-model="newWorkshop.description"
                        class="input"
                        label="Description"
                        outline
                        rows="1"
                        auto-grow
                        box
                        required
                      />
                    </div>
                    <div class="step-buttons">
                      <v-btn color="primary" @click="submitWorkshop">
                        Create Workshop
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-data-table
            class="table-wrapper"
            :headers="headers"
            :items="workshops"
            :search="search"
          >
            <template v-slot:items="props">
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.staffId }}</td>
              <td>{{ props.item.programId }}</td>
              <td>{{ props.item.description }}</td>
            </template>
          </v-data-table>
        </Sheet>
      </div>
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'
import {
  workshopsModule,
  REQUEST,
  WORKSHOPS,
  CREATE
} from '../../store/workshops/methods'
import Sheet from '../../components/Sheet/Sheet'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Program', value: 'programId' },
        { text: 'Staff ID', value: 'skillsetId' },
        { text: 'Description', value: 'description', sortable: false }
      ],
      dialog: false,
      newWorkshop: {
        title: '',
        staffId: null,
        programId: null,
        description: ''
      }
    }
  },
  computed: {
    workshops: {
      get() {
        return this.$store.getters[workshopsModule(WORKSHOPS)]
      }
    }
  },
  mounted() {
    this.$store.dispatch(workshopsModule(REQUEST))
  },
  methods: {
    getSkillsetTitle(skillsetId) {
      let result
      this.skillsets.forEach(skillset => {
        if (skillset.id === skillsetId) {
          result = skillset.title
        }
      })
      return result
    },
    async addWorkshop() {
      console.log(this.newWorkshop)
      await this.$store.dispatch(workshopsModule(CREATE, this.newWorkshop))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#page-consultations {
  .container {
    display: flex;
    .column-left {
      min-width: 290px;
      width: 290px;
      margin-right: 27px;
      .filter-container {
        position: relative;
        .calendar-toggle {
          position: absolute;
          right: 0;
          color: white;
          z-index: 1;
          margin-top: 7px;
          transform: scale(0.8);
        }
        .filters {
          padding: 14px;
        }
        .calendar {
          box-shadow: none;
        }
      }
    }
    .column-right {
      width: 100%;
      .input-spacing {
        @include input-spacing();
        max-width: 300px;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        .header-button {
          margin-right: 30px;
        }
      }
      .table-wrapper {
        a {
          color: $color-secondary;
          padding-right: 25px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
.dialog {
  .dialog-title {
    margin-left: 14px;
    margin-right: 40px;
    color: #ffffff;
  }
  .dialog-title-card {
    background: #ff1818;
  }
  .step-content {
    padding: 0 20px;
  }
  .step-buttons {
    display: flex;
    justify-content: center;
  }
  .stepForm2 {
    display: flex;
    flex-direction: column;
    > div {
      flex: 1;
      display: flex;
    }
    .input {
      width: 340px;
    }
  }
  .step-review {
    padding: 10px;
    border: 1px solid black;
    margin-bottom: 40px;
    > div {
      display: flex;
    }
  }
}
</style>
