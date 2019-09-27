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

Vue.filter("decode", value => {
  var txt = document.createElement("textarea");
  txt.innerHTML = value;
  return txt.value;
});
