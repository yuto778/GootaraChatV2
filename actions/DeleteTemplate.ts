'use server'

import { createClient } from "@/lib/supabase/server"

export const DeleteTemplate = async(template_id:string) => {
    const supabase = createClient()

    try {
        const {error} = await supabase.from('TemplateMessage').delete().eq('id',template_id)
        if(error){
            return {success:false, message:'定型文の削除に失敗しました'}
        }
        return {success:true , message:'定型文の削除に成功しました'}
    } catch (error) {
        return {success:false , message:'エラーで定型文の削除に失敗しました'}
    }
}