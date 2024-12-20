/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { FetchOrders } from '@/redux/features/orders/orderSlice';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { LuFilter } from 'react-icons/lu';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link'
import Loader from '@/shared/Loader'
import UpdateStatus from '@/components/order/UpdateStatus';
import { TbCurrencyNaira } from 'react-icons/tb';
import { useRouter } from 'next/navigation';


const Page = () => {
    const dispatch = useAppDispatch();
    const {isLoading, isError, errorMsg, orders:data} = useAppSelector(state => state.order)
    const [viewMoreBtn, setViewMoreBtn] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [updateStatusModal, setUpdateStatusModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
    const router = useRouter()

    // const handleStatusUpdate = (param: Record<string, any>) =>{
    //     setSelectedItem(param)
    //     setUpdateStatusModal(true)
    // };

    const handleCloseStatusModal = () => {
        setUpdateStatusModal(false);
        setSelectedItem(null);
    };

    
    const toggleMenu = (id: number) => {
        setViewMoreBtn(viewMoreBtn === id ? null : id);
    };

    useEffect(() => {
        dispatch(FetchOrders("Canvas"))
    },[dispatch])

    if(isLoading){
        return <Loader/>
    }

    if(isError){
        return <p>{errorMsg}</p>
    }

  
  const totalRows = data.length
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayData = data.slice(startIndex, startIndex + rowsPerPage);


  const handleNext = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
  };


  // Filtered Data
  const filteredData = displayData.filter((item) =>
      item?.customer?.first_name?.toLowerCase().includes(searchQuery.toLowerCase())
    //   item.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //   item?.email?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, Math.min(100, Number(event.target.value)));
      setRowsPerPage(value);
      setCurrentPage(1); 
  };

 


  return (
    <div className='px-5'>
        <div className='flex justify-between p-5'>
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
        </div>
        <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200/40'>
                <thead>
                    <tr className="bg-gray-100/40 text-[#998E8D] font-semibold text-xs">
                        <th className="py-4 px-4 text-left border-b">S/N</th>
                        <th className="py-4 px-4 text-left border-b">Order Number</th>
                        <th className="py-4 px-4 text-left border-b">Customer Name</th>
                        <th className="py-4 px-4 text-left border-b flex items-center">Amount(<TbCurrencyNaira />)</th>
                        <th className="py-4 px-4 text-left border-b">Date</th>
                        <th className="py-4 px-4 text-left border-b">Payment Type</th>
                        <th className="py-4 px-4 text-left border-b">Status</th>
                        <th className="py-4 px-4 text-left border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { !filteredData && !isLoading?
                    <tr className='py-5 flex justify-center items-center font-bold text-[#333333] relative'>
                        <td className='py-4 px-4 text-center'>No matching data found</td>
                    </tr>
                    : 
                    filteredData.map((item, index) => {
                        return (
                            <tr key={item.id} className='hover:bg-gray-50 text-[#333333] font-normal text-xs hover:cursor-pointer' onClick={() => router.push(`/dashboard/orders/canvas/${item.id}`)}>
                                <td className='py-4 px-4 border-b'>{index + 1}</td>
                                <td className='py-4 px-4 border-b text-[#5420A4]'>{item.sku}</td>
                                <td className='py-4 px-4 border-b'>{item.customer?.first_name}</td>
                                <td className='py-4 px-4 border-b text-[#5420A4]'>{item.total_amount?.toLocaleString()}</td>
                                <td className='py-4 px-4 border-b'>{new Date(item?.created_at).toLocaleDateString()}</td>
                                <td className='py-4 px-4 border-b'>{item.payment_type ?? "null"}</td>
                                <td className='py-4 px-4 border-b'>{item.status}</td>
                                <td className='py-4 px-4 border-b relative'>
                                    <BsThreeDotsVertical onClick={ () => toggleMenu(item.id)} onMouseEnter={ () => toggleMenu(item.id)}  className='hover:cursor-pointer'/>
                                    {viewMoreBtn === item.id && (
                                        <Link href={`/dashboard/orders/canvas/${item.id}`} onMouseLeave={ () => toggleMenu(item.id)} className="absolute right-14 mt-2 top-3 w-32 border bg-white shadow-lg rounded-lg z-10 text-[#333333]">
                                            <ul className="p-2 text-xs">
                                                <li className="py-2 px-2 hover:bg-gray-100 cursor-pointer">
                                                    View Order
                                                </li>
                                                {/* <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleStatusUpdate(item)}>Update Status</li> */}
                                            </ul>
                                        </Link>
                                    )}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='flex justify-between items-center py-5 text-xs'>
                <div>
                    <label className='text-xs font-bold'>
                        Show Rows:
                        <input
                        type="number"
                        min="1"
                        max="50"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        style={{ width: "50px", marginLeft: "0.5rem" }}
                        className='text-[#6D6D6D] font-bold'
                        />
                    </label>
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={handlePrevious} disabled={currentPage === 1} className={`flex items-center gap-1 bg-[#B20021] text-white p-3 rounded-lg ${currentPage === 1 && 'bg-opacity-10'}`}>
                        <FaArrowLeft />
                        Previous
                    </button>
                    <span className='font-bold'>
                     {currentPage} 
                    </span>
                    <button onClick={handleNext} disabled={currentPage === totalPages} className={`flex items-center gap-1 bg-[#B20021] text-white p-3 rounded-lg ${currentPage === totalPages && 'bg-opacity-10'}`}>
                        Next
                        <FaArrowRight />
                    </button>
                </div>
                <div className='text-xs'>
                    Showing <b>{(currentPage - 1) * rowsPerPage + 1} </b> to{" "}
                    <b>{Math.min(currentPage * rowsPerPage, totalRows)}</b> of <b>{totalRows}</b> rows
                </div>
            </div>

            {/* update order status modal */}
            {updateStatusModal && (
                <UpdateStatus item={selectedItem} onClose={handleCloseStatusModal}/>
            )}
        </div>
    </div>
  )
}

export default Page


