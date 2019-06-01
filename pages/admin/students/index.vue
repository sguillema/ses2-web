<template>
  <div id="page-students">
    <section class="container">
      <Sheet header="Registered Students">
        <v-text-field
          v-model="search"
          class="input-spacing"
          append-icon="search"
          placeholder="Search"
        />
        <v-data-table
          class="table-wrapper"
          :headers="headers"
          :items="students"
          :search="search"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>
              <router-link :to="`students/${props.item.id}`">
                Edit
              </router-link>
              <router-link :to="`students/${props.item.id}/history`">
                View History
              </router-link>
            </td>
          </template>
        </v-data-table>
        <!-- <section class="add-student-section">
          <p>
            To enter more students, please enter their details below and click
            ‘Add’.
            <br />
            <strong>Please note:</strong>
            All the fields are compulsory, otherwise that student will not be
            added.
          </p>
          <div class="inputs">
            <v-text-field
              v-model="addNew.id"
              label="Student ID"
              class="input-spacing"
            />
            <v-text-field
              v-model="addNew.name"
              label="Name"
              class="input-spacing"
            />
            <v-text-field
              v-model="addNew.email"
              label="Email"
              class="input-spacing"
            />
          </div>
          <v-btn depressed color="primary" @click="addStudent">
            Add
          </v-btn>
        </section> -->
      </Sheet>
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import {
  studentsModule,
  REQUEST,
  STUDENTS,
  CREATE
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
        { text: 'StudentID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: '', value: '' }
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

  mounted() {
    this.$store.dispatch(studentsModule(REQUEST))
  },

  methods: {
    async addStudent() {
      console.log(this.addNew)
      await this.$store.dispatch(studentsModule(CREATE, this.addNew))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.input-spacing {
  @include input-spacing();
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
