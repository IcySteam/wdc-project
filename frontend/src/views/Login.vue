<template>
  <v-container>
    <NavBar />
    <LoginComponent />
  </v-container>

</template>

<script>
import NavBar from '../components/NavBar'
import LoginComponent from '../components/LoginComponent'

export default {
  name: 'Login',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    NavBar,
    LoginComponent
  }
}
</script>
