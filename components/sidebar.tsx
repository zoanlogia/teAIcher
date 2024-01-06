"use client"

import { cn } from "@/lib/utils"
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, SettingsIcon, VideoIcon } from "lucide-react"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import FreeCounter from "./free-counter"

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["600"],
})

const routes = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        color: "text-sky-500",
    },
    {
        name: "Conversation",
        path: "/conversation",
        icon: MessageSquare,
        color: "text-violet-500",
    },
    {
        name: "Image generation",
        path: "/image",
        icon: ImageIcon,
        color: "text-pink-500",
    },
    {
        name: "Video generation",
        path: "/video",
        icon: VideoIcon,
        color: "text-emerald-500",
    },
    {
        name: "Music generation",
        path: "/music",
        icon: Music,
        color: "text-yellow-500",
    },
    {
        name: "Code generation",
        path: "/code",
        icon: Code,
        color: "text-red-500",
    },
    {
        name: "Settings",
        path: "/settings",
        icon: SettingsIcon,
        color: "text-white-500",
    },
]

interface SidebarProps {
    apiLimitCount: number,
    isPro: boolean
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {

    const pathname = usePathname()

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href={"/dashboard"} className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image className="rounded-full" fill alt="Logo" src="/brain.png" />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>TeAIcher</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link key={route.name} href={route.path} className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === route.path ? "bg-white/10 text-white" : "text-zinc-400")}>
                            <div className={"flex items-center flex-1"}>
                                <route.icon className={cn("w-6 h-6", route.color)} />
                                <span className="ml-3">{route.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
        </div>
    )
}

export default Sidebar