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
            @click="$router.push('/').catch(()=>{})"
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
      <div
        v-if="getLoggedIn"
        class="text-center"
      >
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              x-large
              v-on="on"
            >
              <v-avatar color="transparent">
                <v-icon dark>
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar
                  color="indigo"
                >
                  <span class="white--text text-h5">{{ currentUserObject.initials }}</span>
                </v-avatar>
                <h3 class="mt-3">{{ currentUserObject.fullName }}</h3>
                <p class="text-caption mt-3">
                  {{ currentUserObject.email }}
                </p>
                <v-divider class="my-2" />
                <v-btn
                  depressed
                  rounded
                  text
                  @click="$router.push(getMenuOptions()[1].href).catch(()=>{})"
                >
                  <!--                get [1] which is the account option (for now at least)-->
                  View Account
                </v-btn>
                <v-divider class="my-2" />
                <v-btn
                  depressed
                  rounded
                  text
                  href="/Auth/Logout"
                >
                  Sign Out
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
      <div
        v-if="!getLoggedIn"
        class="text-center"
      >
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="teal accent-3"
              v-bind="attrs"
              class="mt-2"
              light
              @click="realThis.$router.push('/Auth/Login').catch(()=>{})"
              v-on="on"
            >
              Sign In
            </v-btn>
          </template>
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
            @click="$router.push(item.href).catch(()=>{})"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="this.$store.getters.getLoggedIn"
            href="/Auth/Logout"
          >
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-card />
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NavBar',
  data: () => ({
    drawer: false,
    group: null,
    currentUserObject: {
      initials: '',
      fullName: '',
      email: ''
    },
    window: {
      width: 0,
      height: 0
    }
  }),
  computed: {
    realThis() {
      // about this and realThis
      // https://stackoverflow.com/questions/47692003/access-vuex-store-getters-in-component-method
      return this
    },
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
      if (this.currentRouteName === 'LoremIpsum') {
        return [
          {
            name: 'Lorem',
            gotoTarget: 'lorem'
          },
          {
            name: 'Cras',
            gotoTarget: 'cras'
          },
          {
            name: 'Maecenas',
            gotoTarget: 'maecenas'
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
    },
    getLoggedIn() {
      return this.$store.getters.getLoggedIn
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.$store.dispatch('getSessionStatus')
    this.currentUserAxios()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    getMenuOptions() {
      return this.$store.getters.getMenuOptions
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
    },
    currentUserAxios() {
      // get session status first
      var currentUserID
      axios({
        url: '/Action/GetSessionStatus',
        method: 'get',
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
        }
      })
        .then((res) => {
          // got an ok response
          // console.log(res)
          currentUserID = res.data.userID
          // get user object, NESTED axios request
          axios({
            url: '/Action/GetUser',
            method: 'get',
            timeout: 8000,
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              'userID': currentUserID
            }
          })
            .then((res1) => {
              // got an ok response
              // console.log(res1)
              this.currentUserObject = res1.data
              // extra helper attribs
              this.currentUserObject.fullName = this.currentUserObject.firstName + ' ' + this.currentUserObject.lastName
              this.currentUserObject.initials = this.currentUserObject.firstName[0] + this.currentUserObject.lastName[0]
            })
            .catch((err1) => {
              // encountered error making request/error response
              console.log(err1)
              if (err1.response) {
                console.log(err1.response)
              }
            })
        })
        .catch((err) => {
          // encountered error making request/error response
          console.log(err)
          if (err.response) {
            console.log(err.response)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
