<template>
  <v-container fluid>
    <default-app-bar />
    <hello-world />
  </v-container>

</template>

<script>
import DefaultAppBar from '../../components/Default/DefaultAppBar'
import HelloWorld from '../../components/Default/HelloWorld'

export default {
  name: 'DefaultHome',

  components: {
    DefaultAppBar,
    HelloWorld
  }
}
</script>
