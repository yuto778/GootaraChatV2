'use server'

import { SignUpFormType } from "@/components/SignUpform"
import { createClient } from "@/lib/supabase/server"

export const SignUp = async(value :SignUpFormType) => {
    const supabase = createClient()
    try {
        const { data:{user} , error} = await supabase.auth.signUp({
            email:value.Email,
            password:value.FirstPassword
        })
        if(error){
            throw error
        }

        if(user){
            const {data , error:insertError} = await supabase.from('User').insert({
                id:user.id,
                find_id:user.id,
                name:value.Username,
                email:value.Email,
                avatar:'/Icon.jpeg',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            })

            if(insertError){
                throw insertError
            }
        }

        return {success:true , message:'新規登録に成功'}

       

        
    } catch (error) {
        console.error('サインアップエラー',error);
        return {success:false, message:'新規登録に失敗'}
        
        
    }

}