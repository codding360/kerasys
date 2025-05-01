"use client"

import { Ticket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { use } from "react"
import { TicketPageSkeleton } from "@/components/ticket-page-skeleton" 
import { redirect } from "next/navigation"

interface Ticket {
  id: string
  number: string
  status: string
  created_at: string
  user_id: string
}

interface User {
  id: string
  name: string
  phone: string
}

export default function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [memberTickets, setMemberTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { id } = use(params)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ticket data
        const { data: ticketData, error: ticketError } = await supabase
          .from('tickets')
          .select('*')
          .eq('number', id)
          .eq('status', "ACTIVE")
          .single()

        if (ticketError) throw ticketError
        if (!ticketData) throw new Error('Ticket not found')
        
        setTicket(ticketData)

        // Fetch user data
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', ticketData.user_id)
          .single()

        if (userError) throw userError
        if (!userData) throw new Error('User not found')
        
        setUser(userData)

        // Fetch user's tickets
        const { data: userTickets, error: ticketsError } = await supabase
          .from('tickets')
          .select('*')
          .eq('user_id', ticketData.user_id)
          .order('number', { ascending: false })

        if (ticketsError) throw ticketsError
        
        setMemberTickets(userTickets || [])
      } catch (error) {
        setError(`Билет не активен ${error}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <TicketPageSkeleton/>
  if (error) return redirect("/members/add?ticketId=" + id)
  if (!ticket || !user) return <div className="min-h-screen flex items-center justify-center">Билет не найден</div>

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-blue-50">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Member Profile */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-800">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-600">{user.phone}</p>
        </div>

        {/* Current Ticket */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3 text-gray-700 dark:text-gray-700">Текущий билет</h3>
          <div className="rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Ticket className="h-6 w-6 mr-2" />
                  <span className="text-xl font-bold font-mono">{ticket.number}</span>
                </div>
                <Badge className="bg-white/20 hover:bg-white/20 text-white border-none">{ticket.status}</Badge>
              </div>
            </div>
            <div className="p-5 bg-white dark:bg-white">
              <div>
                <p className="text-xs text-blue-500 dark:text-blue-600 font-medium">Создан</p>
                <p className="font-medium text-gray-900 dark:text-gray-800">{formatDate(ticket.created_at)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* All Tickets */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-700">Все билеты</h3>
            <span className="text-sm text-blue-500 dark:text-blue-600 font-medium">{memberTickets.length} билетов</span>
          </div>

          <div className="space-y-3">
            {memberTickets.map((memberTicket) => (
              <div
                key={memberTicket.id}
                className={`rounded-lg shadow-sm overflow-hidden ${
                  memberTicket.id === ticket.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div
                  className={`p-4 flex justify-between items-center ${
                    memberTicket.id === ticket.id
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "bg-white dark:bg-white"
                  }`}
                >
                  <div className="flex items-center">
                    <Ticket className="h-5 w-5 mr-3" />
                    <div>
                      <p
                        className={`font-medium font-mono text-sm ${
                          memberTicket.id === ticket.id ? "text-white" : "text-gray-900 dark:text-gray-800"
                        }`}
                      >
                        {memberTicket.number}
                      </p>
                      <p
                        className={`text-xs ${
                          memberTicket.id === ticket.id ? "text-white/80" : "text-blue-500 dark:text-blue-600"
                        }`}
                      >
                        {formatDate(memberTicket.created_at)}
                      </p>
                    </div>
                  </div>
                  {memberTicket.id === ticket.id && (
                    <Badge className="bg-white/20 hover:bg-white/20 text-white border-none">Текущий</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions (remain the same) */}
        <div className="space-y-6 text-sm">
          <div className="p-5 bg-white dark:bg-white border border-blue-100 dark:border-blue-100 rounded-xl shadow-sm">
            <h3 className="font-bold text-blue-600 dark:text-blue-600 mb-2">Формулировка для билета</h3>
            <p className="text-gray-700 dark:text-gray-700 leading-relaxed">
              Розыгрыш состоится в прямом эфире на официальной странице в Instagram @baymalife после набора необходимого
              количества участников. Следите за новостями на нашем Instagram и сохраняйте билет до окончания акции!
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-white border border-blue-100 dark:border-blue-100 rounded-xl shadow-sm">
            <h3 className="font-bold text-blue-600 dark:text-blue-600 mb-2">Важно соблюдать правила</h3>
            <p className="text-gray-700 dark:text-gray-700 leading-relaxed">
              Билет является персональным и не подлежит передаче третьим лицам. Дублирование или копирование билета
              запрещено. В случае выявления нарушений билет будет аннулирован.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}