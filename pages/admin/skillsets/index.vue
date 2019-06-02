<template>
  <div id="page-skillset">
    <section class="container">
      <Sheet header="Skill-set">
        <div>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              class="input-spacing"
              append-icon="search"
              placeholder="Search for Skillsets"
            />
            <v-spacer />
            <v-dialog v-model="dialog" width="800">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">
                  Create Skillset
                </v-btn>
              </template>
              <v-card class="dialog">
                <v-card-title class="dialog-title-card">
                  <h1 class="dialog-title">Create Skillset Information</h1>
                </v-card-title>
                <v-card-title class="dialog-title-card2">
                  <h1 class="dialog-title2">Skillset Details Form</h1>
                </v-card-title>
                <v-divider />
                <v-form v-model="valid" ef="form" lazy-validation>
                  <div class="form">
                    <v-text-field
                      v-model="addNew.title"
                      class="input"
                      label="Title"
                      outline
                      :rules="[addNew.rules.required]"
                    />
                    <v-text-field
                      v-model="addNew.shortTitle"
                      :rules="[addNew.rules.required]"
                      label="Short Title"
                      class="input"
                      outline
                    />
                  </div>
                </v-form>
                <v-card-text>
                  <v-form>
                    <div class="step-buttons">
                      <v-btn color="primary" @click="addSkillset">
                        Create Skillset
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </div>

        <v-data-table
          :headers="headers"
          :items="skillsets"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.shortTitle }}</td>
            <td>{{ props.item.noWorkshop }}</td>
            <td>
              <router-link :to="`/skillsets/${props.item.id}`">
                <v-icon small @click="editItem(props.item)">
                  edit
                </v-icon>
              </router-link>
              <!-- <v-dialog v-model="dialog2" max-width="290">
                <template v-slot:activator="{ on }">
                  <v-icon small @click="archiveSkillset(props.item)">
                    delete
                  </v-icon>
                </template>
                <v-card>wow</v-card>
              </v-dialog> -->
              <v-dialog v-model="dialog2" max-width="290">
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on">
                    delete
                  </v-icon>
                </template>
                <v-card>
                  <v-card-title class="headline">
                    Are you sure you want to archive this skillset?
                  </v-card-title>
                  <v-card-text>
                    Agree will archive the skillset.
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#ff0000" flat @click="dialog2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      color="#ff0000"
                      flat
                      @click="archiveSkillset(props.item)"
                    >
                      Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
          </template>
        </v-data-table>
      </Sheet>
    </section>
  </div>
</template>

<script>
//skill store
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import {
  skillsetsModule,
  REQUEST,
  SKILLSETS,
  ADD_SKILLSET,
  REMOVE_SKILLSET,
  ARCHIVE
} from '../../../store/skillsets/methods'
import Sheet from '../../../components/Sheet/Sheet'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Short Title', value: 'shortTitle' },
        { text: 'No. of Workshops', value: 'noWorkshops' }
      ],
      addNew: {
        title: '',
        shortTitle: '',
        rules: {
          required: value => !!value || 'Required.'
        }
      },
      dialog: false,
      dialog2: false
    }
  },
  computed: {
    skillsets: {
      get() {
        return this.$store.getters[skillsetsModule(SKILLSETS)]
      }
    }
  },

  mounted() {
    this.$store.dispatch(skillsetsModule(REQUEST))
  },

  methods: {
    async addSkillset() {
      let { title, shortTitle } = this.addNew
      if (title !== '' && shortTitle !== '') {
        await this.$store.dispatch(skillsetsModule(ADD_SKILLSET), this.addNew)
        this.addNew.title = ''
        this.addNew.shortTitle = ''
        this.dialog = false
      } else {
        console.log(
          'You must enter a title and short title in order to add a skillset'
        )
      }
    },
    async archiveSkillset(skill) {
      console.log(skill.id)
      this.dialog2 = false
      await this.$store.dispatch(skillsetsModule(ARCHIVE), skill.id)
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
.form {
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 25px;
}
.dialog {
  .dialog-title {
    margin: 0;
    padding-left: 25px;
    color: #ffffff;
    font-size: 20px;
  }
  .dialog-title2 {
    margin: 0;
    padding-left: 25px;
    font-size: 20px;
  }
  .dialog-title-card {
    background: #ff1818;
    height: 70px;
  }
  .dialog-title-card2 {
    background: #ffffff;
    height: 70px;
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
