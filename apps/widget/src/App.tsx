import { useState, useEffect } from "react";
import CommentMenu from "./components/CommentMenu";
import UserContext from "./context/UserContext";
import { User } from "@supabase/supabase-js";
import { CommentsProvider } from "./context/CommentsContext";
import { Config } from "./global";

function App(props: Config) {
  const [user, setUser] = useState<User | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === ".") {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible]);

  return isVisible ? (
    <div className="msbk-">
      <UserContext.Provider value={{ user, setUser, appConfig: props }}>
        <CommentsProvider>
          <CommentMenu />
        </CommentsProvider>
      </UserContext.Provider>
    </div>
  ) : null;
}

export default App;
