import { CreateVendor } from "@/types/types";
import axiosInstance from "@/utils/utils";

//fetch registered users
const fetchAllVendors = async() => {
    const response = await axiosInstance.get('/admin/vendors')
    console.log(response.data.data.data)
    return response.data.data.data
};


//singleUser
const getSingleVendor  = async(userId: unknown) => {
    const response = await axiosInstance.get(`/admin/vendors/${userId}/detail`)
    console.log(response.data.data)
    return response.data.data
};


//singleUser
const createVendor  = async(userData: CreateVendor) => {
    const response = await axiosInstance.post(`/admin/vendors/store`, userData)
    console.log(response.data.data)
    return response.data.data
};



const vendorService = {
    fetchAllVendors,
    getSingleVendor,
    createVendor
};

export default vendorService;