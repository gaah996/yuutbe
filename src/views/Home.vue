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
import videoList from "@/components/VideoList.vue";
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

<style lang="scss" scoped>
@keyframes search-box {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50vh);
    top: 45px;
  }
}

.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 500ms;
  position: relative;

  header {
    margin: 0 0 20px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 800ms;

    &.searched {
      top: 0;
      transform: translateY(0);
      position: fixed;
      height: 60px;
      background: #d81b60;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
    }

    .logo {
      position: absolute;
      top: -100px;
      transition: all 500ms;
      opacity: 1;
      img {
        width: auto;
        height: 70px;
      }

      &.searched {
        opacity: 0;
      }
    }

    .search-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% - 40px);
      height: 50px;
      background: white;
      border: 1px solid #cecece;
      border-radius: 4px;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
      transition: all 800ms;

      &.searched {
        height: 45px;
        box-shadow: none;
        border: none;
      }

      input {
        margin-left: 20px;
        border: none;
        font-size: 18px;
        flex: 1;
      }

      button {
        margin-right: 10px;
        border: none;
        background: none;
        opacity: 0.5;
        cursor: pointer;
        transition: all 200ms;
        display: flex;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .results {
    margin-top: 70px;
  }
}

//Animations
.results-container-enter {
  transform: translateY(30px);
  opacity: 0;
}
.results-container-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.results-container-enter-active {
  transition: all 800ms 700ms;
}
</style>
