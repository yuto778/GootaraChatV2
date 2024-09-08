'use server'

import { createClient } from "@/lib/supabase/server"

export const Reject = async(requestId:string) => {
    const supabase = createClient()

    try {
        const { error} = await supabase.from('Friends').delete().eq('id',requestId)

        if(error){
            return {success:false , message:'削除できませんでした'}
        }

        return {success:true , message:'削除に成功しました'}


    } catch (error) {
        return {success:false , message:'削除に失敗したようだ'}
    }

}


