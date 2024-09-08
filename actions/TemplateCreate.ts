'use server'

import { TemplateCreateType } from "@/app/setting/TemplateCreate"
import { createClient } from "@/lib/supabase/server"

export const TemplateCreateAction = async(value:TemplateCreateType , userid:string) => {
    const supabase = createClient()

    try {
        const {data , error } = await supabase.from('TemplateMessage').insert({userId:userid,content:value.template}).select()
        if(error){
            return {success:false , message:'定型文の追加に失敗しました'}
        }

        return {success:true , message:('定型文の作成に成功しました')}
        
    } catch (error) {
        return {success:false , message:'エラーで定型文の作成に失敗しました'}
    }
}