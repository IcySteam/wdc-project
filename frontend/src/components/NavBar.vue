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
            :class="smallWidth()? 'px-0' : 'px-10'"
            color="transparent"
            @click="$router.push('/')"
          >
            <v-img
              class="m-auto p-auto"
              width="64px"
              src="../assets/letter-u-lock-logo.png"
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
              @click="usermode=item.title"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <template v-slot:extension>
        <v-tabs
          dark
          fixed-tabs
          color="teal accent-3"
        >
          <v-tabs-slider />
          <v-tab to="/?to=cras" @click="goto('cras')">
            Cras
          </v-tab>
          <v-tab to="/">
            II
          </v-tab>
          <v-tab to="/">
            III
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
            @click="$router.push('/SignUp')"
          >
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="$router.push('/Login')"
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
    usermode: 'User',
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
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    getMenuOptions() {
      if (this.usermode === 'User') {
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
      } else if (this.usermode === 'Manager') {
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
      } else if (this.usermode === 'Admin') {
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
        this.$vuetify.goTo(document.getElementById(id).offsetTop + 100)
      })
    },
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
    smallWidth() {
      if (this.window.width < 600) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
