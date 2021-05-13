<template>
  <v-container>
    <h1>{{ venueName }}</h1>
    <div class="check_in">
      <h3>List Of Check-Ins</h3>
      <v-data-table
        :headers="headers"
        :items="check_in_data"
        :items-per-page="5"
        class="elevation-1"
      />
    </div>
    <div class="hotspot">
      <h3>List Of Visitors Who Have Been To Hotspot Area Recently</h3>
      <v-data-table
        :headers="headers"
        :items="hotspot_data"
        :items-per-page="3"
        class="elevation-1"
      />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'VenueStats',
  data() {
    return {
      venueName: 'VenueName',
      headers: [
        {
          text: 'User ID',
          align: 'start',
          sortable: false,
          value: 'ID'
        },
        { text: 'Name', value: 'name' },
        { text: 'Check-In Time', value: 'time' },
        { text: 'Date', value: 'date' }
      ],
      check_in_data: [
        {
          ID: 1,
          name: 'Jash Vira',
          time: '12:47 pm',
          date: '13/05/2021'
        },
        {
          ID: 2,
          name: 'Junguo Wong',
          time: '12:47 pm',
          date: '13/05/2021'
        },
        {
          ID: 3,
          name: 'Zhenhang Dong',
          time: '12:47 pm',
          date: '13/05/2021'
        },
        {
          ID: 4,
          name: 'Minhaj Ahmed',
          time: '12:47 pm',
          date: '13/05/2021'
        }
      ],
      hotspot_data: []
    }
  }
}
</script>

<style scoped>
.check_in {
  padding-top: 20px;
}

h3 {
  text-align: center;
  padding-bottom: 5px;
}

.hotspot {
  padding-top: 40px;
}

</style>
