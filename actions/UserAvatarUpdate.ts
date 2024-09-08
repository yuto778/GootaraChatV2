'use server'

import { createClient } from "@/lib/supabase/server"

export const UserAvatarUpdate = async(formData:FormData,userid:string) => {
    const supabase = createClient()

    const file = formData.get('file') as File
    
        const filename = `${Date.now()}_${userid}`
    
        
        

    try {

        const {data , error} = await supabase.storage.from('avatar').upload(filename,file)
        console.log(data);
        
        if(error){
            return {success:false ,message:'ストレージ保存時にエラーが発生しました'}
        }

        const {data:{publicUrl}} = await supabase.storage.from('avatar').getPublicUrl(filename)

        const {error:updateerror} = await supabase.from('User').update({avatar:publicUrl}).eq('id',userid)
        if(updateerror){
            return {success:false, message:'Userテーブルの編集時にエラーが発生しました'}
        }

        return {success:true , message:'avatarの変更に成功しました'}
    } catch (error) {
        console.log(error);
        
        
    }
}