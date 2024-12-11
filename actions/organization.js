"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient,  } from "@clerk/nextjs/server";

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
  // Await the auth function to get the userId
  const { userId } = await auth();  // Ensure auth() is awaited

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Retrieve the user from your database
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Ensure clerkClient() resolves before calling its methods
  const clerkClientInstance = await clerkClient();  // Make sure clerkClient is awaited properly

  // Now call the getOrganizationMembershipList method
  const organizationMemberships = await clerkClientInstance.organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  // Process the list of memberships
  const userIds = organizationMemberships.data.map(
    (membership) => membership.publicUserData.userId
  );

  // Retrieve users from the database based on the list of userIds
  const users = await db.user.findMany({
    where: {
      clerkUserId: {
        in: userIds,
      },
    },
  });

  return users;
}



