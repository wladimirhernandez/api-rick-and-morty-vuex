<template>
  <div id="app">
    <div class="hero is-white is-gradient is-bold">
      <div class="hero-body container">
        <img alt="Vue logo" class="mx-auto" src="./assets/logo.png" />
        <h1 class="title">
          <span class="has-text-success mr-05">Rick & Morty</span>
          <span class="subtitle">Personajes</span>
        </h1>
        <div class="field">
          <div class="control">
            <input
              v-model="search"
              class="input"
              type="text"
              @keyup.enter="searchData()"
              placeholder="Buscar Personajes"
            />
          </div>
          <div class="control">
            <button class="button is-fullwidth is-success mx-auto" @click="searchData()">Consultar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-24">
      <div class="columns is-desktop is-mobile is-tablet is-multiline">
        <characters
          @showModal="showModal"
          v-for="character of characters "
          :character="character"
          :key="character.id"
        />
      </div>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click="changePage(page - 1)">Anterior</a>
        <ul class="pagination-list">
          <li v-if="page == pages">
            <a class="pagination-link" @click="changePage(1)" aria-label="Goto firt page">1</a>
          </li>
          <li v-if="page !== pages">
            <a class="pagination-link is-current">{{ page }}</a>
          </li>
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            <a
              :class="{'pagination-link is-current': page == pages, 'pagination-link': page !== pages}"
              @click="changePage(pages)"
              aria-label="Goto last page"
            >{{ pages }}</a>
          </li>
        </ul>
        <a class="pagination-next" @click="changePage(page + 1)">Siguiente</a>
      </nav>
    </div>
    <div class="modal" v-if="modal" :class="{ 'is-active': modal }">
      <div class="modal-background" @click="modal  = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{currentCharacter.name}}</p>
          <button @click="modal  = false" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <p>Genero: {{currentCharacter.gender}}</p>
          <p>Estado: {{currentCharacter.status}}</p>
          <p>Raza: {{currentCharacter.species}}</p>
          <p v-if="!currentCharacter.type == ''">Tipo: {{currentCharacter.type}}</p>
        </section>
        <footer class="modal-card-foot">
          <button @click="modal  = false" class="button is-danger if-left">Cerrar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Characters from "./components/Characters";

export default {
  name: "App",
  data: function() {
    return {
      characters: [],
      page: 1,
      pages: 1,
      search: "",
      currentCharacter: [],
      modal: false
    };
  },
  created() {
    this.fetch();
  },
  components: {
    Characters
  },
  methods: {
    fetch() {
      const params = {
        page: this.page,
        name: this.search
      };

      axios
        .get("https://rickandmortyapi.com/api/character/", { params })
        .then(res => {
          this.pages = res.data.info.pages;
          this.characters = res.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changePage(page) {
      this.page = page <= 0 || page > this.pages ? this.pages : page;
      this.fetch();
    },
    searchData() {
      this.fetch();
    },
    showModal(id) {
      this.fetchId(id);
    },
    async fetchId(id) {
      axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => {
          console.log(res.data);
          this.currentCharacter = res.data;
          this.modal = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.mr-05 {
  margin-right: 0.5rem;
}
.mx-auto {
  margin: 0 auto;
  display: block !important;
}
.py-24 {
  padding: 4rem 0 !important;
}

.container, .modal-card {
  padding: 15px;
}
</style>
