<template>
  <div class="create-list">
    <form class="float-left ml-2" @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required />
      <button class="btn btn-sm btn-light" type="submit">Add A New List</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "createlist",
  data() {
    return {
      newList: {
        title: ""
      }
    };
  },
  computed: {},
  methods: {
    addList() {
      this.newList.boardId = this.$store.state.activeBoard._id;
      this.newList.creatorEmail = this.$store.state.activeBoard.creatorEmail;
      this.$store.dispatch("addList", this.newList);
      this.newList = { title: "" };
    }
  }
};
</script>