<template>
  <div id="page-consultations">
    <section class="container">
      <div class="column-right">
        <Sheet class="sheet">
          <v-toolbar flat color="white">
            <v-toolbar-title>Upcoming Programs</v-toolbar-title>
            <v-spacer />
            <v-dialog v-model="dialog" width="800">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">
                  Create Program
                </v-btn>
              </template>
              <v-card class="dialog">
                <v-card-title class="dialog-title-card">
                  <h1 class="dialog-title">Program Form</h1>
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
                        required
                      />
                      <v-select
                        v-model="newProgram.skillsetId"
                        label="Skillset"
                        :items="skillsets"
                        item-value="id"
                        item-text="title"
                        outline
                        required
                      />
                      <v-select
                        v-model="newProgram.targetGroup"
                        :items="targetGroups"
                        item-value="value"
                        item-text="text"
                        label="Target Group"
                        outline
                        required
                      />
                      <v-textarea
                        v-model="newProgram.description"
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
                      <v-btn color="primary" @click="addProgram">
                        Create Program
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
            :items="programs"
            :search="search"
          >
            <template v-slot:items="props">
              <td>{{ props.item.title }}</td>
              <td>
                {{ props.item.skillsetId }}
              </td>
              <td>{{ setTargetGroup(props.item.targetGroup) }}</td>
              <td>{{ props.item.description }}</td>
            </template>
          </v-data-table>
        </Sheet>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'
import {
  programsModule,
  REQUEST,
  PROGRAMS,
  CREATE
} from '../../store/programs/methods'
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
        { text: 'Skillset', value: 'skillsetId' },
        { text: 'Target Group', value: 'targetGroup', sortable: false },
        { text: 'Description', value: 'description', sortable: false }
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
      newProgram: {
        title: '',
        skillsetId: null,
        targetGroup: '',
        description: ''
      }
    }
  },
  computed: {
    programs: {
      get() {
        return this.$store.getters[programsModule(PROGRAMS)]
      }
    }
  },
  mounted() {
    this.$store.dispatch(programsModule(REQUEST))
  },
  methods: {
    async addProgram() {
      console.log(this.newProgram)
      await this.$store.dispatch(programsModule(CREATE, this.newProgram))
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
