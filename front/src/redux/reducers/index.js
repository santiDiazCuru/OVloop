import { combineReducers } from "redux";
import dateReducer from "./date-reducer";
import messagesReducer from "./message-reducer";
import userReducer from "./userReducer";


export default combineReducers({
    date: dateReducer,
    messages : messagesReducer,
    user: userReducer
});
