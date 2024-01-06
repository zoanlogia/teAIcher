"use client"
import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"
export const CrispChat = () => {

    useEffect(() => {
        Crisp.configure("61d93a23-9dc5-48a0-821e-42cc50d51c50")
    }, [])

    return null
}