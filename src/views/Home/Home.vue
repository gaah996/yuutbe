<template>
  <div class="home">
    <header :class="{searched: searched}">
      <div class="logo" :class="{searched: searched}">
        <img src="@/assets/logo.svg" alt="Logo" />
      </div>
      <form @submit="searchVideos" class="search-box" :class="{searched: searched}">
        <input
          type="text"
          placeholder="Pesquisar"
          :value="query"
          @input="e => {$store.commit('query', e.target.value)}"
        />
        <button type="submit">
          <img src="@/assets/icons/search.svg" alt="Search" v-if="!loading" />
          <img src="@/assets/icons/loading.gif" alt="Loading" v-else />
        </button>
      </form>
    </header>
    <transition name="results-container">
      <div class="results" v-if="searched">
        <videos-list v-if="videos.length > 0"></videos-list>
        <div class="error" v-if="!loading && videos.length == 0">
          <p>:(</p>
          <p>Não encontramos vídeos com o termo buscado.</p>
          <p>Utilize outras palavras-chave.</p>
        </div>
        <div class="loading" v-else>
          <img src="@/assets/icons/loading.gif" alt="Loading" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import videoList from "@/components/VideoList/VideoList.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    "videos-list": videoList
  },
  methods: {
    async searchVideos(clean = true) {
      this.$store.commit("searched", true);
      this.$store.commit("loading", true);
      if (clean) {
        this.$store.commit("pageToken", null);
        window.scrollTo(0, 0);
      }
      try {
        const result = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?` +
            `key=${process.env.VUE_APP_GOOGLE_API_KEY}&` +
            `part=snippet&` +
            `maxResults=6&` +
            `q=${this.query}&` +
            `type=video&` +
            `${this.pageToken ? "pageToken=" + this.pageToken : ""}`
        );
        if (clean) {
          this.$store.commit("videos", result.data.items);
        } else {
          let partialVideos = this.videos.concat(result.data.items);

          //Treat duplicated entries
          const getUnique = arr => {
            const unique = arr
              .map(e => e["id"]["videoId"])
              .map((e, i, final) => final.indexOf(e) === i && i)
              .filter(e => arr[e])
              .map(e => arr[e]);

            return unique;
          };

          this.$store.commit("videos", getUnique(partialVideos));
        }

        this.$store.commit(
          "pageToken",
          typeof result.data.nextPageToken != "undefined"
            ? result.data.nextPageToken
            : null
        );
      } catch (err) {
        console.error(err);
      }
      this.$store.commit("loading", false);
    }
  },
  computed: mapState([
    "searched",
    "query",
    "apiKey",
    "pageToken",
    "videos",
    "loading",
    "pageScroll"
  ])
};
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
