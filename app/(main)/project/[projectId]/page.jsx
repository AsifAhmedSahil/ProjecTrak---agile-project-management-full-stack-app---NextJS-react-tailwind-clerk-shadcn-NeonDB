// app/(main)/project/[projectId]/page.jsx
import { notFound } from "next/navigation";
import React from "react";
import SprintCreationForm from "../_components/create-sprint";
import SprintBoard from "../_components/sprint-board";
import { getProject } from "@/actions/projects";

// Define the Server Component
const ProjectPage = async ({ params }) => {
  // Await the params to safely get the projectId
  const { projectId } = await params; // Get projectId from URL params
  
  // Fetch project data using the projectId
  const project = await getProject(projectId);

  // If the project doesn't exist, display a 404 error
  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <h1>{project.name}</h1>

      <SprintCreationForm
        projectTitle={project.name}
        projectId={project.id}
        projectKey={project.key}
        sprintKey={project.sprints?.length + 1}
      />
      
      {project.sprints.length > 0 ? (
        <SprintBoard
          sprints={project.sprints}
          projectId={project.id}
          orgId={project.organizationId}
        />
      ) : (
        <div>Create a sprint from the button above</div>
      )}
    </div>
  );
};

// Fetch metadata (optional, if needed for SEO purposes)
export async function generateMetadata({ params }) {
  // You can retrieve metadata (like headers) here if needed.
  // This part can also fetch Content Security Policy headers if desired.
  const contentSecurityPolicy = 'Not provided'; // You can add logic to fetch headers or set a default value.
  
  return {
    title: "Project Page",
    description: "Manage your sprints and projects.",
    contentSecurityPolicy,
  };
}

export default ProjectPage;
