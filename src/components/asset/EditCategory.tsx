import Image from 'next/image';
import React from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';
import uploadIcon from '../../../public/assets/signature upload.png'

interface ItemProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: Record<string, any> | null;
    // result: Record<string, any> | null;
    onClose: () => void;
};

const EditCategory = ({item, onClose}: ItemProps) => {
    console.log(item)
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99] '>
        <div className='bg-white rounded-lg shadow-lg w-4/5 h-[95%] p-6 px-10 relative '>
            <IoCloseCircleOutline onClick={onClose} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
            <div className=' p-10 overflow-y-auto no-scrollbar h-full'>
                <div className='flex h-60 gap-8'>
                    
                    <div className='w-1/2'>
                        <p className='text-[#333333] font-bold text-2xl py-2 '>Edit Category</p>
                        <div className='space-y-4 flex flex-col py-4'>
                            <label htmlFor="" className='text-[#998E8D] text-sm'>Category Name</label>
                            <input type="text" placeholder='Photo' className='py-3 px-2 w-full border rounded' />
                        </div>
                    </div>
                    <div className=' cursor-pointer flex items-center justify-center border-2 border-dashed rounded-lg w-1/2 overflow-hidden'>
                        <Image src ={uploadIcon} alt={"icon"} className='h-full w-full object-cover'/>
                    </div>
                </div>
                <div className='space-y-4 flex flex-col py-4'>
                    <p className='text-[#333333] font-bold text-xl py-2 '>Sub-Category</p>
                    <label htmlFor="" className='text-[#998E8D] text-sm shadow-inner p-3'> S/N Sub-Category</label>
                    <input type="text" placeholder='Enter sub-category name' className='py-3 px-2 w-1/2 border rounded' />
                    <div>
                        <button className='bg-[#1C6B50] text-white rounded-lg px-4 py-3 text-sm'>Add More</button>
                    </div>
                </div>
                <div className='items-center justify-center text-white gap-4 flex py-5'>
                    <button className='bg-[#D7D7D7] py-3 rounded-lg px-10'>Cancel</button>
                    <button
                        // onClick={handleCreateSubmit}  
                        className={`bg-[#2F4858] text-white p-3 px-10 rounded-lg 'bg-[#2F4858]/60 bg-[#2F4858]'  }`}
                        >Update Changes
                    </button>
                </div> 
            </div>   
        </div>
    </div>
  )
}

export default EditCategory;