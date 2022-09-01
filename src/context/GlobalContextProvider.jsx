import React from "react";

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  // uri: "spotify:episode:0g84uH74eHsuF0jmBK9scF?si=553dfaa9a3b74339",
  uri: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_EPISODE": {
      return {
        ...state,
        uri: action.payload,
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
