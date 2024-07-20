import { createSlice } from "@reduxjs/toolkit";

/*Здесь вообще ооочень простая реализация и можно было бы проще сделать смену языка, но в преспективе языков может быть много, поэтому реализация через slice пригодится*/
const initialState = "Русский";

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers:{ 
        changeLanguage: state => state === "Русский" ? 'English' : "Русский"
    }
})

export const changeLanguage = languageSlice.actions.changeLanguage;
export default languageSlice.reducer;