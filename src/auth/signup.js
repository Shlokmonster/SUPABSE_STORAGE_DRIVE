import { supabase } from "../supabaseclient";

export const signUp= async (email,password) => {
    const {data , error}= await supabase.auth.signUp({email,password});
    if(error){
        throw error;
    }
    else{
        return data;
    }
    
}