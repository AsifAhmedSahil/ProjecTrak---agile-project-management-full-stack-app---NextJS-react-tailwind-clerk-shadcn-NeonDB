'use server'
import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createProject(data) {
 
  const { userId, orgId } = await  auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!orgId) {
    throw new Error("No Organization Selected");
  }

  // Check if the user is an admin of the organization
  const { data: membershipList } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  const userMembership = membershipList.find(
    (membership) => membership.publicUserData.userId === userId
  );

  if (!userMembership || userMembership.role !== "org:admin") {
    throw new Error("Only organization admins can create projects");
  }

  try {
    const project = await db.project.create({
      data: {
        key: data.key,
        description: data.description,
        organizationId: orgId,
        name: data.name,
      },
    });

    return project;
  } catch (error) {
    console.log(error)
    throw new Error("Error creating project: " + error.message);
  }
}

export async function getProjects(orgId){

  const {userId} = auth()

  if(!userId){
    throw new Error("unauthorized")
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId
    }
  })

  if(!user){
    throw new Error("user not found!")
  }

  const projects = await db.project.findMany({
    where: {
      organizationId:orgId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return projects

}

export async function deleteProject(projectId) {

  const { userId , orgId , orgRole } = auth()

  if(!userId || !orgId){
    throw new Error("Unauthorized!")
  }

  if(orgRole !== "org:admin"){
    throw new Error("only organization admins can delete projects")
  }

  const project = await db.project.findUnique({
    where:{
      id: projectId
    }
  });

  if(!project || project.organizationId !== orgId){
    throw new Error("Project not found or you dont have permission to delete it")
  }

  await db.project.delete({
    where:{
      id: projectId
    }
  })

  return {success:true}
  
}

export async function getProject(projectId) {

  const {userId,orgId} = auth()

  if(!userId || !orgId){
    throw new Error("Unauthorized")
  }

  const user = await db.user.findUnique({
    where:{
      clerkUserId:userId
    }
  })

  if(!user){
    throw new Error("User not found!")
  }

  
  
}