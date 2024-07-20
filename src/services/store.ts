import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/languageSlice";


//comments, issues, designers, language
export const store = configureStore({
    reducer: {language}, 
    // devTools=true,
})