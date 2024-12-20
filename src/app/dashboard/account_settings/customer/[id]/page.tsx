/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { getSingleUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import icon1 from '../../../../../../public/assets/410.png'
import icon2 from '../../../../../../public/assets/Mask group.png'
import { TbCurrencyNaira } from "react-icons/tb";
import { fetchRegisteredUsers } from '@/redux/features/user/userSlice'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Loader from "@/shared/Loader";
import { RootState } from "@/redux/store";
import { BsThreeDotsVertical } from "react-icons/bs";
import OrderDetailsModal from "@/components/order/OrderDetailsModal";
import AssignVendorModal from "@/components/order/AssignVendorModal";



const UserDetails = ({params}: {params: Promise<{ id: number }>}) => {
    const {isLoading, isError, errorMsg, singleUser} = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const { id } = React.use(params)
    const router = useRouter();
    const [viewMoreBtn, setViewMoreBtn] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
    const [assignVendorModal, setAssignVendorModal] = useState(false)
    const [allData, setAllData] = useState<Record<string, any> | null>(null);
    const [viewDetails, setViewDetails] = useState(false);


    useEffect(() => {
        dispatch(fetchRegisteredUsers())
        dispatch(getSingleUser(id));
    },[dispatch, id])   


    // console.log(singleUser?.order_history)
    const toggleMenu = (id: number) => {
        setViewMoreBtn(viewMoreBtn === id ? null : id);
    };

    const handleViewDetail = (param: Record<string, any>,param2: Record<string, any>) =>{
        setSelectedItem(param)
        setAllData(param2)
        setViewDetails(true)
    };

    const handleCloseOrderModal = () => {
        setViewDetails(false);
        setSelectedItem(null);
    };

     const handleAssignModal = (param: Record<string, any>,param2: Record<string, any>) =>{
        setSelectedItem(param)
        setAllData(param2)
        setAssignVendorModal(true)
    };

    const handleCloseAssignModal = () => {
        setAssignVendorModal(false);
        setSelectedItem(null);
    };
   

    if(isLoading){
        return <Loader/>
    }

    if(isError){
        return <p>{errorMsg}</p>
    }


    if (!singleUser) {
        return <div className="text-center font-bold py-10">User not found!</div>;
    }

  
  return (
    <div className="p-4">
        <div className="flex items-center text-[#6D6D6D] text-sm"><MdArrowBackIosNew /> <span onClick={() => router.back()} className="text-blue-600 cursor-pointer">Customer Management</span>/{singleUser?.personal_information.first_name}</div>
        <div className="flex justify-between pt-10">
            <div className="flex gap-2">
                <span className="h-32 w-32 border rounded overflow-hidden">
                    {<img src={singleUser?.personal_information.profile_image?? "null" } alt={"image"} className='h-full w-full'/>}
                </span>
                <div className="flex flex-col gap-8">
                    <ul className="space-y-2">
                        <li className="font-bold text-[#151515] text-2xl">{singleUser?.personal_information.first_name} {singleUser?.personal_information.last_name}</li>
                        <li>{singleUser.personal_information.status === true? <span className='bg-[#06D6A00D] rounded-lg px-2 py-1 text-sm text-[#2F4858]'>Active</span> : <span className='bg-[#F99E0B40] text-orange rounded-lg px-2 py-1 text-sm text-[#F99E0B]'>In-Active</span> }</li>
                        <li className="text-[#B1B1B1] font-semibold text-xs ">Referral Code: {singleUser.personal_information.referral_code ?? "null"} </li>
                    </ul>
                    <ul className="space-y-4 text-[#151515]">
                        <li className="uppercase text-[#8F8F8F] font-bold">Contact information</li>
                        <li className="flex items-center">
                            <span>Phone: </span> 
                            <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{singleUser.personal_information.phone_number ? singleUser.personal_information.phone_number : "null"}</span>
                        </li>
                        <li className="flex items-center">
                            <span>Email Address: </span>
                            <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{singleUser?.personal_information.email}</span>
                        </li>
                        <li className="">Country:
                            <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{singleUser?.personal_information.country?? "null"}</span>
                        </li>
                        <li>
                            <span>Residential Address:{singleUser?.personal_information.address ?? "null"}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <span><button className="bg-[#BCBCBC80] text-[#6D6D6D] rounded p-3">Disorder User</button></span>
                <ul className="space-y-4">
                    <li className="uppercase text-[#8F8F8F] font-bold">Basic information</li>
                    <li className="flex items-center">
                        <span>Gender: {" "} {singleUser?.personal_information.gender}</span> 
                        <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{singleUser.personal_information.gender ? singleUser.personal_information.phone_number : "null"}</span>
                    </li>
                    <li className="flex items-center">
                        <span>Date of birth: {singleUser?.personal_information.date_of_birth ?? "null"} </span>
                    </li>
                </ul>
            </div>
            <div className="bg-[#F9FCFF] w-[300px] h-[200px] p-4 rounded border flex flex-col justify-around">
                <ul className="flex gap-8 justify-between">
                    <li className="flex flex-col text-[#2F4858] text-2xl">
                        <span className="text-[#656565] text-sm">Total Orders</span>
                        {singleUser.total_orders?.toLocaleString()}
                    </li>
                    <li>
                        <Image src={icon1} alt="icon1" width={40} quality={100}/>
                    </li>
                </ul>
                <span className="border"></span>
                <ul className="flex gap-8 justify-between">
                    <li className="flex flex-col text-[#2F4858] text-2xl">
                        <span className="text-[#656565] text-sm">Amount Spent</span>
                        <span className="flex items-center">
                            <TbCurrencyNaira className="text-[#656565]" />
                            {singleUser.total_amount_spent?.toLocaleString()}
                        </span>
                    </li>
                    <li>
                        <Image src={icon2} alt="icon1" width={40} quality={100}/>
                    </li>
                </ul>
            </div>
        </div>
        {/* {} */}
        <div>
            <p className="py-6 font-bold text-base text-[#333333]">Order History</p>
            <div className='px-5'>
                <div className=''>
                    <table className='min-w-full bg-white border border-gray-200/40'>
                        <thead>
                            <tr className="bg-gray-100/40 text-[#998E8D] font-semibold text-xs">
                                <th className="py-4 px-4 text-left border-b">S/N</th>
                                <th className="py-4 px-4 text-left border-b">Order Number</th>
                                <th className="py-4 px-4 text-left border-b">Customer Name</th>
                                <th className="py-4 px-4 text-left border-b flex items-center">Amount(<TbCurrencyNaira />)</th>
                                <th className="py-4 px-4 text-left border-b">Date</th>
                                {/* <th className="py-4 px-4 text-left border-b">Payment Type</th> */}
                                <th className="py-4 px-4 text-left border-b">Status</th>
                                <th className="py-4 px-4 text-left border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { !singleUser && !isLoading?
                            <tr className='py-5 flex justify-center items-center font-bold text-[#333333] relative'>
                                <td className='py-4 px-4 text-center'>No matching data found</td>
                            </tr>
                            : 
                            singleUser.order_history?.map((item, index) => {
                                return (
                                    <tr key={item.id} className='hover:bg-gray-50 text-[#333333] font-normal text-xs pb-2 hover:cursor-pointer'>
                                        <td className='py-4 px-4 border-b'>{index + 1}</td>
                                        <td className='py-4 px-4 border-b text-[#5420A4]'>{item.sku}</td>
                                        <td className='py-4 px-4 border-b'>{item.customer?.first_name}</td>
                                        <td className='py-2 px-4 border-b text-[#5420A4]'>{item.total_amount?.toLocaleString()}</td>
                                        <td className='py-4 px-4 border-b'>{new Date(item?.created_at).toLocaleDateString()}</td>
                                        {/* <td className='py-4 px-4 border-b'>{item.payment_type ?? "null"}</td> */}
                                        <td className='py-4 px-4 border-b'>{item.status}</td>
                                        <td className='py-4 px-4 border-b relative'>
                                            <BsThreeDotsVertical onClick={ () => toggleMenu(item.id)} onMouseEnter={ () => toggleMenu(item.id)}  className='hover:cursor-pointer'/>
                                            {viewMoreBtn === item.id && (
                                                <div onClick={ () => toggleMenu(item.id)}  onMouseLeave={ () => toggleMenu(item.id)}  className="absolute right-16 top-3 mt-1 w-36 border bg-white shadow-lg rounded-lg z-10 text-[#333333]">
                                                    <ul className="p-2 text-xs">
                                                        <li className="py-2 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleViewDetail(item, singleUser)}>
                                                            View Order
                                                        </li>
                                                        <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAssignModal(item, singleUser)}>Assign to Vendor</li>
                                                    </ul>
                                                </div>
                                            )}
                                            </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* view details */}
        {viewDetails && ( <OrderDetailsModal data={selectedItem} onClose={handleCloseOrderModal} result={allData}/>)}

        {/* update order status modal */}
        {/* {updateStatusModal && (<UpdateStatus item={selectedItem} onClose={handleCloseStatusModal}/> )} */}

        {/* assign vendor*/}
        { assignVendorModal && (
            <AssignVendorModal item={selectedItem} result={allData} onClose={handleCloseAssignModal}/>
        )}
    </div>
  );
};

export default UserDetails;
