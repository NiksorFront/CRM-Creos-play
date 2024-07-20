import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { designerType } from "../../utils/types";
import request from "../../utils/API";

const initialState: Array<designerType> = [];

/*Хз, но почему-то тип считается неверным((*/  // @ts-ignore
export const requestDesigners: AsyncThunk<designerType[], PromiseRejectedResult>  = createAsyncThunk(
    "designer/requestDesigners",
    () => {
        const result = request('designer/')
                       .then(res => res)
                       .catch(err => Promise.reject(err));
        return result;
    }
)

export const designerSlice = createSlice({
    name: "designer",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(requestDesigners.pending, () => console.log("Ждём список дизайнеров")),          /*Загрузка началась*/ //@ts-ignore
        build.addCase(requestDesigners.fulfilled, (state, action) => state = action.payload.results),  //Компоненты получены
        build.addCase(requestDesigners.rejected, () => console.log("Ошибка получения данных"))         //Компоненты не получены
    }
})


export default designerSlice.reducer;
