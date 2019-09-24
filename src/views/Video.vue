<template>
  <div class="container">
    <header>
      <button @click="goBack()">Voltar</button>
    </header>
  </div>
</template>

<script>
export default {
  name: "video-details",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>