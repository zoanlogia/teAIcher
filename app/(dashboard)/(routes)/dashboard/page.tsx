"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, Video } from "lucide-react"
import { useRouter } from "next/navigation"

const tools = [
    {
        name: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        path: "/conversation"
    },
    {
        name: "Image Generation",
        icon: ImageIcon,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
        path: "/image"
    },
    {
        name: "Music Generation",
        icon: Music,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
        path: "/music"
    },
    {
        name: "Video Generation",
        icon: Video,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        path: "/video"
    },
    {
        name: "Code Generation",
        icon: Code,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        path: "/code"
    },
]

const DashboardPage = () => {

    const router = useRouter()

    return (
        <>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the magic of TeAIcher</h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">Be lazy and leave the boring stuff to TeAIcher, and it will do the rest</p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.path)}
                        key={tool.name}
                        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.name}
                            </div>
                        </div>
                        <ArrowRight className="w-6 h-6" />
                    </Card>))}
            </div>
        </>
    )
}

export default DashboardPage