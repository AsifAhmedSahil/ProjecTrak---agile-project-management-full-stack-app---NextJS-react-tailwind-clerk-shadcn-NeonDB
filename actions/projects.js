import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createProject(data) {
    const {userId,orgId} = auth()

    if(!userId){
        throw new Error("Unauthorize!")
    }

    if(!orgId){
        throw new Error("Organization not found!")
    }

    const { data: memberShip } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: organisation.id,
    });

  const useMemberShip = memberShip.find(
    (member) => member.publicUserData.userId === userId
  );

  if(!useMemberShip || useMemberShip.role !== "org:admin"){
    throw new Error("Only Organization admins can create ")
  }

  try {
    const project = await db.project.create({
        data:{
            name:data.name,
            key:data.key,
            description:data.description,
            organizationId:orgId
        }
    })
    return project
  } catch (error) {
    throw new Error("Error Creating Project" + error.message);
  }
    
}