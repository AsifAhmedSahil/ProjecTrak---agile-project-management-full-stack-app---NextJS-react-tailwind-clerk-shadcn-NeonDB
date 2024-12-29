"use client";
import React, { useState } from "react";
import SprintManager from "./sprint-manager";
import statuses from "@/data/status";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import IssueCreationDrawer from "./create-issue";


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

  const handleIssueCreated = () =>{
    // fetch issues here
  }

  const onDragEnd = () => {};

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
          onClose={()=>setIsDrawerOpen(false)}
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
