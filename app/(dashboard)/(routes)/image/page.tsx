"use client"

import { ReactNode, useState } from "react"
import Heading from "@/components/heading"
import { zodResolver } from "@hookform/resolvers/zod"
import { CopyIcon, DownloadIcon, EyeIcon, ImageIcon, TrashIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { amountOptions, formSchema, resolutionOptions } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Empty } from "@/components/empty"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { Card, CardFooter } from "@/components/ui/card"
import { useProModal } from "@/hooks/use-pro-modal"
import toast from "react-hot-toast"

const ImagePage = () => {

  const proModal = useProModal()
  const [images, setImages] = useState<string[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setImages([])
      const response = await axios.post("/api/image", data)
      const urls = response.data.map((image: { url: string }) => image.url)
      setImages(urls)
      form.reset()

    } catch (error: any) {

      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error("Something went wrong. Please try again later.")
      }

    } finally {
      router.refresh()
    }
  }

  return (
    <>
      <Heading title="Image generation" description="Turn your prompt into an image" icon={ImageIcon} iconColor="text-pink-500" bgColor="bg-pink-500/10" />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="
          rounded-lg
          border
          w-full
          p-4
          px-3
          md:px-6
          focus-within:shadow-sm
          grid
          grid-cols-12
          gap-2
          ">
            <FormField name="prompt" render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormControl className="m-0 p-0">
                  <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="A picture of an bunny eating a pizza" {...field} />
                </FormControl>
              </FormItem>
            )} />
            <FormField name="amount" control={form.control} render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <Select onValueChange={field.onChange} disabled={isLoading} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {amountOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}></FormField>
            <FormField name="resolution" control={form.control} render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-2">
                <Select onValueChange={field.onChange} disabled={isLoading} defaultValue={field.value} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {resolutionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}></FormField>
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <>
              <Empty label="No images generated" />
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src, index) => (
              <Card key={index} className="rounded-lg overflow-hidden">

                <div key={index} className="relative aspect-square">
                  <Image
                    src={src}
                    alt="image"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardFooter className="p-2">
                  <Button className="w-full mx-1 hover:bg-green-500/10 hover:transition" variant={"secondary"} onClick={() => window.open(src, "_blank")} title="View"><EyeIcon className="w-4 h-4" /></Button>
                  <Button variant="secondary" className="w-full mx-1 hover:bg-red-500/10 transition" onClick={() => setImages(images.filter((_, i) => i !== index))} title="Delete"><TrashIcon className="w-4 h-4" /></Button>
                  <Button variant="secondary" className="w-full mx-1 hover:bg-purple-500/10 transition" onClick={() => navigator.clipboard.writeText(src)} title="Copy"><CopyIcon className="w-4 h-4" /></Button>

                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ImagePage