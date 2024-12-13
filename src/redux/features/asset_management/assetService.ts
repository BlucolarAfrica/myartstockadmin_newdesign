import axiosInstance from "@/utils/utils";

//fetch assets
const fetchAssets = async(query: string) => {
    const response = await axiosInstance.get(`/admin/assets?status=${query}`)
    return response.data.data.data
};

//assets details
const assetDetails  = async(id: unknown) => {
    const response = await axiosInstance.get(`/admin/assets/${id}/detail`)
    return response.data.data
};


//assets details
// const updateStatus  = async(id: number, status:string) => {
//     const response = await axiosInstance.post(`/admin/assets/${id}/update-status`, status)
//     return response.data.data
// };

// product category
const fetchCategories = async() => {
    const response = await axiosInstance.get(`/admin/categories`)
    return response.data.data.data
}

// product category
const deleteCategory = async(id: number) => {
    const response = await axiosInstance.post(`/admin/categories/${id}/delete`)
    return response.data.message
}


const assetService = {
    fetchAssets,
    assetDetails,
    fetchCategories,
    deleteCategory
    // updateStatus
};

export default assetService;