"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const SprintCreationForm = ({
  projectTitle,
  prijectId,
  projectKey,
  sprintKey,
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div>
        <h1>{projectTitle}</h1>
        <Button
          className="mb-2"
          variant={showForm ? "destructive" : "default"}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "cancel" : "Create New Sprint"}
        </Button>
      </div>

      {showForm && <> Form </>}
    </>
  );
};

export default SprintCreationForm;
