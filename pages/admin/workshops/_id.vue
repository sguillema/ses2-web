<template>
  <div id="page-workshops">
    <section class="container">
      <h1>workshops {{ this.$route.params.id }}</h1>
      <Sheet class="sheet" header="Workshop Session Details">
        <label>Topic:</label>
        <br />
        <label>Target Audience:</label>
        <br />
        <label>Description:</label>
        <br />
        <label>Cut-off:</label>
        <br />
        <label>Maximum:</label>
        <br />
        <label>When:</label>
        <br />
        <label>Room:</label>
        <br />
        <v-btn color="primary" depressed:disabled>
          Edit
        </v-btn>
        <v-btn text depressed @click="stepCount = 1">
          Cancel
        </v-btn>
      </Sheet>
      <Sheet class="sheet" header="Student list">
        <v-container>
          <v-row justify="center">
            <h2>Add Student to the Attendence List</h2>
          </v-row>
        </v-container>
        <br />
        <v-text-field
          v-model="studentList"
          label="Enter Student ID/Name"
          type="number"
          outline
        />

        <v-btn block color="primary" depressed:disabled>
          Add
        </v-btn>
        <v-data-table
          :headers="headers"
          :items="workshopsItems"
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
              <v-btn block color="primary">
                delete
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </Sheet>
    </section>
  </div>
</template>

<script>
import { adminAuthenticated } from '../../../middleware/authenticatedRoutes'
import Sheet from '../../../components/Sheet/Sheet'

export default {
  middleware: adminAuthenticated,
  layout: 'admin',
  components: { Sheet },

  data() {
    return {
      search: '',
      headers: [
        { text: 'Attendence', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Short Title', value: 'shortTitle' },
        { text: 'No. of Workshops', value: 'noWorkshops' },
        { text: 'Actions', value: 'actions' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
</style>
