<template>
  <div id="page-authenticated">
    <section class="container">
      <h1>HELPS Workshop Booking</h1>
      <v-toolbar flat color="white">
        <v-toolbar-title>
          To start the booking process, please click the skill-set that you want
          to improve:
        </v-toolbar-title>
      </v-toolbar>
    </section>
    <div>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-list two-line>
              <template v-for="(item, index) in items">
                <v-list-tile
                  :key="item.title"
                  avatar
                  ripple
                  @click="toggle(index)"
                >
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ item.title }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">
                      {{ item.headline }}
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>
                      {{ item.subtitle }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-list-tile-action-text>
                      {{ item.action }}
                    </v-list-tile-action-text>
                    <v-icon
                      v-if="selected.indexOf(index) < 0"
                      color="grey lighten-1"
                    >
                      star_border
                    </v-icon>

                    <v-icon v-else color="yellow darken-2">
                      star
                    </v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < items.length" :key="index" />
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
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
      //   type: this.$store.getters[authModule(TYPE)],
      stepCount: 0,
      //    selectedItemIndex: null,
      //       testItems: [{ title: 'test1' }, { title: 'test2' }, { title: 'test3' }],
      //       setSelected(index) {
      //       this.selectedItemIndex = index
      //       console.log(this.selectedItemIndex)
      //       }

      dialog: false,
      e1: 0,

      type: this.$store.getters[authModule(TYPE)],

      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Type', value: 'type' },
        { text: 'Time', value: 'time' },
        { text: 'Room', value: 'room' },
        { text: 'Advisor', value: 'advisor' },
        { text: 'Type', value: 'type2' }
      ],
      selected: [],
      bookings: [
        {
          name: '20/05/2019',
          type: 'Consultation',
          time: '10:00 AM - 1:30 PM',
          room: 'CB11.03.301',
          advisor: 'John Smith',
          type2: 'How to write a Report'
        },
        {
          name: '15/05/2019',
          type: 'Program 1',
          time: '11:00 AM - 12:30 PM',
          room: 'TBA',
          advisor: 'Andrew Smith',
          type2: 'Part 1 of Program Name'
        },
        {
          name: '12/05/2019',
          type: 'Program 2',
          time: '10:00 AM - 1:30 PM',
          room: 'CB05.03.301',
          advisor: 'John Wick',
          type2: 'How to Draw with a Pencil'
        },
        {
          name: '18/05/2019',
          type: 'Workshop',
          time: '11:30 AM - 12:30 PM',
          room: 'CB11.00.201',
          advisor: 'Graham Smith',
          type2: 'Part 2 of Program Name'
        }
      ]
    }
  },
  methods: {
    stepOne() {
      alert('Sent!')
      this.dialog = false

      // eslint-disable-next-line no-undef
      toggle(index)
      {
        // eslint-disable-next-line no-undef
        const i = this.selected.indexOf(index)

        if (i > -1) {
          this.selected.splice(i, 1)
        } else {
          // eslint-disable-next-line no-undef
          this.selected.push(index)
        }
      }
    }
  },

  selected: [2],
  items: [
    {
      action: '15 min',
      headline: 'Brunch this weekend?',
      title: 'Ali Connors',
      subtitle:
        "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
    },
    {
      action: '2 hr',
      headline: 'Summer BBQ',
      title: 'me, Scrott, Jennifer',
      subtitle: "Wish I could come, but I'm out of town this weekend."
    },
    {
      action: '6 hr',
      headline: 'Oui oui',
      title: 'Sandra Adams',
      subtitle: 'Do you have Paris recommendations? Have you ever been?'
    },
    {
      action: '12 hr',
      headline: 'Birthday gift',
      title: 'Trevor Hansen',
      subtitle:
        'Have any ideas about what we should get Heidi for her birthday?'
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      title: 'Britta Holt',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
    }
  ]
}
</script>

<style lang="scss">
@import '~assets/styles/variables';
.section-container {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
