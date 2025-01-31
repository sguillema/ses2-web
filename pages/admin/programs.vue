<template>
  <div id="page-programs">
    <section class="container">
      <div class="column-left">
        <v-dialog v-model="dialog" width="800">
          <template v-slot:activator="{ on }">
            <v-btn class="header-button" color="primary" depressed v-on="on">
              <v-icon class="header-button-icon">add</v-icon>
            </v-btn>
          </template>
          <v-card class="dialog">
            <v-card-title class="dialog-title-card">
              <h1 class="dialog-title">Create Program Information</h1>
            </v-card-title>
            <v-card-title class="dialog-title-card2">
              <h1 class="dialog-title2">Program Details Form</h1>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-form>
                <div>
                  <v-text-field
                    v-model="newProgram.title"
                    class="input"
                    label="Title"
                    outline
                    :rules="[newProgram.rules.required]"
                  />
                  <v-select
                    v-model="newProgram.skillsetId"
                    label="Skillset"
                    :items="skillsets"
                    item-value="id"
                    item-text="title"
                    outline
                    :rules="[newProgram.rules.required]"
                  />
                  <v-select
                    v-model="newProgram.targetGroup"
                    :items="targetGroups"
                    item-value="value"
                    item-text="text"
                    label="Target Group"
                    outline
                    :rules="[newProgram.rules.required]"
                  />
                  <v-textarea
                    id="programDescription"
                    v-model="newProgram.description"
                    class="input"
                    label="Description"
                    outline
                    rows="1"
                    auto-grow
                    box
                    :rules="[newProgram.rules.required]"
                  />
                </div>
                <div class="step-buttons">
                  <v-btn color="primary" depressed @click="addProgram">
                    Create Program
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <div class="column-right">
        <Sheet class="sheet" header=" Upcoming Programs" alt>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              class="input-spacing"
              append-icon="search"
              placeholder="Search for Program"
            />
          </v-toolbar>
          <v-data-table
            class="table-wrapper"
            :headers="headers"
            :items="programs"
            :search="search"
          >
            <template v-slot:items="props">
              <td>{{ props.item.title }}</td>
              <td>
                {{ getSkillsetTitle(props.item.skillsetId) }}
              </td>
              <td>{{ setTargetGroup(props.item.targetGroup) }}</td>
              <td>{{ props.item.description }}</td>
              <td>
                <v-dialog v-model="editDialog[props.item.id]" width="800">
                  <template v-slot:activator="{ on }">
                    <v-icon small v-on="on">
                      edit
                    </v-icon>
                  </template>
                  <v-card class="dialog">
                    <v-card-title class="dialog-title-card">
                      <h1 class="dialog-title">Edit Program</h1>
                    </v-card-title>
                    <v-divider />
                    <v-card-text>
                      <v-form>
                        <v-text-field
                          v-model="props.item.title"
                          class="input"
                          label="Title"
                          outline
                        />
                        <v-select
                          v-model="props.item.skillsetId"
                          label="Skillset"
                          :items="skillsets"
                          item-value="id"
                          item-text="title"
                          outline
                        />
                        <v-select
                          v-model="props.item.targetGroup"
                          :items="targetGroups"
                          item-value="value"
                          item-text="text"
                          label="Target Group"
                          outline
                        />
                        <v-textarea
                          id="programDescription"
                          v-model="props.item.description"
                          class="input"
                          label="Description"
                          outline
                          rows="2"
                          auto-grow
                          box
                        />
                        <div class="step-buttons">
                          <v-btn
                            color="primary"
                            depressed
                            @click="updateProgram(props.item)"
                          >
                            Edit Program
                          </v-btn>
                        </div>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-dialog>
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
import Sheet from '../../components/Sheet/Sheet'
import { ProgramApi, SkillsetApi } from '../../core/Api'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Skillset', value: 'skillsetId' },
        { text: 'Target Group', value: 'targetGroup', sortable: false },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      targetGroups: [
        {
          text: 'All Students',
          value: 'all'
        },
        {
          text: 'Undergraduate Student',
          value: 'undergraduate'
        },
        {
          text: 'Postgraduate Student',
          value: 'postgraduate'
        }
      ],
      programsLoading: false,
      dialog: false,
      editDialog: {},
      skillsets: [],
      newProgram: {
        title: '',
        skillsetId: null,
        targetGroup: '',
        description: '',
        rules: {
          required: value => !!value || 'Required.'
        }
      }
    }
  },
  async mounted() {
    this.programs = (await ProgramApi.getPrograms()).data
    this.skillsets = (await SkillsetApi.getSkillsets()).data
  },
  methods: {
    async addProgram() {
      if (
        this.newProgram.title === '' ||
        this.newProgram.skillsetsId === null ||
        this.newProgram.targetGroup === '' ||
        this.newProgram.description === ''
      ) {
        return false
      }
      await ProgramApi.createProgram(this.newProgram)
      this.dialog = false
      this.newProgram = {
        title: '',
        skillsetId: null,
        targetGroup: '',
        description: '',
        rules: {
          required: value => !!value || 'Required.'
        }
      }
      this.programs = (await ProgramApi.getPrograms()).data
    },
    async updateProgram(program) {
      await ProgramApi.updateProgram(program)
      this.editDialog[program.id] = false
      this.programs = (await ProgramApi.getPrograms()).data
    },
    setTargetGroup(targetGroup) {
      if (targetGroup === 'all') return 'All Students'
      else if (targetGroup === 'undergraduate') return 'Undergraduate Students'
      else if (targetGroup === 'postgraduate') return 'Postgraduate Students'
    },
    getSkillsetTitle(skillsetId) {
      let result
      this.skillsets.forEach(skillset => {
        if (skillset.id === skillsetId) {
          result = skillset.title
        }
      })
      return result
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
