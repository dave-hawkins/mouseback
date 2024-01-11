import { CommentData, User } from "@/components/CommentMenu";
import supabase from "@/lib/supabaseClient";
import React, {
  MouseEventHandler,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import UserContext from "./UserContext";
import { MEMBERS, PROJECT, TEAMS, THREADS } from "@/lib/tables";
import {
  calculateElementInitialPosition,
  getThreadRelativeCoords,
} from "@/utils/utils";

export interface Thread extends CommentIndicator {
  id: number;
  owner_id: string;
  element_ref: string;
}

export type CommentIndicator = {
  x: number;
  y: number;
  element?: Element | null;
  delta_x?: number;
  delta_y?: number;
  isVisible?: boolean;
  users?: User;
  threadId?: number;
};

export type ProjectData = {
  created_at: string;
  project_name: string;
  id: string;
  team_id: string;
  is_temp: boolean;
};

export type TeamsData = {
  created_at: string;
  created_by: string;
  id: string;
  team_name: string;
  api_key: string;
};

type Comments = {
  comments: CommentData[];
  threads: Thread[];
  dotPositions: CommentIndicator[];
  commentMode: boolean;
  currentComment: CommentData | null;
  selectedThread: Thread | null;
  commenting: boolean;
  commentPosition: CommentIndicator;
  projects: ProjectData[];
  teams: TeamsData | null;
  selectedProject: ProjectData | null;
  projectDialogOpen: boolean;
  createDialogOpen: boolean;
  projectName: string;
  tempProjectDialogOpen: boolean;
  tempProject: ProjectData | null;
  isEditor: boolean;

  handleThreadClick: React.MouseEventHandler;
  handleMouseMove: React.MouseEventHandler;
  setCommentMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentComment: React.Dispatch<React.SetStateAction<CommentData | null>>;
  setCommentPosition: React.Dispatch<React.SetStateAction<CommentIndicator>>;
  setCommenting: React.Dispatch<React.SetStateAction<boolean>>;
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
  setDotPositions: React.Dispatch<React.SetStateAction<CommentIndicator[]>>;
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
  setSelectedThread: React.Dispatch<React.SetStateAction<Thread | null>>;
  setProjects: React.Dispatch<React.SetStateAction<ProjectData[]>>;
  setSelectedProject: React.Dispatch<React.SetStateAction<ProjectData | null>>;
  setProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  fetchThreads: (projectId: string) => void;
  setTempProjectDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTempProject: React.Dispatch<React.SetStateAction<ProjectData | null>>;
  fetchTeams: () => void
};

export const CommentsContext = createContext<Comments>({
  comments: [],
  threads: [],
  dotPositions: [],
  commentMode: false,
  currentComment: null,
  selectedThread: null,
  commenting: false,
  commentPosition: { x: 0, y: 0 },
  projects: [],
  teams: null,
  selectedProject: null,
  projectDialogOpen: false,
  createDialogOpen: false,
  projectName: "",
  tempProjectDialogOpen: false,
  tempProject: null,
  isEditor: false,
  // Methods
  handleThreadClick: () => null,
  handleMouseMove: () => null,
  setCommentMode: () => null,
  setCurrentComment: () => null,
  setCommentPosition: () => null,
  setCommenting: () => null,
  setComments: () => null,
  setDotPositions: () => null,
  setThreads: () => null,
  setSelectedThread: () => null,
  setProjects: () => null,
  setSelectedProject: () => null,
  setProjectDialogOpen: () => null,
  setCreateDialogOpen: () => null,
  setProjectName: () => null,
  fetchThreads: () => null,
  setTempProjectDialogOpen: () => null,
  setTempProject: () => null,
  fetchTeams: () => null,
});

export const CommentsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, appConfig } = useContext(UserContext);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [dotPositions, setDotPositions] = useState<CommentIndicator[]>([]);
  const [teams, setTeams] = useState<TeamsData | null>(null);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );
  const [projectDialogOpen, setProjectDialogOpen] = useState<boolean>(false);
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  const [isEditor, setIsEditor] = useState<boolean>(false)
  const [tempProjectDialogOpen, setTempProjectDialogOpen] =
    useState<boolean>(false);
  const [tempProject, setTempProject] = useState<ProjectData | null>(null)

  // selected comment states
  const [commentMode, setCommentMode] = useState<boolean>(false);
  const [currentComment, setCurrentComment] = useState<CommentData | null>(
    null
  );
  const [commenting, setCommenting] = useState<boolean>(false);
  const [commentPosition, setCommentPosition] = useState<CommentIndicator>({
    x: 0,
    y: 0,
  });
  const [isDomUpdated, setIsDomUpdated] = useState(false);

  /**
   * Method to get thread dots relative position according to viewport
   */
  const formatDotsPosition = (threads: Thread[]): CommentIndicator[] => {
    const allThreads = [...threads];
    const relativeDots = allThreads?.map((thread) =>
      getThreadRelativeCoords(thread)
    );

    return relativeDots;
  };

  /**
   * Listening for DOM changes
   */
  useEffect(() => {
    const bodyElement = document.body;

    const callback: MutationCallback = () => {
      // let's not look for widget dom changes while calculating threads position
      if (projectDialogOpen) return;
      if (commentMode) return;
      setIsDomUpdated(true);
    };

    const observerOptions = {
      childList: true, // Watch for changes in the target's children
      subtree: true, // Watch for changes in the whole subtree
      attributes: true, // Watch for attribute changes
      characterData: true, // Watch for changes in text content
    };

    const observer = new MutationObserver(callback);

    if (bodyElement) {
      observer.observe(bodyElement, observerOptions);
    }

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, [threads, commentMode, projectDialogOpen]);

  useEffect(() => {
    if (!isDomUpdated) return;
    setDotPositions(formatDotsPosition(threads));
  }, [isDomUpdated]);

  /**
   * Method to fetch all the threads
   */
  const fetchThreads = useCallback(
    async (projectId: string) => {
      const { data, error } = await supabase
        .from(THREADS)
        .select(`*,users(*)`) // populate comment user information
        .eq("pathname", window.location.pathname) // get the comments of current page
        .eq("project_id", projectId); // get the comments based on project id
      if (error) {
        console.error("Error fetching the threds", error);
        return;
      }
      setThreads(data as Thread[]);
      setDotPositions(formatDotsPosition(data as Thread[]));
    },
    [appConfig]
  ); // add other dependencies if needed

  const createTempProject = async (id:string) => {
    try {
      const { data, error } = await supabase
        .from(PROJECT)
        .insert([
          {
            project_name: window.location.origin,
            team_id: id,
            is_temp: true,
          },
        ])
        .select();
      if (error) return console.error(error.message);
      setProjects(data);
      if (data.length > 0) {
        setSelectedProject(data[0]);
        await fetchThreads(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const fetchProjects = async (teams: TeamsData, length: number) => {
    if (!teams) return;
    const { data: tempProject, error: tempProjectError } = await supabase
      .from(PROJECT)
      .select()
      .eq("team_id", teams?.id)
      .eq("is_temp", true);
    if ((!isEditor && !length) || tempProject?.length) {
      if (tempProjectError) {
        console.error("Error fetching the threds", tempProjectError);
        return;
      }
      if (!tempProject?.length) {
        await createTempProject(teams.id);
        return;
      }
      setProjects(tempProject);
      if (tempProject.length > 0) {
        setSelectedProject(tempProject[0]);
        await fetchThreads(tempProject[0].id);
      }
      return;
    }
    const { data, error } = await supabase
      .from(PROJECT)
      .select()
      .eq("team_id", teams?.id);

    if (error) {
      console.error("Error fetching the threds", error);
      return;
    }
    
    setProjects(data);
    if (tempProject?.length) {
      setTempProject(tempProject[0])
      setSelectedProject(tempProject[0]);
      setTempProjectDialogOpen(true);
      await fetchThreads(tempProject[0].id);
    } else {
      setSelectedProject(data[0]);
      await fetchThreads(data[0].id);
    }
  };

  const fetchMembers = useCallback(async () => {
    const { data, error } = await supabase
      .from(MEMBERS)
      .select("*")
      .eq("team_id", teams?.id);
    if (error) {
      console.error("Error fetching the threds", error);
      return;
    }
    if(data.length>0){
      setIsEditor(true)
      
    }
    if(teams && data) {
      await fetchProjects(teams,data.length);
    } 
  }, [teams]);

  const fetchTeams = useCallback(async () => {
    const { data, error } = await supabase
      .from(TEAMS)
      .select("*")
      .eq("api_key", appConfig?.apiKey);
    if (error) {
      console.error("Error fetching the threds", error);
      return;
    }
    const team = data[0];
    setTeams(team);
   
  }, [appConfig,isEditor]);

  /**
   * Method to handle comment click
   */
  const handleThreadClick: MouseEventHandler = useCallback(
    (event) => {
      if (!user) return;

      // Replace 'menu-bar' with the appropriate selector for your menu bar
      const menuBar = document.querySelector(".menu-bar");
      let targetElement = event.target as HTMLElement;

      // Check if the clicked element or any of its parents is the menu bar
      let insideMenuBar = false;
      while (targetElement) {
        if (targetElement === menuBar) {
          insideMenuBar = true;
          break;
        }
        targetElement = targetElement.parentElement as HTMLElement;
      }

      // Only proceed if the click event was not inside the menu bar
      if (!insideMenuBar) {
        if (commentMode) {
          const { x, y, delta_x, delta_y, element_ref } =
            calculateElementInitialPosition(event);
          const newThread = {
            x,
            y,
            owner_id: user.id,
            delta_x,
            delta_y,
            element_ref,
            id: 0,
          };

          const newThreads = [...threads, newThread];
          // apend new thread in the array
          setThreads(newThreads);

          // set the new added comment as selected
          setSelectedThread(newThread);

          const updatedDotPositions = formatDotsPosition(newThreads);

          // Save the red dot position
          setDotPositions(updatedDotPositions);
          if (updatedDotPositions && updatedDotPositions.length) {
            const newCreatedCommentPosition =
              updatedDotPositions[updatedDotPositions.length - 1];
            setCommentPosition({
              x: newCreatedCommentPosition.x - 16,
              y: newCreatedCommentPosition.y - 24,
            });
          }
          // Return to normal cursor mode
          setCommentMode(false);
        } else {
          setSelectedThread(null);
          setCommenting(false);
          setCommentPosition({ x: 0, y: 0 });
        }
      }
    },
    [commentMode, threads, user]
  );

  /**
   * Method to handle mouse move event
   */
  const handleMouseMove: MouseEventHandler = useCallback(
    (event) => {
      if (commentMode) {
        setCommentPosition({ x: event.clientX, y: event.clientY });
      }
    },
    [commentMode]
  );

  useEffect(() => {
    if (!user || teams) return;
    fetchTeams();
  }, [user, teams]);


  useEffect(()=>{
    if (!teams) return;
    fetchMembers()
  },[teams])

  /**
   * On window resize update the dots position
   */
  useEffect(() => {
    const handleResize = () => setDotPositions(formatDotsPosition(threads));
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [threads]);

  const contextValue: Comments = React.useMemo(
    () => ({
      comments,
      threads,
      dotPositions,
      commentMode,
      currentComment,
      selectedThread,
      commenting,
      commentPosition,
      projects,
      teams,
      selectedProject,
      projectDialogOpen,
      createDialogOpen,
      projectName,
      tempProjectDialogOpen,
      tempProject,
      isEditor,
      handleThreadClick,
      handleMouseMove,
      setCommentMode,
      setCommentPosition,
      setCommenting,
      setComments,
      setCurrentComment,
      setDotPositions,
      setThreads,
      setSelectedThread,
      setProjects,
      setSelectedProject,
      setProjectDialogOpen,
      setCreateDialogOpen,
      setProjectName,
      fetchThreads,
      setTempProjectDialogOpen,
      setTempProject,
      fetchTeams
    }),
    [
      comments,
      threads,
      dotPositions,
      currentComment,
      selectedThread,
      commentMode,
      commentPosition,
      commenting,
      projects,
      teams,
      selectedProject,
      createDialogOpen,
      projectDialogOpen,
      projectName,
      tempProjectDialogOpen,
      tempProject,
      isEditor,
      handleThreadClick,
      handleMouseMove,
      setCommentMode,
      setCommentPosition,
      setCommenting,
      setComments,
      setDotPositions,
      setThreads,
      setSelectedThread,
      setProjects,
      setSelectedProject,
      setCreateDialogOpen,
      setProjectDialogOpen,
      setProjectName,
      fetchThreads,
      setTempProjectDialogOpen,
      setTempProject,
      fetchTeams,
    ]
  );

  return (
    <CommentsContext.Provider value={contextValue}>
      {children}
    </CommentsContext.Provider>
  );
};
