import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { issueType } from "../../utils/types";
import request from "../../utils/API";

const initialState: Array<issueType> = [];

// @ts-ignore
export const requestIssues: AsyncThunk<issueType[], PromiseRejectedResult> = createAsyncThunk(
    "issues/requestIssues",
    () => {
        const result = request('issue/').then((res: issueType[]) => res)
                                        .catch(err => Promise.reject(err));

        return result;
    }
)

export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers:{},
    extraReducers: (build) => {
        build.addCase(requestIssues.pending, () => console.log("Ждём список дизайнеров")),          /*Загрузка началась*/ //@ts-ignore
        build.addCase(requestIssues.fulfilled, (state, action) => state = action.payload),          //Компоненты получены
        build.addCase(requestIssues.rejected, () => console.log("Ошибка получения данных"))         //Компоненты не получены
    }
})

export default issuesSlice.reducer;