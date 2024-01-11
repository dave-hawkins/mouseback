import { createContext } from "react";
import { User } from "@supabase/supabase-js";
import { Config } from "@/global";

type UserContextValue = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  appConfig: Config | null;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => null,
  appConfig: null,
});

export default UserContext;
