import { MoreHorizontal } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export interface Action {
  title: string;
  onClick: () => void;
  isDelete?: boolean;
}

interface CommentActionsProps {
  actions: Action[];
}

const CommentActions: React.FC<CommentActionsProps> = ({ actions }) => {
  if (!actions.length) return null;

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Button variant={"ghost"} size={"xs"}>
            <MoreHorizontal className="w-4 h-4 text-neutral-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-0 bg-background">
          {actions.map((a, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() => {
                a.onClick();
              }}
              className={`${
                a.isDelete ? "text-red-500" : "text-foreground"
              } p-0 text-sm hover:bg-foreground/5 cursor-pointer `}
            >
              <DropdownMenuLabel>{a.title}</DropdownMenuLabel>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CommentActions;
