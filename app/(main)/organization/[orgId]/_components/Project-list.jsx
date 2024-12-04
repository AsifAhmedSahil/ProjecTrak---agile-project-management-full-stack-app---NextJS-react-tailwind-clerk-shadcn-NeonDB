import { getProjects } from "@/actions/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import DeleteProject from "./delete-project";

export default async function ProjectList({ orgId }) {
  const projects = await getProjects(orgId);

  if (projects.length === 0) {
    return (
      <p>
        No Projects found.{" "}
        <Link
          href={"/project/create"}
          className="underline underline-offset-2 text-blue-200"
        >
          create new
        </Link>
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => {
        return (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {project.name}
                <DeleteProject projectId={project.id}/>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm mb-4">
                {project.description}
              </p>
              <Link
                href={`/project/${project.id}`}
                className="text-yellow-500 hover:underline font-bold"
              >
                {" "}
                View Project
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
