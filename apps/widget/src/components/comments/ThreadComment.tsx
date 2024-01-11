import React, { useContext, useState } from "react";
import { CommentData } from "../CommentMenu";
import CommentActions, { Action } from "./CommentActions";
import supabase from "@repo/widget/src/lib/supabaseClient";
import { COMMENTS } from "@repo/widget/src/lib/tables";
import UserContext from "@repo/widget/src/context/UserContext";
import { Button } from "../ui/button";

interface ThreadCommentProps {
  comment: CommentData;
  onEditSuccess: (commment: CommentData) => void;
  onDeleteSuccess: (commment: CommentData) => void;
}

const ThreadComment: React.FC<ThreadCommentProps> = ({
  comment,
  onDeleteSuccess,
  onEditSuccess,
}) => {
  const { user } = useContext(UserContext);
  // state to toggle edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState(comment.text);

  const openEditingCard = () => setIsEditing(true); // open the editing input for comment
  const closeEditingCard = () => {
    setEditInputValue(comment.text); // incase user close card without saving the edit editing
    setIsEditing(false); // close the edit input
  };

  /**
   * Delete the thread comment using comment id
   */
  const handleDeleteComment = async () => {
    const { error } = await supabase
      .from(COMMENTS)
      .delete()
      .eq("id", comment.id);

    if (error) {
      console.error("Error deleting comment", error);
      return;
    }

    onDeleteSuccess(comment);
  };

  /**
   * Edit the comment and save it in DB
   */

  const handleEditComment = async () => {
    const { error } = await supabase
      .from(COMMENTS)
      .update({ text: editInputValue })
      .eq("id", comment.id);

    if (error) {
      console.error("Error editing the comment");
      return;
    }

    onEditSuccess({ ...comment, text: editInputValue }); // update the main state
    setIsEditing(false); // toggle back to normal state
  };

  const commentActions: Action[] =
    user && user.id === comment.user_id // user can take actions on their own comments only
      ? [
          {
            title: "Edit",
            onClick: openEditingCard,
          },
          {
            title: "Delete",
            onClick: handleDeleteComment,
            isDelete: true,
          },
        ]
      : [];

  return (
    <div className="py-2 space-y-2 flex flex-col border-b border-border/50">
      {isEditing ? (
        <div className="px-2">
          <textarea
            onFocus={(e) => {
              // adjust height according to content
              e.target.style.height = e.target.scrollHeight + "px";

              // move cursor at the end of the line
              const val = e.target.value; //store the value of the element
              e.target.value = ""; //clear the value of the element
              e.target.value = val;
            }}
            onChange={(e) => setEditInputValue(e.target.value)}
            value={editInputValue}
            className="w-full focus:ring-0 focus:outline-none resize-none text-sm border p-2 rounded-sm"
            autoFocus
          />
          <div className="flex justify-end items-center mt-2 gap-2">
            <Button
              onClick={() => closeEditingCard()}
              size={"sm"}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleEditComment()}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              variant="outline"
              size={"sm"}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center px-2">
            <div className="flex items-center">
              <img
                src={comment?.users?.avatar_url}
                className="h-5 w-5 rounded-full mr-2"
                alt="User Avatar"
              />
              <p className="text-[13px]">
                {comment?.users?.full_name || "Unknown"}
              </p>
            </div>
            <CommentActions actions={commentActions} />
          </div>
          <p className="text-sm px-2 text-foreground">{comment.text}</p>
        </>
      )}
    </div>
  );
};

export default ThreadComment;
