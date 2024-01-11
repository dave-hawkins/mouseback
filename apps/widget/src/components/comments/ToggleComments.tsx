import React from "react";
import { MessageCircle as MessageCircleIcon } from "lucide-react";

import {
  MenubarMenu,
  MenubarTrigger,
} from "@repo/widget/src/components/ui/menubar";

type ToggleCommentsProps = {
  toggleCommentMode: (event: React.MouseEvent) => void;
  commentButtonRef: React.RefObject<HTMLButtonElement>;
};

const ToggleComments = ({
  toggleCommentMode,
  commentButtonRef,
}: ToggleCommentsProps) => {
  return (
    <MenubarMenu>
      <MenubarTrigger
        className="rounded-full hover:bg-foreground/5"
        onClick={toggleCommentMode}
        ref={commentButtonRef}
      >
        <div>
          <MessageCircleIcon className="h-5 w-5" />
        </div>
      </MenubarTrigger>
    </MenubarMenu>
  );
};

export default ToggleComments;
