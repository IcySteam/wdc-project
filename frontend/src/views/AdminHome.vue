<template>
  <v-container fluid>
    <NavBar />
    <AdminHomeComponent />
    <Footer />
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import AdminHomeComponent from '../components/AdminHomeComponent'

export default {
  name: 'AdminHome',

  components: {
    AdminHomeComponent,
    Footer,
    NavBar
  }
}
</script>
