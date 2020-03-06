<template>
  <div class="create-list col-6">
    <form class="float-left ml-2" @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required />
      <button class="btn btn-block btn-light" type="submit">Add List!</button>
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