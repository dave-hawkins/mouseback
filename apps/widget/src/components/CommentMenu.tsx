import React, { useEffect, useCallback, useRef, useContext } from "react";
import { User as SUser, UserMetadata } from "@supabase/supabase-js";

import supabase from "@/lib/supabaseClient";
import UserContext from "@/context/UserContext";
import { Menubar } from "@/components/ui/menubar";
import {
  InitialLoggedInScreen,
  UserAvatar,
  ToggleComments,
  MoreActions,
  Thread,
} from "./comments";
import { CommentsContext } from "@/context/CommentsContext";
import { CommentDotIndicator } from "./comments/CommentDotIndicator";
import Cursor from "./Cursor";
import { SelectTeam } from "./comments/SelectTeam";
import DialogBox from "./comments/DialogBox";
import { USERS } from "@/lib/tables";
import AssignModal from "./comments/AssignModal";

export type User = {
  avatar_url: string;
  full_name: string;
  id: string;
};

export type CommentData = {
  id: string;
  x: number;
  y: number;
  text: string;
  user_id: string;
  user_metadata: UserMetadata;
  users?: User;
};

const CommentMenu = () => {
  const commentButtonRef = useRef<HTMLButtonElement>(null);
  const { user, setUser } = useContext(UserContext);
  const {
    dotPositions,
    commentMode,
    handleThreadClick,
    setCommentMode,
    setCommenting,
    setCreateDialogOpen,
    tempProjectDialogOpen,
    projects,
    selectedProject,
    setProjectDialogOpen,
    setProjectName,
    teams,
    isEditor
  } = useContext(CommentsContext);

  const toggleCommentMode = useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      setProjectName("");
      if (projects.length === 0) {
        return setCreateDialogOpen(true);
      }
      if (!selectedProject) {
        return setProjectDialogOpen(true);
      }
      if (commentMode) {
        // Check if the click event target is within the comment button
        if (event && commentButtonRef.current?.contains(event.target as Node)) {
          // Exit comment mode
          setCommentMode(false);
          setCommenting(false);
        }
      } else {
        // Enter comment mode
        setCommentMode(true);
        setCommenting(false);
      }
    },
    [
      commentMode,
      commentButtonRef,
      setCommentMode,
      setCommenting,
      projects,
      selectedProject,
    ]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.key === "c" &&
        !(document.activeElement instanceof HTMLInputElement)
      ) {
        toggleCommentMode();
      }
    },
    [toggleCommentMode]
  );

  // Add this new function below handleKeyDown
  const handleEscKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCommentMode(false);
        setCommenting(false);
      }
    },
    [setCommentMode, setCommenting]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleEscKeyDown); // Add this line
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleEscKeyDown); // And this line
    };
  }, [handleKeyDown, handleEscKeyDown]);

  useEffect(() => {
    const getUserMetadata = async (userId: string, userObject: SUser) => {
      const {
        data: user,
        error,
        status,
      } = await supabase
        .from(USERS)
        .select("id, full_name, avatar_url,email")
        .eq("id", userId)
        .single();

      if (error && status !== 406) {
        console.error("Error fetching user metadata:", error);
        return null;
      }

      if (status === 406) {
        const { data: newUser, error } = await supabase
          .from(USERS)
          .insert([
            {
              id: userId,
              full_name: userObject.user_metadata.full_name,
              avatar_url: userObject.user_metadata.avatar_url,
              email: userObject.user_metadata.email,
            },
          ])
          .single();

        if (error) {
          console.error("Error inserting user into the database:", error);
          return null;
        }
        return newUser;
      }

      return user;
    };

    supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        const userMetadata = await getUserMetadata(
          session.user.id,
          session.user
        );
        setUser({
          ...session.user,
          ...(userMetadata ? { user_metadata: userMetadata } : {}),
        });
      } else {
        setUser(null);
      }
    });
  }, [setUser]);

  useEffect(() => {
    window.addEventListener("click", handleThreadClick as any);
    return () => {
      window.removeEventListener("click", handleThreadClick as any);
    };
  }, [handleThreadClick]);

  useEffect(() => {
    if (commentMode) {
      document.body.classList.add("commentMode");
    } else {
      document.body.classList.remove("commentMode");
    }
  }, [commentMode]);

  // Remove cursor when in commentmode

  useEffect(() => {
    const styleElement = document.createElement("style");

    if (commentMode) {
      styleElement.innerHTML = "* {cursor: none !important}";
      document.head.appendChild(styleElement);
    } else {
      // Check if the style element exists before trying to remove it
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    }

    // Return a cleanup function that removes the style element if it exists
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, [commentMode]);

  return (
    <>
      {commentMode && user && user.user_metadata && (
        <Cursor UserImage={user.user_metadata.avatar_url} />
      )}
      <div>
        {tempProjectDialogOpen && (
          <>
            <AssignModal />
            <DialogBox buttonVisible={false} />
          </>
        )}
        {!tempProjectDialogOpen && (
          <div className="fixed  bottom-0 left-1/2 transform -translate-x-1/2">
            <Menubar className="mb-8 flex w-full items-center menu-bar px-1">
              {(() => {
                if (!user) {
                  return <InitialLoggedInScreen />;
                }

                // once user is logged in check if the script API key is valid
                // and has been linked to a team
                if (!teams) return null;

                return (
                  <>
                    <UserAvatar />
                    <div className="h-full w-px bg-foreground/5"></div>
                    <ToggleComments
                      toggleCommentMode={toggleCommentMode}
                      commentButtonRef={commentButtonRef}
                    />
                    {isEditor && (
                      <>
                        <div className="h-full w-px bg-foreground/5"></div>
                        <SelectTeam />
                      </>
                    )}
                    <div className="h-full w-px bg-foreground/5"></div>
                    {/* <InboxComments /> */}
                    <MoreActions />
                    <DialogBox buttonVisible={false} />
                  </>
                );
              })()}
            </Menubar>
          </div>
        )}

        {commentMode && user && user.user_metadata && (
          <Cursor UserImage={user.user_metadata.avatar_url} />
        )}
        <Thread />

        {dotPositions.map((comment, index) => (
          <CommentDotIndicator
            key={index}
            index={index}
            comment={comment}
            avatarUrl={user?.user_metadata.avatar_url}
          />
        ))}
      </div>
      {commentMode && <div className="comment-overlay"></div>}
    </>
  );
};

export default CommentMenu;
