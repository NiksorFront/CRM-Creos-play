import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/languageSlice";
import designer from "./slices/designerSlice";

//comments, issues, designers, language
export const store = configureStore({
    reducer: {language, designer}, 
    // devTools=true,
})