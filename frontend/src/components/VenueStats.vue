<template>
      <v-container>
      <body>
          <div class="main">
              <h1>Venue Information</h1>
              <div class="users">
                  <h3>User History</h3>
                  <div class="view_users"></div>
              </div>
              <div class="check_in">
                  <h3>List Of Check-In History</h3>
                  <div class="view_check_in"></div>
              </div>
              <div class="hotspot">
                  <h3>Hotspot History</h3>
                  <div class="view_hotspot"></div>
              </div>
          </div>
      </body>
      </v-container>
</template>

<script>
  export default {
    name: "VenueStats"
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
    padding-left: 190px;
    padding-bottom: 5px;
  }

  .view_check_in {
    height: 350px;
    width: 600px;
    padding: 5px;
    border: 3px solid black;
  }

  .hotspot {
    padding-top: 50px;
  }

  .hotspot h3 {
    padding-left: 230px;
    padding-bottom: 5px;
  }

  .view_hotspot {
    height: 350px;
    width: 600px;
    padding: 5px;
    border: 3px solid black;
  }

  .users {
    float: right;
    padding-right: 60px;
    padding-top: 130px;
  }

  .users h3 {
    text-align: center;
    padding-bottom: 5px;
  }

  .view_users {
    height: 500px;
    width:400px;
    padding: 5px;
    border: 3px solid black;
  }
}

@media only screen and (max-width: 500px) {
  .users {
    padding-top: 40px;
  }

  .users h3 {
    padding-left: 120px;
    padding-bottom: 5px;
  }

  .view_users {
    height: 500px;
    width: 350px;
    padding: 5px;
    border: 3px solid black;
  }

  .check_in {
    padding-top: 40px;
  }

  .check_in h3 {
    padding-left: 75px;
    padding-bottom: 5px;
  }

  .view_check_in {
    height: 500px;
    width: 350px;
    padding: 5px;
    border: 3px solid black;
  }

  .hotspot {
    padding-top: 40px;
  }

  .hotspot h3 {
    padding-left: 110px;
    padding-bottom: 5px;
  }

  .view_hotspot {
    height: 500px;
    width: 350px;
    padding: 5px;
    border: 3px solid black;
  }
}
</style>