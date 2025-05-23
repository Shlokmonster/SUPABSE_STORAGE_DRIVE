import { supabase } from "../supabaseclient";

export const login = async (email,password) => {
    const {data ,error} = await supabase.auth.signInWithPassword({email,password})
    if(error){
        throw error
    }
    else{
        return data
    }
}
