<template>
  <v-carousel
    height="100vh"
    hide-delimiter-background
    show-arrows-on-hover
    cycle
    interval="6000"
    progress
    progress-color="teal accent-3"
  >

    <v-carousel-item
      v-for="(item, index) in carouselItems"
      :key="index"
      :src="randomImageUrl()"
      target="_blank"
      :href="item.href"
    >
      <v-row
        class="fill-height"
        align="center"
        justify="center"
      >
        <div class="display-3" style="color: #A7FFEB; font-weight: bold">
          {{ item.title }}
        </div>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'NewsCarousel',
  components: {},
  data() {
    return {
      randomImageUrlBase: 'https://source.unsplash.com/1920x1080/?coronavirus',
      carouselItems: [
        {
          title: 'COVID-19 SA | Government of South Australia',
          href: 'https://www.covid-19.sa.gov.au/'
        },
        {
          title: 'COVID-19 Health Alert | Australian Department of Health',
          href: 'https://www.health.gov.au/news/health-alerts/novel-coronavirus-2019-ncov-health-alert'
        },
        {
          title: 'COVID-19 Australia | World Health Organization',
          href: 'https://covid19.who.int/region/wpro/country/au'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    randomImageUrl() {
      return this.randomImageUrlBase.concat('?randomAttr=').concat(Math.random().toString())
    }
  }
}
</script>
