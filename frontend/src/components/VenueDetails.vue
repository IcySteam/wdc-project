<template>
  <v-container>
    <h1>Account Details</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Account Details
            </th>
            <th class="text-left">
              Information
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in data"
            :key="item.type"
          >
            <td>{{ item.type }}: </td>
            <td>{{ item.info }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>

</template>

<script>
export default {
  name: 'VenueDetails',
  data() {
    return {
      data: [
        { type: 'Venue Name', info: '@venueName' },
        { type: 'Manager', info: '@managerName' },
        { type: 'Venue Address', info: '@address' },
        { type: 'Contact Number', info: '@number' },
        { type: 'Email', info: '@example.com' }
      ]
    }
  }
}
</script>

<style scoped>
h1 {
  padding-bottom: 20px;
}

</style>
