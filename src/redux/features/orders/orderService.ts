import axiosInstance from "@/utils/utils";

//fetch orders
const fetchOrders = async(param:string) => {
    const response = await axiosInstance.get(`/admin/orders?category=${param}`)
    return response.data.data.data
};

//order details
const orderDetails  = async(id: unknown) => {
    const response = await axiosInstance.get(`/admin/orders/${id}/details`)
    return response.data.data
};



const orderService = {
    fetchOrders,
    orderDetails
};

export default orderService;