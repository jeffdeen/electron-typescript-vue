import * as Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export interface State {}

export default new Vuex.Store<State>({
  modules: {},
  strict: process.env.NODE_ENV !== "production"
});
