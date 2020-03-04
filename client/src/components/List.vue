<template>
  <div class="list col-3">
    <div class="card mx-4">
      <div class="card-body">
        <button class="btn btn-block btn-danger" @click="deleteList">Kill this List</button>
        <h5 class="card-title">{{listData.title}}</h5>
        <p class="card-text">Tasks</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "list",
  props: ["listData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteList() {
      //add alert to ensure board should be deleted
      this.$store.dispatch("deleteList", this.listData);
    }
  },
  components: {}
};
</script>


<style scoped>
.card {
  width: 14rem;
  height: auto;
  word-wrap: break-word;
}
</style>