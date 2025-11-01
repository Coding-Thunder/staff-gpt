"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setAgents } from "@/lib/slices/agentsSlice"
import { dummyAgents } from "@/lib/dummy-data"
import { AgentCard } from "@/components/agent-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { Plus, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const chartData = [
  { name: "Mon", conversations: 120, tasks: 240 },
  { name: "Tue", conversations: 150, tasks: 320 },
  { name: "Wed", conversations: 200, tasks: 280 },
  { name: "Thu", conversations: 170, tasks: 350 },
  { name: "Fri", conversations: 240, tasks: 420 },
  { name: "Sat", conversations: 280, tasks: 380 },
  { name: "Sun", conversations: 210, tasks: 290 },
]

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.user)
  const { list: agents } = useAppSelector((state) => state.agents)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    } else {
      dispatch(setAgents(dummyAgents))
    }
  }, [isAuthenticated, router, dispatch])

  if (!isAuthenticated) return null

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-background">
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <Link href="/agents/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Agent
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "Active Agents", value: agents.filter((a) => a.status === "active").length },
              { label: "Total Conversations", value: agents.reduce((sum, a) => sum + a.conversationCount, 0) },
              { label: "Tasks Completed", value: agents.reduce((sum, a) => sum + a.tasksCompleted, 0) },
              { label: "Uptime", value: "99.9%" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/60">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-primary/20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-foreground">Weekly Conversations</h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-foreground-50)" />
                    <YAxis stroke="var(--color-foreground-50)" />
                    <Tooltip />
                    <Bar dataKey="conversations" fill="var(--color-primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-foreground">Weekly Tasks Completed</h3>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-foreground-50)" />
                    <YAxis stroke="var(--color-foreground-50)" />
                    <Tooltip />
                    <Line type="monotone" dataKey="tasks" stroke="var(--color-primary)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Agents Grid */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Agents</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onChat={(id) => router.push(`/agents/${id}`)}
                  onEdit={(id) => router.push(`/agents/${id}/edit`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
