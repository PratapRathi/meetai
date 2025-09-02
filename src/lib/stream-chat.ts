import { StreamChat } from "stream-chat"
import "server-only"


export const streamChat = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
    process.env.STREAM_VIDEO_SECRET_KEY!,

)