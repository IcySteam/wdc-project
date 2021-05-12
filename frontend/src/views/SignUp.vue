<template>
  <v-container fluid>
    <NavBar />
    <v-row>
      <v-col
        cols="12"
        xl="8"
        lg="8"
        class="d-none d-sm-none d-md-none d-lg-flex"
      >
        <v-img
          class="mx-auto white--text align-end"
          src="../assets/form_filling.jpg"
          height="1080px"
          style="margin-top: 0vh"
        />
      </v-col>

      <v-col cols="0" xl="4" lg="4" class="signUpForm">
        <SignUpComponent />

      </v-col>
    </v-row>
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
  .signUpForm {
    padding-top: 0vh;
  }
</style>
