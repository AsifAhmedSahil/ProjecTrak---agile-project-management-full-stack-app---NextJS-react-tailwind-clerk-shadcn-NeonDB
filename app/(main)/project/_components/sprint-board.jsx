"use client";
import React, { useEffect, useState } from "react";
import SprintManager from "./sprint-manager";
import statuses from "@/data/status";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import IssueCreationDrawer from "./create-issue";
import useFetch from "@/hooks/use-fetch";
import { getIssuesForSprint } from "@/actions/issues";
import { BarLoader } from "react-spinners";
import IssuesCard from "@/components/IssuesCard";

const SprintBoard = ({ sprints, projectId, orgId }) => {
  const [currentSprint, setCurrentSprint] = useState(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectStatus, setSelectStatus] = useState(null);

  const handleAddIssue = (status) => {
    setSelectStatus(status);
    setIsDrawerOpen(true);
  };

  const {
    loading: issuesLoading,
    error: issuesError,
    fn: fetchIssues,
    data: issues,
    setData: setIssues,
  } = useFetch(getIssuesForSprint);

  useEffect(() => {
    if (currentSprint.id) {
      fetchIssues(currentSprint.id);
    }
  }, [currentSprint.id]);

  const [filteredIssues, setFilterIssues] = useState(issues);

  const handleIssueCreated = () => {
    fetchIssues(currentSprint.id);
  };

  const onDragEnd = () => {};

  console.log(issues)

  if (issuesError) return <div>Error Loading Issues...</div>;

  return (
    <div>
      {/* Sprint manager */}

      <SprintManager
        sprints={sprints}
        sprint={currentSprint}
        setSprint={setCurrentSprint}
        projectId={projectId}
      />

      {/* kanban board */}

      {issuesLoading && (
        <BarLoader width={"100%"} color="#36d7b7" className="mt-4" />
      )}
      

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900 p-4 rounded-lg mt-4">
          {statuses.map((coloum) => (
            <Droppable key={coloum.key} droppableId={coloum.key}>
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    <h3 className="font-semibold mb-2 text-center">
                      {coloum.name}
                    </h3>
                    {/* issues */}
                    {issues
                      ?.filter((issue) => issue.status === coloum.key)
                      .map((issue, index) => (
                        
                        <Draggable
                          key={issue.id}
                          draggableId={issue.id}
                          index={index}
                        >
                           {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <IssuesCard
                              issue={issue}
                              onDelete={() => fetchIssues(currentSprint.id)}
                              onUpdate={(updated) =>
                                setIssues((issues) =>
                                  issues.map((issue) => {
                                    if (issue.id === updated.id) return updated;
                                    return issue;
                                  })
                                )
                              }
                            />
                          </div>
                        )}
                        </Draggable>
                      ))}

                    {provided.placeholder}
                    {coloum.key === "TODO" &&
                      currentSprint.status !== "COMPLETED" && (
                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={() => handleAddIssue(coloum.key)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Create Issue
                        </Button>
                      )}
                  </div>
                );
              }}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <IssueCreationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sprintId={currentSprint.id}
        status={selectStatus}
        projectId={projectId}
        onIssueCreated={handleIssueCreated}
        orgId={orgId}
      />
    </div>
  );
};

export default SprintBoard;
