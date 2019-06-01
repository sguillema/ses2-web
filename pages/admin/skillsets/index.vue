<template>
  <div id="page-skillset">
    <section class="container">
      <Sheet header="Skill-set">
        <div>
          <v-text-field
            v-model="search"
            class="input-spacing"
            append-icon="search"
            placeholder="Search for skill-set"
          />
          <!--
            <v-btn depressed color="primary" @click="archiveSkillset">
            Archive
          </v-btn>
          <v-btn depressed color="primary" @click="viewOldSkillset">
            View Archive
          </v-btn>
          -->
        </div>

        <v-data-table
          class="table-wrapper"
          :headers="headers"
          :items="skillsets"
          :search="search"
        >
          <template v-slot:items="props">
            <td>{{ props.item.no }}</td>
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.shortTitle }}</td>
            <td>{{ props.item.noWorkshop }}</td>
            <td>
              <router-link :to="`/skillset/${props.item.id}`">Edit</router-link>
            </td>
          </template>
        </v-data-table>
        <section class="add-skillset-section">
          <p class="title">
            <b>Add new skillset</b>
          </p>
          <div class="inputs">
            <v-text-field
              v-model="addNew.title"
              label="Title"
              class="input-spacing"
            />
            <v-text-field
              v-model="addNew.shortTitle"
              label="Short Title"
              class="input-spacing"
            />
          </div>
          <div>
            <v-btn depressed color="primary" @click="addSkillset">
              Add
            </v-btn>
            <v-btn depressed color="primary" @click="deleteSkillset">
              Delete
            </v-btn>
          </div>
        </section>
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
  SKILLSETS
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
        { text: 'No', value: 'no' },
        { text: 'ID', value: 'id' },
        { text: 'Title', value: 'title' },
        { text: 'Short Title', value: 'shortTitle' },
        { text: 'No. of Workshops', value: 'noWorkshops' }
      ],
      addNew: {
        title: '',
        shortTitle: ''
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
    this.$store.dispatch(skillsetsModule(REQUEST))
  },

  methods: {
    async addSkillset() {
      console.log(this.addNew)
      console.log(this.skillsets)
      // this.$store.getters.
    },
    async deleteSkillset() {
      // console.log(this.delete)
    }
  }
}
</script>

<style lang="scss" scoped>
// somestupid scss is here
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

.add-skillset-section {
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

.title {
}

a {
  color: #0f4beb;
  padding-right: 25px;
  &:hover {
    text-decoration: underline;
  }
}
</style>
