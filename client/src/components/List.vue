<template>
  <div class="list">
    <div class="col-2">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">{{listData.title}}</h4>
          <p class="card-text">Tasks</p>
        </div>
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
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>