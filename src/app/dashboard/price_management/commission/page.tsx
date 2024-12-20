'use client'
import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { TbCurrencyNaira } from 'react-icons/tb';


const Page = () => {
    const [createModal, setCreateModal] = useState(false);
    const [viewMoreBtn, setViewMoreBtn] = useState(false);
    const [editModal, setEditModal] = useState(false)
  return (
    <div className='px-5'>
        <div className='flex justify-between p-5'>
            <div className='flex items-center gap-1 text-2xl font-bold'>
                Size
            </div>
            <div className='flex items-center gap-4'>
                <div>
                    <button 
                        className='bg-[#2F4858] rounded-lg  px-10 text-white p-3' 
                        onClick={()=> setCreateModal(true)} 
                    >
                        Create New Commission
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
                        <th className="py-4 px-4 text-left border-b">Category</th>
                        <th className="py-4 px-4 text-left border-b">Sub-Category</th>
                        <th className="py-4 px-4 text-left border-b flex items-center">Price(<TbCurrencyNaira />)</th>
                        <th className="py-4 px-4 text-left border-b">Contributors Commission</th>
                        <th className="py-4 px-4 text-left border-b">Vendor Commission</th>
                        <th className="py-4 px-4 text-left border-b">Action</th>
                    </tr>
                </thead>
                <tbody className=''>
                    <tr className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                        <td className='py-5 px-4 border-b'>1</td>
                        <td className='py-5 px-4 border-b'>Photo</td>
                        <td className='py-5 px-4 border-b'>Nature</td>
                        <td className='py-5 px-4 border-b'>22,500</td>
                        <td className='py-5 px-4 border-b'>7,000</td>
                        <td className='py-5 px-4 border-b'>4,500</td>
                        <td className='py-2 px-4 border-b relative'>
                            <BsThreeDotsVertical onClick={() => setViewMoreBtn(!viewMoreBtn)} onMouseEnter={() => setViewMoreBtn(!viewMoreBtn)}   className='cursor-pointer'/>
                            {viewMoreBtn && (
                                <div className="absolute right-20 top-4 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333] py-3" onMouseLeave={() => setViewMoreBtn(!viewMoreBtn)}>
                                    <ul className="p-2 text-xs">
                                        <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => setEditModal(true)}>Edit</li>
                                        <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Delete</li>
                                        <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Disable</li>
                                    </ul>
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* create new commission */}
            { createModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99] '>
                    <div className='bg-white rounded-lg shadow-lg w-1/2 h-[90%] p-6 relative overflow-y-auto no-scrollbar'>
                        <IoCloseCircleOutline onClick={()=> setCreateModal(false)} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
                        <div className=' py-7 px-5 items-center w-full'>
                            <p className='text-[#333333] text-center font-bold text-2xl py-4'>Create New Commission</p>
                            <form action="">
                                <ul className='space-y-4 text-[#333333] font-normal text-sm'>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor="">Category</label>
                                        <select className='border p-3 outline-[0.2px] rounded-lg' >
                                            <option>--Choose Category--</option>
                                            {/* <option>Canvas</option>
                                            <option value="2">Print</option> */}
                                        </select>
                                    </li>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor="">Sub-Category</label>
                                        <select className='border p-3 outline-[0.2px] rounded-lg' >
                                            <option>--Choose Sub-Category--</option>
                                            {/* <option>Canvas</option>
                                            <option value="2">Print</option> */}
                                        </select>
                                    </li>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor="">Prize</label>
                                        <input type="text" placeholder='Enter Prize' className='border p-3 outline-[0.2px] rounded-lg w-full' />
                                    </li>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor="">Contributor Commission</label>
                                        <input type="text" placeholder='Enter Amount' className='border p-3 outline-[0.2px] rounded-lg' />
                                    </li>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor="">Vendor Commission</label>
                                        <input type="text" placeholder='Enter Amount' className='border p-3 outline-[0.2px] rounded-lg' />
                                    </li>
                                    <li className='items-center justify-center py-5 flex gap-8'>
                                        <button className='bg-[#2F4858]/20 rounded-lg text-white p-4 px-10' onClick={() => setCreateModal(false)}> Cancel</button>
                                        <button className='bg-[#2F4858] rounded-lg text-white p-4 px-10'> Create</button>
                                    </li>
                                </ul>
                            </form>
                        </div>   
                    </div>
                </div>
            )}

             {/* create vendor */}
             { editModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99] '>
                    <div className='bg-white rounded-lg shadow-lg w-1/2 h-[90%] p-6 relative overflow-y-auto no-scrollbar'>
                        <IoCloseCircleOutline onClick={()=> setEditModal(false)} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
                        <div className=' py-7 px-5 items-center w-full'>
                            <p className='text-[#333333] text-center font-bold text-2xl py-4'>Edit Commission</p>
                            <form action="">
                                <ul className='space-y-4 text-[#333333] font-normal text-sm'>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor="">Category</label>
                                        <select className='border p-3 outline-[0.2px] rounded-lg' >
                                            <option>--Choose Category--</option>
                                            {/* <option>Canvas</option>
                                            <option value="2">Print</option> */}
                                        </select>
                                    </li>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor="">Sub-Category</label>
                                        <select className='border p-3 outline-[0.2px] rounded-lg' >
                                            <option>--Choose Sub-Category--</option>
                                            {/* <option>Canvas</option>
                                            <option value="2">Print</option> */}
                                        </select>
                                    </li>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor="">Prize</label>
                                        <input type="text" placeholder='Enter Prize' className='border p-3 outline-[0.2px] rounded-lg w-full' />
                                    </li>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor="">Contributor Commission</label>
                                        <input type="text" placeholder='Enter Amount' className='border p-3 outline-[0.2px] rounded-lg' />
                                    </li>
                                    <li className='flex flex-col gap-1'>
                                        <label htmlFor="">Vendor Commission</label>
                                        <input type="text" placeholder='Enter Amount' className='border p-3 outline-[0.2px] rounded-lg' />
                                    </li>
                                    <li className='items-center justify-center py-5 flex gap-8'>
                                        <button className='bg-[#2F4858]/20 rounded-lg text-white p-4 px-10' onClick={() => setEditModal(false)}> Cancel</button>
                                        <button className='bg-[#2F4858] rounded-lg text-white p-4 px-10'> Create</button>
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