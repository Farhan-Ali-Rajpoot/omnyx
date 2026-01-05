import React from 'react'
import NotFoundPage from '@/components/layout/NotFound'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
}

const NotFound = () => {
  return (
    <>
    <NotFoundPage />
    </>
  )
}

export default NotFound
