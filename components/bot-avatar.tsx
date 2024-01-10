import { Avatar, AvatarImage } from "./ui/avatar"

export const BotAvatar = () => {
  return (
    <Avatar className="w-8 h-8">
        <AvatarImage className="rounded-full" src="/logo.svg" />
    </Avatar>
  )
}