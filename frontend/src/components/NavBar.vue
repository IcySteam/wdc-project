<template>
  <v-container
    fluid
  >
    <v-app-bar
      color="#4D4540"
      dark
      app
      hide-on-scroll
    >
      <v-app-bar-nav-icon @click="drawer = true" />
      <v-toolbar-title>NavBar</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      color="#4D4540"
      dark
    >
      <v-list
        nav
        rounded
        dense
      >
        <v-list-item-group
          v-model="group"
          color="teal accent-3"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
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
    group: null
  })
}
</script>

<style scoped>

</style>
