<template>
  <v-container fluid style="padding: 0;">
    <NewsCarousel style="margin-top: -128px" />
    <v-container>
      <NavBar />
      <CheckInCode />
      <Gmap />
      <NavigationComponent />
      <Footer />
    </v-container>
  </v-container>
</template>

<script>
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import NewsCarousel from '../components/NewsCarousel'
import CheckInCode from '../components/CheckInCode'
import Gmap from '../components/Gmap'
import NavigationComponent from '../components/NavigationComponent'

export default {
  name: 'Index',

  components: {
    NavigationComponent,
    Gmap,
    CheckInCode,
    NewsCarousel,
    NavBar,
    Footer
  }
}
</script>
