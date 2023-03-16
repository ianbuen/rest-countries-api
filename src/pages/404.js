import BackButton from '@/components/BackButton';
import React from 'react'
import { GrDocumentMissing } from "react-icons/gr";
import { HiOutlineHome } from "react-icons/hi";

export const Custom404 = () => {
  return <div className='relative grid gap-14 sm:gap-16 py-14 sm:py-20 md:py-24 mt-10 2xl:mt-24 justify-items-center justify-self-center text-center outline-dotted outline-4 outline-[#0005] dark:outline-dark-gray w-5/6 sm:w-2/3 md:w-1/2'>
      <GrDocumentMissing className='text-5xl animate-ping opacity-70 lg:text-7xl dark:invert-[70%]' />
      <div className='grid gap-5'>
          <h1 className='font-bold text-5xl 2xl:text-6xl opacity-50 mx-10'>Error 404</h1>
          <p className='text-2xl 2xl:text-3xl'>Page Not Found.</p>
      </div>
      <BackButton text="Home" icon={HiOutlineHome} />
  </div>
}

export default Custom404;
