"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const testimonials = [

    {
        name: "Diane",
        avatar: "D",
        company: "Bunny",
        description: "Bunnies are amazing in TeAIcher, I finally can exerce my passion",
    },
    {
        name: "Diane",
        avatar: "D",
        company: "Bunny",
        description: "Bunnies are amazing in TeAIcher, I finally can exerce my passion",
    },
    {
        name: "Diane",
        avatar: "D",
        company: "Bunny",
        description: "Bunnies are amazing in TeAIcher, I finally can exerce my passion",
    },
    {
        name: "Diane",
        avatar: "D",
        company: "Bunny",
        description: "Bunnies are amazing in TeAIcher, I finally can exerce my passion",
    },
    {
        name: "Diane",
        avatar: "D",
        company: "Bunny",
        description: "Bunnies are amazing in TeAIcher, I finally can exerce my passion",
    },
    {
        name: "Diane",
        avatar: "D",
        company: "Bunny",
        description: "Bunnies are amazing in TeAIcher, I finally can exerce my passion",
    },
]
export const LandingContent = () => {

    return (
        <div className="px-10 pb-20">
            <h2 className="text-4xl font-bold text-white text-center mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] text-white border-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-sm text-zinc-400">{item.company}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                <span className="text-"> {item.description}</span>
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}