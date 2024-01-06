"use client"

import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/nextjs"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const font = Montserrat({
    subsets: ["latin"],
    weight: ["600"],
})
export const LandingNavbar = () => {
    const { isSignedIn } = useAuth()

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href={"/"} className={"flex items-center"}>
                <div className="relative h-10 w-10 mr-4 border border-white-700 rounded-full flex items-center justify-center">
                    <Image src={"/brain.png"} width={100} height={100} alt="Logo" className="" />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>TeAIcher</h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant={"outline"} className="rounded-full">
                        Get Started 🍷
                    </Button>
                </Link>
            </div>
        </nav>
    )
}
