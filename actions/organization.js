"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient,  } from "@clerk/nextjs/server";

export async function getOrganization(slug) {
  const { userId } = await auth();

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
  // Await the auth function to get userId
  const { userId } = await  auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const organizationMemberships = await clerkClient().organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });
  
  const userIds = organizationMemberships.data.map(
    (membership) => membership.publicUserData.userId
  );

  const users = await db.user.findMany({
    where: {
      clerkUserId: {
        in: userIds,
      },
    },
  });

  return users;
}


export async function getUserIssues(userId) {
  const { orgId } = auth();

  if (!userId || !orgId) {
    throw new Error("No user id or organization id found");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const issues = await db.issue.findMany({
    where: {
      OR: [{ assigneeId: user.id }, { reporterId: user.id }],
      project: {
        organizationId: orgId,
      },
    },
    include: {
      project: true,
      assignee: true,
      reporter: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return issues;
}
