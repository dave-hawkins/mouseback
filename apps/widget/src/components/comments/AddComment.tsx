import React, { useContext, useState } from "react";
import { Send } from "lucide-react";
import supabase from "@repo/widget/src/lib/supabaseClient";
import { COMMENTS, USERS } from "@repo/widget/src/lib/tables";
import UserContext from "@repo/widget/src/context/UserContext";
import { CommentData } from "../CommentMenu";
import { Button } from "../ui/button";

interface AddCommentProps {
  threadId: number;
  onSuccess: (comment: CommentData) => void;
}

/**
 * Component to add new comment in the thread
 */
const AddComment: React.FC<AddCommentProps> = ({ threadId, onSuccess }) => {
  const { user } = useContext(UserContext);
  const [value, setValue] = useState("");
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = async (
    e
  ) => {
    if (e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      await handleAddNewComment(value);
    } else if (e.key.toLowerCase() === "c") {
      e.stopPropagation();
    }
  };

  const handleAddNewComment = async (text: string) => {
    if (!user || !threadId || !text) return;
    const { data: newComment, error: commentError } = await supabase
      .from(COMMENTS)
      .insert([
        {
          thread_id: threadId,
          text: text,
          user_id: user.id,
        },
      ])
      .select(`*,${USERS}(*)`);

    if (commentError) {
      console.error("Error adding comment to thread", commentError);
      return;
    }

    if (!newComment) return;

    onSuccess(newComment[0] as CommentData);
    setValue("");
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        handleAddNewComment(value);
      }}
      className="p-2 bg-muted/50"
    >
      <textarea
        value={value}
        placeholder="Reply..."
        onChange={(e) => setValue(e.target.value)}
        className="border-0 resize-none w-full text-sm focus:ring-0 focus:outline-none bg-transparent"
        onKeyDown={handleKeyDown}
        autoFocus
        required
      />
      <div className="flex items-center justify-end mt-2">
        <Button type="submit" size="sm" variant="outline">
          <Send className="w-4 h-4 text-foreground/40" />
        </Button>
      </div>
    </form>
  );
};

export default AddComment;
