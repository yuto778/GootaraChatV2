'use server'

import { UserEmailUpdateType } from "@/app/setting/UserEmailUpdateModal"
import { createClient } from "@/lib/supabase/server"

export const UserEmailUpdate = async(value:UserEmailUpdateType,userid:string) => {
    const supabase = createClient()

    try {
        const {data :{user} , error:autherror} = await supabase.auth.updateUser({
            email:value.email
        })

        if(autherror){
            return {success:false , message:'authのエラーが発生した'}
        }

        const {data ,error: tableerror} = await supabase.from('User').update({
            'email':value.email
        }).eq('id',userid).select()

        if(tableerror){
            return {success:false , message:'メールアドレスの更新に失敗した'}
        }

        return {success:true , message:'メールアドレスの更新に成功したよ'}
    } catch (error) {
        return {success:false ,message:'メールアドレスの更新中にエラーが発生した'}
    }
}