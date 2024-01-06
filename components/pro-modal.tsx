"use client"

import { useState } from "react"
import axios from "axios"
import { useProModal } from "@/hooks/use-pro-modal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Check, Code, ImageIcon, MessageSquare, Music, Video, Zap } from "lucide-react"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import toast from "react-hot-toast"

export const ProModal = () => {

    const tools = [
        {
            name: "Conversation",
            icon: MessageSquare,
            color: "text-violet-500",
            bgColor: "bg-violet-500/10",
        },
        {
            name: "Image Generation",
            icon: ImageIcon,
            color: "text-pink-500",
            bgColor: "bg-pink-500/10",
        },
        {
            name: "Music Generation",
            icon: Music,
            color: "text-yellow-500",
            bgColor: "bg-yellow-500/10",
        },
        {
            name: "Video Generation",
            icon: Video,
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
        },
        {
            name: "Code Generation",
            icon: Code,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
        },
    ]

    const proModal = useProModal()

    const [loading, setLoading] = useState(false)

    const onSubscribe = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe")

            window.location.href = response.data.url
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold">
                            Upgrade to genius
                            <Badge className="uppercase text-sm py-1" variant={"premium"}>
                                pro
                            </Badge></div>
                    </DialogTitle>
                    <DialogDescription>
                        <p className="text-center text-sm pt-2 space-y-2 text-zinc-900 font-medium">Upgrade to unlock more features</p>
                        {tools.map((tool) => (
                            <Card key={tool.name} className="p-3 my-2 border-black/5 flex items-center  justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.name}
                                    </div>
                                </div>
                                <Check className="text-green-600" />
                            </Card>
                        ))}
                        <DialogFooter>
                            <Button disabled={loading} onClick={onSubscribe} variant={"premium"} size={"lg"} className="group w-full hover:transition hover:scale-[1.02] hover:bg-gradient-to-r from-blue-200 via-indigo-500 to-emerald-500 ">
                                Upgrade <Zap className="w-4 h-4 ml-2 fill-white group-hover:animate-ping" />
                            </Button>
                        </DialogFooter>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}