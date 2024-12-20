'use client'
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import icon1 from '../../../../../../public/assets/410.png'
import icon2 from '../../../../../../public/assets/Mask group.png'
import { TbCurrencyNaira } from "react-icons/tb";
import React, { useEffect, useState} from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Loader from '@/shared/Loader';
import { getSingleContributor } from "@/redux/features/contributor/contributorSlice";




const ContributorDetails = ({params}: {children: React.ReactNode; params: Promise<{ id: number }>;}) => {
    const { id } = React.use(params)
    const {isLoading, isError, errorMsg, singleContributor:data} = useAppSelector(state => state.contributor)
    const dispatch = useAppDispatch()
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>('content');
    const [moreInfo, setMoreInfo] = useState(false)
    

    const handleMoreInfoBtn = () => {
        setMoreInfo(!moreInfo)
    }

    useEffect(() => {
        if(id){
            dispatch(getSingleContributor(id));
        }
    }, [dispatch, id]);


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
                    <div className="flex items-center text-[#6D6D6D] text-sm"><MdArrowBackIosNew /> <span onClick={() => router.back()} className="text-blue-600 cursor-pointer">Contributor Management</span>/{data?.user.first_name}</div>
                    <div className="flex justify-between pt-10">
                        <div className="flex gap-2">
                            <span className="h-32 w-32 border rounded overflow-hidden">
                                {<img src={data?.user.profile_image?? "null" } alt={"image"} className='h-full w-full'/>}
                            </span>
                            <div className="flex flex-col gap-8">
                                <ul className="space-y-2">
                                    <li className="font-bold text-[#151515] text-2xl">{data?.user.first_name} {" "} {data?.user.last_name}</li>
                                    <li className="font-bold text-red-500 text-sm">{data?.user.contributor?.user_type ?? "null"}</li>
                                    <li className="font-bold text-gray-500 text-sm">Referral Code: {" "}{data?.user.referral_code ?? "null"}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <ul className="flex gap-8 justify-between bg-[#F9FCFF] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Total Content</span>
                                    {data.metadata?.total_downloads}
                                </li>
                                <li>
                                    <Image src={icon1} alt="icon1" width={40} quality={100}/>
                                </li>
                            </ul>
                            <ul className="flex gap-8 justify-between bg-[#92FF8840] text-[#1F7617] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Approved Content</span>
                                    {data.metadata?.total_approved_assets}
                                </li>
                                <li>
                                    <Image src={icon1} alt="icon1" width={40} quality={100}/>
                                </li>
                            </ul>
                            <ul className="flex gap-8 justify-between bg-[#F9FCFF] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Declined Content</span>
                                    {/* {data?.metadata?.total_pending_orders} */}
                                </li>
                                <li>
                                    <Image src={icon1} alt="icon1" width={40} quality={100}/>
                                </li>
                            </ul>
                            <ul className="flex gap-8 justify-between bg-[#FD9F9F40] text-[#F42727] border w-[217px] h-[84px] p-2 rounded-lg">
                                <li className="flex flex-col text-[#2F4858] text-2xl">
                                    <span className="text-[#656565] text-sm">Wallet Balance</span>
                                    <span className="flex items-center">
                                        <TbCurrencyNaira className="text-[#656565]" />
                                        {data.metadata?.wallet}
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
                            <div className="p-3  my-4 font-bold text-base text-[#C6C6C6] uppercase border-b shadow-inner flex items-center justify-between cursor-pointer" onClick={() => handleMoreInfoBtn()}>More Info <span>{moreInfo? <MdKeyboardArrowUp size={20}/> : <MdKeyboardArrowDown size={20}/>}</span></div>
                            <div className="transition-all duration-300 ease-in-out px-5">
                                {
                                    moreInfo && (
                                        <div className="flex gap-8 py-4">
                                            <ul className="space-y-4 text-[#151515] ">
                                                <li className="uppercase text-[#8F8F8F] font-bold">Contact information</li>
                                                <li className="flex items-center">
                                                    <span>Phone: </span> 
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{data.user.phone_number ?? "null"}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span>Email Address: </span>
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{data.user.email ?? 'null'}</span>
                                                </li>
                                                <li className="">Country:
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{data.user.country?? "null"}</span>
                                                </li>
                                                <li>
                                                    <span>Residential Address: {data.user.address?? "null"}</span>
                                                </li>
                                            </ul>
                                            <ul className="space-y-4 text-[#151515] py-3">
                                                <li className="uppercase text-[#8F8F8F] font-bold">Basic information</li>
                                                <li className="flex items-center">
                                                    <span>Gender: </span> 
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{data.user.gender?? "null"}</span>
                                                </li>
                                                <li className="flex items-center">
                                                    <span>Date of birth: </span>
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{data.user.date_of_birth ?? 'null'}</span>
                                                </li>
                                                <li className="">Created On:
                                                    <span className="font-extrabold text-sm pl-5 text-[#2F4858]">{new Date(data?.user.created_at).toLocaleDateString()}</span>
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

export default ContributorDetails