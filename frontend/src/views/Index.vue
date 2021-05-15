<template>
  <v-container>
    <NavBar />
    <LoremIpsum />
    <Footer />
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import LoremIpsum from '../components/LoremIpsum'
import Footer from '../components/Footer'

export default {
  name: 'Index',

  components: {
    NavBar,
    LoremIpsum,
    Footer
  }
}
</script>
