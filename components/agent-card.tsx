"use client"

import type { Agent } from "@/lib/slices/agentsSlice"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Activity, Share2, Copy, Check } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AgentCardProps {
  agent: Agent
  onChat?: (agentId: string) => void
  onEdit?: (agentId: string) => void
  showActions?: boolean
}

export function AgentCard({ agent, onChat, onEdit, showActions = true }: AgentCardProps) {
  const [copied, setCopied] = useState(false)

  const embedCode = `<iframe src="${typeof window !== "undefined" ? window.location.origin : ""}/agents/${agent.id}/embed" width="400" height="600" frameborder="0" allow="clipboard-write"></iframe>`

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-lg">
            {agent.avatar || "🤖"}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{agent.name}</h3>
            <p className="text-sm text-foreground/60">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Share2 className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleCopyEmbed} className="flex items-center gap-2">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Embed Code
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Badge variant={agent.status === "active" ? "default" : "secondary"}>
            <Activity className="w-3 h-3 mr-1" />
            {agent.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/70">{agent.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-secondary rounded-lg p-3">
            <p className="text-foreground/60 text-xs">Conversations</p>
            <p className="text-lg font-semibold text-foreground">{agent.conversationCount}</p>
          </div>
          <div className="bg-secondary rounded-lg p-3">
            <p className="text-foreground/60 text-xs">Tasks Completed</p>
            <p className="text-lg font-semibold text-foreground">{agent.tasksCompleted}</p>
          </div>
        </div>

        <p className="text-xs text-foreground/50">Last active: {agent.lastActive}</p>

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onChat?.(agent.id)}>
              <MessageSquare className="w-4 h-4 mr-1" />
              Chat
            </Button>
            <Button size="sm" className="flex-1" onClick={() => onEdit?.(agent.id)}>
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
