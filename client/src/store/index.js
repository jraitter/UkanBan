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
    activeBoard: {}
  },
  mutations: {
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
    //#endregion


    //#region -- LISTS --

    async getListsByBoardId({ commit, dispatch }, boardId) {
      try {
        // let res = await api.get("lists/");
        let res = await api.get('boards/' + boardId + '/lists');
        commit("setLists", res.data)
      } catch (e) {
        console.error(e);
      }
    },


    // getLists({ commit, dispatch }, boardId) {
    //   api.get('boards/' + boardId + '/lists')
    //     .then(res => { commit('setLists'), res.data })
    // },


    addList({ commit, dispatch }, listData) {
      api.post('lists', listData).then(serverList => {
        dispatch('getListsByBoardId', listData.boardId)
      })
    },
    async deleteList({ commit, dispatch }, listData) {
      try {
        let res = await api.delete("/lists" + listData._id)
        commit("getListsByBoardId", listData.boardId)
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion

    //#region --TASKS--

    //#endregion
  }
})
