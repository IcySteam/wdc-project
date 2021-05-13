<template>
  <v-container>
    <NavBar />
    <LoremIpsum />
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import LoremIpsum from '../components/LoremIpsum'

export default {
  name: 'AdminAccount',

  components: {
    NavBar,
    LoremIpsum
  }
}
</script>
