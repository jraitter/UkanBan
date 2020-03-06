<template>
  <div class="list my-5">
    <div class="col-4">
      <div class="card mx-auto transparent">
        <div class="card-body">
          <div class="row">
            <div class="col-9 p-0">
              <form @submit.prevent="addTask">
                <input type="text" placeholder="task" v-model="newTask.title" required />
                <button class="btn btn-sm btn-light" type="submit">Add Task!</button>
              </form>
            </div>
            <div class="col-3 p-0">
              <button class="btn float-right" @click="deleteList">
                <img src="./delete.png" />
              </button>
            </div>
          </div>
          <h5 class="card-title text-white">List: {{listData.title}}</h5>
          <task v-for="(taskObj) in tasks" :key="taskObj._id" :taskData="taskObj" />
        </div>
      </div>
    </div>
    <div class="cl-4"></div>
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
  width: 25rem;
  height: auto;
  word-wrap: break-word;
}
.row {
  margin-bottom: 2rem;
}
h5 {
  margin-bottom: 2rem;
}
.transparent {
  background-color: rgba(12, 12, 12, 0.5);
}
</style>