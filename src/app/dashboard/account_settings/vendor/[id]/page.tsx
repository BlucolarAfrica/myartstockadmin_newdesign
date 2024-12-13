'use client'
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import profileImage from '../../../../../../public/assets/profile-image.png'
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
    
    
    useEffect(() => {
        if(id){
            dispatch(getSingleVendor(id));
        }
    }, [dispatch, id]);


    if(isLoading){
        return <Loader/>
    }

  
    if(isError){
        return <p>{errorMsg}</p>
    }
    
    if (!data) {
        return <div>User not found!</div>;
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
                            <span>
                                <Image src={profileImage} alt={'image'} width={90} height={80} className="rounded"/>
                            </span>
                            <div className="flex flex-col gap-8">
                                <ul className="space-y-2">
                                    <li className="font-bold text-[#151515] text-2xl">{data?.personnel_name}</li>
                                    <li className="font-bold text-red-500 text-sm">{data?.type}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <ul className="flex gap-8 justify-between bg-[#F9FCFF] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Completed Order</span>
                                    {0}
                                </li>
                                <li>
                                    <Image src={icon1} alt="icon1" width={40} quality={100}/>
                                </li>
                            </ul>
                            <ul className="flex gap-8 justify-between bg-[#92FF8840] text-[#1F7617] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Processed Order</span>
                                    {0}
                                </li>
                                <li>
                                    <Image src={icon1} alt="icon1" width={40} quality={100}/>
                                </li>
                            </ul>
                            <ul className="flex gap-8 justify-between bg-[#F9FCFF] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Pending Order</span>
                                    {0}
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
                                        {data.orders?.total_amount_spent || 0}
                                    </span>
                                </li>
                                <li>
                                    <Image src={icon2} alt="icon1" width={40} quality={100}/>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                    <p className="py-2 pt-10 font-bold text-base text-[#C6C6C6] uppercase border-b">More Info</p>
                    
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

                                <div className='font-bold py-10 text-center'>No record found!</div>
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