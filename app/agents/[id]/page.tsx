"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { addMessage, setCurrentAgentId, setIsLoading, clearChat } from "@/lib/slices/chatSlice"
import { dummyAgents } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader } from "lucide-react"

export default function AgentChatPage() {
  const router = useRouter()
  const params = useParams()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.user)
  const { messages, isLoading } = useAppSelector((state) => state.chat)
  const [input, setInput] = useState("")
  const agentId = params?.id as string
  const agent = dummyAgents.find((a) => a.id === agentId)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    } else if (agentId) {
      dispatch(setCurrentAgentId(agentId))
      dispatch(clearChat())
    }
  }, [isAuthenticated, agentId, router, dispatch])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      agentId,
      role: "user" as const,
      content: input,
      timestamp: new Date().toISOString(),
    }

    dispatch(addMessage(userMessage))
    setInput("")
    dispatch(setIsLoading(true))

    // Simulate agent response
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      agentId,
      role: "assistant" as const,
      content: `Thanks for your message! I'm ${agent?.name} and I'm here to help. This is a simulated response.`,
      timestamp: new Date().toISOString(),
    }

    dispatch(addMessage(assistantMessage))
    dispatch(setIsLoading(false))
  }

  if (!isAuthenticated || !agent) return null

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{agent.name}</h1>
              <p className="text-foreground/60 text-sm">{agent.role}</p>
            </div>
            <Button variant="outline" onClick={() => router.push("/agents")}>
              Back to Agents
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-4xl mx-auto mb-4">
                  {agent.avatar}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{agent.name}</h2>
                <p className="text-foreground/60">Start a conversation with {agent.name}</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-md px-4 py-2 rounded-lg ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary rounded-lg px-4 py-2 flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm text-foreground/60">{agent.name} is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border bg-card p-6">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder={`Message ${agent.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
