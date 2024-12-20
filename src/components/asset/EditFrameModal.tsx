/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React, { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';
import uploadIcon from '../../../public/assets/uploadIcon.png'


interface ItemProps {
    item: Record<string, any> | null;
    onClose: () => void;
};
const EditFrameModal = ({item, onClose}:ItemProps) => {
    const [frameName, setFrameName]= useState(item?.title || "")
    const [price, setPrice] = useState(item?.price || "")
    const [frameType, setFrameType] = useState(item?.type || "")
    
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99] '>
        <div className='bg-white rounded-lg shadow-lg w-4/5 h-[95%] p-6 px-10 relative '>
            <IoCloseCircleOutline onClick={onClose} size={30} className='absolute right-5 text-[#B0B0B0] cursor-pointer' />
            <div className='flex p-6 gap-8 text-[#5D5D5D]'>
                <div className='space-y-5 w-1/2'>
                    <div className='font-bold text-2xl py-6'>Edit Frame</div>
                    <div className='space-y-2'>
                        <label htmlFor="">Enter Frame Name</label>
                        <input type="text" value={frameName} onChange={(e) => setFrameName(e.target.value)} placeholder='Frame Name'  className='py-3 px-2 w-full border rounded' />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="">Enter Frame Price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}  placeholder='Enter Price'  className='py-3 px-2 w-full border rounded' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="">Frame Type</label>
                        <select className='border p-3 outline-[0.2px] rounded-lg' value={frameType} onChange={(e) => setFrameType(e.target.value)}  >
                            <option>--Choose Frame Type--</option>
                        </select>
                    </div>
                </div>
                <div className=' w-1/2 h-72 overflow-hidden'>
                    {item?.image_url ?
                        <div className='flex items-center justify-center rounded-lg h-full'>
                            <Image src ={item?.image_url ?? "null"} width={100} height={100} alt={"icon"} className='p-5 w-full h-full'/>
                        </div>
                        :
                        <div className='flex items-center justify-center border-2 border-dashed rounded-lg bg-stone-100 h-full'>
                            <Image src ={uploadIcon} width={100} height={100} alt={"icon"} className='p-5 w-full h-full'/>
                        </div>
                    }
                </div>
            </div>
            <div className='items-center justify-center py-5 flex gap-8'>
                <button className='bg-[#2F4858]/20 rounded-lg text-white p-4 px-10' onClick={onClose}> Cancel</button>
                <button className='bg-[#2F4858] rounded-lg text-white p-4 px-10'> Update</button>
            </div>
        </div>
    </div>
  )
}

export default EditFrameModal