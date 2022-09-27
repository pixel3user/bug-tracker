import {
    createContext,
    useContext,
    useReducer,
  } from "react";
import { useAuth } from "./authContext";
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const { currentuser } = useAuth();
    const INITIAL_STATE = {
      chatId: "null",
      user: {},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          console.log(action.payload)
          return {
            user: action.payload,
            chatId:
              currentuser.uid > action.payload.uid
                ? currentuser.uid + action.payload.uid
                : action.payload.uid + currentuser.uid,
          };
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };
  