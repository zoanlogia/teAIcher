import { checkApiLimit, increaseApiLimit } from "@/lib/api.limit";
import { checkUserSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})

export async function POST(request: Request) {
    try {
        const { userId } = auth()
        const body = await request.json()
        const { prompt } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!prompt) {
            return new NextResponse("Missing prompt", { status: 400 })
        }

        const freeTrial = await checkApiLimit()
        const isPro = await checkUserSubscription()

        if (!freeTrial && !isPro) {
            return new NextResponse("Api limit reached", { status: 403 })
        }

        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt,
                }
            }
        );

        if (!isPro) {
            await increaseApiLimit()
        }

        return NextResponse.json(response)

    } catch (error) {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
}