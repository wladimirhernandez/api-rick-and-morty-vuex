import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    characters: [],
    currentCharacter: [],
    pages: '',
    modal: false
  },
  mutations: {
    setCharacters(state, payload) {
        state.characters = payload;
    },
    setCurrentCharacter(state, payload) {
      state.modal =! state.modal;
      state.currentCharacter = payload;
  },
    setPages(state, payload) {
      state.pages = payload;
  },
  closeModal(state) {
    state.modal =! state.modal;
  }
  },
  actions: {
    fetchApi(state, params) {
      axios
        .get("https://rickandmortyapi.com/api/character/", { params })
        .then(res => {
         state.commit("setCharacters", res.data.results)         
         state.commit("setPages", res.data.info.pages)
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchId(state, id) {
      axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => {
          state.commit("setCurrentCharacter", res.data)         
        //  this.modal = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
