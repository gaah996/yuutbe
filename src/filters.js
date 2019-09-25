import Vue from "vue";

Vue.filter("mask", value => {
  return new Intl.NumberFormat("pt-BR").format(value);
});

Vue.filter("viewText", value => {
  if (value == 1) {
    return "visualização";
  } else {
    return "visualizações";
  }
});
