import React from "react";

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  uri: "",
  title: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_EPISODE": {
      return {
        ...state,
        uri: action.payload[0],
        title: action.payload[1],
      };
    }
    case "UNLOAD_EPISODE": {
      return {
        ...state,
        uri: "",
        title: "",
      };
    }
    default:
      throw new Error("Bad action type.");
  }
}

function GlobalContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}

export default GlobalContextProvider;
