import { InboxIcon } from "lucide-react";

import {
  MenubarMenu,
  MenubarTrigger,
} from "@repo/widget/src/components/ui/menubar";
import { Sheet, SheetTrigger } from "@repo/widget/src/components/ui/sheet";

const InboxComments = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger className="rounded-full">
        <Sheet>
          <SheetTrigger>
            <div>
              <InboxIcon className="h-5 w-5 hover:bg-foreground/5" />
            </div>
          </SheetTrigger>

          {/* <SheetContent>
              <SheetHeader>
                <SheetTitle>Comment(s)</SheetTitle>
                <SheetDescription>
                  Heres all the comments from this page:
                  {comments.map((comment, index) => (
                  console.log(comment); // Add this line

                    <div key={index} className="mt-2">
                      <div className="flex items-center">
                        <img
                          src={comment.user_metadata.avatar_url}
                          className="h-5 w-5 rounded-full mr-2"
                          alt="User Avatar"
                        />
                        <p className="font-medium text-neutral-900 text-xs">
                          {comment.user_metadata.full_name || "Unknown"}
                        </p>
                      </div>
                      <p className="text-sm px-2 text-neutral-500">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </SheetDescription>
              </SheetHeader>
            </SheetContent> */}
        </Sheet>
      </MenubarTrigger>
    </MenubarMenu>
  );
};

export default InboxComments;
