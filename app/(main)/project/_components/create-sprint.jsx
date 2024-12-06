"use client";
import { createSprint } from "@/actions/sprints";
import { sprintSchema } from "@/app/lib/validators";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useFetch from "@/hooks/use-fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const SprintCreationForm = ({
  projectTitle,
  projectId,
  projectKey,
  sprintKey,
}) => {
  const [showForm, setShowForm] = useState(false);

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 14),
  });

  const router = useRouter()

  const { loading: createSprintLoading, fn: createSprintFn } =
    useFetch(createSprint);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: `${projectKey}-${sprintKey}`,
      startDate: dateRange.from,
      endDate: dateRange.to,
    },
  });

  const onSubmit = async (data) => {
    await createSprintFn(projectId, {
      ...data,
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    setShowForm(false);
    toast.success("sprint create successfully")
    router.refresh(); 
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="mb-8 text-5xl font-bold gradient-title">
          {projectTitle}
        </h1>
        <Button
          className="mb-2"
          variant={showForm ? "destructive" : "default"}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "cancel" : "Create New Sprint"}
        </Button>
      </div>

      {showForm && (
        <Card className="pt-4 pb-4">
          <CardContent>
            <form className="flex gap-4 items-end" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="font-medium  block text-sm mb-1"
                >
                  Create Sprint
                </label>
                <Input
                  id="name"
                  readOnly
                  className="bg-slate-900"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* -----------------sprint duration------------------- */}
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="font-medium  block text-sm mb-1"
                >
                  Sprint Duration{" "}
                </label>
                <Controller
                  control={control}
                  name="dateRange"
                  render={({ field }) => {
                    return (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={`w-full justify-start text-left font-normal bg-slate-900 ${!dateRange && "text-muted-foreground"}`}>
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            {dateRange.from && dateRange.to ? (
                              format(dateRange.from, "LLL dd,Y") +
                              " - " +
                              format(dateRange.to, "LLL dd,Y")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                        className="w-auto bg-slate-900"
                        align="start"
                      >
                        <DayPicker
                          classNames={{
                            chevron: "fill-yellow-600",
                            range_start: "bg-yellow-700",
                            range_end: "bg-yellow-700",
                            range_middle: "bg-yellow-600",
                            day_button: "border-none",
                            today: "border-2 border-yellow-700",
                          }}
                          mode="range"
                          disabled={[{ before: new Date() }]}
                          selected={dateRange}
                          onSelect={(range) => {
                            if (range?.from && range?.to) {
                              setDateRange(range);
                              field.onChange(range);
                            }
                          }}
                        />
                      </PopoverContent>
                      </Popover>
                    );
                  }}
                />
              </div>
              <Button type="submit" disabled={createSprintLoading}>
                {createSprintLoading ? "Creating..." : "Create Sprint"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SprintCreationForm;
