'use client';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const ABackButton = () => {
  return (
      <div
        onClick={() => window.history.back()}
        className="my-4 cursor-pointer text-neutral-300 hover:text-white flex items-center items-center w-fit gap-2"
      >
        <FaArrowLeft className="text-sm" />
        Go Back to 
      </div>
  )
}

export default ABackButton;
