<template>
  <ConsistentMP>
    <v-row>
      <template v-if="this.$store.getters.getUsermode === 'None'">
        <v-col
          cols="12"
          sm="4"
          lg="4"
        >
          <v-card
            @click="$router.push('/Auth/Login').catch(()=>{})"
          >
            <v-img
              class="m-auto p-auto white--text align-end"
              :src="require('../assets/door_unlocking.jpg')"
              height="300px"
            >
              <v-card
                class="m-auto p-auto"
                height="33%"
              >
                <v-card-title>
                  Log In
                </v-card-title>
                <v-card-subtitle class="text--primary">
                  Log in to your account
                </v-card-subtitle>
              </v-card>
            </v-img>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="4"
          lg="4"
        >
          <v-card
            @click="$router.push('/Auth/SignUp').catch(()=>{})"
          >
            <v-img
              class="m-auto p-auto white--text align-end"
              :src="require('../assets/form_filling.jpg')"
              height="300px"
            >
              <v-card
                class="m-auto p-auto"
                height="33%"
              >
                <v-card-title>
                  Sign Up
                </v-card-title>
                <v-card-subtitle class="text--primary">
                  Create an account
                </v-card-subtitle>
              </v-card>
            </v-img>
          </v-card>
        </v-col>
      </template>

      <template v-if="this.$store.getters.getUsermode !== 'None'">
        <v-col
          v-for="(item, index) in this.$store.getters.getMenuOptions"
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
    imgPath() {
      return '../assets/' + this.item.imgName
    }
  },
  methods: {
  }
}
</script>
<style scoped>

</style>

