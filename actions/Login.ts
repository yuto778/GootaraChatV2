'use server'

import { LoginFormType } from "@/components/LoginForm"
import { createClient } from "@/lib/supabase/server"



export const Login = async(value:LoginFormType) => {
    

const supabase = createClient()
    

    try {
        const {data , error:Usererror} = await supabase.from('User').select('*').eq('email',value.Email)
        if(Usererror ){
            return {success:false , message:'登録されていないメールアドレスです'}
        }
        const {data:{user},error } = await supabase.auth.signInWithPassword({
            email:value.Email,
            password:value.Password
        })

        if(error){
            return {success:false , message:'ログインに失敗しました'}
        }

        return { success:true, message:'ログインに成功',data:user}
    } catch (error) {
        return {success:false , message:'アカウントが存在しません'}
    }
}

