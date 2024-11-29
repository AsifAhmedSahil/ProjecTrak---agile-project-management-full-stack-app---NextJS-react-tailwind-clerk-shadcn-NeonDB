'use client'
import { OrganizationList, useOrganization } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

const OnBoarding = () => {
    const router = useRouter()
    const {organization} = useOrganization()
    
  return (
    <div className='flex justify-center items-center pt-14'>
        <OrganizationList hidePersonal/>
    </div>
  )
}

export default OnBoarding