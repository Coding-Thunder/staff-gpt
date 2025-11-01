"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setMarketplaceAgents, filterByCategory, searchAgents } from "@/lib/slices/marketplaceSlice"
import { dummyMarketplaceAgents } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Download } from "lucide-react"

const categories = ["All", "Sales", "Marketing", "Content", "Analytics", "Development", "Customer Service"]

export default function MarketplacePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.user)
  const { filteredAgents, selectedCategory } = useAppSelector((state) => state.marketplace)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    } else {
      dispatch(setMarketplaceAgents(dummyMarketplaceAgents))
    }
  }, [isAuthenticated, router, dispatch])

  const handleCategoryChange = (category: string) => {
    dispatch(filterByCategory(category === "All" ? null : category))
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      dispatch(searchAgents(query))
    } else {
      dispatch(setMarketplaceAgents(dummyMarketplaceAgents))
    }
  }

  if (!isAuthenticated) return null

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-background">
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground mb-4">Agent Marketplace</h1>

            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  placeholder="Search agents..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === (category === "All" ? null : category) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-lg">
                          {agent.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{agent.name}</h3>
                          <p className="text-xs text-foreground/60">by {agent.createdBy}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-foreground/70">{agent.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-foreground">{agent.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-foreground/60">
                        <Download className="w-4 h-4" />
                        {agent.downloads}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {agent.isPaid ? (
                          <p className="text-lg font-bold text-primary">${agent.price}</p>
                        ) : (
                          <Badge variant="secondary">Free</Badge>
                        )}
                      </div>
                      <Button size="sm">Deploy</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-foreground/60">No agents found matching your search</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
