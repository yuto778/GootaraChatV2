'use server'

import { createClient } from "@/lib/supabase/server"

export const getAllUser = async(userid:string) => {
    const supabase = createClient()

    try {
        const {data , error} = await supabase.from('User').select('*').neq('id',userid)
        
        if(error)return

        return data
    } catch (error) {
        console.log(error);
        
    }
} 