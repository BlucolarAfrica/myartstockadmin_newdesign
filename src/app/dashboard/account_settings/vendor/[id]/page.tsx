'use client'
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import icon1 from '../../../../../../public/assets/410.png'
import icon2 from '../../../../../../public/assets/Mask group.png'
import { TbCurrencyNaira } from "react-icons/tb";
import React, { useEffect, useState} from 'react'
import Image from 'next/image'
import { getSingleVendor } from "@/redux/features/vendor/vendorSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Loader from '@/shared/Loader';




const VendorDetailsLayout = ({params}: {children: React.ReactNode; params: Promise<{ id: number }>;}) => {
    const { id } = React.use(params)
    const {isLoading, isError, errorMsg, singleVendor:data} = useAppSelector(state => state.vendor)
    const dispatch = useAppDispatch()
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>('content');
    const [moreInfo, setMoreInfo] = useState(false)
    

    const handleMoreInfoBtn = () => {
        setMoreInfo(!moreInfo)
    }

    useEffect(() => {
        if(id){
            dispatch(getSingleVendor(id));
        }
    }, [dispatch, id]);


      // Filtered Data
    // const filteredData = data?.other_details?.witdrawals_history.filter((item) =>
    //     item?.amount?.toLowerCase().includes(searchQuery.toLowerCase())
    // //   item.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // //   item?.email?.toLowerCase().includes(searchQuery?.toLowerCase())
    // );

    if(isLoading){
        return <Loader/>
    }

  
    if(isError){
        return <p>{errorMsg}</p>
    }
    
    if (!data) {
        return <div className="font-bold text-center py-10">User not found!</div>;
    }


    const tabs = [
        {id: 'content', label: "All Content", queryParams: "Content"},
        {id: 'transaction', label: "Transaction History", queryParams: "Transaction"},
        {id: 'activity', label: "Activity Log", queryParams: "Activity"},
    ];

     // fetch data
     const handleFetch = (queryParams: string) => {
        // dispatch(FetchAssets(queryParams))
        console.log(queryParams)
    };


  return (
    <div className='p-4'>
        {
            data ? (
                <>
                    <div className="flex items-center text-[#6D6D6D] text-sm"><MdArrowBackIosNew /> <span onClick={() => router.push('/dashboard/account_settings/vendor')} className="text-blue-600 cursor-pointer">Vendor Management</span>/{data?.personnel_name}</div>
                    <div className="flex justify-between pt-10">
                        <div className="flex gap-2">
                            <span className="h-32 w-32 border rounded overflow-hidden">
                                {<img src={data?.profile_image?? "null" } alt={"image"} className='h-full w-full'/>}
                            </span>
                            <div className="flex flex-col gap-8">
                                <ul className="space-y-2">
                                    <li className="font-bold text-[#151515] text-2xl">{data?.personnel_name}</li>
                                    <li className="font-bold text-red-500 text-sm">{data?.type ?? "null"}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <ul className="flex gap-8 justify-between bg-[#F9FCFF] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Completed Order</span>
                                    {JSON.stringify(data.other_details?.total_completed_order)}
                                </li>
                                <li>
                                    <Image src={icon1} alt="icon1" width={40} quality={100}/>
                                </li>
                            </ul>
                            <ul className="flex gap-8 justify-between bg-[#92FF8840] text-[#1F7617] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Processed Order</span>
                                    {data.other_details?.total_processing_orders}
                                </li>
                                <li>
                                    <Image src={icon1} alt="icon1" width={40} quality={100}/>
                                </li>
                            </ul>
                            <ul className="flex gap-8 justify-between bg-[#F9FCFF] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Pending Order</span>
                                    {data?.other_details?.total_pending_orders}
                                </li>
                                <li>
                                    <Image src={icon1} alt="icon1" width={40} quality={100}/>
                                </li>
                            </ul>
                            <ul className="flex gap-8 justify-between bg-[#FD9F9F40] text-[#F42727] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Wallet Order</span>
                                    <span className="flex items-center">
                                        <TbCurrencyNaira className="text-[#656565]" />
                                        {data.other_details?.wallet_ballance}
                                    </span>
                                </li>
                                <li>
                                    <Image src={icon2} alt="icon1" width={40} quality={100}/>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div>
                            <div className="p-3  my-4 font-bold text-base text-[#C6C6C6] uppercase border-b shadow-inner flex items-center justify-between " onClick={() => handleMoreInfoBtn()}>More Info <span>{moreInfo? <MdKeyboardArrowUp size={20}/> : <MdKeyboardArrowDown size={20}/>}</span></div>
                            <div className="transition-all duration-300 ease-in-out px-5">
                                {
                                    moreInfo && (
                                        <div className="flex gap-8 py-4">
                                            <ul className="space-y-4 text-[#151515] ">
                                                <li className="uppercase text-[#8F8F8F] font-bold">Contact information</li>
                                                <li className="flex items-center">
                                                    <span>Phone: </span> 
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{data.phone_number ?? "null"}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span>Email Address: </span>
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{data.email ?? 'null'}</span>
                                                </li>
                                                <li className="">Country:
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{data.country?? "null"}</span>
                                                </li>
                                                <li>
                                                    <span>Residential Address: {data.city},{" "}{data.state}</span>
                                                </li>
                                            </ul>
                                            <ul className="space-y-4 text-[#151515] py-3">
                                                <li className="uppercase text-[#8F8F8F] font-bold">Basic information</li>
                                                <li className="flex items-center">
                                                    <span>Gender: </span> 
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{data.gender?? "null"}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span>Date of birth: </span>
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{data.date_of_birth ?? 'null'}</span>
                                                </li>
                                                <li className="">Created On:
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{new Date(data?.created_at).toLocaleDateString()}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    
                        {/* tabs */}
                        <div className='px-5 pb-1 pt-10 flex gap-4 border-b '>
                            {tabs.map(tab => (
                                <button key={tab.id} className={`outline-none transition-all duration-300 ease-in-out hover:text-black ${activeTab === tab.id ? 'font-bold underline decoration-4 decoration-red-500 underline-offset-8 text-black' : 'text-[#B0B0B0]' } `} onClick={() => {setActiveTab(tab.id); handleFetch(tab.queryParams)}}>{tab.label}</button>
                        ))}
                        </div>
                        {/* tab content */}
                        <div>
                            {
                                activeTab === "content" && (

                                    <div className='font-bold py-10 text-center'>No record found!</div>
                                )
                            }
                            {
                                activeTab === "transaction" && (

                                    // <div className='font-bold py-10 text-center'>No record found!</div>
                                    <div>
                                        {/* <div className='flex justify-between p-5'>
                                            <div className='flex items-center gap-1 text-[#808080] text-sm font-normal'>
                                                <label htmlFor="filter" className='flex p-2 items-center text-gray-500'><LuFilter />Filter</label>
                                                <select name="data" id="data" className='border p-3 outline-none rounded-lg'>
                                                    <option value="all">-All-</option>
                                                    <option value="all">Active</option>
                                                    <option value="pending">In-Active</option>
                                                </select>
                                            </div>
                                            <div className='relative border overflow-hidden rounded-lg'>
                                                <CiSearch className='absolute top-4 left-2'/>
                                                <input 
                                                    type="search" 
                                                    name="search" 
                                                    id="search" placeholder='Search' 
                                                    className='ml-4 outline-none w-full p-3'
                                                    onChange={(e) => setSearchQuery( e.target.value) }
                                                    />
                                            </div>
                                        </div> */}
                                        {/* table */}
                                        <div className='pt-10'>
                                            <table className='min-w-full bg-white border border-gray-200/40'>
                                                <thead>
                                                    <tr className="bg-gray-100/40 text-[#998E8D] font-semibold text-xs">
                                                        <th className="py-4 px-4 text-left border-b">S/N</th>
                                                        <th className="py-4 px-4 text-left border-b flex items-center">Amount(<TbCurrencyNaira />)</th>
                                                        <th className="py-4 px-4 text-left border-b">Date</th>
                                                        <th className="py-4 px-4 text-left border-b">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { !data && !isLoading?
                                                    <tr className='py-5 flex justify-center items-center font-bold text-[#333333] relative'>
                                                        <td className='py-4 px-4 text-center'>No matching data found</td>
                                                    </tr>
                                                    : 
                                                    data.other_details?.witdrawals_history.map((item, index) => {
                                                        return (
                                                            <tr key={item.id} className='hover:bg-gray-50 text-[#333333] font-normal text-xs pb-2 hover:cursor-pointer' onClick={() => router.push(`/dashboard/orders/frame/${item.id}`)} >
                                                                <td className='py-4 px-4 border-b'>{index + 1}</td>
                                                                <td className='py-4 px-4 border-b text-[#5420A4]'>{item.amount.toLocaleString()}</td>
                                                                <td className='py-4 px-4 border-b'>{new Date(item?.created_at).toLocaleDateString()}</td>
                                                                <td className='py-4 px-4 border-b'>{item.status}</td>
                                                            </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                activeTab === "activity" && (

                                    <div className='font-bold py-10 text-center'>No record found!</div>
                                )
                            }
                        </div>
                    </div>
                </>
            )
            :
            (
                <div>User not found!</div>
            )
        }
    </div>
  )
}

export default VendorDetailsLayout