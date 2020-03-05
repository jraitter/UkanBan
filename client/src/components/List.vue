<template>
  <div class="list col-3">
    <div class="card mx-4">
      <div class="card-body">
        <form @submit.prevent="addTask">
          <input type="text" placeholder="task" v-model="newTask.title" required />
          <button type="submit">Add Task!</button>
        </form>
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
    return {
      newTask: {
        title: ""
        // boardId: "",
        // listId: "",
        // creatorEmail: ""
      }
    };
  },
  computed: {},
  methods: {
    deleteList() {
      //add alert to ensure board should be deleted
      this.$store.dispatch("deleteList", this.listData);
    },
    addTask() {
      this.newTask.boardId = this.$store.state.activeBoard._id;
      this.newTask.creatorEmail = this.$store.state.activeBoard.creatorEmail;
      this.newTask.listId = this.listData._id;
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = { title: "" };
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