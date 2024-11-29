import { getOrganization } from "@/actions/organization";
import OrgSwitcher from "@/components/org-switcher";
import React from "react";

const Organization = async ({ params }) => {
  const { orgId } = params;

  const organization = await getOrganization(orgId);

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex flex-col sm:flex-row items-start justify-between">
        <h1 className="text-5xl font-bold gradient-title pb-2">{organization.name}&apos;s Project</h1>
        {/* org switcher */}
        <OrgSwitcher/>
      </div>

      <div className="mb-4">Show org Projects</div>
      <div className="mb-8">
        Show users assigned and reported issues here...
      </div>
    </div>
  );
};

export default Organization;
