"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setAgents } from "@/lib/slices/agentsSlice"
import { dummyAgents } from "@/lib/dummy-data"
import { AgentCard } from "@/components/agent-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search } from "lucide-react"

export default function AgentsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.user)
  const { list: agents } = useAppSelector((state) => state.agents)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    } else {
      dispatch(setAgents(dummyAgents))
    }
  }, [isAuthenticated, router, dispatch])

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!isAuthenticated) return null

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-background">
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">My Agents</h1>
            <Link href="/agents/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Agent
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <Input
                placeholder="Search agents..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onChat={(id) => router.push(`/agents/${id}`)}
                  onEdit={(id) => router.push(`/agents/${id}/edit`)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-foreground/60 mb-4">No agents found</p>
                <Link href="/agents/new">
                  <Button>Create Your First Agent</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
