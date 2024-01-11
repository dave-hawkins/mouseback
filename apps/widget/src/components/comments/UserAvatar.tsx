import { useContext } from "react";

import UserContext from "@repo/widget/src/context/UserContext";

const UserAvatar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center space-x-2 pl-2 pr-1.5">
      <img
        src={user?.user_metadata?.avatar_url}
        className="h-5 w-5 ring-2 ring-white rounded-full shadow-[0px_0px_0px_3px_rgba(0,0,0,0.1)]"
        alt="User Avatar"
      />
    </div>
  );
};

export default UserAvatar;
