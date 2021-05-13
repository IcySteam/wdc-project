<template>
  <v-container>
    <body>
      <div class="main">
        <h1>{{ venueName }}</h1>
        <div class="hotspot">
          <h3>Any Visitor With Hotspot History</h3>
          <div class="view_hotspot" />
        </div>
        <div class="check_in">
          <h3>List Of Check-Ins (Most Recent First)</h3>
          <div class="view_check_in" />
        </div>
        <div class="users">
          <h3>All Visitors Check-In History</h3>
          <div class="view_users" />
        </div>
      </div>
    </body>
  </v-container>
</template>

<script>
export default {
  name: 'VenueStats',
  data: () => ({
    venueName: '@Venue Name'
  })
}
</script>

<style scoped>
@media only screen and (min-width: 501px) {
  body {
    min-width: 1170px;
  }

  .check_in {
    padding-top: 30px;
  }

  .check_in h3 {
    padding-left: 140px;
    padding-bottom: 5px;
  }

  .view_check_in {
    height: 350px;
    width: 600px;
    padding: 5px;
    border: 3px solid black;
  }

  .users {
    padding-top: 50px;
  }

  .users h3 {
    padding-left: 180px;
    padding-bottom: 5px;
  }

  .view_users {
    height: 350px;
    width: 600px;
    padding: 5px;
    border: 3px solid black;
  }

  .hotspot {
    float: right;
    padding-right: 60px;
    padding-top: 180px;
  }

  .hotspot h3 {
    text-align: center;
    padding-bottom: 5px;
  }

  .view_hotspot {
    height: 400px;
    width:400px;
    padding: 5px;
    border: 3px solid black;
  }
}

@media only screen and (max-width: 500px) {
  .hotspot {
    padding-top: 40px;
  }

  .hotspot h3 {
    padding-left: 40px;
    padding-bottom: 5px;
  }

  .view_hotspot {
    height: 300px;
    width: 350px;
    padding: 5px;
    border: 3px solid black;
  }

  .check_in {
    padding-top: 40px;
  }

  .check_in h3 {
    padding-left: 20px;
    padding-bottom: 5px;
  }

  .view_check_in {
    height: 500px;
    width: 350px;
    padding: 5px;
    border: 3px solid black;
  }

  .users {
    padding-top: 40px;
  }

  .users h3 {
    padding-left: 60px;
    padding-bottom: 5px;
  }

  .view_users {
    height: 500px;
    width: 350px;
    padding: 5px;
    border: 3px solid black;
  }
}
</style>
