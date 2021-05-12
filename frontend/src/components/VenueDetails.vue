<template>
  <v-container>
    <h1>Account Details</h1>
    <div class="details">
      <p>Venue Name:</p>
      <p>Manager Name:</p>
      <p>Venue Address:</p>
      <p>Contact No.:</p>
    </div>
    <button type="button">Manage Details>></button>
  </v-container>
</template>

<script>
export default {
  name: 'VenueDetails'
}
</script>

<style scoped>
.details {
  padding-top: 30px;
}

button {
  padding-top: 10px;
  color: blue;
  text-decoration: underline;
}
</style>
