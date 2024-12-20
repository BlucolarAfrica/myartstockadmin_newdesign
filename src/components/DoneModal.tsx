import Image from 'next/image';
import React from 'react'
import successIcon from '../../public/assets/success notice.png'
// import icon from '../../public/assets/success notice.png'

interface DoneModalProps {
    isVisible: boolean;
    message?: string;
    onClose: () => void;
  }

const DoneModal = ({isVisible, message = "Successful", onClose}: DoneModalProps) => {

    if (!isVisible) return null;

  return (
    <div className='fixed inset-0 transition-all flex items-center justify-center bg-black bg-opacity-50 z-[99] duration-300' onClick={onClose}>
        <div className='bg-white rounded-lg shadow-lg w-1/4 h-[350px] p-6 relative flex justify-center items-'>
            <ul className='text-center flex flex-col justify-around '>
                <li className={'flex justify-center'}><Image src={successIcon} alt='image'  /></li>
                <li>{message}</li>
                <li>
                    <button 
                        onClick={
                            () => {
                                onClose()
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

export default DoneModal;