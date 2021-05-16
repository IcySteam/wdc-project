<template>
  <v-container fluid>
    <NavBar />
    <UserHomeComponent />
    <Footer />
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import UserHomeComponent from '../components/UserHomeComponent'

export default {
  name: 'UserHome',

  components: {
    UserHomeComponent,
    Footer,
    NavBar
  }
}
</script>
