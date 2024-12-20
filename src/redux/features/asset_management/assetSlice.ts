import {AssetCategoriesProps, AssetFrameProps, AssetProps, AssetState } from '../../../types/types';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import assetService from './assetService';
import axiosInstance from '@/utils/utils';



const initialState: AssetState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    assets: [],
    assetsDetail: null,
    categories: [],
    deleteMsg: '',
    frames: [],
    updateFrameStatusMsg: ''
};


//fetchAsset
export const FetchAssets = createAsyncThunk(
    'assets/fetchAssets',
    async(query: string, thunkAPI) => {
        try {
            return await assetService.fetchAssets(query)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

//fetchAssetDetails
export const AssetDetails = createAsyncThunk(
    'asset/assetDetails',
    async(id: number, thunkAPI) => {
        try {
            return await assetService.assetDetails(id)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

//update_status
export const updateStatus = createAsyncThunk(
    'asset/updateStatus',
    async({ id, status, reason}: { id: number; status: string, reason?: string}, thunkAPI) => {
        try {
            const response = await axiosInstance.post(`/admin/assets/${id}/update-status`, {status, reason})
            console.log(response.data.data)
            return response.data.data
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

//categories
export const FetchCategories = createAsyncThunk(
    'assets/fetchCategories',
    async(_, thunkAPI) => {
        try {
            return await assetService.fetchCategories()
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);


//categories
export const FetchFrames = createAsyncThunk(
    'assets/fetchFrames',
    async(_, thunkAPI) => {
        try {
            return await assetService.fetchFrames()
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);

//DeleteCategory
export const DeleteCategory = createAsyncThunk(
    'asset/deleteCategory',
    async(id: number, thunkAPI) => {
        try {
            return await assetService.deleteCategory(id)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);


//DeleteCategory
export const UpdateFrameStatus = createAsyncThunk(
    'asset/updateFrameStatus',
    async(id: number, thunkAPI) => {
        try {
            return await assetService.updateFrameStatus(id)
        }catch(error){
            if (error instanceof Error) {  
                return thunkAPI.rejectWithValue(error.message);
            } else {
            console.error("An unknown error occurred");
            }
        }
    }
);


const assetSlice = createSlice({
    name: "assets",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        // fetchAssets
        .addCase(FetchAssets.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(FetchAssets.fulfilled, (state, {payload}:PayloadAction<AssetProps[]>) => {
            state.isLoading = false;
            state.assets = payload;
            console.log(payload)
        })
        .addCase(FetchAssets.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })


        // fetchAssetDetails
        .addCase(AssetDetails.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(AssetDetails.fulfilled, (state, {payload}:PayloadAction<AssetProps>) => {
            state.isLoading = false;
            state.assetsDetail = payload;
            console.log(payload)
        })
        .addCase(AssetDetails.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })


         // update status
         .addCase(updateStatus.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(updateStatus.fulfilled, (state, {payload}:PayloadAction<AssetProps>) => {
            state.isLoading = false;
            const item = state.assets.find((item) => item.id === payload.id);
            if (item) {
            item.status = payload.status;
            }
            console.log(item?.status)
        })
        .addCase(updateStatus.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })

         // fetchCategories
         .addCase(FetchCategories.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(FetchCategories.fulfilled, (state, {payload}:PayloadAction<AssetCategoriesProps[]>) => {
            state.isLoading = false;
            state.categories = payload;
            console.log(payload)
        })
        .addCase(FetchCategories.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })

        // fetchCategories
        .addCase(FetchFrames.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(FetchFrames.fulfilled, (state, {payload}:PayloadAction<AssetFrameProps[]>) => {
            state.isLoading = false;
            state.frames = payload;
            console.log(payload)
        })
        .addCase(FetchFrames.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })

         // delete Category
         .addCase(DeleteCategory.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(DeleteCategory.fulfilled, (state, {payload}:PayloadAction<string>) => {
            state.isLoading = false;
            state.deleteMsg = payload;
            console.log(payload)
        })
        .addCase(DeleteCategory.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })

         // update frame status
         .addCase(UpdateFrameStatus.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMsg = "";
        })
        .addCase(UpdateFrameStatus.fulfilled, (state, {payload}:PayloadAction<string>) => {
            state.isLoading = false;
            state.updateFrameStatusMsg = payload;
            console.log(payload)
        })
        .addCase(UpdateFrameStatus.rejected, (state, {payload}:PayloadAction<unknown>) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMsg = payload as string;
            console.log(state.errorMsg)
        })

    }
})


export default assetSlice.reducer;