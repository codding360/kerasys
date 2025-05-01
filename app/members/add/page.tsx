"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode'

import { supabase } from "@/lib/supabase"

import { checkSecretKey } from "@/lib/secret-key"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  ticketId: z.string().min(1, "Ticket ID is required"),
  phoneNumber: z.string().min(8, "Phone number must be at least 8 digits"),
  fullName: z.string().min(2, "Full name is required"),
  password: z.string().min(1, "Secret key is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function AddMemberPage() {
  const searchParams = useSearchParams()
  const ticketUrl = searchParams.get("ticketId") || ""
  const parsedTicketId = ticketUrl?.split("/").pop() || ""
  const [showScanner, setShowScanner] = useState(false)
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketId: parsedTicketId,
      phoneNumber: "",
      fullName: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    try{

        if (checkSecretKey(data.password)){
            return alert("Неправильный ключ")
        }

        const { error } = await supabase.rpc('insert_user_and_update_ticket_by_number', {
            full_name: data.fullName,
            phone_number: data.phoneNumber,
            ticket_number: data.ticketId
          });
          
        if (error) {
            console.error('Ошибка при выполнении запроса:', error);
            return
        }        
        
        alert("Успешно сохранен!")
        form.reset()
    }catch (e){
        console.log(e)
    }
  }

  useEffect(() => {
    // Clean up scanner when component unmounts
    return () => {
      if (scanner) {
        scanner.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner.", error)
        })
      }
    }
  }, [scanner])

  const handleScanClick = () => {
    if (showScanner) {
      // If scanner is already showing, close it
      if (scanner) {
        scanner.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner.", error)
        })
      }
      setShowScanner(false)
      return
    }

    // Only show scanner if ticketId is empty
    if (!form.getValues('ticketId')) {
      setShowScanner(true)
      const newScanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        },
        false
      )

      newScanner.render(
        (decodedText) => {
          // Handle successful scan
          const ticketIdFromQr = decodedText.split('/').pop()
          if (ticketIdFromQr) {
            form.setValue('ticketId', ticketIdFromQr)
          }
          newScanner.clear()
          setShowScanner(false)
          setScanner(null)
        },
        (errorMessage) => {
            if (!errorMessage.includes('NotFoundException') && 
                !errorMessage.includes('No MultiFormat Readers were able to detect the code')) {
                console.warn(`QR Code scan error: ${errorMessage}`)
            }
        }
      )

      setScanner(newScanner)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
<div className="max-w-md mx-auto py-10">
      <h1 className="text-xl font-semibold mb-4">Register Member</h1>

      <Form {...form}>
        <div id="qr-reader" className="rounded-lg p-4 "></div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="ticketId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket ID</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input disabled={!!parsedTicketId} {...field} />
                  </FormControl>
                  {!parsedTicketId && (
                    <Button
                      type="button"
                      variant={showScanner ? "destructive" : "outline"}
                      onClick={handleScanClick}
                    >
                      {showScanner ? "Cancel Scan" : "Scan QR"}
                    </Button>
                  )}
                </div>
                <FormDescription>
                  {parsedTicketId 
                    ? "Parsed from URL" 
                    : "Scan QR code or enter manually"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secret key</FormLabel>
                <FormControl>
                  <Input placeholder="Enter secret key here.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
    </div>
  )
}