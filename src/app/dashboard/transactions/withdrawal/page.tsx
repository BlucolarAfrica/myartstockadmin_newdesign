/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
// import ApprovedModal from '@/components/asset/AppprovedModal';
// import DeclineModal from '@/components/asset/DeclineModal';
// import PendingModal from '@/components/asset/PendingModal';
// import { FetchAssets, updateStatus } from '@/redux/features/asset_management/assetSlice';
import { useAppSelector } from '@/redux/hooks';
import Loader from '@/shared/Loader';
// import Image from 'next/image';
import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
// import { CiSearch } from 'react-icons/ci';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import { LuFilter } from 'react-icons/lu';
// import { PiRadioButtonFill } from 'react-icons/pi';
import { TbCurrencyNaira } from 'react-icons/tb';
// import successIcon from '../../../../../public/assets/success notice.png'
// import { IoCloseCircleOutline } from 'react-icons/io5';
import WithdrawalDetailsModal from '@/components/transactions/WithdrawalDetailsModal';


const Page = () => {
    // const dispatch = useAppDispatch();
    const {isLoading, isError, errorMsg,} = useAppSelector(state => state.assets)
    const [activeTab, setActiveTab] = useState<string>('customer');
    const [modal, setModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
    // const [notify, setNotify] = useState(false);
    // const [declineModal, setDeclineModal]  = useState(false)
    // const [declineReason, setDeclineReason] = useState("")
    const [viewMoreBtn, setViewMoreBtn] = useState<boolean>(false);
    


    // handle-modal
    // const handleModalDetails = (param: Record<string, any>) =>{
    //     setSelectedItem(param)
    //     setModal(true)
    // };
    const handleModalDetails = () =>{
        // setSelectedItem(param)
        setModal(true)
    };

    const handleCloseModal = () => {
        setModal(false);
        setSelectedItem(null);
      };

    const tabs = [
        {id: 'customer', label: "Customer Request", queryParams: "Customer"},
        {id: 'vendor', label: "Vendor Request", queryParams: "Vendor"},
    ];

    // fetch data
    // const handleFetch = (queryParams: string) => {
    //     dispatch(FetchAssets(queryParams))
    // };

    // const toggleMenu = (id: number) => {
    //     setViewMoreBtn(viewMoreBtn === id ? null : id);
    // };

    const handleToggleAction = () => {
        setViewMoreBtn(!viewMoreBtn)
    }



    if(isLoading){
        return <Loader/>
    }
    
    if(isError){
        return <p>{errorMsg}</p>
    };


  return (
    <div>
        
        {/* tabs */}
        <div className='px-5 pb-1 pt-20 flex gap-4 border-b '>
            {tabs.map(tab => (
                <button key={tab.id} className={`outline-none transition-all ease-in hover:text-black ${activeTab === tab.id ? 'font-bold underline decoration-4 decoration-red-500 underline-offset-8 text-black' : 'text-[#B0B0B0]' } `} onClick={() => {setActiveTab(tab.id)}}>{tab.label}</button>
        ))}
        </div>
        {/* tab content */}
        <div className='px-5 pt-5'>
            {activeTab === 'customer' && (
                <div>
                   <div className=''>
                        <table className='min-w-full bg-white border border-gray-200/40'>
                            <thead>
                                <tr className="bg-gray-100/40 text-[#C3C3C3] font-semibold text-xs">
                                    <th className="py-4 px-4 text-left border-b">S/N</th>
                                    <th className="py-4 px-4 text-left border-b">Customer Name</th>
                                    <th className="py-4 px-4 text-left border-b">Bank</th>
                                    <th className="py-4 px-4 text-left border-b">Account Number</th>
                                    <th className="py-4 px-4 text-left border-b">Account Name</th>
                                    <th className="py-4 px-4 text-left border-b flex items-center">Amount (<TbCurrencyNaira />)</th>
                                    <th className="py-4 px-4 text-left border-b">Request Date</th>
                                    <th className="py-4 px-4 text-left border-b">Status</th>
                                    <th className="py-4 px-4 text-left border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                <tr className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                                    <td className='py-5 px-4 border-b'>1</td>
                                    <td className='py-5 px-4 border-b'>Gbenga John</td>
                                    <td className='py-5 px-4 border-b'>Uba</td>
                                    <td className='py-5 px-4 border-b text-[#5420A4]'>2939489577</td>
                                    <td className='py-5 px-4 border-b'>Gbenga John</td>
                                    <td className='py-5 px-4 border-b'>22,300</td>
                                    <td className='py-5 px-4 border-b'>20-Dec,2024</td>
                                    <td className='py-5 px-4 border-b text-green-500 font-bold'>Successful</td>
                                    <td className='py-2 px-4 border-b relative'>
                                        <BsThreeDotsVertical onClick={ () => handleToggleAction()} onMouseEnter={ () => handleToggleAction()}  className='cursor-pointer'/>
                                        {viewMoreBtn && (
                                            <div className="absolute right-16 top-4 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333]" onClick={ () => handleToggleAction()}  onMouseLeave={ () => handleToggleAction()} > 
                                                <ul className="p-2 text-xs">
                                                    <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleModalDetails()}>
                                                        <button >View Details</button>
                                                    </li>
                                                    <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Approve Request</li>
                                                    <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Decline Request</li> 
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                            
                        </table>
                        
                        {/* open modal */}
                        <div>
                            {modal && (
                                <WithdrawalDetailsModal item={selectedItem} onClose={handleCloseModal}/>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'vendor' && (
                <div>
                   <div className=''>
                        <table className='min-w-full bg-white border border-gray-200/40'>
                            <thead>
                                <tr className="bg-gray-100/40 text-[#C3C3C3] font-semibold text-xs">
                                    <th className="py-4 px-4 text-left border-b">S/N</th>
                                    <th className="py-4 px-4 text-left border-b">Customer Name</th>
                                    <th className="py-4 px-4 text-left border-b">Bank</th>
                                    <th className="py-4 px-4 text-left border-b">Account Number</th>
                                    <th className="py-4 px-4 text-left border-b">Account Name</th>
                                    <th className="py-4 px-4 text-left border-b flex items-center">Amount (<TbCurrencyNaira />)</th>
                                    <th className="py-4 px-4 text-left border-b">Request Date</th>
                                    <th className="py-4 px-4 text-left border-b">Status</th>
                                    <th className="py-4 px-4 text-left border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                <tr className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                                    <td className='py-5 px-4 border-b'>1</td>
                                    <td className='py-5 px-4 border-b'>Gbenga Johnson</td>
                                    <td className='py-5 px-4 border-b'>Uba</td>
                                    <td className='py-5 px-4 border-b text-[#5420A4]'>2939489577</td>
                                    <td className='py-5 px-4 border-b'>Gbenga Johnson</td>
                                    <td className='py-5 px-4 border-b'>22,300</td>
                                    <td className='py-5 px-4 border-b'>20-Dec,2024</td>
                                    <td className='py-5 px-4 border-b text-[#F6B900] font-bold'>Pending</td>
                                    <td className='py-2 px-4 border-b relative'>
                                        <BsThreeDotsVertical onClick={ () => handleToggleAction()} onMouseEnter={ () => handleToggleAction()}  className='cursor-pointer'/>
                                        {viewMoreBtn && (
                                            <div className="absolute right-16 top-4 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333]" onClick={ () => handleToggleAction()}  onMouseLeave={ () => handleToggleAction()} > 
                                                <ul className="p-2 text-xs">
                                                    <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleModalDetails()}>
                                                        <button>View Details</button>
                                                    </li>
                                                    <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Approve Request</li>
                                                    <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Decline Request</li> 
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                            
                        </table>
                        
                        {/* open modal */}
                        <div>
                            {modal && (
                                <WithdrawalDetailsModal item={selectedItem} onClose={handleCloseModal}/>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Page