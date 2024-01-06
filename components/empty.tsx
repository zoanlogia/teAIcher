import Image from "next/image"

interface EmptyProps {
    label : string
}

export const Empty = ({
  label
}: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
        <div className="relative h-72 w-72">
            <Image src="/empty.svg" alt="empty" fill/>
        </div>
        <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}