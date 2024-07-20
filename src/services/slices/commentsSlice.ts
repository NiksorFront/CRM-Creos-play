import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentType } from "../../utils/types";
import request from "../../utils/API";

const initialState: Array<commentType> = [];

// @ts-ignore
export const requestComments: AsyncThunk<commentType[], PromiseRejectedResult> = createAsyncThunk(
    "comments/requestComments",
    () => {
        const result = request('comment/').then((res: commentType[]) => res)
                                          .catch(err => Promise.reject(err));

        return result;
    }
)

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers:{},
    extraReducers: (build) => {
        build.addCase(requestComments.pending, () => console.log("Ждём список дизайнеров")),          /*Загрузка началась*/ //@ts-ignore
        build.addCase(requestComments.fulfilled, (state, action) => state = action.payload),          //Компоненты получены
        build.addCase(requestComments.rejected, () => console.log("Ошибка получения данных"))         //Компоненты не получены
    }
})

export default commentsSlice.reducer;