<template>
  <v-container fluid>
    <NavBar />
    <v-row>
      <v-col
        cols="12"
        lg="8"
        xl="8"
        class="d-none d-xs-none d-sm-none d-md-none d-lg-flex d-xl-flex"
        align-self="center"
      >
        <v-img
          class="m-auto p-auto"
          :src="require('../../assets/form_filling.jpg')"
          min-height="80vh"
        />
      </v-col>

      <v-col
        lg="4"
        xl="4"
        class="m-auto p-auto d-flex"
        align-self="center"
      >
        <SignUpComponent />

      </v-col>
    </v-row>
    <Footer />
  </v-container>

</template>

<script>
import NavBar from '../../components/NavBar'
import SignUpComponent from '../../components/Auth/SignUpComponent'
import Footer from '../../components/Footer'

export default {
  name: 'SignUp',
  components: {
    Footer,
    NavBar,
    SignUpComponent
  }
}
</script>

<style scoped>
</style>
