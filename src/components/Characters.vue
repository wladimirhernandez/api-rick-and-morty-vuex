<template>
  <div class="column is-12-mobile is-3-tablet is-4-desktop">
    <div class="card">
      <div class="card-header">
        <img :src="character.image" :alt="character.name" />
      </div>
      <div class="card-content">
        <h3 class="title is-size-4">{{ character.name }}</h3>
        <button
          class="button is-rounded is-success is-centered is-small"
          @click="viewMore(character.id)"
        >Ver Mas</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["character"],
  methods: {
    viewMore(id) {
     this.$emit('showModal', id)
    }
  }
};
</script>

<style scoped>
    img {
        width: 100%;
    }
</style>