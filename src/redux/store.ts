import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'
import userReducer from './features/user/userSlice'
import vendorReducer from './features/vendor/vendorSlice'
import contributorReducer from './features/contributor/contributorSlice'
import orderReducer from './features/orders/orderSlice'
import assetReducer from './features/asset_management/assetSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from './noopStorage';




// const storageFallback = typeof window !== 'undefined' ? storage : noopStorage;



const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    vendor: vendorReducer,
    contributor: contributorReducer,
    order: orderReducer,
    assets: assetReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Required for redux-persist
    }),

});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
