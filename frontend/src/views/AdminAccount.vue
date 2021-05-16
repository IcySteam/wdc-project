<template>
  <v-container fluid>
    <NavBar />
    <AdminAccountComponent />
    <Footer />
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import AdminAccountComponent from '../components/AdminAccountComponent'

export default {
  name: 'AdminAccount',

  components: {
    AdminAccountComponent,
    Footer,
    NavBar
  }
}
</script>
