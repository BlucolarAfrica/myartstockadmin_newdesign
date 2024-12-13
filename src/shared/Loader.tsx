import Image from 'next/image'
import React from 'react'
import loaderIcon from '../../public/assets/loadergif.gif'

const Loader = () => {
  return (
    <div className='flex h-screen justify-center items-center'>
        <div className='h-20 w-20 overflow-hidden'>
           <Image src={loaderIcon} alt='image' width={10} height={10} className='h-full w-full' />
        </div>
    </div>
  )
}

export default Loader;