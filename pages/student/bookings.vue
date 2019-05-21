<template>
  <!-- <div id="page-authenticated">
    <section class="container">
      <div class="section-container">
        <div>Hello this is an authenticated route :) with type {{ type }}</div>
      </div>
    </section>
 
  </div>-->
  <div id="page-dataTable">
    <section class="table">
      <div class="section-table">
        <header>
          <h1>
            <v-btn color="error" style="float:right;">Add Session</v-btn>
            <!-- //need to make the button working with something -->
          </h1>
          <h1>My Bookings</h1>
        </header>
      </div>
    </section>
    <v-toolbar flat color="white">
      <v-toolbar-title>Your Bookings</v-toolbar-title>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      item-key="name"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
        <td class="text-xs-right">{{ props.item.icon }}</td>
        <td>
          <v-checkbox v-model="props.selected" />
        </td>
      </template>
    </v-data-table>
    <section class="table2">
      <div class="section-table2">
        <v-toolbar flat color="white">
          <v-toolbar-title>Past Bookings</v-toolbar-title>
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="desserts"
          class="elevation-1"
          item-key="name"
        >
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
            <td class="text-xs-right">{{ props.item.icon }}</td>
            <td>
              <v-checkbox v-model="props.selected" />
            </td>
          </template>
        </v-data-table>
      </div>
    </section>
  </div>
</template>

<script>
import { authModule, TYPE } from '~/store/auth/methods'
import { studentAuthenticated } from '../../middleware/authenticatedRoutes'

export default {
  middleware: studentAuthenticated,
  layout: 'student',
  data() {
    return {
      type: this.$store.getters[authModule(TYPE)],

      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Type', value: 'calories' },
        { text: 'Time', value: 'fat' },
        { text: 'Room', value: 'carbs' },
        { text: 'Advisor', value: 'protein' },
        { text: 'Type', value: 'iron' }
        // { text: 'Blank', value: 'icon' }
        // { text: 'Dropdown', value: '' }
      ],
      selected: [],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
