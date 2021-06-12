<template>
  <ConsistentMP>
    <v-row>
      <template>
        <v-col
          v-for="(item, index) in computedMenuOptions"
          :key="index"
          cols="12"
          sm="4"
          lg="4"
        >
          <v-card
            @click="$router.push(item.href).catch(()=>{})"
          >

            <!--            :src="require(imgPath)"-->
            <!--            WHYYY-->
            <v-img
              class="m-auto p-auto white--text align-end"
              :src="getImgPath(item.imgName)"
              height="300px"
            >
              <v-card
                class="m-auto p-auto"
                height="33%"
              >
                <v-card-title>
                  {{ item.title }}
                </v-card-title>
                <v-card-subtitle class="text--primary">
                  {{ item.description }}
                </v-card-subtitle>
              </v-card>
            </v-img>
          </v-card>
        </v-col>
        <v-col
          v-if="this.$store.getters.getLoggedIn"
          cols="12"
          sm="4"
          lg="4"
        >
          <v-card
            href="/Auth/Logout"
          >
            <v-img
              class="m-auto p-auto white--text align-end"
              :src="getImgPath('sunset_briefcase.jpg')"
              height="300px"
            >
              <v-card
                class="m-auto p-auto"
                height="33%"
              >
                <v-card-title>
                  Log Out
                </v-card-title>
                <v-card-subtitle class="text--primary">
                  Log out of your account
                </v-card-subtitle>
              </v-card>
            </v-img>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </ConsistentMP>

</template>
<script>

import ConsistentMP from './UX/ConsistentMP'
export default {
  name: 'NavigationComponent',
  components: { ConsistentMP },
  computed: {
    computedMenuOptions() {
      const menuOptionsOutpout = this.$store.getters.getNavigationComponentOptions
      // for (const option of menuOptionsOutpout) {
      //   option.imgName = '../assets/' + option.imgName
      // }
      // console.log(menuOptionsOutpout)
      return menuOptionsOutpout
    }
  },
  methods: {
    mockLogout() {
      this.$store.commit('setUsermode', 'none')
      this.$router.push('/').catch(() => {})
    },
    getImgPath(shortName) {
      const returnVal = shortName ? require(`../assets/${shortName}`) : ''
      // console.log(returnVal)
      return returnVal
    }
  }
}
</script>
<style scoped>

</style>

