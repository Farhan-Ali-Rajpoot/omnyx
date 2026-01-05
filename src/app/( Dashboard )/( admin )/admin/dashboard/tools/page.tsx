import React from 'react'
import ATools from '@/components/admin/Layout/ATools';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tools - Admin Dashboard',
};

const page = () => {
  return (
    <>
      <ATools />
    </>
  )
}

export default page;
