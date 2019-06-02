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
          v-model="selected"
          :headers="headers"
          :items="skillsets"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>
              <v-checkbox v-model="props.selected" primary hide-details />
            </td>
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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-flex>
                <v-text-field
                  v-model="addNew.title"
                  :rules="[addNew.rules.required]"
                  label="Title"
                  class="input-spacing"
                />
                <v-text-field
                  v-model="addNew.shortTitle"
                  :rules="[addNew.rules.required]"
                  label="Short Title"
                  class="input-spacing"
                />
              </v-flex>
            </v-form>
          </div>
          <div>
            <v-btn
              :disabled="!valid"
              depressed
              color="primary"
              @click="addSkillset"
            >
              Add
            </v-btn>
            <v-btn depressed color="primary" @click="archiveSkillset">
              Archive
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
        { text: '', value: '' },
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
      valid: true
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
      this.$refs.form.validate()
      let { title, shortTitle } = this.addNew
      if (title !== '' && shortTitle !== '') {
        await this.$store.dispatch(skillsetsModule(ADD_SKILLSET), this.addNew)
        this.addNew.title = ''
        this.addNew.shortTitle = ''
        this.$refs.form.resetValidation()
      } else {
        console.log(
          'You must enter a title and short title in order to add a skillset'
        )
      }
    },
    async archiveSkillset() {
      let selectedId = []
      for (let index in this.selected) {
        if (this.selected[index].id) {
          selectedId.push(this.selected[0].id)
        }
      }
      this.selected = []
      await this.$store.dispatch(skillsetsModule(ARCHIVE), selectedId)
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
