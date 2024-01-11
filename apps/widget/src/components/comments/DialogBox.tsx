import React from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PROJECT } from "@/lib/tables";
import supabase from "@/lib/supabaseClient";
import { CommentsContext } from "@/context/CommentsContext";

const DialogBox: React.FC<{ buttonVisible: boolean }> = ({ buttonVisible }) => {
  const {
    teams,
    setProjects,
    setProjectDialogOpen,
    createDialogOpen,
    setSelectedProject,
    setCreateDialogOpen,
    projectName,
    setProjectName,
    fetchThreads,
  } = React.useContext(CommentsContext);
  const handleNewProject = () => {
    createProject();
    setCreateDialogOpen(false);
    setProjectDialogOpen(false);
  };

  const createProject = async () => {
    const { data: projectData, error: projectError } = await supabase
      .from(PROJECT)
      .insert([{ project_name: projectName, team_id: teams?.id }])
      .select();
    if (projectError) return console.error(projectError);
    if (projectData) {
      setProjects((prev) => [...prev, projectData[0]]);
      setSelectedProject(projectData[0]);
      fetchThreads(projectData[0].id);
    }
  };
  return (
    <Dialog
      open={createDialogOpen}
      onOpenChange={() => {
        setCreateDialogOpen(!createDialogOpen);
      }}
    >
      {buttonVisible && (
        <DialogTrigger className="outline-0">
          {" "}
          <div className="p-1 border-b outline-0">
            <Button
              className="w-full"
              variant={"ghost"}
              size={"sm"}
              onClick={(e) => {
                e.stopPropagation();
                setProjectName("");
                setCreateDialogOpen(true);
              }}
            >
              <PlusIcon className="w-3.5 h-3.5 mr-2 absolute left-4" /> New
              project
            </Button>
          </div>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            <div className="pt-2 pb-4">
              Give your new project a name. This project name will be used as a
              reference across all your local, staging and dev environments.
            </div>
            <div className="grid w-full  items-center gap-1.5 pb-4">
              <Label htmlFor="email">Project name</Label>
              <Input
                type="text"
                id="projectName"
                value={projectName}
                placeholder=""
                className="border rounded-md"
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={handleNewProject}>
            Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
