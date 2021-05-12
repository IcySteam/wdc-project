<template>
    <v-container>
        <ManagerNavBar />
        <VenueDetails />
    </v-container>
</template>

<script>
    import VenueDetails from '../components/VenueDetails'
    import ManagerNavBar from '../components/ManagerNavBar'

    export default {
      name: "ManagerHome",

    components: {
        ManagerNavBar,
        VenueDetails,
    },
    }
</script>

<style scoped>

</style>