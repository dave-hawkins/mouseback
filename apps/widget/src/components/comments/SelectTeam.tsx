"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@repo/widget/src/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@repo/widget/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/widget/src/components/ui/popover";
import { cn } from "@repo/widget/src/utils/utils";
import { CommentsContext } from "@repo/widget/src/context/CommentsContext";
import DialogBox from "./DialogBox";
import clsx from "clsx";

interface SelectTeamProps {
  fullWidth?: boolean;
}

export function SelectTeam({ fullWidth }: SelectTeamProps) {
  const dropdownTrigger = React.useRef<HTMLButtonElement>(null);
  const dropdownWidth = dropdownTrigger?.current?.clientWidth || 200;
  const {
    projects,
    projectDialogOpen,
    setProjectDialogOpen,
    selectedProject,
    setSelectedProject,
    fetchThreads,
    isEditor,
  } = React.useContext(CommentsContext);

  return (
    <Popover open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={dropdownTrigger}
          variant="outline"
          role="combobox"
          aria-expanded={projectDialogOpen}
          className={clsx(
            "text-sm font-normal rounded-lg h-8 justify-between border",
            {
              "w-full": fullWidth,
              "w-[150px]": !fullWidth,
            }
          )}
        >
          <div
            className={clsx({
              "w-[90px] overflow-ellipsis overflow-hidden whitespace-nowrap":
                !fullWidth,
            })}
          >
            {selectedProject
              ? projects.find(
                  (framework) =>
                    framework.project_name === selectedProject.project_name
                )?.project_name
              : "Untitled"}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: fullWidth ? `${dropdownWidth}px` : "100%" }}
        className={`msbk- p-0`}
      >
        <Command>
          <DialogBox buttonVisible={isEditor} />
          <CommandEmpty>No project name found.</CommandEmpty>
          <div className="max-h-full overflow-y-auto">
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => {
                    setSelectedProject(project);
                    fetchThreads(project.id);
                    setProjectDialogOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedProject?.project_name === project.project_name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {project.project_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
          <CommandInput placeholder="Search projects" />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
