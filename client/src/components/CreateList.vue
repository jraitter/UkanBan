<template>
  <div class="create-list col-4">
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required />
      <button type="submit">Add List!</button>
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