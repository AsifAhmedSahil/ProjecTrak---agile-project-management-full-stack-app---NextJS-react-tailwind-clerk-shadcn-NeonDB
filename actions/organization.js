"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getOrganization(slug) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }
  const organisation = await clerkClient().organizations.getOrganization({
    slug,
  });

  if (!organisation) {
    return null;
  }

  // check iff user exist on the organization or not

  const { data: memberShip } =
    await clerkClient().organizations.getOrganizationMembershipList({
      organizationId: organisation.id,
    });

  const useMemberShip = memberShip.find(
    (member) => member.publicUserData.userId === userId
  );

  if (!useMemberShip) {
    return null;
  }

  return organisation;
}

export async function getOrganizationUsers(orgId) {

  const {userId} = auth()

  if(!userId){
    throw new Error("Unauthorized")
  }

  const user = await db.user.findUnique({
    where:{
      clerkUserId: userId
    }
  })

  if(!user){
    throw new Error("User not found")
  }

  const organizationMemberShips = await clerkClient().organizations.getOrganizationMembershipList({
    organizationId: orgId
  })

  const userIds = organizationMemberShips.data.map((memberShip) => memberShip.publicUserData.userId)

  const users = await db.user.findMany({
    where:{
      clerkUserId:{
        id:userIds
      }
    }
  })

  return users
  
}
