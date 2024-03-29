import supabase from "./supabaseClient";

export const googleSignInHandler = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: "https://www.googleapis.com/auth/userinfo.email",
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    return;
  }

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error getting session:", sessionError);
    return;
  }

  const user = sessionData?.session?.user;

  if (user) {
    try {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
        },
      ]);

      if (insertError) {
        console.error("Error adding user to users table:", insertError);
        return;
      }

      return;
    } catch (err) {
      console.error("Error while adding user to users table:", err);
    }
  } else {
    console.error("No user is currently logged in");
  }
};

export default googleSignInHandler;
