<template>
  <div id="page-students">
    <section class="container">
      <Sheet header="Registered Students">
        <v-text-field
          v-model="search"
          class="searchBar"
          append-icon="search"
          placeholder="Search"
        />
        <v-data-table :headers="headers" :items="students" :search="search">
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>
              <router-link :to="`/students/${props.item.id}`">Edit</router-link>
              <router-link :to="`/students/${props.item.id}/history`">
                View History
              </router-link>
            </td>
          </template>
        </v-data-table>
        <p>
          To enter more students, please enter their details below and click
          ‘Add’.
          <br />
          <strong>Please note:</strong>
          All the fields are compulsory, otherwise that student will not be
          added.
        </p>
      </Sheet>
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../middleware/authenticatedRoutes'
import { studentsModule, REQUEST, STUDENTS } from '../../store/students/methods'
import Sheet from '../../components/Sheet/Sheet'

export default {
  components: { Sheet },
  middleware: adminAuthenticated,
  layout: 'application',
  data() {
    return {
      search: '',
      headers: [
        { text: 'StudentID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: '', value: '' }
      ]
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
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.searchBar {
  margin-left: 30px;
  width: 300px;
}

strong {
  font-weight: 600;
}

a {
  color: #0f4beb;
  padding-right: 25px;
  &:hover {
    text-decoration: underline;
  }
}

.theme--light.v-table tbody tr:not(:last-child) {
  border: none;
}

tbody {
  tr {
    border: none;
  }
}
</style>
