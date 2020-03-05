<template>
  <div class="row">
    <div class="list col-12">
      <div class="card">
        <button class="btn btn-block btn-danger">Delete</button>
        <div class="card-body">
          <h5 class="card-title">{{taskData.title}}</h5>
          <p class="card-text">comments, eventually</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "task",
  props: ["taskData"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>

 <style scoped>
</style>