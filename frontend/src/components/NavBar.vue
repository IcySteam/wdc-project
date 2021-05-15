<template>
  <v-container
    fluid
  >
    <!--    System76 brown: #4D4540-->
    <v-app-bar
      color="brown"
      dark
      app
      hide-on-scroll
    >
      <v-app-bar-nav-icon @click="drawer = true" />
      <v-tabs
        fixed-tabs
        dark
        color="teal accent-3"
      >
        <v-tab to="/?goto=cras" @click="goto('cras')">
          Cras
        </v-tab>
        <v-tab to="/">
          PLACEHOLDER 2
        </v-tab>
        <v-tab to="/">
          PLACEHOLDER 3
        </v-tab>
        <v-tab to="/">
          PLACEHOLDER 4
        </v-tab>
      </v-tabs>

      <v-spacer />
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="teal accent-3"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Usermode
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

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      class="brown"
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
    ]
  }),
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
    }
  }
}
</script>

<style scoped>

</style>
