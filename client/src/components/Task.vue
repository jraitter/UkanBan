<template>
  <div class="row">
    <div class="list col-12">
      <div class="card transparent">
        <div class="row">
          <div class="col-4 p-0">
            <button
              class="btn btn-secondary dropdown-toggle float-left"
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
          <div class="col-8 p-0">
            <button class="btn float-right" @click="deleteTask">
              <img src="./delete.png" />
            </button>
            <form @submit.prevent="addComment">
              <input type="text" placeholder="comment" v-model="newComment.title" required />
              <button type="submit">+</button>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-12"></div>
        </div>
      </div>

      <div class="card-body" id="card">
        <h5 class="card-title">Task: {{taskData.title}}</h5>
        <p v-for="(comment) in taskData.comments" :key="comment.id" class="card-text">
          <button @click="deleteComment(comment.id)" class="btn btn-sm text-danger">X</button>
          {{comment.title}}
        </p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "task",
  props: ["taskData"],
  mounted() {},
  data() {
    return {
      newComment: { title: "" }
    };
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
    },
    addComment() {
      let payload = {
        comment: this.newComment.title,
        taskData: this.taskData
      };
      this.$store.dispatch("addComment", payload);
    },
    deleteComment(id) {
      let payload = {
        commentId: id,
        taskData: this.taskData
      };
      this.$store.dispatch("deleteComment", payload);
    }
  },
  components: {}
};
</script>

 <style scoped>
#card {
  color: whitesmoke;
  border-style: solid;
  border-width: 1px;
  border-color: white;
  border-radius: 8px;
}
.transparent {
  background-color: rgba(12, 12, 12, 0.5);
}
.card-text {
  background-color: rgba(1, 1, 1, 0.75);
}
input {
  width: 69%;
}
</style>