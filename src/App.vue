<template>
  <div id="app">
    <transition name="load">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
  padding: 0;
}
.load-enter,
.load-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.load-enter-to,
.load-leave {
  transform: translateY(0);
  opacity: 1;
}
.load-enter-active,
.load-leave-active {
  transition: all 200ms;
}
</style>
