import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to a sample ticket page since we only need the ticket/[id] route
  redirect("https://google.com")
}
