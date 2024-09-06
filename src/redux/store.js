import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducer } from "./userReducer";

const redusers = combineReducers({
    users: userReducer
})


export const store=createStore(redusers, composeWithDevTools());