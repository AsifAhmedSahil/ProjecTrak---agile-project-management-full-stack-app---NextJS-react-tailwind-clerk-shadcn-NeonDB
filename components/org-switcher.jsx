'use client'
import {
  OrganizationSwitcher,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";

const OrgSwitcher = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const pathname = usePathname()

  if (!isLoaded || !isUserLoaded) {
    return null;
  }

  return (
    <div>
      <SignedIn>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:slug"
          afterSelectPersonalUrl="/organization/:slug"

          createOrganizationMode={
            pathname === "/onboarding" ? "navigation" : "modal"
          }
          createOrganizationUrl="/onboarding"
          appearance={{
            elements:{
                organizationSwitcherTrigger:
                "border border-yellow-200 text-yellow-500 rounded-md px-5 py-2",
                organizationSwitcherTriggerIcon: "text-yellow-500"
            }
          }}
        />
      </SignedIn>
    </div>
  );
};

export default OrgSwitcher;
