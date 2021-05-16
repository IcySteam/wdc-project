<template>
  <v-container fluid>
    <NavBar />
    <UserAccountComponent />
    <Footer />
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import UserAccountComponent from '../components/UserAccountComponent'

export default {
  name: 'UserAccount',

  components: {
    UserAccountComponent,
    Footer,
    NavBar
  }
}
</script>
