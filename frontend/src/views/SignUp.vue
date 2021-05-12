<template>
  <v-container>
    <NavBar />
    <SignUpComponent />
  </v-container>

</template>

<script>
import NavBar from '../components/NavBar'
import SignUpComponent from '../components/SignUpComponent'

export default {
  name: 'SignUp',
  components: {
    NavBar,
    SignUpComponent
  }
}
</script>

<style scoped>

</style>
