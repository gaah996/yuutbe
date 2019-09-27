<template>
  <div class="videos-list">
    <div class="video-card" :key="video.id.videoId" v-for="video in videos">
      <div class="thumbnail">
        <img :src="video.snippet.thumbnails.high.url" alt="Thumbnail" />
      </div>
      <div class="info">
        <h1>{{video.snippet.title | decode}}</h1>
        <span>
          <img src="@/assets/icons/channel.svg" alt="Channel" />
          <h3>{{video.snippet.channelTitle | decode}}</h3>
        </span>
        <p>{{video.snippet.description | decode}}</p>
      </div>
      <button @click="goDetails(video.id.videoId)">Detalhes do vídeo</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "videos-list",
  mounted() {
    this.loadVideos();
  },
  computed: {
    videos: {
      get: function() {
        return this.$parent.videos;
      }
    }
  },
  methods: {
    loadVideos() {
      document.addEventListener("scroll", event => {
        if (
          window.scrollY + window.innerHeight >=
          document.body.scrollHeight * 0.9
        ) {
          if (!this.$parent.loading) {
            this.$parent.searchVideos(false);
          }
        }
      });
    },
    goDetails(videoId) {
      this.$router.push({
        name: "video-details",
        params: {
          id: videoId
        }
      });
    }
  }
};
</script>
<style src="./style.scss" lang="scss" scoped>
</style>