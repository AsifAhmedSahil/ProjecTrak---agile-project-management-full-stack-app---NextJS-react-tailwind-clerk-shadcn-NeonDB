"use client";

import { createIssue } from "@/actions/issues";
import { getOrganizationUsers } from "@/actions/organization";
import { issueSchema } from "@/app/lib/validators";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";

const IssueCreationDrawer = ({
  isOpen,
  onClose,
  sprintId,
  status,
  projectId,
  onIssueCreated,
  orgId,
}) => {

  const {control,register,handleSubmit,formState:{errors}} = useForm({
    resolver:zodResolver(issueSchema)
  })

  const { loading:createIssueLoading , fn:createIssueFn , error, data: newIssue } = useFetch(createIssue)

  const { loading:usersLoading, fn:fetchUsers, data:users } = useFetch(getOrganizationUsers);

  useEffect(()=>{
    if(isOpen && orgId){
      fetchUsers(orgId)
    }
  },[isOpen,orgId])

  const onSubmit = async(data) =>{

  }

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Issue</DrawerTitle>
        </DrawerHeader>
        {
          usersLoading && <BarLoader width={"100%"} color="#36d7b7"/>
        }
        <form >
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <Input id="title" {...register("title")}/>
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default IssueCreationDrawer;
