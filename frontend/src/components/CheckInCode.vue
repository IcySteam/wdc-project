<template>
  <ConsistentMP>
    <v-row>
      <v-col cols="3" xs="3" md="3" lg="12" xl="12" />
    </v-row>
    <v-row class="align-self-center text-center">
      <v-col cols="12" sm="12" md="12" xl="2" lg="2"><v-spacer /></v-col>
      <v-col cols="12" sm="12" md="12" xl="7" lg="7">
        <v-text-field
          v-model="checkInCode"
          label="Check-in code"
          hint="Enter the check-in code provided by venue"
          outlined
          clearable
          :rules="checkInCodeRules"
          class="align-self-center text-center"
          color="teal accent-3"
        />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="12"
        xl="3"
        lg="3"
      >
        <v-btn
          color="brown darken-4"
          class="m-auto p-auto v-size--x-large"
          width="100%"
          @click="submit"
        >
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </ConsistentMP>

</template>

<script>
import ConsistentMP from './UX/ConsistentMP'
export default {
  name: 'CheckInCode',
  components: { ConsistentMP },
  data() {
    return {
      checkInCode: '',
      checkInCodeRules: [
        v => !!v || 'Check-in code is required'
      ]
    }
  },
  computed: {
  },
  methods: {
    submit: function() {
      if (this.checkInCode !== '') {
        return null
      }
    }
  }
}
</script>

<style scoped>

</style>
