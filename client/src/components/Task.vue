<template>
  <div class="row">
    <div class="list col-12">
      <div class="card">
        <button class="btn btn-block btn-danger" @click="deleteTask">Delete</button>
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Move Task</button>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              @click="moveTask(listObj.id)"
              v-for="(listObj) in lists"
              v-show="listObj.id!=taskData.listId"
              :key="listObj._id"
              class="dropdown-item"
            >{{listObj.title}}</a>
          </div>
        </div>

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
  computed: {
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    deleteTask() {
      //add alert to ensure board should be deleted
      this.$store.dispatch("deleteTask", this.taskData);
    },
    moveTask(newListId) {
      let payload = {
        newListId: newListId,
        taskData: this.taskData
      };
      this.$store.dispatch("moveTask", payload);
    }
  },
  components: {}
};
</script>

 <style scoped>
</style>