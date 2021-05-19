<template>
  <v-container fluid>
    <NavBar />
    <LoremIpsumComponent />
    <Footer />
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import LoremIpsumComponent from '../components/LoremIpsumComponent'
import Footer from '../components/Footer'

export default {
  name: 'LoremIpsum',

  components: {
    NavBar,
    LoremIpsumComponent,
    Footer
  }
}
</script>
