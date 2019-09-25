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
        <h3>{{video.snippet.channelTitle}}</h3>
        <div class="rating">
          <img src="@/assets/icons/like.svg" alt="Like" />
          <p>{{video.statistics.likeCount}}</p>
          <img src="@/assets/icons/dislike.svg" alt="Dislike" />
          <p>{{video.statistics.dislikeCount}}</p>
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
    loading: false,
    apiKey: "AIzaSyBBwc-UHHrfXRnik1wAxZ-mf-aBn9SEFwI"
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
            `key=${this.apiKey}&` +
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
      <iframe id="ytplayer" type="text/html" width="${container.clientWidth}" height="${container.clientHeight}"
  src="http://www.youtube.com/embed/${this.video.id}?autoplay=1"
  frameborder="0"/>
    `;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  header {
    background: white;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 3px 4px #cecece;
    margin-bottom: 20px;

    button {
      margin: 0 20px;
      width: 35px;
      height: 35px;
      background: none;
      border: 2px solid #000;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.5;
      transition: all 200ms;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
    h1 {
      font-size: 26px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .video-info {
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);

    .thumbnail {
      width: 100%;
      height: 180px;
      margin: 20px 0;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
      }
      &.no-before::before {
        display: none;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        background: none;
        width: 35px;
        height: 35px;
        border: 2px solid #fff;
        cursor: pointer;
      }
    }
    .details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0 20px;

      h3 {
        font-size: 20px;
        font-weight: normal;
        padding: 10px 0;
        margin-right: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .rating {
        display: flex;
        img {
          margin: 0 10px;
          width: 20px;
          height: 20px;
        }
      }
    }
    .description {
      margin-bottom: 20px;
      p {
        text-align: left;
        font-size: 16px;
      }
    }
    .views {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        margin-right: 10px;
      }
    }
  }
  .loading {
    width: 100%;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 100px;
    }
    p {
      margin: 20px 0;
      font-size: 20px;
    }
  }
}
</style>