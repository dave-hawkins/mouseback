// - It is the central location for exporting all components inside this folder.
// - It is done to ensure that the import paths are consistent and code should remain clean.
// - By using this we can directly import any component from this folder like this:
// - import { ComponentName1, ComponentName2 } from "@/components/comments"
import Comment from "./Comment";
import InboxComments from "./InboxComments";
import InitialLoggedInScreen from "./InitialLoggedInScreen";
import MoreActions from "./MoreActions";
import ToggleComments from "./ToggleComments";
import UserAvatar from "./UserAvatar";
import Thread from "./Thread";
import AddComment from "./AddComment";
import CommentSkeleton from "./CommentSkeleton";
import CommentActions from "./CommentSkeleton";



export {
  Comment,
  InboxComments,
  InitialLoggedInScreen,
  MoreActions,
  ToggleComments,
  UserAvatar,
  Thread,
  AddComment,
  CommentSkeleton,
  CommentActions,
};
