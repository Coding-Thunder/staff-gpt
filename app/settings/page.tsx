"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setTheme } from "@/lib/slices/userSlice"
import { setApiKey } from "@/lib/slices/userSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Copy, Check, Moon, Sun, Monitor } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, plan, theme, apiKey, email } = useAppSelector((state) => state.user)
  const [copied, setCopied] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  const handleCopyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleGenerateApiKey = () => {
    const newKey = `sk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    dispatch(setApiKey(newKey))
  }

  if (!isAuthenticated) return null

  const getThemeDisplay = (currentTheme: string) => {
    switch (currentTheme) {
      case "light":
        return { icon: <Sun className="w-5 h-5 text-yellow-400" />, label: "Light" }
      case "dark":
        return { icon: <Moon className="w-5 h-5 text-blue-400" />, label: "Dark" }
      case "system":
        return { icon: <Monitor className="w-5 h-5 text-gray-500" />, label: "System" }
      default:
        return { icon: <Monitor className="w-5 h-5 text-gray-500" />, label: "System" }
    }
  }

  const currentThemeDisplay = getThemeDisplay(theme)

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-background">
        <div className="border-b border-border bg-card">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-foreground">Account Settings</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email || ""} disabled className="bg-secondary" />
              </div>

              <div>
                <Label htmlFor="plan">Plan</Label>
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium text-foreground capitalize">{plan} Plan</p>
                    <p className="text-sm text-foreground/60">
                      {plan === "free"
                        ? "1 agent available"
                        : plan === "pro"
                          ? "5 agents available"
                          : "Unlimited agents"}
                    </p>
                  </div>
                  <Button>Upgrade</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Key Management */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-foreground">API Key</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground/60">
                Your API key allows you to interact with StaffGPT programmatically. Keep it secret!
              </p>

              {apiKey ? (
                <div className="flex gap-2">
                  <Input
                    id="apikey"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    disabled
                    className="bg-secondary"
                  />
                  <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                    {showApiKey ? "🔒" : "👁️"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleCopyApiKey}>
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              ) : (
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-foreground/60 mb-3">No API key generated yet</p>
                  <Button onClick={handleGenerateApiKey}>Generate API Key</Button>
                </div>
              )}

              <Button variant="outline" onClick={handleGenerateApiKey} className="w-full bg-transparent">
                Regenerate Key
              </Button>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-foreground/60 mb-4">Choose your preferred theme</p>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-2 h-auto py-4"
                    onClick={() => dispatch(setTheme("light"))}
                  >
                    <Sun className="w-6 h-6 text-yellow-400" />
                    <span className="text-sm font-medium">Light</span>
                  </Button>

                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-2 h-auto py-4"
                    onClick={() => dispatch(setTheme("dark"))}
                  >
                    <Moon className="w-6 h-6 text-blue-400" />
                    <span className="text-sm font-medium">Dark</span>
                  </Button>

                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="flex flex-col items-center justify-center gap-2 h-auto py-4"
                    onClick={() => dispatch(setTheme("system"))}
                  >
                    <Monitor className="w-6 h-6 text-gray-500" />
                    <span className="text-sm font-medium">System</span>
                  </Button>
                </div>
                <p className="text-xs text-foreground/50 mt-4">
                  Current: <span className="font-medium capitalize">{currentThemeDisplay.label} Mode</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
