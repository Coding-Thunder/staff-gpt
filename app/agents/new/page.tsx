"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { createDraft, updateDraft } from "@/lib/slices/builderSlice"
import { setAgents } from "@/lib/slices/agentsSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"

export default function CreateAgentPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.user)
  const { draft } = useAppSelector((state) => state.builder)
  const { list: agents } = useAppSelector((state) => state.agents)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    } else if (!draft) {
      dispatch(createDraft({}))
    }
  }, [isAuthenticated, router, dispatch, draft])

  if (!isAuthenticated || !draft) return null

  const handleSave = async () => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newAgent = {
      id: draft.id,
      name: draft.name || "Untitled Agent",
      role: draft.role || "Agent",
      description: draft.description || "An AI agent",
      personality: draft.personality,
      status: "active" as const,
      lastActive: "now",
      conversationCount: 0,
      tasksCompleted: 0,
      avatar: "🤖",
    }

    dispatch(setAgents([...agents, newAgent]))
    setSaving(false)
    router.push("/agents")
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-background">
        <div className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.push("/agents")}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Create New Agent</h1>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Create Agent"}
            </Button>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-foreground">Basic Information</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Agent Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., SalesGPT"
                    value={draft.name}
                    onChange={(e) => dispatch(updateDraft({ name: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Sales Representative"
                    value={draft.role}
                    onChange={(e) => dispatch(updateDraft({ role: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What does this agent do?"
                    value={draft.description}
                    onChange={(e) => dispatch(updateDraft({ description: e.target.value }))}
                    className="min-h-24"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-foreground">Personality & Behavior</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="personality">Personality Traits</Label>
                  <Textarea
                    id="personality"
                    placeholder="e.g., Friendly, professional, results-oriented"
                    value={draft.personality}
                    onChange={(e) => dispatch(updateDraft({ personality: e.target.value }))}
                    className="min-h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="goals">Goals</Label>
                  <Textarea
                    id="goals"
                    placeholder="What are the primary goals?"
                    value={draft.goals.join("\n")}
                    onChange={(e) =>
                      dispatch(updateDraft({ goals: e.target.value.split("\n").filter((g) => g.trim()) }))
                    }
                    className="min-h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="rules">Rules & Constraints</Label>
                  <Textarea
                    id="rules"
                    placeholder="Define behavioral rules and constraints"
                    value={draft.rules.join("\n")}
                    onChange={(e) =>
                      dispatch(updateDraft({ rules: e.target.value.split("\n").filter((r) => r.trim()) }))
                    }
                    className="min-h-24"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
