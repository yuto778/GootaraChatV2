'use server'

import { TemplateUpdateType } from "@/app/setting/EditTemplateModal"
import { createClient } from "@/lib/supabase/server"

export const TemplateUpdate = async(value:TemplateUpdateType,template_id:string) => {
    const supabase = createClient()

    try {
        const {data , error} = await supabase.from('TemplateMessage').update({'content':value.template}).eq('id',template_id)
        if(error){
            return {success:false , message:'定型文の編集に失敗しました'}
        }

        return{ success:true , message:'定型文の編集に成功しました'}
    } catch (error) {
        return {success:false , message:'定型文の編集中にトラブルが発生しました'}
    }
}