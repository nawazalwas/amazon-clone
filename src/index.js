import React from "react";
import App from "./components/App";
import reducer, { initialState } from "./components/Reducer";
import { AmazonProvider } from "./components/StateProvider";
import { createRoot } from 'react-dom/client';





const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <AmazonProvider initialState={initialState} reducer={reducer} >
        <App />
    </AmazonProvider>
);

