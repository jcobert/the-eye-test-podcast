import React from "react";

const GlobalStateContext = React.createContext();
const GlobalDispatchContext = React.createContext();

const initialState = {
  uri: "",
};

function reducer(state, action) {
  state.uri = action.value;
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
