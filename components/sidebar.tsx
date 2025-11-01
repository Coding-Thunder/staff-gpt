"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut, Settings } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { logout } from "@/lib/slices/userSlice"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Agents", href: "/agents" },
  { label: "Marketplace", href: "/marketplace" },
]

export function Sidebar() {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { email, name } = useAppSelector((state) => state.user)

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">StaffGPT</h1>
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "px-4 py-3 rounded-lg transition cursor-pointer",
                pathname === item.href ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-secondary",
              )}
            >
              {item.label}
            </div>
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-4 space-y-4">
        <div className="px-4 py-2 bg-secondary rounded-lg">
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-foreground/60">{email}</p>
        </div>

        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </Link>

        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={() => {
            dispatch(logout())
            window.location.href = "/"
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
