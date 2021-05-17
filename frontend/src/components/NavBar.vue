<template>
  <v-container
    fluid
  >
    <!--    System76 brown: #4D4540-->
    <v-app-bar
      color="brown darken-4"
      dark
      app
      hide-on-scroll
      fade-img-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        />
      </template>
      <v-app-bar-nav-icon @click="drawer = true" />
      <v-col cols="3">
        <v-hover
          v-slot="{ hover }"
        >
          <v-card
            :elevation="hover ? 0:0"
            max-width="150px"
            class="mt-n4 p-auto"
            :class="smallWidth? 'px-0' : 'px-10'"
            color="transparent"
            @click="$router.push('/')"
          >
            <v-img
              class="m-auto p-auto"
              min-width="64px"
              max-width="64px"
              :src="require('../assets/letter-u-lock-logo.png')"
              contain
            />
          </v-card>
        </v-hover>
      </v-col>
      <v-spacer />
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in usermodes"
              :key="index"
              @click="updateUsermode(item.title)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <template v-if="extensionTabs.length > 0" v-slot:extension>
        <v-tabs
          dark
          fixed-tabs
          color="teal accent-3"
        >
          <v-tabs-slider />
          <v-tab
            v-for="(item, index) in extensionTabs"
            :key="index"
            @click="goto(item.gotoTarget)"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      class="brown darken-4"
      dark
    >
      <v-list
        nav

        dense
      >
        <v-list-item-group
          v-model="group"
          color="teal accent-3"
        >
          <v-list-item
            v-for="(item, index) in getMenuOptions()"
            :key="index"
            @click="$router.push(item.href)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="$router.push('/Auth/SignUp')"
          >
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="$router.push('/Auth/Login')"
          >
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Log In</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-card />
  </v-container>
</template>

<script>
export default {
  name: 'NavBar',
  data: () => ({
    drawer: false,
    group: null,
    usermodes: [
      {
        'title': 'User'
      },
      {
        'title': 'Manager'
      },
      {
        'title': 'Admin'
      }
    ],
    window: {
      width: 0,
      height: 0
    }
  }),
  computed: {
    smallWidth() {
      if (this.window.width < 600) {
        return true
      } else {
        return false
      }
    },
    currentRouteName() {
      return this.$route.name
    },
    extensionTabs() {
      if (this.currentRouteName === 'Index') {
        return [
          {
            name: 'I',
            gotoTarget: ''
          },
          {
            name: 'Cras',
            gotoTarget: 'cras'
          },
          {
            name: 'II',
            gotoTarget: ''
          }
        ]
      } else if (this.currentRouteName === 'UserHome') {
        return [
          {
            name: 'Check In',
            gotoTarget: 'checkInCode'
          },
          {
            name: 'Map',
            gotoTarget: 'Gmap'
          }
        ]
      } else if (this.currentRouteName === 'ManagerAccount') {
        return [
          {
            name: 'Account',
            gotoTarget: 'accountDetails'
          },
          {
            name: 'Venue',
            gotoTarget: 'venueDetails'
          }
        ]
      } else if (this.currentRouteName === 'AdminAdministration') {
        return [
          {
            name: 'Hotspots',
            gotoTarget: 'currentHotspots'
          },
          {
            name: 'Users',
            gotoTarget: 'users'
          },
          {
            name: 'Venues',
            gotoTarget: 'venues'
          }
        ]
      } else if (this.currentRouteName === 'ManagerHome') {
        return [
          {
            name: 'Map',
            gotoTarget: 'Gmap'
          },
          {
            name: 'History',
            gotoTarget: 'checkInHistory'
          }
        ]
      } else {
        return []
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    getMenuOptions() {
      if (this.$store.getters.getUsermode === 'User') {
        return [
          {
            'title': 'Home',
            'href': '/User/Home',
            'icon': 'mdi-home'
          },
          {
            'title': 'Account',
            'href': '/User/Account',
            'icon': 'mdi-account'
          }
        ]
      } else if (this.$store.getters.getUsermode === 'Manager') {
        return [
          {
            'title': 'Home',
            'href': '/Manager/Home',
            'icon': 'mdi-home'
          },
          {
            'title': 'Account',
            'href': '/Manager/Account',
            'icon': 'mdi-account'
          }
        ]
      } else if (this.$store.getters.getUsermode === 'Admin') {
        return [
          {
            'title': 'Home',
            'href': '/Admin/Home',
            'icon': 'mdi-home'
          },
          {
            'title': 'Account',
            'href': '/Admin/Account',
            'icon': 'mdi-account'
          },
          {
            'title': 'Administration',
            'href': '/Admin/Administration',
            'icon': 'mdi-account-key'
          }
        ]
      }
    },
    goto(id) {
      this.$nextTick(() => {
        this.$vuetify.goTo(document.getElementById(id).offsetTop + 150)
      })
    },
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
    updateUsermode(item) {
      this.$store.commit('setUsermode', item)
    }
  }
}
</script>

<style scoped>

</style>
