import {store} from "../services/store";
import {useDispatch as useDispatchRedux, useSelector as useSelectorRedux, TypedUseSelectorHook} from "react-redux";

type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useDispatchRedux<AppDispatch>();

export type StoreType = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<StoreType> = useSelectorRedux;
