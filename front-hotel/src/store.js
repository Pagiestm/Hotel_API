import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slices/apiSlice";

export default configureStore({
    // définir les reducers qui font partie du store
    reducer: {
        // nom du reduceur : reducer
        'api' : api.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware)
})