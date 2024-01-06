import { auth } from "@clerk/nextjs";

import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

/**
 * Increases the API limit for the user.
 *
 * @return {Promise<void>} Returns a promise that resolves when the API limit is increased.
 */
export const increaseApiLimit = async () => {
    const { userId } = auth()

    if (!userId) {
        return
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: { userId: userId },
            data: { count: userApiLimit.count + 1 }
        })
    } else {
        await prismadb.userApiLimit.create({
            data: { userId, count: 1 }
        })
    }
}

/**
 * Checks the API limit for the current user.
 *
 * @return {boolean} Returns true if the user is within the API limit, otherwise false.
 */
export const checkApiLimit = async () => {
    const { userId } = auth()

    if (!userId) {
        return false
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true
    } else {
        return false
    }
}

export const getApiLimitCount = async () => {
    const { userId } = auth()

    if (!userId) {
        return 0
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (!userApiLimit) {
        return 0
    }

    return userApiLimit.count
}