import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { checkApiLimit, increaseApiLimit } from "@/lib/api.limit";
import { checkUserSubscription } from "@/lib/subscription";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const instructionMessage: ChatCompletionMessage = {
    role: "assistant",
    content: "You are an expert code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
}

export async function POST(request: Request) {
    try {
        const { userId } = auth()
        const body = await request.json()
        const { messages } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!openai) {
            return new NextResponse("Missing configuration OpenAi ApiKey", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Missing message", { status: 400 })
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkUserSubscription()

        if (!freeTrial && !isPro) {
            return new NextResponse("Api limit reached", { status: 403 })
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages : [...messages, instructionMessage]
        })

        if (!isPro){
            await increaseApiLimit()
        }

        return NextResponse.json(completion.choices[0].message)
    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}