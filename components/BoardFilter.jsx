import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const BoardFilter = ({ issues, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectPriority, setSelectPriority] = useState("");
  const [selectAssignees, setSelectAssignees] = useState([]);

  const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

  const assignees = issues
    .map((issue) => issue.assignee)
    .filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectAssignees([]);
    setSelectPriority("");
  };

  const isFiltersApplied =
    searchTerm !== "" ||
    selectAssignees.length > 0 ||
    setSelectAssignees !== "";

  useEffect(() => {
    const filteredIssues = issues.filter(
      (issue) =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectAssignees.length === 0 ||
          selectAssignees.includes(issue.assignee?.id)) &&
        (selectPriority === "" || issue.priority === selectPriority)
    );
    onFilterChange(filteredIssues);
  }, [searchTerm, selectAssignees, selectPriority, issues]);

  const toggleAssignee = (assigneeId) => {
    setSelectAssignees((prev) =>
      prev.includes(assigneeId)
        ? prev.filter((id) => id !== assigneeId)
        : [...prev, assigneeId]
    );
  };

  return (
    <div>
      <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 pr-2">
        <Input
          className="w-full sm:w-72"
          placeholder="search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex-shrink-0">
          <div className="flex gap-2 flex-wrap">
            {assignees.map((assignee, i) => {
              const selected = selectAssignees.includes(assignee.id);

              return (
                <div
                  key={assignee.id}
                  className={`rounded-full ring ${
                    selected ? "ring-blue-600" : "ring-black"
                  } ${i > 0 ? "-ml-6" : ""}`}
                  style={{
                    zIndex: i,
                  }}
                  onClick={() => toggleAssignee(assignee.id)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={assignee.imageUrl} />
                    <AvatarFallback>{assignee.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              );
            })}
          </div>
        </div>

        <Select value={selectPriority} onValueChange={setSelectPriority}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            {priorities.map((priority) => (
              <SelectItem key={priority} value={priority}>
                {priority}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isFiltersApplied && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="flex items-center"
          >
            <X className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default BoardFilter;
