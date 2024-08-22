import { combineReducers } from "redux";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import phoneslice from './PhoneSlice'
import contact from './Slice'

const rootReducer = combineReducers({
    contacts: contact,
    phonenumber: phoneslice
})

const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer( persistConfig, rootReducer)

const store =configureStore({
    reducer:persistedReducer
})
const persitor =persistStore(store)

export { store, persitor}