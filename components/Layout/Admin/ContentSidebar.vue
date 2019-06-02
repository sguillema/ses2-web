<template>
  <v-card id="content-sidebar" class="elevation-3">
    <v-navigation-drawer stateless value="true" class="navigation-drawer">
      <v-list class="list" dense>
        <div
          v-for="(section, sectionIndex) in listSections"
          :key="sectionIndex"
        >
          <v-subheader>{{ section.title }}</v-subheader>
          <v-list-tile
            v-for="(link, linkIndex) in section.links"
            :key="linkIndex"
            :to="link.to"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ link.title }}</v-list-tile-title>
            </v-list-tile-content>
            <div class="highlight-route"></div>
          </v-list-tile>
          <v-divider v-if="sectionIndex !== listSections.length - 1" />
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      listSections: [
        {
          title: 'Bookings',
          links: [
            {
              title: 'Consultations',
              icon: 'forum',
              to: '/admin/consultations'
            },
            { title: 'Workshops', icon: 'school', to: '/admin/workshops' },
            { title: 'Programs', icon: 'insert_chart', to: '/admin/programs' },
            { title: 'Skill Sets', icon: 'receipt', to: '/admin/skillsets' }
          ]
        },
        {
          title: 'Users',
          links: [
            {
              title: 'Advisors',
              icon: 'supervised_user_circle',
              to: '/admin/advisors'
            },
            { title: 'Students', icon: 'recent_actors', to: '/admin/students' },
            {
              title: 'Waiting Lists',
              icon: 'list',
              to: '/admin/waitinglists'
            }
          ]
        },
        {
          title: 'Miscellaneous',
          links: [
            { title: 'Emails', icon: 'email', to: '/admin/emails' },
            { title: 'Reports', icon: 'book', to: '/admin/reports' },
            { title: 'Rooms', icon: 'home', to: '/admin/rooms' },
            { title: 'Messages', icon: 'chat', to: '/admin/messages' }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables';
#content-sidebar {
  background: none;
  width: 240px;
  min-width: 240px;
  .navigation-drawer {
    height: 100%;
    background: none;
    overflow: auto;
    .list {
      height: inherit;
      background: none;
    }
    .v-subheader,
    .v-list__tile {
      padding: 0 30px;
    }
    .v-list__tile {
      .highlight-route {
        height: 0;
        width: 3px;
        background-color: $color-primary;
        position: absolute;
        right: 0;
        transition: height 0.2s ease-out;
      }

      &.v-list__tile--active {
        background-color: $color-graydarker;
        .v-icon {
          color: rgba(0, 0, 0, 0.54);
        }
        .highlight-route {
          height: 100%;
        }
      }
    }
    .v-list__tile__title {
      color: $color-black;
      font-weight: $fontweight-regular;
    }
    .v-subheader {
      text-transform: uppercase;
      font-weight: $fontweight-ultrabold;
    }
    .v-navigation-drawer__border {
      display: none;
    }
    .v-divider {
      margin: 5px 0;
    }
  }
}
</style>
