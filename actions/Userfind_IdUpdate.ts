'use server'

import { UserIdUpdateType } from "@/app/setting/UserIdUpdateModal"
import { createClient } from "@/lib/supabase/server"

export const Userfind_idUpdate = async(value:UserIdUpdateType , userid:string) => {
    const supabase = createClient()

    try {
        const {data , error} = await supabase.from('User').update({'find_id':value.userid}).eq('id',userid).select()

        if(error){
            return { success:false , message:'find_idの更新に失敗'}
        }
        
        return { success:true , message:'find_idの更新に成功'}
    } catch (error) {
        console.log(error);
        
    }
}