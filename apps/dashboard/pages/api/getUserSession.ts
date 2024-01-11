
export default async function handler(req:any, res:any) {
  const session = req.headers.cookie ? JSON.parse(req.headers.cookie) : null;

  if (!session || !session.supabaseAuthSession) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  return res.status(200).json({ user: session.supabaseAuthSession.user });
}