import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    tasks: {},
    activeBoard: {}
  },
  mutations: {
    addTaskToDictionary(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks)
    },

    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board) {
      state.activeBoard = board;
    },
    setLists(state, lists) {
      state.lists = lists;
    },
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },

    async getBoardById({ commit, dispatch }, id) {
      try {
        let res = await api.get("boards/" + id);
        commit("setActiveBoard", res.data)
      } catch (e) {
        console.error(e);
      }
    },

    addBoard({ commit, dispatch }, boardData) {
      api.post('boards/', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    setActiveBoard({ commit }, board) {
      commit("setActiveBoard", board)
    },
    async deleteBoard({ commit, dispatch }, boardId) {
      try {
        let res = await api.delete("/boards/" + boardId)
        dispatch("getBoards")
        commit("setActiveBoard", {})
        router.push({ name: "boards" });
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion


    //#region -- LISTS --

    async getListsByBoardId({ commit, dispatch }, boardId) {
      try {
        let res = await api.get('boards/' + boardId + '/lists');
        commit("setLists", res.data)
      } catch (e) {
        console.error(e);
      }
    },

    async addList({ commit, dispatch }, listData) {
      try {
        let res = await api.post('lists', listData);
        dispatch('getListsByBoardId', listData.boardId)
      } catch (e) {
        console.error(e);
      }
    },

    async deleteList({ commit, dispatch }, listData) {
      try {
        let res = await api.delete("/lists/" + listData._id)
        dispatch("getListsByBoardId", listData.boardId)
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion

    //#region --TASKS--

    async updateTask({ commit, dispatch }, taskData) {
      try {
        let res = await api.post('tasks', taskData);
        dispatch('getTasksByListId', taskData.listId)
      } catch (e) {
        console.error(e);
      }
    },

    async moveTask({ commit, dispatch }, payload) {
      try {
        let res = await api.put('tasks/' + payload.taskData.id, { listId: payload.newListId });
        dispatch('getTasksByListId', payload.taskData.listId)
        dispatch('getTasksByListId', payload.newListId)
      } catch (e) {
        console.error(e);
      }
    },

    async getTasksByListId({ commit, dispatch }, listId) {
      try {
        let res = await api.get('lists/' + listId + '/tasks');
        commit("addTaskToDictionary", { listId, tasks: res.data })
      } catch (e) {
        console.error(e);
      }
    },

    async deleteTask({ commit, dispatch }, taskData) {
      try {
        let res = await api.delete("/tasks/" + taskData._id)
        dispatch("getTasksByListId", taskData.listId)
      } catch (error) {
        console.error(error)
      }
    },

    //#endregion
  }
})
