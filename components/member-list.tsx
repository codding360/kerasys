"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Ticket, User } from "lucide-react"

// Mock data - in a real app, this would come from your database
const MOCK_MEMBERS = [
  { id: "1", name: "John Doe", phone: "+1234567890", ticketCount: 3 },
  { id: "2", name: "Jane Smith", phone: "+0987654321", ticketCount: 5 },
  { id: "3", name: "Robert Johnson", phone: "+1122334455", ticketCount: 2 },
  { id: "4", name: "Emily Davis", phone: "+5566778899", ticketCount: 1 },
]

export default function MemberList() {
  const [members, setMembers] = useState(MOCK_MEMBERS)

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Tickets</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    {member.name}
                  </div>
                </TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Ticket className="mr-2 h-4 w-4 text-muted-foreground" />
                    {member.ticketCount}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/members/${member.id}`}>
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
