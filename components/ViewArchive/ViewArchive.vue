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
              <router-link :to="`/admin/skillsets/${props.item.id}`">
                <v-icon small @click="editItem(props.item)">
                  edit
                </v-icon>
              </router-link>
              <v-dialog v-model="dialog2" max-width="290">
                <template v-slot:activator="{ on }">
                  <v-icon small v-on="on">
                    delete
                  </v-icon>
                </template>
                <v-card>
                  <v-card-title class="headline">
                    Are you sure you want to archive this skillset?
                  </v-card-title>
                  <v-card-text>
                    Agree will archive the skillset.
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="#ff0000" flat @click="dialog2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      color="#ff0000"
                      flat
                      @click="archiveSkillset(props.item)"
                    >
                      Agree
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
export default {
  components: { Sheet },
  layout: 'admin',
  data() {
    return {
      search: '',
      headers: [
        { text: 'No.', value: 'no' },
        { text: 'ID', value: 'id' },
        { text: 'Skill-set', value: 'title' },
        { text: 'Short Title', value: 'shortTitle' },
        { text: '#', value: 'noWorkshops' },
        { text: 'Actions', value: 'actions' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';
#page-consultations {
  .header {
    color: black;
  }

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
