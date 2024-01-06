"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MAX_FREE_COUNTS } from "@/constants"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { useProModal } from "@/hooks/use-pro-modal"

interface FreeCounterProps {
    apiLimitCount: number,
    isPro: boolean
}

const FreeCounter = ({ apiLimitCount = 0, isPro = false }: FreeCounterProps) => {

    const [mounted, setMounted] = useState(false)
    const proModal = useProModal()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    if (isPro) {
        return null
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>{apiLimitCount} / {MAX_FREE_COUNTS} Free generations</p>
                        <Progress value={apiLimitCount / MAX_FREE_COUNTS * 100} max={MAX_FREE_COUNTS} className="w-full h-3" />
                    </div>
                    <Button variant={"premium"} className="group w-full hover:transition hover:scale-[1.02] hover:bg-gradient-to-r from-blue-200 via-indigo-500 to-emerald-500" onClick={() => proModal.onOpen()}>
                        Upgrade <Zap className="w-4 h-4 ml-2 fill-white group-hover:animate-ping" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default FreeCounter