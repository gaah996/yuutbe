<template>
  <div class="container">
    <header>
      <button @click="goBack()">
        <img src="@/assets/icons/arrow_left.svg" alt="Back" />
      </button>
      <h1 v-if="video">{{video.snippet.title}}</h1>
    </header>
    <div class="video-info" v-if="video">
      <div class="thumbnail">
        <button @click="play()">
          <img src="@/assets/icons/play.svg" alt="Play" />
        </button>
        <img :src="video.snippet.thumbnails.high.url" alt="Thumbnail" />
      </div>
      <div class="details">
        <span class="channel">
          <img src="@/assets/icons/channel.svg" alt />
          <h3>{{video.snippet.channelTitle}}</h3>
        </span>
        <div class="rating">
          <span>
            <img src="@/assets/icons/like.svg" alt="Like" />
            <p>{{video.statistics.likeCount | mask}}</p>
          </span>
          <span>
            <img src="@/assets/icons/dislike.svg" alt="Dislike" />
            <p>{{video.statistics.dislikeCount | mask}}</p>
          </span>
        </div>
      </div>
      <div class="description">
        <p>{{video.snippet.description}}</p>
      </div>
      <div class="views">
        <img src="@/assets/icons/views.svg" alt="Views" />
        <p>{{video.statistics.viewCount | mask}} {{video.statistics.viewCount | viewText}}</p>
      </div>
    </div>
    <div class="loading" v-else>
      <img src="@/assets/icons/loading_big.gif" alt="Loading" />
      <p>Carregando vídeo...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "video-details",
  data: () => ({
    video: null,
    loading: false
  }),
  created() {
    this.loadVideo();
    window.scrollTo(0, 0);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async loadVideo() {
      try {
        const result = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?` +
            `key=${process.env.VUE_APP_GOOGLE_API_KEY}&` +
            `id=${this.$router.currentRoute.params.id}&` +
            `part=snippet,statistics`
        );
        this.video = result.data.items[0];
      } catch (err) {
        console.error(err);
      }
    },
    play() {
      const container = document.querySelector(".thumbnail");
      container.classList.add("no-before");
      container.innerHTML = `
      <iframe style="border:none;"id="ytplayer" type="text/html" width="${container.clientWidth}" height="${container.clientHeight}"
  src="http://www.youtube.com/embed/${this.video.id}?autoplay=1&frameborder="0"/>
    `;
    }
  }
};
</script>

<style src="./style.scss" lang="scss" scoped>
</style>