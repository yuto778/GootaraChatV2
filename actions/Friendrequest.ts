'use server'

import { FriendrequestType } from "@/app/home/FriendAddModal"
import { createClient } from "@/lib/supabase/server"

export const Friendrequest = async(value:FriendrequestType , userid:string) => {
    const supabase = createClient()

    try {
        const { data:UserIdData } = await supabase.from('User').select('id').eq('find_id',value.findid).single()
        if(!UserIdData){
            return {success:false , message:'リクエストエラーが発生したよ'}
        }
        const {data,error} = await supabase.from('Friends').insert({'userId':userid ,'friendId':UserIdData.id,'request':null}).select()
        console.log(data);
        
        if(error){
            return {success:false , message:'エラーが発生したよ'}
        }
        return {success:true , message:'友達リクエストを送信したよ'}
    } catch (error) {
        return {success:false , message:'エラーが発生なうだよ'}
    }
}