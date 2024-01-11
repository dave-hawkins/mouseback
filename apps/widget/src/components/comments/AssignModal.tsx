import { useContext } from "react";

import { SelectTeam } from "./SelectTeam";
import { CommentsContext } from "@repo/widget/src/context/CommentsContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PROJECT, THREADS } from "@repo/widget/src/lib/tables";
import supabase from "@repo/widget/src/lib/supabaseClient";

function AssignModal() {
  const {
    tempProjectDialogOpen,
    setTempProjectDialogOpen,
    selectedProject,
    tempProject,
    projects,
    setProjects,
    fetchThreads,
  } = useContext(CommentsContext);
  const isTempProjectSelect = selectedProject && selectedProject.is_temp;

  const deleteTempProject = async () => {
    try {
      const { error } = await supabase
        .from(PROJECT)
        .delete()
        .eq("id", tempProject?.id);
      if (error) return console.error(error);
      setTempProjectDialogOpen(false);
      if (selectedProject) {
        const findTempProject = projects.filter(
          (item) => item.id !== tempProject?.id
        );
        fetchThreads(selectedProject.id);
        setProjects(findTempProject);
      }
    } catch (err) {
      console.error("Error deleting the temp project", err);
    }
  };

  const handleAssignTempProject = async () => {
    if (!tempProject || !selectedProject) return;
    try {
      const { data, error } = await supabase
        .from(THREADS)
        .update({ project_id: selectedProject.id })
        .eq("project_id", tempProject.id)
        .select();
      if (error) return console.error(error);
      if (data) {
        await deleteTempProject();
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex mx-auto w-full h-full z-20">
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8">
          <Dialog open={tempProjectDialogOpen} modal={false}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Please assign this page to a project</DialogTitle>
                <DialogDescription>
                  Mouseback hasn't yet associated the comments on this page with
                  a project. Please assign this to a project or create a new one
                  to continue.
                  <div className="py-2">
                    <SelectTeam fullWidth />
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  disabled={Boolean(isTempProjectSelect)}
                  onClick={handleAssignTempProject}
                >
                  Assign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default AssignModal;
