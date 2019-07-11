import { combineReducers } from "redux";
import dateReducer from "./date-reducer";
import messagesReducer from "./message-reducer";


export default combineReducers({
    date: dateReducer,
    messages : messagesReducer
});
