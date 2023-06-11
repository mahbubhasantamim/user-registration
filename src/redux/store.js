import { legacy_createStore as createStore } from "redux";
import { Reducer } from "./reducer";

const myStore = createStore(Reducer);

export default myStore;
