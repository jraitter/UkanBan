<template>
  <div class="create-task col-4">
    <!-- <form @submit.prevent="addTask"> -->
    <!-- <input type="text" placeholder="title" v-model="newTask.title" required /> -->
    <!-- <button type="submit">Add Task!</button> -->
    <!-- </form> -->
  </div>
</template>
<script>
// export default {
//   name: "createtask",
//   data() {
//     return {
//       newTask: {
//         title: ""
//       }
//     };
//   },
//   computed: {},
//   methods: {
//     addTask() {
//       this.newTask.boardId = this.$store.state.activeBoard._id;
//       // this.newTask.listId = this.$store.state.lists._id;
//       this.newTask.creatorEmail = this.$store.state.activeBoard.creatorEmail;
//       this.$store.dispatch("updateTask", this.newTask);
//       this.newTask = { title: "" };
//     }
//   }
// };
</script>