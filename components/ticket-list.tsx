"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data - in a real app, this would come from your database
const MOCK_TICKETS = [
  { id: "T001", number: "12345", memberName: "John Doe", memberId: "1", status: "active", createdAt: "2023-05-15" },
  { id: "T002", number: "67890", memberName: "Jane Smith", memberId: "2", status: "active", createdAt: "2023-05-20" },
  { id: "T003", number: "54321", memberName: "John Doe", memberId: "1", status: "active", createdAt: "2023-06-01" },
  {
    id: "T004",
    number: "13579",
    memberName: "Robert Johnson",
    memberId: "3",
    status: "active",
    createdAt: "2023-06-05",
  },
  { id: "T005", number: "24680", memberName: "Jane Smith", memberId: "2", status: "active", createdAt: "2023-06-10" },
]

export default function TicketList() {
  const [tickets, setTickets] = useState(MOCK_TICKETS)

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket #</TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.number}</TableCell>
                <TableCell>
                  <Link href={`/members/${ticket.memberId}`} className="hover:underline">
                    {ticket.memberName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant={ticket.status === "active" ? "default" : "secondary"}>{ticket.status}</Badge>
                </TableCell>
                <TableCell>{ticket.createdAt}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/tickets/${ticket.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
