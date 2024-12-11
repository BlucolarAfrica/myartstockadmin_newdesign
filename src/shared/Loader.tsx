import React from 'react'
import { TbLoader3} from 'react-icons/tb'

const Loader = () => {
  return (
    <div className='flex h-screen justify-center items-center'>
        {/* <span className='animate-spin'>
            <TbLoaderQuarter size={20} className='animate-spin' />
        </span> */}
        {/* Please Wait... */}
        <div>
          <TbLoader3 size={30} className={`animate-spin`}/>
        </div>
    </div>
  )
}

export default Loader