'use client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { highlightMatch, truncateText } from '@/utils/utils'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { LuFilter } from 'react-icons/lu';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link'
import { createVendor, fetchVendors } from '@/redux/features/vendor/vendorSlice'
import Loader from '@/shared/Loader'
import { IoCloseCircleOutline } from 'react-icons/io5'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'
// import DoneModal from '@/components/DoneModal'


const initialState = {
    business_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    personnel_name: "",
    location: "",
    type: ""
}

const Vendor = () => {
    const {isLoading, isError, vendors:data, errorMsg} = useAppSelector(state => state.vendor);
    const dispatch = useAppDispatch();
    const [viewMoreBtn, setviewMoreBtn] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [modal, setModal] = useState(false);
    const [formState, setFormState] = useState(initialState)
    const router = useRouter()
    const [roleFilter, setRoleFilter] = useState("");
    // const [isModalVisible, setModalVisible] = useState(false);


    // const handleCloseModal = () => {
    //     setModalVisible(false);
    // };


    const toggleMenu = (id: number) => {
        setviewMoreBtn(viewMoreBtn === id ? null : id);
    };

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setFormState({ ...formState, [name]: value})
    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userData = {
            email: formState.email,
            business_name: formState.business_name,
            first_name: formState.first_name,
            last_name: formState.last_name,
            phone_number: formState.phone_number,
            personnel_name: formState.personnel_name,
            location: formState.location,
            type: formState.type
        };
        dispatch(createVendor(userData))
        // <DoneModal message='successful' isVisible={isModalVisible} onClose={handleCloseModal}/>
        toast.success("Successful")
        setFormState(initialState)
    };

    useEffect(() => {
      dispatch(fetchVendors())
    },[dispatch])

        
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


    const handleModal =()=>{
        setModal(!modal)
    }

    // Filtered Data
    const filteredData = displayData.filter((item) => {
        const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.personnel_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesRole = roleFilter
        ? 
        item.type.toLowerCase() === roleFilter.toLowerCase()
        : true;

        return matchesSearch && matchesRole;
    }
    );

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(100, Number(event.target.value)));
        setRowsPerPage(value);
        setCurrentPage(1); 
    };


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
                <label htmlFor="filter" className='flex p-2 items-center text-gray-500'><LuFilter />Filter</label>
                <select 
                    name="data" 
                    id="data" 
                    className='border p-3 outline-none rounded-lg' 
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}>
                    <option value="">-All-</option>
                    <option value="merchandise">Merchandise</option>
                    <option value="paint">Paint</option>
                </select>
            </div>
            <div className='flex items-center gap-4'>
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
                <div>
                    <button className='bg-[#2F4858] rounded-lg text-white p-3' onClick={()=> handleModal()} >Create New Vendor</button>
                </div>
            </div>
        </div>
        <div className='overflow-x-auto'>
            <table className='min-w-full bg-white border border-gray-200/40'>
                <thead>
                    <tr className="bg-gray-100/40 text-[#C3C3C3] font-semibold text-xs">
                        <th className="py-4 px-4 text-left border-b">S/N</th>
                        <th className="py-4 px-4 text-left border-b">Business Name</th>
                        <th className="py-4 px-4 text-left border-b">Full Name</th>
                        <th className="py-4 px-4 text-left border-b">Email Address</th>
                        <th className="py-4 px-4 text-left border-b">Phone Number</th>
                        <th className="py-4 px-4 text-left border-b">Vendor Type</th>
                        <th className="py-4 px-4 text-left border-b">Location</th>
                        <th className="py-4 px-4 text-left border-b">Status</th>
                        <th className="py-4 px-4 text-left border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    { !filteredData.length && !isLoading?
                    
                    <tr className='py-5 font-bold text-[#333333]'>
                        <td className='py-4 px-4 text-center'>No matching data found</td>
                    </tr>
                    :
                    filteredData.map((user, index) => {
                        return (
                            <tr key={user.id} className='hover:bg-gray-50 text-[#333333] font-normal text-xs cursor-pointer' onClick={() => router.push(`/dashboard/account_settings/vendor/${user.id}`)}>
                                <td className='py-2 px-4 border-b'>{index + 1}</td>
                                <td className='py-3 px-4 border-b'>{ highlightMatch(`${truncateText(user.name, 10)}`, searchQuery)}</td>
                                <td className='py-3 px-4 border-b'>{highlightMatch(user.personnel_name, searchQuery)}</td>
                                <td className='py-3 px-4 border-b'>{ highlightMatch(`${truncateText(user.email, 10)}`, searchQuery)}</td>
                                <td className='py-3 px-4 border-b'>{user.phone_number ? truncateText(user.phone_number, 10) : "null"}</td>
                                <td className='py-3 px-4 border-b'>{highlightMatch(user.type, searchQuery)}</td>
                                <td className='py-3 px-4 border-b'>{user.country ? user.country : "null"}</td>
                                <td className='py-3 px-4 border-b text-sm'>{user.is_active === true? <span className='bg-[#06D6A00D] rounded-lg px-2 py-1 text-xs text-[#2F4858]'>active</span> : <span className='bg-[#F99E0B40] text-orange rounded-lg px-2 py-1 text-xs text-[#F99E0B]'>In-active</span> }</td>
                                <td className='py-2 px-4 border-b relative'>
                                    <BsThreeDotsVertical onClick={ () => toggleMenu(user.id)} onMouseEnter={ () => toggleMenu(user.id)}  className='cursor-pointer'/>
                                    {viewMoreBtn === user.id && (
                                        <div className="absolute right-16 top-4 mt-2 w-40 bg-white shadow-lg rounded-lg z-10 text-[#333333]" onMouseLeave={() => toggleMenu(user.id)}>
                                            <ul className="p-2 text-xs">
                                                <li className="">
                                                    <Link href={`/dashboard/account_settings/vendor/${user.id}`} className='py-1 px-2 hover:bg-gray-100 cursor-pointer w-full h-full block'>View More</Link>
                                                </li>
                                                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">Disable</li>
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
        </div>

        {/* create vendor */}
        { modal && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99] '>
                <div className='bg-white rounded-lg shadow-lg w-2/3 h-[90%] p-6 relative overflow-y-auto'>
                    <IoCloseCircleOutline onClick={()=> handleModal()} size={30} className='absolute right-4 text-[#B0B0B0] cursor-pointer' />
                    <div className='p-10'>
                        <p className='text-[#333333] font-bold text-2xl py-4'>Create Vendor</p>
                        <form onSubmit={handleSubmit} className=''>
                            <ul className='space-y-3 text-[#333333] font-normal text-sm'>
                                <li className='flex flex-col gap-1'>
                                    <label htmlFor="">Business Name</label>
                                    <input type="text"required value={formState.business_name} name='business_name' onChange={handleChange} className='border p-3 outline-[0.2px] rounded-lg' />
                                </li>
                                <li className='flex gap-4 w-full'>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor="">First Name</label>
                                        <input type="text"
                                            className='border p-3 outline-[0.2px] rounded-lg w-full'
                                            required
                                            value={formState.first_name}
                                            onChange={handleChange}
                                            name='first_name'
                                        />
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor="">Last Name</label>
                                        <input 
                                            type="text" 
                                            className='border p-3 outline-[0.2px] rounded-lg w-full'
                                            value={formState.last_name}
                                            onChange={handleChange}
                                            name='last_name'
                                            required
                                        />
                                    </div>
                                </li>
                                <li className='flex flex-col gap-1'>
                                    <label htmlFor="">Email</label>
                                    <input 
                                        type="text"
                                        className='border p-3 outline-[0.2px] rounded-lg' 
                                        value={formState.email}
                                        onChange={handleChange}
                                        name='email'
                                        required
                                    />
                                </li>
                                <li className='flex flex-col gap-1'>
                                    <label htmlFor="">Location</label>
                                    <input 
                                        type="text" 
                                        className='border p-3 outline-[0.2px] rounded-lg' 
                                        value={formState.location}
                                        onChange={handleChange}
                                        name='location'
                                        required
                                    />
                                </li>
                                <li className='flex flex-col gap-1'>
                                    <label htmlFor="">Phone Number</label>
                                    <input 
                                        type="text" 
                                        className='border p-3 outline-[0.2px] rounded-lg'
                                        value={formState.phone_number}
                                        onChange={handleChange}
                                        name='phone_number'
                                        required
                                    />
                                </li>
                                <li className='flex flex-col gap-1'>
                                    <label htmlFor="">Vendor Type</label>
                                    <select name="type" 
                                        value={formState.type}
                                        onChange={handleChange}
                                        required className='border p-3 outline-[0.2px] rounded-lg'>
                                            <option value="">--select type--</option>
                                            <option value="paint">Paint</option>
                                            <option value="merchandise">Merchandise</option>
                                    </select>
                                </li>
                                <li className='text-center py-5'>
                                    <button 
                                        disabled={isLoading} 
                                        type={'submit'} 
                                        className='bg-[#2F4858] rounded-lg text-white p-4 font-bold px-10 cursor-pointer button'
                                        >{isLoading ? 'Loading' : "Create Vendor"}</button>
                                </li>
                            </ul>
                        </form>
                    </div>   
                </div>
            </div>
        )}

        {/* done notification */}

    </div>
  )
}

export default Vendor;