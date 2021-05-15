<template>
  <v-card
    max-width="700"
    class="mx-auto"
  >
    <v-toolbar
      color="brown darken-4"
      dark
    >
      <!--      <v-app-bar-nav-icon />-->
      <v-btn icon>
        <v-icon>mdi-camera</v-icon>
      </v-btn>

      <v-toolbar-title>Locations</v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
      >
        <v-list-item-icon>
          <v-icon
            v-if="item.icon"
            color="gray"
          >
            mdi-star
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>

        <v-list-item-avatar>
          <v-img :src="item.avatar" />
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'LocationsList',
  data() {
    return {
      items: [
        { icon: true, title: 'Bakery', avatar: 'https://image.shutterstock.com/image-vector/earth-icon-stock-vector-illustration-600w-1174782304.jpg' },
        { title: 'Supermarket', avatar: 'https://image.shutterstock.com/image-vector/earth-icon-stock-vector-illustration-600w-1174782304.jpg' },
        { title: 'Cinema', avatar: 'https://image.shutterstock.com/image-vector/earth-icon-stock-vector-illustration-600w-1174782304.jpg' },
        { title: 'University', avatar: 'https://image.shutterstock.com/image-vector/earth-icon-stock-vector-illustration-600w-1174782304.jpg' }
      ]
    }
  }
}
</script>
