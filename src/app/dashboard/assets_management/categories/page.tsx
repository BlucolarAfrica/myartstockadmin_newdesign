/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { DeleteCategory, FetchCategories } from '@/redux/features/asset_management/assetSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loader from '@/shared/Loader';
import { highlightMatch, truncateText } from '@/utils/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical, BsToggleOn } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import uploadIcon from '../../../../../public/assets/uploadIcon.png'
import successIcon from '../../../../../public/assets/success notice.png'
import EditCategory from '@/components/asset/EditCategory';

const Page = () => {
    const {isLoading, isError, categories:data, errorMsg, deleteMsg} = useAppSelector(state => state.assets);
    const dispatch = useAppDispatch();
    const [viewMoreBtn, setviewMoreBtn] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [modal, setModal] = useState(false)
    const [categoryName, setCategoryName] = useState("")
    const [error, setError] = useState("")
    const [createModal, setCreateModal] = useState(false)
    const [notify, setNotify] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
    const [deleteModal, setDeleteModal] = useState(false)

    
    const toggleMenu = (id: number) => {
        setviewMoreBtn(viewMoreBtn === id ? null : id);
    };

    useEffect(() => {
      dispatch(FetchCategories())
    },[dispatch])

    
    
    const totalRows = data.length
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;

    // console.log(typeof data)
    const displayData = data.slice(startIndex, startIndex + rowsPerPage);


    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    
    // Filtered Data
    const filteredData = displayData.filter((item) =>
        item.asset_type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(100, Number(event.target.value)));
        setRowsPerPage(value);
        setCurrentPage(1); 
    };


    const handleModal =()=>{
        setModal(!modal)
        setCategoryName("")
        setError("")
    }
    
    const handleCreateModal =() => {
        setCreateModal(!createModal)
        setModal(false)
    } 

    const handleNextModal = () => {
        if (categoryName.trim()) {
            setCategoryName(categoryName)
            setCreateModal(true)
            // setModal(false)
            // console.log("Selected User:", selectedUser);
        } else {
            setError("Enter category name");
        }
    };

    const handleCreateSubmit = () => {
        setNotify(true)
    }

    const handleEditModal = (param: Record<string, any>) => {
        setSelectedItem(param)
        setEditModal(true)
    }

    const handleCloseEditModal = () => {
        setEditModal(false)
        setSelectedItem(null);
    };

    const handleDeleteCategory = (id: number) => {
        dispatch(DeleteCategory(id))
        setDeleteModal(true)
    }

    

    if(isLoading){
        return <Loader/>  
      }
  
      if(isError){
        return <p>{errorMsg}</p>
      }

  return (
    <div className='px-5'>
        <div className='flex justify-between p-5'>
            <div className='flex items-center gap-1 text-[#808080] text-sm font-normal'>
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
            <div className='flex items-center gap-4'>
                <div>
                    <button 
                        className='bg-[#2F4858] rounded-lg text-white p-3' 
                        onClick={()=> handleModal()} 
                    >
                        Add New Category
                    </button>
                </div>
            </div>
        </div>

        {/* table */}
        <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200/40'>
                <thead>
                    <tr className="bg-gray-100/40 text-[#C3C3C3] font-semibold text-xs">
                        <th className="py-4 px-4 text-left border-b">S/N</th>
                        <th className="py-4 px-4 text-left border-b">Photo</th>
                        <th className="py-4 px-4 text-left border-b">Category</th>
                        <th className="py-4 px-4 text-left border-b">Sub-Category</th>
                        <th className="py-4 px-4 text-left border-b">Status</th>
                        <th className="py-4 px-4 text-left border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { !filteredData && !isLoading?
                    
                    <tr className='py-5 font-bold text-[#333333]'>
                        <td className='py-4 px-4 text-center'>No matching data found</td>
                    </tr>
                    :
                    filteredData.map((item, index) => {
                        return (
                            <tr key={item.id} className='hover:bg-gray-50 text-[#333333] font-normal text-xs'>
                                <td className='py-2 px-4 border-b'>{index + 1}</td>
                                <td className='py-2 px-4 border-b flex items-center'>{<img src={item.cover_image ?? "null" } alt={"image"} className='h-10 w-10 rounded-full'/>} </td>
                                <td className='py-3 px-4 border-b'>{ highlightMatch(`${truncateText(item.asset_type, 10)}`, searchQuery)}</td>
                                <td className='py-3 px-4 border-b'>null</td>
                                <td className='py-3 px-4 border-b text-sm'>{item.is_active === true? 
                                    <span className=' text-xs text-[#2F4858] inline-block'>
                                        <span className='bg-[#06D6A00D] flex items-center gap-2 rounded-lg px-2 py-1'>
                                            <BsToggleOn className='text-green-500'/>active
                                        </span>
                                    </span> 
                                    : 
                                    <span className=' text-xs text-[#2F4858] flex'>
                                        <span className='bg-[#F99E0B40] text-orange rounded-lg px-2 py-1 text-xs text-[#F99E0B] flex items-center gap-1'>
                                            <BsToggleOn className=''/>In-active
                                        </span>
                                    </span>
                                     }
                                </td>
                                <td className='py-2 px-4 border-b relative'>
                                    <BsThreeDotsVertical onClick={ () => toggleMenu(item.id)} onMouseEnter={ () => toggleMenu(item.id)}  className='cursor-pointer'/>
                                    {viewMoreBtn === item.id && (
                                        <div className="absolute right-32 top-4 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333] border" onMouseLeave={() => toggleMenu(item.id)}>
                                            <ul className="p-2 py-3 text-xs">
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleEditModal(item)}>
                                                    Edit Category
                                                </li>
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleDeleteCategory(item.id)}>Delete Category</li>
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
            {/* next and previous btn */}
            <div className='flex justify-between items-center py-5 text-sm'>
                <div>
                    <label>
                        Show Rows:
                        <input
                        type="number"
                        min="1"
                        max="50"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        style={{ width: "50px", marginLeft: "0.5rem" }}
                        className='text-[#6D6D6D]'
                        />
                    </label>
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={handlePrevious} disabled={currentPage === 1} className={`flex items-center gap-1 bg-[#B20021] text-white p-3 rounded-lg ${currentPage === 1 && 'bg-opacity-10'}`}>
                        <FaArrowLeft />
                        Previous
                    </button>
                    <span>
                     {currentPage} 
                    </span>
                    <button onClick={handleNext} disabled={currentPage === totalPages} className={`flex items-center gap-1 bg-[#B20021] text-white p-3 rounded-lg ${currentPage === totalPages && 'bg-opacity-10'}`}>
                        Next
                        <FaArrowRight />
                    </button>
                </div>
                <div>
                    Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                    {Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows} rows
                </div>
            </div>
            
            {/* enter category name */}
            { modal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99] '>
                    <div className='bg-white rounded-lg shadow-lg w-1/3 h-1/2 p-6 relative'>
                        <IoCloseCircleOutline onClick={()=> handleModal()} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
                        <div className='flex flex-col p-5'>
                            <p className='text-[#333333] font-bold text-2xl py-4 text-center'>Create New Category</p>
                            <div className='space-y-2'>
                                <label htmlFor="">Enter Category Name</label>
                                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className='py-3 px-2 w-full border rounded' />
                            </div>
                            <span className={`text-red-500 text-sm text-center`}>{error}</span>
                            <div className='items-center justify-center text-white gap-4 flex py-5'>
                                <button className='bg-[#D7D7D7] py-3 px-5 rounded-lg' onClick={() => handleModal()}>Cancel</button>
                                <button
                                    onClick={handleNextModal}  
                                    className={`bg-[#2F4858] text-white p-3 px-10 rounded-lg 'bg-[#2F4858]/60 ${categoryName.trim() ? 'bg-[#2F4858]' : 'bg-[#2F4858]/60 cursor-not-allowed' } }`}
                                    >Next
                                </button>
                            </div> 
                        </div>   
                    </div>
                </div>
            )}

            {/* enter category name */}
            { createModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99] '>
                    <div className='bg-white rounded-lg shadow-lg w-4/5 h-[95%] p-6 px-10 relative '>
                        <IoCloseCircleOutline onClick={()=> handleCreateModal()} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
                        <div className=' p-10 overflow-y-auto no-scrollbar h-full'>
                            <div className='flex h-60 gap-6 '>
                                <div className='flex items-center justify-center border-2 border-dashed rounded-lg bg-stone-100 w-1/2'>
                                    <Image src ={uploadIcon} alt={"icon"} className='p-5'/>
                                </div>
                                <div className='w-1/2'>
                                    <p className='text-[#333333] font-bold text-2xl py-2 '>Create Sub- Category for “Photo”</p>
                                    <p className='text-base text-[#5D5D5D]'>Add Sub-category for the category with the pricing and image </p>
                                </div>
                            </div>
                            <div className='space-y-4 flex flex-col py-4'>
                                <label htmlFor="" className='text-[#998E8D] bg-stone-100/10 text-sm '>Sub-Category</label>
                                <input type="text" placeholder='Enter sub-category name' className='py-3 px-2 w-1/2 border rounded' />
                                <div>
                                    <button className='bg-[#1C6B50] text-white rounded-lg px-4 py-3 text-sm'>Add More</button>
                                </div>
                            </div>
                            <div className='items-center justify-center text-white gap-4 flex py-5'>
                                <button className='bg-[#D7D7D7] py-3 rounded-lg px-10' onClick={() => handleCreateModal()}>Cancel</button>
                                <button
                                    onClick={handleCreateSubmit}  
                                    className={`bg-[#2F4858] text-white p-3 px-10 rounded-lg 'bg-[#2F4858]/60 ${categoryName.trim() ? 'bg-[#2F4858]' : 'bg-[#2F4858]/60 cursor-not-allowed' } }`}
                                    >Create
                                </button>
                            </div> 
                        </div>   
                    </div>
                </div>
            )}

            {/* done notification */}
            <div>
                {
                    notify && (
                        <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99]' onClick={() => {{handleCreateModal(); setNotify(false)}}}>
                            <div className='bg-white rounded-lg shadow-lg w-1/4 h-[350px] p-6 relative flex justify-center items-'>
                                <ul className='text-center flex flex-col justify-around'>
                                    <li className={'text-center'}><Image src={successIcon} alt='image'  /></li>
                                    <li>Category Created Successfully</li>
                                    <li>
                                        <button 
                                            onClick={
                                                () => {
                                                    {handleCreateModal(); setNotify(false)}
                                                }} 
                                                className='bg-[#2F4858] text-white p-4 w-full rounded'
                                                >
                                            Done
                                        </button>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    )
                }
            </div>

            {/* enter category name */}
            { editModal && (
                <EditCategory item={selectedItem} onClose={handleCloseEditModal}/>
            )}

            {/* delete category notification */}
            <div>
                {
                    deleteModal && (
                        <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99]' onClick={() => {{setDeleteModal(false)}}}>
                            <div className='bg-white rounded-lg shadow-lg w-1/4 h-[350px] p-6 relative flex justify-center items-'>
                                <ul className='text-center flex flex-col justify-around'>
                                    <li className={'flex items-center justify-center'}><Image src={successIcon} alt='image'  /></li>
                                    <li>{deleteMsg}</li>
                                    <li>
                                        <button 
                                            onClick={
                                                () => {
                                                    {setDeleteModal(false)}
                                                }} 
                                                className='bg-[#2F4858] text-white p-4 w-full rounded'
                                                >
                                            Done
                                        </button>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Page;