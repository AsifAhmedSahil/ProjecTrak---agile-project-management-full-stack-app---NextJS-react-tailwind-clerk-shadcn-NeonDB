'use client'
import { OrganizationList, useOrganization } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const OnBoarding = () => {
    const router = useRouter()
    const {organization} = useOrganization()

    useEffect(()=>{
      if(organization){
        router.push(`/organization/${organization.slug}`)
      }
    },[organization])
    
  return (
    <div className='flex justify-center items-center pt-14'>
        <OrganizationList hidePersonal 
        afterCreateOrganizationUrl="/organization/:slug"
        afterSelectPersonalUrl="/organization/:slug"
        />
    </div>
  )
}

export default OnBoarding