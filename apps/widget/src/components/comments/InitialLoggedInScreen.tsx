import { useState } from "react";
import { ArrowUpRight, LogInIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@repo/widget/src/components/ui/button";
import {
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@repo/widget/src/components/ui/menubar";
import githubSignInHandler from "@repo/widget/src/lib/githubSignInHandler";
import googleSignInHandler from "@repo/widget/src/lib/googleSignInHandler";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "../ui/dialog";

type AuthProviders = "github" | "google";

const InitialLoggedInScreen = () => {
  const [loading, setLoading] = useState(false);

  const onSignInClick = async (provider: AuthProviders) => {
    if (loading) return;
    try {
      setLoading(true);
      if (provider === "github") {
        await githubSignInHandler();
      } else if (provider === "google") {
        await googleSignInHandler();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MenubarMenu>
        <MenubarTrigger className="rounded-full hover:bg-foreground/5">
          <Dialog>
            <DialogTrigger className="flex items-center gap-2">
              <LogInIcon className="h-4 w-4 text-neutral-500" />
              <a className="cursor-pointer whitespace-nowrap">
                {loading
                  ? "Logging In, Please wait..."
                  : "Sign in to add feedback"}
              </a>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="font-medium text-lg">
                Sign in to Mouseback
              </DialogHeader>
              <DialogDescription className="pt-0">
                This website uses Mouseback, the collaboration tool for software
                teams. To add feedback or suggest adjustments, please sign in
                using one of the methods below.
              </DialogDescription>
              <div className="w-full flex flex-col gap-2">
                <Button
                  variant={"outline"}
                  className="cursor-pointer relative"
                  onClick={() => onSignInClick("github")}
                >
                  <div className="w-5 h-5 absolute left-4">
                    <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  Sign in with GitHub
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => onSignInClick("google")}
                  className="relative"
                >
                  <div className="w-5 h-5 absolute left-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  </div>
                  Sign in with Google
                </Button>
              </div>
              {/* Add more auth providers as needed */}
            </DialogContent>
          </Dialog>
          {/* <div className="flex space-x-1.5 items-center">
            <LogInIcon className="h-4 w-4 text-neutral-500" />
            <a className="cursor-pointer" onClick={onSignInClick}>
              {loading
                ? "Logging In, Please wait..."
                : "Sign in to add feedback"}
            </a>
          </div> */}
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="rounded-full hover:bg-foreground/5">
          <div>
            <MoreHorizontal className="h-5 w-5" />
          </div>
        </MenubarTrigger>

        <MenubarContent align="center">
          <div className="w-64">
            <div className="p-3 flex flex-col gap-0.5">
              <p className="text-sm font-medium">Welcome to Mouseback</p>
              <p className="text-sm text-muted-foreground">
                The collaboration tool for software teams.
              </p>
              <div className="">
                <a href="https://www.mouseback.app">
                  <Button className="px-0 h-0" variant={"link"} size={"sm"}>
                    Learn more{" "}
                    <ArrowUpRight className="w-4 h-4 ml-2 text-muted-foreground" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </MenubarContent>
      </MenubarMenu>
    </>
  );
};

export default InitialLoggedInScreen;
