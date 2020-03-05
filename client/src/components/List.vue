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
        <task v-for="(taskObj) in tasks" :key="taskObj._id" :taskData="taskObj" />
      </div>
    </div>
  </div>
</template>


<script>
import task from "@/components/Task";
export default {
  name: "list",
  props: ["listData"],
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listData._id);
  },
  data() {
    return {
      newTask: {
        title: ""
      }
    };
  },
  computed: {
    tasks() {
      let mydata = this.$store.state.tasks[this.listData._id] || [];
      return mydata;
    }
  },
  methods: {
    deleteList() {
      //add alert to ensure board should be deleted
      this.$store.dispatch("deleteList", this.listData);
    },
    addTask() {
      this.newTask.boardId = this.$store.state.activeBoard._id;
      this.newTask.creatorEmail = this.$store.state.activeBoard.creatorEmail;
      this.newTask.listId = this.listData._id;
      console.log("newTask ", this.newTask);
      this.$store.dispatch("updateTask", this.newTask);
      console.log("store Tasks ", this.$store.state.tasks);
      this.newTask = { title: "" };
    }
  },
  components: {
    task
  }
};
</script>


<style scoped>
.card {
  width: 14rem;
  height: auto;
  word-wrap: break-word;
}
</style>