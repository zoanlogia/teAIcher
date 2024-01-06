import { checkApiLimit, increaseApiLimit } from "@/lib/api.limit";
import { checkUserSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
    try {
        const { userId } = auth()
        const body = await request.json()
        const { prompt, amount = 1, resolution = "512x512" } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!openai) {
            return new NextResponse("Missing configuration OpenAi ApiKey", { status: 500 })
        }

        if (!prompt) {
            return new NextResponse("Missing prompt", { status: 400 })
        }

        if (!amount) {
            return new NextResponse("Missing amount", { status: 400 })
        }

        if (!resolution) {
            return new NextResponse("Missing resolution", { status: 400 })
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkUserSubscription()

        if (!freeTrial && !isPro) {
            return new NextResponse("Api limit reached", { status: 403 })
        }

        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size: resolution
        })

        if (!isPro){
            await increaseApiLimit()
        }

        return NextResponse.json(response.data)
    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}