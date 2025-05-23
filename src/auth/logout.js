import { supabase } from "../supabaseclient";

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
