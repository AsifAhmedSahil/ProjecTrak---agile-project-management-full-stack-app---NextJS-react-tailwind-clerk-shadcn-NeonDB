"use client";

import { updateSprintStatus } from "@/actions/sprints";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { format, formatDistanceToNow, isAfter, isBefore } from "date-fns";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const SprintManager = ({ sprints, sprint, setSprint, projectId }) => {
  const [status, setStatus] = useState(sprint.status);

  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const now = new Date();

  const canStart =
    isBefore(now, endDate) && isAfter(now, startDate) && status === "PLANNED";

  const canEnd = status === "ACTIVE";

  const {
    fn: updateStatus,
    loading,
    error,
    data: updatedStatus,
  } = useFetch(updateSprintStatus);

  useEffect(()=>{
    if(updatedStatus && updatedStatus.success){
      setStatus(updatedStatus.sprint.status)
      setSprint({
        ...sprint,
        status:updatedStatus.sprint.status
      })
    }
  },[updatedStatus,loading])

  const handleStatusChange = async(newStatus) => {
    updateStatus(sprint.id,newStatus)
  };

  const handleSprintChange = (value) => {
    const selectedSprint = sprints.find((spr) => spr.id === value);
    setSprint(selectedSprint);
    setStatus(selectedSprint.status);
  };

  const getStatusText = () => {
    if (status === "COMPLETED") {
      return `Sprint Ended`;
    }
    if (status === "ACTIVE" && isAfter(now, endDate)) {
      return `Overdue by ${formatDistanceToNow(endDate)}`;
    }
    if (status === "PLANNED" && isBefore(now, startDate)) {
      return `Star in ${formatDistanceToNow(startDate)}`;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <Select value={sprint.id} onValueChange={handleSprintChange}>
          <SelectTrigger className="bg-slate-900 self-start">
            <SelectValue placeholder="Select Sprints" />
          </SelectTrigger>
          <SelectContent>
            {sprints.map((sprint) => {
              return (
                <SelectItem key={sprint.id} value={sprint.id}>
                  {sprint.name} ({format(sprint.startDate, "MMM d,yyyy")}) to (
                  {format(sprint.endDate, "MMM d,yyyy")})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {canStart && (
          <Button
            className="bg-green-600 text-white"
            onClick={() => handleStatusChange("ACTIVE")}
            disabled={loading}
          >
            Start Sprint
          </Button>
        )}
        {canEnd && (
          <Button
            variant="destructive"
            onClick={() => handleStatusChange("COMPLETED")}
            disabled={loading}
          >
            End Sprint
          </Button>
        )}
      </div>
      {
        loading && <BarLoader width={"100%"} className="mt-2" color="#36d7b7"/>
      }
      {getStatusText() && (
        <Badge className="mt-3 mr-1 self-start">{getStatusText()}</Badge>
      )}
    </>
  );
};

export default SprintManager;
