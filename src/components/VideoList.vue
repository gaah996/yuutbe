<template>
  <div class="videos-list">
    <div class="video-card" :key="video.id.videoId" v-for="video in videos">
      <div class="thumbnail">
        <img :src="video.snippet.thumbnails.high.url" alt="Thumbnail" />
      </div>
      <div class="info">
        <h1>{{video.snippet.title}}</h1>
        <h3>{{video.snippet.channelTitle}}</h3>
        <p>{{video.snippet.description}}</p>
      </div>
      <button>Detalhes do vídeo</button>
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
    }
  }
};
</script>
<style lang="scss" scoped>
.videos-list {
  display: flex;
  flex-direction: column;
  width: 100%;

  .video-card {
    margin: 10px 20px;
    padding: 20px;
    background: white;
    border-bottom: 1px solid #cecece;

    &:last-child {
      border-bottom: none;
    }

    .thumbnail {
      width: 100%;
      height: 180px;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .info {
      text-align: left;
      h1 {
        font-size: 26px;
      }
      h3 {
        font-size: 20px;
        font-weight: normal;
        padding: 10px 0;
      }
      p {
        font-size: 16px;
      }
    }
    button {
      background: #cecece;
      border-radius: 4px;
      margin: 20px 0 0;
      padding: 0 20px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      box-shadow: 0 1px 4px #cecece;
      cursor: pointer;
    }
  }
}
</style>