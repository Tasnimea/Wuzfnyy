import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import favReducer from "../reducers/reducer"



const store =createStore(favReducer,composeWithDevTools())
export default store
