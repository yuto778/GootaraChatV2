'use server'

import { createClient } from "@/lib/supabase/server"

export const ToDirectChat = async(userId:string,friendId:string) => {
    const supabase = createClient()

    try {
        //２人のチャットルームがあるか調べる
        const {data} = await supabase.from('ChatRoomMember').select('*').eq('userId',userId)
        const {data:friendChat} = await supabase.from('ChatRoomMember').select('*').eq('userId',friendId)

        if(data && friendChat){
            //chatroomIdが同じものがあるか確認
            const commonChatroom = data.find(userRoom => 
                friendChat.some(friendRoom => 
                    friendRoom.chatroomId === userRoom.chatroomId
                )
            )

            if(commonChatroom){
                // あればそのchatroomIdを返す
                console.log('既存の共通チャットルームが見つかりました');
                return commonChatroom.chatroomId
            }else {
                console.log('共通のチャットルームが見つかりませんでした。');

                // なければchatroomを作成し、chatroommemberに登録してchatroomIdを返す
                
                const {data:createChatroomdata} = await supabase.from('ChatRoom').insert({'type':'direct','icon':'/Icon.jpeg',}).select().single()

                if(!createChatroomdata)return
                  await supabase.from('ChatRoomMember').insert({'chatroomId':createChatroomdata?.id,'userId':userId})
                  await supabase.from('ChatRoomMember').insert({'chatroomId':createChatroomdata.id,'userId':friendId})

                  return createChatroomdata.id
            }
        }else {
            console.log('ユーザーデータが見つかりません');
            
        }

        

    } catch (error) {
        console.log(error);
        
    }
}