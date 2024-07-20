import { configureStore } from "@reduxjs/toolkit";
import language from "./slices/languageSlice";
import designer from "./slices/designerSlice";
import comments from "./slices/commentsSlice";
import issues from "./slices/issuesSlice";

//comments, issues, designers, language
export const store = configureStore({
    reducer: {language, designer, comments, issues}, 
    // devTools=true,
})