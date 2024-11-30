'use client'

import OrgSwitcher from '@/components/org-switcher'
import { useOrganization, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers"
import { projectSchema } from '@/app/lib/validators'

const CreateProjectPage = () => {


  const { isLoaded:isOrgLoaded, membership } = useOrganization()
  const { isLoaded:isUserLoaded } = useUser()
  const [isAdmin,setIsAdmin] = useState(false)

  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver:zodResolver(projectSchema)
  })

  useEffect(()=>{
    if(isOrgLoaded && isUserLoaded && membership){
      setIsAdmin(membership.role === "org:admin")
    }
  },[isOrgLoaded,membership,isUserLoaded])

  if(!isOrgLoaded || !isUserLoaded){
    return null
  }

  if(!isAdmin){
    return (
      <div className='flex flex-col gap-2 items-center'>
        <span className='text-3xl gradient-title'>Oops!, only admin can create projects</span>
        <OrgSwitcher/>
      </div>
    )
  }



  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-6xl gradient-title text-center mb-8 font-bold'>Create New Project</h1>

      <form>

      </form>
    </div>
  )
}

export default CreateProjectPage