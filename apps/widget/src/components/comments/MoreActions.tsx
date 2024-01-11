import { MoreHorizontal } from "lucide-react";

import supabase from "@/lib/supabaseClient";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useContext } from "react";
import { CommentsContext } from "@/context/CommentsContext";

const MoreActions = () => {
  const {
    setThreads,
    setSelectedThread,
    setCommentMode,
    setCommentPosition,
    setDotPositions,
  } = useContext(CommentsContext);

  const signOut = async () => {
    await supabase.auth.signOut();
    // remove all the comments information on logout
    setThreads([]);
    setDotPositions([]);
    setSelectedThread(null);
    setCommentMode(false);
    setCommentPosition({ x: 0, y: 0 });
  };

  return (
    <MenubarMenu>
      <MenubarTrigger className="rounded-full hover:bg-foreground/5 ">
        <div>
          <MoreHorizontal className="h-5 w-5" />
        </div>
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          Hide mouseback{" "}
          <MenubarShortcut className="bg-muted px-1 rounded">
            ⌘ .
          </MenubarShortcut>
        </MenubarItem>
        <MenubarItem className="" onClick={signOut}>
          Sign out
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};

export default MoreActions;
