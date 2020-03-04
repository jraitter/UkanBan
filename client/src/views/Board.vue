<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading, if page does not load, refresh</h1>
    <div class="row lists-row scrollable">
      <div v-for="(listObj) in lists" :key="listObj._id" :listData="listObj">{{listData.title}}</div>
    </div>
  </div>
</template>

<script>
import list from "@/components/List";
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
      this.$store.dispatch("getLists", this.$route.params.boardId);
    }
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
    list
  },
  methods: {
    setActiveBoard() {
      this.$store.dispatch("setActiveBoard", this.boardId);
    }
  }
};
</script>
<style scoped>
.scrollable {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}
.card {
  display: inline-block;
}
</style>
