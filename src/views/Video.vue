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

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  header {
    background: #d81b60;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
    color: white;
    button {
      margin: 0 20px;
      width: 35px;
      height: 35px;
      background: none;
      border: 2px solid white;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.8;
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
    align-items: center;
    width: 100%;

    .thumbnail {
      width: 100%;
      height: 220px;
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
      padding: 8px 0;
      background: rgba(238, 238, 238, 0.8);
      border-bottom: 1px solid #cecece;
      width: 100%;

      .channel {
        display: flex;
        img {
          margin-left: 20px;
        }
        h3 {
          margin-left: 5px;
          font-size: 18px;
          font-weight: normal;
          padding: 10px 0;
          margin-right: 20px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .rating {
        display: flex;
        margin-right: 20px;
        span {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 5px;
          border-right: 1px solid #cecece;

          &:last-child {
            border-right: none;
          }
          img {
            margin-bottom: 5px;
            width: 20px;
            height: 20px;
            opacity: 0.7;
          }
        }
      }
    }
    .description {
      padding: 20px 0;
      width: 100%;
      word-wrap: break-word;
      white-space: pre-wrap;
      p {
        text-align: left;
        font-size: 16px;
        padding: 0 20px;
      }
      border-bottom: 1px solid #cecece;
    }
    .views {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin: 20px 0;

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