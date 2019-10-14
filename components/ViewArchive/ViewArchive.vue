<template>
  <div id="page-viewarchive">
    <section class="container">
      <Sheet header="All Archived Skill-sets" alt>
        <v-text-field
          v-model="search"
          class="input-spacing"
          append-icon="search"
          placeholder="Search sessions"
        />
        <v-snackbar v-model="snackbar.active" :timeout="2000" top>
          {{ snackbar.message }}
        </v-snackbar>

        <v-data-table
          :headers="headers"
          :items="skillsets"
          :search="search"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.shortTitle }}</td>
            <td>{{ props.item.noWorkshop }}</td>
            <td>
              <v-dialog v-model="dialog2" max-width="290">
                <template v-slot:activator="{ on }">
                  <v-btn small depressed class="mb-2" v-on="on">
                    Unarchive
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">
                    Are you sure you want to unarchive this skillset?
                  </v-card-title>
                  <v-card-text>
                    Yes will activate the skillset.
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#ff0000" flat @click="dialog2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      color="#ff0000"
                      flat
                      @click="unAarchiveSkillset(props.item)"
                    >
                      Yes
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
import Sheet from '../../components/Sheet/Sheet'
import {
  skillsetsModule,
  REQUEST,
  SKILLSETS,
  ADD_SKILLSET,
  ARCHIVE,
  DELETE,
  UNARCHIVE
} from '../../store/skillsets/methods'

export default {
  components: { Sheet },

  layout: 'admin',

  data() {
    return {
      snackbar: {
        active: false,
        message: ''
      },

      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Skill-set', value: 'title' },
        { text: 'Short Title', value: 'shortTitle' },
        { text: '#', value: 'noWorkshops' },
        { text: 'Actions', value: 'actions' }
      ],

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
  asyncData() {
    //GET request to get all skillsts
  },

  mounted() {
    this.$store.dispatch(skillsetsModule(REQUEST), {
      showArchive: true,

      hideArchive: false
    })
  },

  methods: {
    async unAarchiveSkillset(skill) {
      console.log(skill.id)
      this.dialog2 = false

      await this.$store.dispatch(skillsetsModule(UNARCHIVE), skill.id)
      this.snackbar.active = true
      this.snackbar.message = 'Skillset(s) Successfully Unarchived!'
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
      margin-left: 20px;
      margin-right: 20px;
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
