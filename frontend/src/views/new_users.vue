<template>
  <v-container>
    <NavBar />
    <registration_from />
  </v-container>

</template>

<script>
import NavBar from '../components/NavBar'
import registration_from from '../components/registration_form'

export default {
  name: 'NewUsers',
  components: {
    NavBar,
    registration_from
  }
}
</script>

<style scoped>

</style>
