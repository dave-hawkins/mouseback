import {
  CommentsContext,
  CommentIndicator,
  Thread,
} from "@/context/CommentsContext";
import UserContext from "@/context/UserContext";
import supabase from "@/lib/supabaseClient";
import { THREADS } from "@/lib/tables";
import { calculateElementInitialPosition } from "@/utils/utils";
import React, { useContext, useRef, useState } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";

interface CommentDotIndicatorProps {
  comment: CommentIndicator;
  index: number; // There is difference between 'number' and 'Number' here. type of array index is 'number'
  avatarUrl: string; // Add this line
}

// dummy transparent image for hiding default html preview
const preview = new Image();
preview.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

export const CommentDotIndicator: React.FC<CommentDotIndicatorProps> = ({
  comment,
  index,
  avatarUrl,
}) => {
  const {
    setCommenting,
    setCommentPosition,
    setCurrentComment,
    comments,
    threads,
    setThreads,
    setSelectedThread,
    isEditor
  } = useContext(CommentsContext);
  const { user } = useContext(UserContext);

  const { element, isVisible: isElementVisible, users: commentUser } = comment;

  const attachedElement = useRef<Element | null>(element as Element);

  const commentRef = React.useRef<HTMLDivElement>(null);
  const scrollableAncestorRef = React.useRef<Element | Window | null>(null);
  const isInViewRef = React.useRef(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  // Update the comment position when scrolling
  const handleScroll = () => {
    // these are unattached comments
    if (commentRef.current) {
      if (!attachedElement.current) {
        commentRef.current.style.top = `${0 + Number(index) * 10}px`; // if we have more unattached comments add "16px" spacing between them
        commentRef.current.style.left = `0px`;
        return;
      }

      if (!isInViewRef.current) {
        commentRef.current.style.opacity = "0";
        return;
      }
      commentRef.current.style.opacity = "1";

      const elementRect = attachedElement.current.getBoundingClientRect();
      const commentRect = commentRef.current.getBoundingClientRect();

      const top = elementRect.top + window.scrollY - commentRect.height;
      const left = elementRect.left + window.scrollX - commentRect.width / 2;

      commentRef.current.style.top = `${top + (comment.delta_y || 0)}px`;
      commentRef.current.style.left = `${left + (comment.delta_x || 0)}px`;
    }
  };

  const findScrollableAncestor = (element?: Element | null): Element | null => {
    if (!element) return null;
    const style = window.getComputedStyle(element);
    if (style.overflowY === "scroll" || style.overflowY === "auto")
      return element;
    return findScrollableAncestor(element.parentElement);
  };

  // Find the closest scrollable ancestor and store its reference in scrollableAncestorRef
  React.useLayoutEffect(() => {
    const ancestor = findScrollableAncestor(attachedElement.current);
    scrollableAncestorRef.current = ancestor ? ancestor : window;
    handleScroll();
    // Attach scroll listener to the scrollable ancestor
    scrollableAncestorRef.current.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    // Clean up the scroll listener when the component is unmounted
    return () => {
      scrollableAncestorRef?.current?.removeEventListener(
        "scroll",
        handleScroll
      );
      window.removeEventListener("resize", handleScroll);
    };
  }, [comment.x, comment.y]);

  // Use Intersection Observer to check if the comment is in view
  React.useEffect(() => {
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      isInViewRef.current = entries[0].isIntersecting;
      handleScroll();
    };

    const options = {
      root: findScrollableAncestor(attachedElement.current),
      rootMargin: "0px",
      threshold: 0, // Set the threshold to 0 to ensure the observer is triggered when the comment enters or leaves the viewport
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (attachedElement.current) {
      observer.observe(attachedElement.current);
    }

    // Clean up the Intersection Observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [attachedElement.current, comment.x, comment.y]);

  const onUpdateThread = async (updatedThread: Partial<Thread>) => {
    await supabase
      .from(THREADS)
      .update({
        ...updatedThread,
      })
      .eq("id", comment.threadId);
  };

  const handleDragStart = (event: any) => {
    setDragStartPos({ x: event.screenX, y: event.screenY });
  };

  const hasPosChanged = (e: any) => {
    const dragX = Math.abs(dragStartPos.x - e.screenX);
    const dragY = Math.abs(dragStartPos.y - e.screenY);
    return dragX > 5 || dragY > 5;
  };

  const handleDragEnd: DraggableEventHandler = (event) => {
    if (!commentRef.current || !hasPosChanged(event)) return;
    const { x, y, delta_x, delta_y, element_ref, element } =
      calculateElementInitialPosition(event);

    if (element) attachedElement.current = element;
    const updatedThread = {
      x,
      y,
      delta_x,
      delta_y,
      element_ref,
    };

    const elementRect = element.getBoundingClientRect();
    const commentRect = commentRef.current.getBoundingClientRect();

    const top = elementRect.top + window.scrollY - commentRect.height;
    const left = elementRect.left + window.scrollX - commentRect.width / 2;

    commentRef.current.style.transform = `translate(0px,0px)`;
    commentRef.current.style.top = `${top + (delta_y || 0)}px`;
    commentRef.current.style.left = `${left + (delta_x || 0)}px`;

    const updatedThreads = [...threads].map((t) => {
      if (t.id === comment.threadId) {
        return {
          ...t,
          x,
          y,
          delta_x,
          delta_y,
          element_ref,
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    onUpdateThread(updatedThread);
  };

  const handleCommentClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();

    const currentThread = threads.find((t) => t.id === comment.threadId);
    if (!currentThread) return;

    setSelectedThread(currentThread);
    setCurrentComment(comments[index]);
    setCommenting(true);
    const posY = (commentRef?.current?.style.top || 0) as any;
    const posX = (commentRef?.current?.style.left || 0) as any;
    setCommentPosition({
      x: posX || comment.x,
      y: posY || comment.y,
    });
  };

  return (
    <Draggable
      position={{ x: 0, y: 0 }}
      onStart={handleDragStart}
      onStop={handleDragEnd}
      disabled={!isEditor && user?.id !== commentUser?.id}
    >
      <div
        style={{
          opacity: isElementVisible ? 1 : 0,
          zIndex: attachedElement.current
            ? window
                .getComputedStyle(attachedElement.current)
                .getPropertyValue("z-index") // comment zIndex should be same as it's element
            : "inherit",
        }}
        ref={commentRef}
        className="absolute w-7 h-7 p-[3px] rounded-bl-none bg-white/50 shadow ring-1 ring-black/5 rounded-full red-dot hover:cursor-pointer hover:scale-110 hover:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.3)] hover:bg-background/80 backdrop-blur-sm"
        data-index={index}
        onClick={handleCommentClick}
      >
        <img
          draggable={false}
          className="rounded-full pointer-events-none"
          src={commentUser ? commentUser.avatar_url : avatarUrl}
          alt="Author's avatar"
        />
      </div>
    </Draggable>
  );
};
