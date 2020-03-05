<template>
  <div class="container-fluid home">
    <div class="intro-group">
      <div class="row">
        <div class="col-12 my-3">
          <h1 class="intro">Welcome to Ukanban</h1>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-12">
          <h3
            class="intro"
          >Ukanban is the kanban application to help you and your team climb any mountain of tasks</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h5 class="intro">Log in and go to 'My Boards' to get started</h5>
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

  methods: {},
  components: {}
};
</script>


<style scoped>
.home {
  height: 100vh;
  background-image: url(./leonard-laub-EVTcHK2P3j4-unsplash.jpg);
  background-size: cover;
}
.intro {
  color: floralwhite;
}
.intro-group {
  position: absolute;
  top: 50%;
}
</style>