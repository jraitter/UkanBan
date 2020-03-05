<template>
  <div class="boards">
    Here are your boards. If you don't have any, then get started!
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <div class="row my-3">
        <div class="col-2" id="spacing"></div>
        <div class="col-8 board-area">
          <router-link
            class="board"
            :to="{name: 'board', params: {boardId: board._id}}"
          >{{board.title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  }
};
</script>
<style>
.boards {
  height: 100vh;
  background-image: url(./stephen-leonardi-i0cIm__zTrM-unsplash.jpg);
  background-size: cover;
}
.board {
  color: white;
}

.board-area {
  background-color: rgba(20, 20, 20, 0.75);
}
</style>