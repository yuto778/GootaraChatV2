'use server'

import { createClient } from "@/lib/supabase/server"

export const getFriendData = async(userId:string) => {
    const supabase = createClient()

    try {
        const { data: friendsData, error: friendsError} = await supabase.from('Friends').select('*').eq('userId',userId).eq('request',true)

        if (friendsError) throw friendsError
        
        const friendIds = friendsData.map(friend => friend.friendId)

        const { data: userData, error: userError } = await supabase
            .from('User')
            .select('*')
            .in('id', friendIds)


            if (userError) throw userError

            return userData
            
        
    } catch (error) {
        
    }
}