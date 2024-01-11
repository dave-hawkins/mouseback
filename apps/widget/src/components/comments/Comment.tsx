import React, { useContext, useEffect, useRef } from "react";
import { Send } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CommentsContext } from "@/context/CommentsContext";
import UserContext from "@/context/UserContext";
import supabase from "@/lib/supabaseClient";
import { CommentData } from "../CommentMenu";

function Comment() {
  const { user } = useContext(UserContext);
  const {
    currentComment,
    commentPosition,
    dotPositions,
    comments,
    setComments,
    setDotPositions,
    setCurrentComment,
  } = useContext(CommentsContext);
  const { x, y } = commentPosition;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmit = (text: string) => {
    const commentIndex = dotPositions.findIndex(
      (position) =>
        position.x === commentPosition.x && position.y === commentPosition.y
    );

    if (
      commentIndex >= 0 &&
      commentIndex < comments.length &&
      comments[commentIndex].id !== undefined
    ) {
      const updateComment = async () => {
        const commentIndex = dotPositions.findIndex(
          (position) =>
            position.x === commentPosition.x && position.y === commentPosition.y
        );

        if (commentIndex >= 0 && comments[commentIndex]?.id) {
          const { error } = await supabase
            .from("comments")
            .update({
              text,
            })
            .eq("id", comments[commentIndex].id);

          if (error) {
            console.error("Error updating comment:", error);
            return;
          }

          if (user) {
            setComments((prev) => {
              const updatedComments = [...prev];
              updatedComments[commentIndex] = {
                ...updatedComments[commentIndex],
                text,
                user_id: user?.id || "", // Store user id
                user_metadata: user?.user_metadata, // Store user metadata
              };
              return updatedComments;
            });
          }
        } else {
          console.error("Cannot update comment: id is not defined");
        }
      };

      updateComment();
    } else {
      const saveComment = async () => {
        const { data, error } = await supabase.from("comments").insert([
          {
            x: commentPosition.x,
            y: commentPosition.y,
            text,
            user_id: user?.id,
          },
        ]);

        if (error) {
          console.error("Error saving comment:", error);
          return;
        }
        if (data && (data as CommentData[] | null)?.length! > 0) {
          const commentId = (data![0] as CommentData).id;
          // Add the id field to the new comment object
          if (user) {
            setComments((prev) => [
              ...prev,
              {
                ...(data![0] as CommentData),
                id: commentId,
                user_metadata: user?.user_metadata || null, // Store user metadata
              },
            ]);
          }

          setDotPositions((prev) => [
            ...prev,
            { x: commentPosition.x, y: commentPosition.y },
          ]);
        }
      };

      saveComment();
    }
    setCurrentComment(comments[commentIndex]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (inputRef.current?.value.trim()) {
      onSubmit(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <div className="w-72 rounded-md shadow-lg z-100 comment-box h-auto bg-background border ml-2">
        {currentComment ? (
          // - Replace && with ? because in many cases && renders 0 on the screen.
          <div className="py-2 space-y-2 flex flex-col border-b border-border/50">
            <div className="flex items-center px-2">
              <img
                src={currentComment?.users?.avatar_url}
                className="h-5 w-5 rounded-full mr-2"
                alt="User Avatar"
              />
              <p className="font-medium text-neutral-900 text-xs">
                {currentComment?.users?.full_name || "Unknown"}
              </p>
            </div>
            <p className="text-sm px-2 text-neutral-500">
              {currentComment.text}
            </p>
          </div>
        ) : null}

        <div className="flex flex-col space-y-2">
          <Input
            ref={inputRef}
            onClick={(event) => event.stopPropagation()}
            placeholder="Enter your comment here..."
            className="border-none outline-none"
          />

          <div className="justify-end flex pr-2 pb-2">
            <Button
              variant={`outline`}
              onClick={handleSubmit}
              className="text-xs"
              size={`sm`}
            >
              <Send className="h-4 w-4 text-foreground/40" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
