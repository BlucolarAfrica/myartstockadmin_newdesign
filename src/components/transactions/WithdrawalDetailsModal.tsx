/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';
import { TbCurrencyNaira } from 'react-icons/tb';

interface ModalProps {
    onClose: () => void;
    item: Record<string, any> | null;
};

const WithdrawalDetailsModal = ({onClose, item}: ModalProps) => {
    console.log(item)
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99]'>
        <div className='bg-white rounded-lg shadow-lg w-1/3 p-6 relative transition-all duration-300'>
            <IoCloseCircleOutline onClick={onClose} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
            <div className='py-10 px-5'>
                <p className='pb-5 text-center font-bold text-[#333333] text-2xl'>Withdrawal Request</p>
                <ul className='py-5 space-y-3'>
                    <li>
                        <span>Customer Name:</span>{' '}
                        <span className='text-[#2F4858] font-bold'>Gbenga Johnson</span>
                    </li>
                    <li className='items-center flex'>
                        <span>Current Balance:</span> {" "}
                        <span className='text-[#2F4858] flex items-center font-bold'><TbCurrencyNaira />22,500</span>
                    </li>
                    <li>
                        <span>Bank:</span> {" "}
                        <span className='text-[#2F4858] font-bold'>United Bank of Africa</span>
                    </li>
                    <li>
                        <span>Account Number:</span>{" "}
                        <span className='text-[#2F4858] font-bold'>1123456690</span>
                    </li>
                    <li>
                        <span>Account Name:</span>{" "}
                        <span className='text-[#2F4858] font-bold'>Gbenga Johnson</span>
                    </li>
                    <li className='flex items-center'>
                        <span>Request Amount:</span>{" "}
                        <span className='text-[#2F4858] flex items-center font-bold'><TbCurrencyNaira />22,500</span>
                    </li>
                </ul>
                <div className='gap-4 flex pt-2 items-center justify-center'>
                    <button onClick={onClose} className='text-white bg-[#D7D7D7] p-3 px-10 rounded-lg w-1/2'>Decline</button>
                    <button  className='bg-[#2F4858] text-white p-3 px-10 rounded-lg w-1/2'>Approve</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WithdrawalDetailsModal