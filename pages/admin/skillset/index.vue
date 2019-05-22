<template>
  <div id="page-skillset">
    <section class="container">
      <Sheet header="Skill-set">
        <div>
          <v-text-field
            v-model="search"
            class="input-spacing"
            append-icon="add"
            placeholder="Add a new Skill-set"
          />
          <v-btn depressed color="primary" @click="addSkillSet">
            Add
          </v-btn>
          <v-btn depressed color="primary" @click="archiveSkillSet">
            Archive
          </v-btn>
          <v-btn depressed color="primary" @click="deleteSkillSet">
            Delete
          </v-btn>
          <v-btn depressed color="primary" @click="viewSkillSet">
            View Archive
          </v-btn>
        </div>

        <v-data-table
          class="table-wrapper"
          :headers="headers"
          :items="skillset"
          :search="search"
        >
          <template v-slot:items="props">
            <td>{{ props.item.no }}</td>
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.skillSet }}</td>
            <td>{{ props.item.shortName }}</td>
            <td>{{ props.item.noWorkshop }}</td>
            <td>
              <router-link :to="`/skillset/${props.item.id}`">Edit</router-link>
              <router-link :to="`/skillset/${props.item.id}`">
                Set Workshop
              </router-link>
            </td>
          </template>
        </v-data-table>
      </Sheet>
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import {
  studentsModule,
  REQUEST,
  STUDENTS
} from '../../../store/students/methods'
import Sheet from '../../../components/Sheet/Sheet'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'admin',
  data() {
    return {
      search: '',
      headers: [
        { text: 'No', value: 'no' },
        { text: 'ID', value: 'id' },
        { text: 'Skill-set', value: 'skillSet' },
        { text: 'Short Title', value: 'shortTitle' },
        { text: 'No. of Workshops', value: 'noWorkshops' }
      ],
      addNew: {
        id: '',
        name: '',
        email: ''
      }
    }
  },
  computed: {
    students: {
      get() {
        return this.$store.getters[studentsModule(STUDENTS)]
      }
    }
  },

  async mounted() {
    await this.$store.dispatch(studentsModule(REQUEST))
  },

  methods: {
    async addStudent() {
      console.log(this.addNew)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.input-spacing {
  margin-left: 30px;
  width: 300px;
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

.add-student-section {
  display: flex;
  flex-direction: column;
  align-items: center;
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
