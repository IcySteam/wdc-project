<template>
  <v-container>
    <h1 class="pb-10">Welcome, {{ fullName }}!</h1>
    <v-row>
      <Gmap />
    </v-row>
  </v-container>

</template>

<script>
import Gmap from './Gmap'
export default {
  name: 'AdminHomeComponent',
  components: { Gmap },
  data() {
    return {
      fullName: 'John Wick'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
