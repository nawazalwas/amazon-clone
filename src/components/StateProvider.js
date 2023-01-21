import React,{ createContext, useContext, useReducer } from "react";

export const AmazonContext = createContext();

export const AmazonProvider = ({reducer,initialState,children})=>{
    return (
        <AmazonContext.Provider value={useReducer(reducer,initialState)}>
            {children}

        </AmazonContext.Provider>
    );
}

export const AmazonUseContext =() => useContext(AmazonContext);