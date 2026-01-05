import React from 'react';
import AFetchUrl from '@/components/admin/Tools/AFetchUrl';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Fetch URL Tool - Admin Dashboard',
}

const page = () => {
  return (
    <>
    
    <AFetchUrl />
    
    </>
  )
}

export default page
