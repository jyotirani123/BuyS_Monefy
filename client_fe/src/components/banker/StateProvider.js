import react,{ createContext,useContext,useReducer} from 'react';
//prepares the dataLayer
export const StateContext=createContext();

//wrap the app and provide the Data layer
export const StateProvider=({reducer,initialState,children})=>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);
//pull info from the data layer
export const useStateValue=()=>useContext(StateContext);