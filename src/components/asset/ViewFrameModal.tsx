/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5';
import uploadIcon from '../../../public/assets/uploadIcon.png'
import Image from 'next/image';
import { TbCurrencyNaira } from 'react-icons/tb';
import EditFrameModal from './EditFrameModal';

interface ItemProps {
    item: Record<string, any> | null;
    onClose: () => void;
};
const ViewFrameModal = ({item, onClose}: ItemProps) => {
    const [editFrameModal, setEditFrameModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);


    const handleEditFrameModal = (param: Record<string, any>) => {
        setSelectedItem(param)
        setEditFrameModal(true)
        // onClose()
    };

    const handleCloseFrameModal = () => {
        setSelectedItem(null);
        setEditFrameModal(false)
    };

  return (
    <div>
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99] '>
            <div className='bg-white rounded-lg shadow-lg w-2/3 h-[95%] p-6 px-10 relative '>
                <IoCloseCircleOutline onClick={onClose} size={30} className='absolute right-5 text-[#B0B0B0] cursor-pointer' />
                <div className='flex p-10 gap-8 text-[#5D5D5D]'>
                    <div className=' w-1/2 h-72'>
                        {item?.image_url ?
                            <div className='flex items-center justify-center overflow-hidden rounded-lg h-full'>
                                <Image src ={item?.image_url ?? "null"} width={100} height={100} alt={"icon"} className='p-5 w-full h-full'/>
                            </div>
                            :
                            <div className='flex items-center justify-center border-2 border-dashed rounded-lg bg-stone-100 h-full'>
                                <Image src ={uploadIcon} width={100} height={100} alt={"icon"} className='p-5 w-full h-full'/>
                            </div>
                        }
                    </div>
                    <div className='space-y-5 w-1/2'>
                        <ul>
                            <li className='font-bold text-2xl '>{item?.title}</li>
                            <li className='flex items-center'>Price: <TbCurrencyNaira />{item?.price ?? "null"}</li>
                            <li className=''>Type:{item?.type ?? "null"}</li>
                        </ul>
                    </div>
                </div>
                <div className='items-center justify-center py-5 flex gap-8'>
                    <button className='bg-[#2F4858]/20 rounded-lg text-white p-4 px-10' onClick={onClose}> Delete</button>
                    <button className='bg-[#2F4858] rounded-lg text-white p-4 px-10' onClick={() => handleEditFrameModal(item)}> Edit Frame</button>
                </div>
            </div>
        </div>

        {/* modal */}
        {editFrameModal && (
            <EditFrameModal item={selectedItem} onClose={handleCloseFrameModal}/>
        )}
    </div>
  )
}

export default ViewFrameModal