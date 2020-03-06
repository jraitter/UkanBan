<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading, if page does not load, refresh</h1>
    <div class="row my-2">
      <div class="col-6">
        <create-list />
      </div>
      <div class="col-6">
        <button class="btn btn-sm btn-danger float-right mr-2" @click="deleteBoard">Delete Board</button>
      </div>
    </div>
    <div class="row lists-row scrollable">
      <list v-for="(listObj) in lists" :key="listObj._id" :listData="listObj" />
    </div>
  </div>
</template>

<script>
import list from "@/components/List";
import CreateList from "@/components/CreateList";
export default {
  name: "board",
  mounted() {
    if (!this.$store.state.boards.length) {
      this.$store.dispatch("getBoardById", this.$route.params.boardId);
    } else {
      this.$store.dispatch(
        "setActiveBoard",
        this.$store.state.boards.find(b => b._id == this.$route.params.boardId)
      );
    }
    this.$store.dispatch("getListsByBoardId", this.$route.params.boardId);
  },
  props: ["boardId"],
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  components: {
    list,
    CreateList
  },
  methods: {
    setActiveBoard() {
      this.$store.dispatch("setActiveBoard", this.boardId);
    },
    deleteBoard() {
      //add alert to ensure board should be deleted
      this.$store.dispatch("deleteBoard", this.board._id);
    }
  }
};
</script>
<style scoped>
.board {
  min-height: 100vh;
  background-image: url(./alex_rainer-fDqQOu13nUo-unsplash.jpg);
  background-size: cover;
  color: black;
}
.scrollable {
  overflow-x: scroll;
  flex-wrap: nowrap;
}
.lists-row::-webkit-scrollbar-track {
  background: transparent;
}
.card {
  display: inline-block;
}
</style>
