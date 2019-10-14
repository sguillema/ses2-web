<template>
  <div id="page-skillset">
    <v-snackbar v-model="snackbar.active" :timeout="2000" top>
      {{ snackbar.message }}
    </v-snackbar>
    <section class="container">
      <div class="column-left">
        <v-dialog v-model="dialogAdd" width="800">
          <template v-slot:activator="{ on }">
            <v-btn class="header-button" color="primary" depressed v-on="on">
              <v-icon class="header-button-icon">add</v-icon>
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
                  <v-btn depressed color="primary" @click="addSkillset">
                    Create Skillset
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-btn
          class="header-button"
          color="secondary"
          depressed
          @click="toggleArchive"
        >
          <v-icon v-if="!isArchive" class="header-button-icon">
            archive
          </v-icon>
          <v-icon v-else class="header-button-icon">
            unarchive
          </v-icon>
        </v-btn>
      </div>
      <div class="column-right">
        <Sheet
          :header="isArchive ? 'Archived Skill-sets' : 'Active Skill-sets'"
          alt
        >
          <div>
            <v-toolbar flat color="white">
              <v-text-field
                v-model="search"
                append-icon="search"
                placeholder="Search for Skillsets"
              />
            </v-toolbar>
          </div>

          <v-data-table
            :headers="headers"
            :items="skillsets"
            :search="search"
            item-key="name"
          >
            <template v-slot:items="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.shortTitle }}</td>
              <td>
                <v-dialog v-model="dialogEdit[props.item.id]" width="800">
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on" @click="setEditItem(props.item)">
                      edit
                    </v-icon>
                  </template>
                  <v-card class="dialog">
                    <v-card-title class="dialog-title-card">
                      <h1 class="dialog-title">Edit Skillset</h1>
                    </v-card-title>
                    <v-card-title class="dialog-title-card2">
                      <h1 class="dialog-title2">Skillset Details Form</h1>
                    </v-card-title>
                    <v-divider />
                    <v-form ef="form" lazy-validation>
                      <div class="form">
                        <v-text-field
                          v-model="editNew.title"
                          class="input"
                          label="Title"
                          outline
                        />
                        <v-text-field
                          v-model="editNew.shortTitle"
                          class="input"
                          label="Short Title"
                          outline
                        />
                      </div>
                    </v-form>
                    <v-card-text>
                      <v-card-actions class="step-buttons">
                        <v-btn
                          depressed
                          color="primary"
                          @click="updateSkillset(editNew)"
                        >
                          Update Skillset
                        </v-btn>
                      </v-card-actions>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <v-icon
                  v-if="!isArchive"
                  small
                  @click="archiveSkillset(props.item)"
                >
                  delete
                </v-icon>
                <v-icon
                  v-if="isArchive"
                  small
                  @click="unAarchiveSkillset(props.item)"
                >
                  add
                </v-icon>
              </td>
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
  skillsetsModule,
  REQUEST,
  SKILLSETS,
  ADD_SKILLSET,
  REMOVE_SKILLSET,
  ARCHIVE,
  UNARCHIVE,
  EDIT_SKILLSETS
} from '../../store/skillsets/methods'
import Sheet from '../../components/Sheet/Sheet'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      isArchive: false,
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Skill-set', value: 'title' },
        { text: 'Short Title', value: 'shortTitle' },
        { text: 'Actions', value: 'actions' }
      ],
      valid: true,

      addNew: {
        title: '',
        shortTitle: '',
        rules: {
          required: value => !!value || 'Required.'
        }
      },
      editNew: {
        title: '',
        shortTitle: '',
        skillsetId: ''
      },

      dialogAdd: false,
      dialogEdit: {},
      snackbar: {
        active: false,
        message: ''
      }
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
    this.fetchSkillsets()
    //call programs programs?skillsetId= whatever
    //call workshop for each program within the same skillsetworkshop?programId = whatever
  },

  methods: {
    async addSkillset() {
      let { title, shortTitle } = this.addNew
      if (title !== '' && shortTitle !== '') {
        await this.$store.dispatch(skillsetsModule(ADD_SKILLSET), this.addNew)

        this.addNew.title = ''
        this.addNew.shortTitle = ''
        this.dialogAdd = false
      } else {
        console.log(
          'You must enter a title and short title in order to add a skillset'
        )
      }
    },
    fetchSkillsets() {
      if (this.isArchive) {
        this.fetchArchivedSkillsets()
      } else {
        this.fetchUnarchivedSkillsets()
      }
    },
    async fetchUnarchivedSkillsets() {
      this.$store.dispatch(skillsetsModule(REQUEST), {
        hideArchived: true
      })
    },
    async fetchArchivedSkillsets() {
      this.$store.dispatch(skillsetsModule(REQUEST), {
        showArchive: true
      })
    },
    setEditItem(item) {
      console.log(item)
      this.editNew = { ...item }
    },
    async updateSkillset(skill) {
      await this.$store.dispatch(skillsetsModule(EDIT_SKILLSETS), skill)
      this.dialogEdit[skill.id] = false
      this.fetchSkillsets()
    },
    async archiveSkillset(skill) {
      this.dialog2 = false
      await this.$store.dispatch(skillsetsModule(ARCHIVE), skill.id)
      this.snackbar.active = true
      this.snackbar.message = 'Skillset(s) Successfully Deleted!'
    },
    async unAarchiveSkillset(skill) {
      this.dialog2 = false
      await this.$store.dispatch(skillsetsModule(UNARCHIVE), skill.id)
      this.snackbar.active = true
      this.snackbar.message = 'Skillset(s) Successfully Unarchived!'
    },
    toggleArchive() {
      this.isArchive = !this.isArchive
      this.fetchSkillsets()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.calendar-button,
.header-button {
  min-width: unset;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 15px;
  margin-top: 0;
  width: 100%;
  height: 80px;
  color: $color-white;
  .calendar-button-icon {
    font-size: 60px;
  }
}
.header-button {
  background: $color-red2;
  .header-button-icon {
    font-size: 60px;
  }
}
.calendar-button {
  background: $color-black;
}

.container {
  display: flex;
  .column-left {
    width: 80px;
    min-width: 80px;
    margin-right: 27px;
  }
  .column-right {
    width: 100%;
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
