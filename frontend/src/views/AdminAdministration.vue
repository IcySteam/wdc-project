<template>
  <v-container fluid>
    <NavBar />
    <AdminAdministrationComponent />
    <Footer />
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import AdminAdministrationComponent from '../components/AdminAdministrationComponent'

export default {
  name: 'AdminAdministration',

  components: {
    AdminAdministrationComponent,
    Footer,
    NavBar
  }
}
</script>
