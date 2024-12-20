'use client'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { LuFilter } from 'react-icons/lu';
import { TbCurrencyNaira } from 'react-icons/tb';


const Page = () => {
    const [downloadTransaction, setDownloadTransaction] = useState(false);

  return (
    <div className='px-5'>
        <div className='flex justify-between p-5'>
            <div className='flex justify-between py-5 gap-4'>
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
                        // onChange={(e) => setSearchQuery( e.target.value) }
                    />
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div>
                    <button 
                        className='bg-[#2F4858] rounded-lg  px-10 text-white p-3' 
                        onClick={()=> setDownloadTransaction(true)} 
                    >
                        Download Transaction
                    </button>
                </div>
            </div>
        </div>

        {/*  */}
        <div className=''>
            {/* table */}
            <table className='min-w-full bg-white border border-gray-200/40'>
                <thead>
                    <tr className="bg-gray-100/40 text-[#998E8D] font-semibold text-xs">
                        <th className="py-4 px-4 text-left border-b">S/N</th>
                        <th className="py-4 px-4 text-left border-b">Transaction ID</th>
                        <th className="py-4 px-4 text-left border-b">Customer Name</th>
                        <th className="py-4 px-4 text-left border-b">Description</th>
                        <th className="py-4 px-4 text-left border-b">Date Assigned</th>
                        <th className="py-4 px-4 text-left border-b">Payment Method</th>
                        <th className="py-4 px-4 text-left border-b flex items-center">Amount(<TbCurrencyNaira />)</th>
                        <th className="py-4 px-4 text-left border-b">Status</th>
                    </tr>
                </thead>
                <tbody className=''>
                    <tr className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                        <td className='py-5 px-4 border-b'>1</td>
                        <td className='py-5 px-4 border-b text-[#5420A4]'>2939489577</td>
                        <td className='py-5 px-4 border-b'>Gbenga John</td>
                        <td className='py-5 px-4 border-b'>Subscription</td>
                        <td className='py-5 px-4 border-b'>20-Dec,2024</td>
                        <td className='py-5 px-4 border-b'>Card</td>
                        <td className='py-5 px-4 border-b'>22,300</td>
                        <td className='py-5 px-4 border-b text-green-500'>Successful</td>
                    </tr>
                </tbody>
            </table>

            {/* create new commission */}
            { downloadTransaction && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99] '>
                    <div className='bg-white rounded-lg shadow-lg w-1/2 h-[] p-6 relative overflow-y-auto no-scrollbar'>
                        <IoCloseCircleOutline onClick={()=> setDownloadTransaction(false)} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
                        <div className=' py-7 px-5 items-center w-full'>
                            <p className='text-[#333333] text-center font-bold text-2xl py-4'>Download Transaction</p>
                            <form action="">
                                <ul className='space-y-4 text-[#333333] font-normal text-sm'>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor=" " className='text-[#5D5D5D]'>File Type</label>
                                        <select className='border p-3 outline-[0.2px] rounded-lg' >
                                            <option>--Choose File Type--</option>
                                        </select>
                                    </li>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor=" " className='text-[#5D5D5D]'>Date</label>
                                        <div className='flex items-center gap-4 '>
                                            <div className='w-1/2 '>
                                                <input type="text" placeholder='From (DD/MM/YY)' className='border p-3 outline-[0.2px] rounded-lg w-full' />
                                            </div>
                                            <div className='w-1/2'>
                                                <input type="text" placeholder='From (DD/MM/YY)' className='border p-3 outline-[0.2px] rounded-lg w-full' />
                                            </div>
                                        </div>
                                    </li>
                                    <li className='items-center justify-center py-5 flex gap-8'>
                                        <button className='bg-[#2F4858]/20 rounded-lg text-white p-4 px-10' onClick={() => setDownloadTransaction(false)}> Cancel</button>
                                        <button className='bg-[#2F4858] rounded-lg text-white p-4 px-10'> Download</button>
                                    </li>
                                </ul>
                            </form>
                        </div>   
                    </div>
                </div>
            )}

        </div>


    </div>
  )
}

export default Page;