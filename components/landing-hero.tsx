"use client"

import {useAuth} from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import TypewriterComponent from "typewriter-effect"
import { Button } from "./ui/button"
const LandingHero = () => {
    const { isSignedIn } = useAuth()
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            <h1>The best <Image className="inline" src="/brain.png" width={80} height={80} alt="brain" /> for your</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500 py-2">
                <TypewriterComponent
                options={{
                    strings: ["Images.", "Videos.", "Music." ,"Text.", "Code.", "Chatbot.",],
                    autoStart: true,
                    loop: true,
                }}
                />
            </div>
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-400">
            Create and share beautiful images, videos, music, text, and code instantly.
        </div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button variant={"premium"} className="md:text-lg p-4 md:p-6 rounded-full font-semibold mt-5">
                Start generating for free
            </Button>
        </Link>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
            No credit card required
        </div>
    </div>
  )
}

export default LandingHero