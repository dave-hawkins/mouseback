import { CommentIndicator, Thread } from "@/context/CommentsContext";
import { ClassValue, clsx } from "clsx";
import getCssSelector from "css-selector-generator";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Method to calculate the relative coords of a single thread
 * @param thread
 * @returns coords x,y
 */
export const getThreadRelativeCoords = (thread: Thread): CommentIndicator => {
  const { element_ref, delta_x, delta_y, users, id } = thread;

  const element = document.querySelector(element_ref);

  if (!element_ref || !element) {
    return {
      x: 0,
      y: 0,
      element: null,
      delta_x: 0,
      delta_y: 0,
      isVisible: true,
      users,
      threadId: id,
    };
  }

  const frame = document.documentElement;

  const { x: frameX, y: frameY } = frame.getBoundingClientRect();

  const { x, y } = element.getBoundingClientRect();

  const finalX = x - frameX;
  const finalY = y - frameY;

  return {
    x: finalX + (delta_x || 0),
    y: finalY + (delta_y || 0),
    delta_x,
    delta_y,
    element,
    isVisible: elementIsVisibleInViewport(element), // check if the element is visible or not
    users,
    threadId: id,
  };
};

export const elementIsVisibleInViewport = (el: Element | null) => {
  if (!el) return false;
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

export const calculateElementInitialPosition = (event: any) => {
  const rect = document.documentElement.getBoundingClientRect();
  const offsetX = rect.left + window.pageXOffset;
  const offsetY = rect.top + window.pageYOffset;

  // Create new comment at clicked position
  const x = event.clientX - offsetX;
  const y = event.clientY - offsetY;

  const elements = document.elementsFromPoint(x, y) as HTMLElement[];
  const element = elements.length > 1 ? elements[1] : elements[0];
  const element_ref = getCssSelector(element);
  const { top: elementTop, left: elementLeft } =
    element.getBoundingClientRect();

  const delta_x = event.clientX - (elementLeft + window.scrollX);
  const delta_y = event.clientY - elementTop;
  return {
    x,
    y,
    delta_x,
    delta_y,
    element_ref,
    element,
  };
};
