<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="i in paddingRows"
        :key="i"
        cols="12"
      />
    </v-row>
    <v-footer
      absolute
      dark
      padless
    >
      <v-card
        tile
        class="brown darken-4 white--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider />

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>WWWarriors</strong>
        </v-card-text>
        <v-row
          justify="center"
          no-gutters
        >
          <v-btn
            v-for="link in links"
            :key="link"
            color="white"
            text
            rounded
            class="mb-2"
          >
            {{ link }}
          </v-btn>
        </v-row>
      </v-card>
    </v-footer>
  </v-container>

</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram'
    ],
    links: [
      'ABOUT',
      'PRIVACY',
      'TERMS',
      'CONTACT'
    ],
    window: {
      width: 0,
      height: 0
    }
  }),
  computed: {
    paddingRows() {
      const base = 12
      const increment = 1
      if (this.window.width > 1904) {
        return base
      } else if (this.window.width > 1264 && this.window.width <= 1904) {
        return base + increment
      } else if (this.window.width > 960 && this.window.width <= 1264) {
        return base + 2 * increment
      } else if (this.window.width > 600 && this.window.width <= 960) {
        return base + 4 * increment
      } else {
        return base + 8 * increment
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  }
}
</script>

<style scoped>

</style>
