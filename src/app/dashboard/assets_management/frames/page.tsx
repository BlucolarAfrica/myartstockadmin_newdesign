/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { FetchFrames, UpdateFrameStatus } from '@/redux/features/asset_management/assetSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loader from '@/shared/Loader';
import { highlightMatch } from '@/utils/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical, BsToggleOn } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { IoCloseCircleOutline } from 'react-icons/io5';
import uploadIcon from '../../../../../public/assets/uploadIcon.png'
import ViewFrameModal from '@/components/asset/ViewFrameModal';
import EditFrameModal from '@/components/asset/EditFrameModal';



const Page = () => {
    const {isLoading, isError, frames:data, errorMsg, updateFrameStatusMsg} = useAppSelector(state => state.assets);
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMoreBtn, setViewMoreBtn] = useState<number | null>(null);
    const [createFrameModal, setCreateFrame] = useState(false)
    const [viewDetails, setViewDetails] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
    const [editFrameModal, setEditFrameModal] = useState(false)
    // const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
    // const [modal, setModal] = useState(false)


    const toggleMenu = (id: number) => {
        setViewMoreBtn(viewMoreBtn === id ? null : id);
    };

    useEffect(() => {
      dispatch(FetchFrames())
    },[dispatch])

    // Filtered Data
    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateFrameModal = () => {
        setCreateFrame(!createFrameModal)
    }

     // handle-modal
     const handleModalDetails = (param: Record<string, any>) =>{
        setSelectedItem(param)
        setViewDetails(true)
    };

    const handleCloseViewDetails = () => {
        setViewDetails(false)
        setSelectedItem(null);
    };

    const handleEditFrameModal = (param: Record<string, any>) => {
        setSelectedItem(param)
        setEditFrameModal(true)
        // onClose()
    };

    const handleCloseFrameModal = () => {
        setSelectedItem(null);
        setEditFrameModal(false)
    };

    const handleUpdateStatus = (id: number) => {
        dispatch(UpdateFrameStatus(id))
        alert(updateFrameStatusMsg)
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
                        className='bg-[#2F4858] rounded-lg text-white p-3 px-5' 
                        onClick={()=> handleCreateFrameModal()} 
                    >
                        Add New Frame
                    </button>
                </div>
            </div>
        </div>
        <div>
            <table className='min-w-full bg-white border border-gray-200/40'>
                <thead>
                    <tr className="bg-gray-100/40 text-[#C3C3C3] font-semibold text-xs">
                        <th className="py-4 px-4 text-left border-b">S/N</th>
                        <th className="py-4 px-4 text-left border-b">Frame Picture</th>
                        <th className="py-4 px-4 text-left border-b">Name</th>
                        <th className="py-4 px-4 text-left border-b">Type</th>
                        <th className="py-4 px-4 text-left border-b">Price</th>
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
                                <td className='py-2 px-4 border-b flex items-center'>{<img src={item.image_url?? "null" } alt={"image"} className='h-10 w-10 rounded-full'/>} </td>
                                <td className='py-3 px-4 border-b'>{ highlightMatch(item.title, searchQuery)}</td>
                                <td className='py-3 px-4 border-b'>{item.type?? "null"}</td>
                                <td className='py-3 px-4 border-b'>{item.price?? "null"}</td>
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
                                        <div className="absolute right-28 top-4 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333] border" onMouseLeave={() => toggleMenu(item.id)}>
                                            <ul className="p-2 py-3 text-xs">
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleModalDetails(item)}>
                                                    View Details
                                                </li>
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleEditFrameModal(item)}>
                                                    Edit
                                                </li>
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer" onClick={() =>handleUpdateStatus(item?.id)}>Disable</li>
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Delete</li>
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

            {/*  */}
            {createFrameModal && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99] '>
                    <div className='bg-white rounded-lg shadow-lg w-4/5 h-[95%] p-6 px-10 relative '>
                        <IoCloseCircleOutline onClick={()=> handleCreateFrameModal()} size={30} className='absolute right-5 text-[#B0B0B0] cursor-pointer' />
                        <div className='flex p-6 gap-8 text-[#5D5D5D]'>
                            <div className='space-y-5 w-1/2'>
                                <div className='font-bold text-2xl py-6'>Create New Frame</div>
                                <div className='space-y-2'>
                                    <label htmlFor="">Enter Frame Name</label>
                                    <input type="text" placeholder='Frame Name'  className='py-3 px-2 w-full border rounded' />
                                </div>
                                <div className='space-y-2'>
                                    <label htmlFor="">Enter Frame Price</label>
                                    <input type="text" placeholder='Enter Price'  className='py-3 px-2 w-full border rounded' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="">Frame Type</label>
                                    <select className='border p-3 outline-[0.2px] rounded-lg' >
                                        <option>--Choose Frame Type--</option>
                                    </select>
                                </div>
                            </div>
                            <div className=' w-1/2'>
                                <div className='flex items-center justify-center border-2 border-dashed rounded-lg bg-stone-100 h-full'>
                                    <Image src ={uploadIcon} alt={"icon"} className='p-5'/>
                                </div>
                            </div>
                        </div>
                        <div className='items-center justify-center py-5 flex gap-8'>
                            <button className='bg-[#2F4858]/20 rounded-lg text-white p-4 px-10' onClick={() => handleCreateFrameModal()}> Cancel</button>
                            <button className='bg-[#2F4858] rounded-lg text-white p-4 px-10'> Create</button>
                        </div>
                    </div>
                </div>
            )}

            {/* editFrameModal */}
            {editFrameModal && (
                <EditFrameModal item={selectedItem} onClose={handleCloseFrameModal}/>
            )}

            {/*  */}
            {viewDetails && (
                <ViewFrameModal onClose={handleCloseViewDetails} item={selectedItem}/>
            )}
        </div>
    </div>
  )
}

export default Page;