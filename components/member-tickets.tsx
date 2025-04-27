"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

// Mock data - in a real app, this would come from your database
const MOCK_TICKETS = [
  { id: "T001", number: "12345", status: "active", createdAt: "2023-05-15" },
  { id: "T002", number: "67890", status: "active", createdAt: "2023-05-20" },
  { id: "T003", number: "54321", status: "active", createdAt: "2023-06-01" },
]

export default function MemberTickets({ memberId }: { memberId: string }) {
  const [tickets, setTickets] = useState(MOCK_TICKETS)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Assigned Tickets</h3>
        <Link href={`/tickets/new?memberId=${memberId}`}>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Assign Ticket
          </Button>
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No tickets assigned to this member yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-primary p-4 text-primary-foreground">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold">Ticket #{ticket.number}</h4>
                    <Badge variant={ticket.status === "active" ? "default" : "secondary"}>{ticket.status}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-muted-foreground mb-2">ID: {ticket.id}</div>
                  <div className="text-sm text-muted-foreground mb-4">Created: {ticket.createdAt}</div>
                  <Link href={`/tickets/${ticket.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
