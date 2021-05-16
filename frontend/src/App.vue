<template>
  <v-app :style="backgroundColor">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    backgroundColor: {
      background: '#100A09'
    }
  })
}
</script>
