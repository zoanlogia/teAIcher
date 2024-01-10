import Image from "next/image"

export const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <div className="w-10 h-10 animate-spin">
            <Image src="/logo.svg" className="rounded-full border border-gray-500/10 shadow-sm shadow-gray-500/10" alt="loader" fill/>
        </div>
            <p className="text-sm text-muted-foreground">TeAIcher is thinking...</p>
    </div>
  )
}