import BackButton from '@/components/BackButton';
import React from 'react'
import { GrDocumentMissing } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";

export const Custom404 = () => {
  return <div className='relative grid gap-14 content-center justify-items-center text-center h-[50vmax] outline-dotted outline-4 outline-[#2225]'>
    <GrDocumentMissing className='text-5xl animate-ping opacity-60' />
    <div className='grid gap-5'>
        <h1 className='font-bold text-5xl opacity-50'>Error 404:</h1>
        <p className='text-2xl'>Page Not Found.</p>
    </div>
    <BackButton text="Home" icon={HiOutlineHome} />
  </div>
}

export default Custom404;
