/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';
import imageFile from '../../../public/assets/blackman.png'
import { TbCurrencyNaira } from 'react-icons/tb';
import AssignVendorModal from './AssignVendorModal';


interface ItemProps {
    data: Record<string, any> | null;
    result: Record<string, any> | null;
    onClose: () => void;
  };

const OrderDetailsModal = ({ data, onClose, result}: ItemProps) => {
    const [assignVendorModal, setAssignVendorModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);


    const handleCloseAssignModal = () => {
        setAssignVendorModal(false);
        setSelectedItem(null);
    };


  return (
    <div>
        <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99]'>
            <div className='bg-white rounded-lg shadow-lg w-4/5  h-[80%] p-6 relative '>
                <IoCloseCircleOutline onClick={onClose} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
                <div className='flex flex-col h-full justify-around items-center py-'>
                    <div className="flex gap-8 w-full h-full p-10">
                        <div className="w-1/2 h-full overflow-hidden rounded">
                            <Image src={imageFile} alt={'image'} className='object-contain w-full h-full' width={500} height={500} quality={100} />
                        </div>
                        <div className="w-1/2 h-full space-y-2 ">
                            <div className="flex justify-between pt-5">
                                <p className="flex flex-col">
                                    <span className="font-bold text-2xl">{data?.deliverable?.title}</span>
                                    <span className='py-2 text-[#5420A4] flex items-center text-sm'>Price: <b className='flex items-center justify-start'><TbCurrencyNaira />{data?.purchase_price ?? "null"}</b></span>
                                </p>
                                <p className='flex flex-col gap-2 text-sm'>
                                    <button className='bg-[#2F4858] text-white px-5 py-3 rounded-lg' onClick={() => setAssignVendorModal(true)}>Assign Vendor</button>
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-bold text-[#C6C6C6]">Description</p>
                                <ul className="flex gap-8 text-sm py-3 items-start">
                                    <li className="flex flex-col gap-2">
                                        <span>Type: {data?.payment_type ?? "null"}</span>
                                        <span className="flex items-center">Size:</span>
                                    </li>
                                    <li className="flex flex-col gap-2">
                                        <span>Print Type: {data?.payment_type ?? "null"}</span>
                                        <span className="flex items-center">Request: <b className="text-[#5420A4] flex items-center"><TbCurrencyNaira />{data?.total_amount}</b></span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm font-bold text-[#C6C6C6]">Assigned</p>
                                <ul className="flex gap-8 text-sm py-2 items-start">
                                    <li className="flex flex-col gap-2">
                                        <span className='flex items-center '>Vendor: <b className="text-[#3D3D3D] flex items-center"> {data?.assigned_to?.personnel_name ?? "Not Assigned"}</b></span>
                                        <span className="flex items-center">Assigned Date:</span>
                                    </li>
                                    <li className="flex flex-col gap-2">
                                        <span>Print Type: {data?.assigned_to?.type ?? "Not Assigned"}</span>
                                        <span className="flex items-center">Due Date: </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* assign vendor*/}
        { assignVendorModal && (
            <AssignVendorModal item={selectedItem} result={result} onClose={handleCloseAssignModal}/>
        )}
    </div>
  )
}

export default OrderDetailsModal