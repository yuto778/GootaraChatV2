'use server'

import { createClient } from "@/lib/supabase/server"
import { RequestProps } from "./Request"

export const AllowRequest = async(id:string,userId:string,friendId:string) => {
    
    const supabase = createClient()

    try {
        const {error} = await supabase.from('Friends').update({'request':true}).eq('id',id)

        if(error){
            return {success:false , message:'失敗'}
        }

        const { error:Adderror} = await supabase.from('Friends').insert({'userId':friendId,'friendId':userId,'request':true})

        if(Adderror){
            return {success:false, message:'Friendsテーブルに新たに追加する際にエラーが生じました'}
        }

        return {success:true , message:'リクエストを承認しました'}
    } catch (error) {
        return {success:false , message:'リクエスト承認エラーです'}
    }
}

