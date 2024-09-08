'use server'

import { createClient } from "@/lib/supabase/server"

export const getChatfrienddata = async (chatroomid:string,userid:string) => {

    const supabase = createClient()

    try {
        const { data} = await supabase.from('ChatRoomMember').select('*').eq('chatroomId',chatroomid).neq('userId',userid).single()

        const {data:frienddata} = await supabase.from('User').select('*').eq('id',data!.userId).single()

        return frienddata
    } catch (error) {
        
    }
}