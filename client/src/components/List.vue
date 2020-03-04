<template>
  <div class="list">
    <div class="col-2">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">{{list.name}}</h4>
          <p class="card-text">Tasks</p>
        </div>
      </div>
    </div>
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