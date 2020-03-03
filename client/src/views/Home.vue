<template>
  <div class="home">
    <div v-if="$auth.isAuthenticated">
      <img class="rounded-circle" :src="profile.picture" :alt="profile.name" height="45" />
      <span class="ml-2">{{profile.name}}</span>
    </div>
    <h1>This is your home page.</h1>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.user;
    }
  },
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>