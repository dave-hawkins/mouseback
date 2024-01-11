import {
  CommentsContext,
  Thread,
} from "@repo/widget/src/context/CommentsContext";
import supabase from "@repo/widget/src/lib/supabaseClient";
import { COMMENTS, THREADS, USERS } from "@repo/widget/src/lib/tables";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CommentData } from "../CommentMenu";
import ThreadComment from "./ThreadComment";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import UserContext from "@repo/widget/src/context/UserContext";
import AddComment from "./AddComment";
import { Trash } from "lucide-react";
import CommentSkeleton from "./CommentSkeleton";
import { Textarea } from "../ui/textarea";

const Thread = () => {
  const { user } = useContext(UserContext);
  const {
    selectedThread,
    setThreads,
    threads,
    setSelectedThread,
    setDotPositions,
    commentPosition,
    selectedProject,
    isEditor,
  } = useContext(CommentsContext);

  const [threadComments, setThreadComments] = useState<CommentData[]>([]);
  const [isNewComment, setIsNewComment] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [newCommentText, setNewCommentText] = useState("");

  const selectedThreadRef = useRef(selectedThread);
  selectedThreadRef.current = selectedThread;

  /**
   * Method to fetch all comments related to selected thread
   * @param threadId thread id
   * @returns
   */
  const fetchThreadComments = async (threadId: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from(COMMENTS)
      .select(`*,${USERS}(*)`)
      .order("created_at", { ascending: true })
      .eq("thread_id", threadId);

    if (error) {
      console.error("Error fetching thread comments", error);
      setLoading(false);
      return;
    }

    setThreadComments(data as CommentData[]);
    setLoading(false);
  };

  /**
   * Method to create new thread
   */
  const handleCreateNewThread = async (
    commentText: string,
    x: number,
    y: number
  ) => {
    if (!user || !commentText) return;
    const { data: newThread, error } = await supabase
      .from(THREADS)
      .insert([
        {
          x,
          y,
          element_ref: selectedThread?.element_ref,
          delta_x: selectedThread?.delta_x,
          delta_y: selectedThread?.delta_y,
          owner_id: user.id,
          is_resolved: false,
          app_url: window?.location?.origin || "",
          pathname: window?.location?.pathname || "",
          project_id: selectedProject?.id || "",
        },
      ])
      .select();

    if (error) {
      console.error("Error creating new thread", error);
      return;
    }

    if (!newThread) return;

    // add new comment
    const { data: newComment, error: commentError } = await supabase
      .from(COMMENTS)
      .insert([
        {
          thread_id: (newThread[0] as Thread).id,
          text: commentText,
          user_id: user.id,
        },
      ])
      .select(`*,${USERS}(*)`);

    if (commentError) {
      console.error("Error creating new comment", commentError);
    }

    if (!newComment) return;
    setThreadComments((prev) => [...prev, newComment[0] as CommentData]);
    setIsNewComment(false);
    const updatedThreads = [...threads].map((t) => {
      if (t.id === 0) {
        return {
          ...t,
          id: (newThread[0] as Thread).id,
        };
      }
      return t;
    });
    setThreads(updatedThreads);
    setNewCommentText("");
    setSelectedThread(newThread[0] as Thread);
  };

  /**
   * Method to handle add new comment success callback
   */
  const handleAddCommentSuccess = (comment: CommentData) => {
    if (!comment) return;
    setThreadComments((prev) => [...prev, comment]);
  };

  /**
   * Method to handle the delete comment success callback
   */

  const handleDeleteCommentSuccess = (comment: CommentData) => {
    if (!comment) return;
    // comments not having the delete comment
    const filteredComments = threadComments.filter((c) => c.id !== comment.id);
    setThreadComments(filteredComments);
  };

  /**
   * Method to handle the edit comment success callback
   */

  const handleEditCommentSuccess = (comment: CommentData) => {
    if (!comment) return;

    const updateComments = [...threadComments].map((c) => {
      if (c.id === comment.id) {
        return {
          ...c,
          text: comment.text,
        };
      }

      return c;
    });

    setThreadComments(updateComments);
  };

  useEffect(() => {
    // check if the it's a new comment
    setIsNewComment(selectedThread?.id === 0);

    // if it's not a new comment then fetch the thread comment
    if (selectedThread?.id && selectedThread.id !== 0) {
      fetchThreadComments(selectedThread.id);
    }

    return () => {
      setThreadComments([]);
    };
  }, [selectedThread]);

  /**
   * Method to check whether to render comments, new comment input or loading state
   */
  const renderComments = () => {
    if (loading) {
      return (
        <div className="w-full h-full">
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      );
    }

    if (isNewComment) {
      return (
        <div className="flex flex-col space-y-2 bg-muted border-t border-border/50">
          <Textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            placeholder="Enter your comment here..."
            className=" outline-none whitespace-pre-wrap max-w-sm"
            autoFocus
          />
          <div className="justify-end flex pr-2 pb-2">
            <Button
              variant={`outline`}
              className="text-xs"
              size={`sm`}
              onClick={() =>
                handleCreateNewThread(
                  newCommentText,
                  selectedThread?.x || 0,
                  selectedThread?.y || 0
                )
              }
            >
              <Send className="h-4 w-4 text-foreground/40" />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        {threadComments.map((comment) => (
          <ThreadComment
            key={comment.id}
            comment={comment}
            onDeleteSuccess={handleDeleteCommentSuccess}
            onEditSuccess={handleEditCommentSuccess}
          />
        ))}
      </div>
    );
  };

  /**
   * Method to close the thread modal
   */
  const handleCloseModal = () => setSelectedThread(null);

  /**
   * Delete the complete thread
   */
  const handleDeleteThread = async () => {
    if (!selectedThreadRef.current) return;

    const currentThread = selectedThreadRef.current;

    // remove thread from local state
    setThreads((prevThreads) =>
      prevThreads.filter((t) => t.id !== currentThread.id)
    );

    // remove thread dot indicator
    setDotPositions((prevDots) =>
      prevDots.filter(
        (dot) => dot.x !== currentThread.x && dot.y !== currentThread.y
      )
    );

    handleCloseModal();

    // we don't want to hit supabase api
    // for newly creating comment
    // because it's saved only locally
    if (currentThread.id !== 0) {
      await supabase.from(THREADS).delete().eq("id", currentThread.id);
    }
  };

  // auto scroll add new comment input into view
  useEffect(() => {
    if (scrollRef && threadComments.length) scrollRef.current?.scrollIntoView();
  }, [scrollRef, threadComments]);

  if (!selectedThread) return null;

  return (
    <div
      className="absolute z-50"
      style={{ left: commentPosition.x, top: commentPosition.y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-72 min-h-[100px] rounded-md shadow-lg z-100 comment-box h-auto border bg-background  overflow-clip ml-8">
        <div className="h-10 w-full flex justify-end items-center p-2  ">
          {/* <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <Button variant={"ghost"} size={"xs"}>
                <CornerUpRight className="w-4 h-4 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-0 bg-background">
              <DropdownMenuItem className="px-1">
                <DropdownMenuLabel className="font-normal text-xs text-foreground">
                  Convert to
                </DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuLabel className="flex items-center">
                  <GithubIcon className="w-3 h-3 text-foreground/40 mr-2" />{" "}
                  GitHub Issue
                </DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuLabel className="flex items-center">
                  <GithubIcon className="w-3 h-3 text-foreground/40 mr-2" />{" "}
                  GitHub Issue
                </DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          {user?.id === selectedThread?.owner_id || isEditor ? (
            <Button onClick={handleDeleteThread} variant={"ghost"} size={"xs"}>
              <Trash className="text-foreground h-4 w-4" />
            </Button>
          ) : null}
          {/* Commenting out this feature as i think its unneccesary for now
          <Button onClick={handleCloseModal} variant={"ghost"} size={"xs"}>
            <XCircle size={18} className="text-gray-400 cursor-pointer" />
          </Button> */}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {renderComments()}
          {!isNewComment && !loading ? (
            <AddComment
              threadId={selectedThread.id}
              onSuccess={handleAddCommentSuccess}
            />
          ) : null}
          {/* scroll to this automatically */}
          {/* TOD: Add back thread auto scrolling */}
          {/* <div ref={scrollRef} /> */}
        </div>
      </div>
    </div>
  );
};

export default Thread;
