'use server'

import { UsernameUpdateType } from "@/app/setting/UserNameUpdateModal"
import { createClient } from "@/lib/supabase/server"

export const UserNameUpdate = async(value:UsernameUpdateType,userid:string) => {
    const supabase = createClient()

    try {
        const { data , error} = await supabase.from('User').update({'name':value.username}).eq('id',userid)
        if(error){
            return {success:false , message:'名前の変更中にエラーが発生したよ'}
        }

        return {success:true , message:'名前の変更に成功しました'}
    } catch (error) {
        console.log(error);
        
    }
}