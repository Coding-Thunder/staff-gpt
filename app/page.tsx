"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Zap } from "lucide-react"
import { dummyAgents } from "@/lib/dummy-data"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6">
          <Badge className="w-fit mx-auto" variant="secondary">
            <Zap className="w-3 h-3 mr-1" />
            Launch AI Agents in Minutes
          </Badge>
          <h1 className="text-5xl sm:text-6xl font-bold text-balance text-foreground">
            Hire AI Employees,
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              not tools
            </span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto text-balance">
            Build, deploy, and manage AI agents that handle sales, support, marketing, and more. Replace routine tasks
            with intelligent automation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/register">
              <Button size="lg" className="gap-2">
                Try Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button size="lg" variant="outline">
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="features">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Popular AI Agents</h2>
          <p className="text-foreground/70">Powerful agents ready to transform your business</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {dummyAgents.slice(0, 3).map((agent) => (
            <Card key={agent.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-2xl">
                      {agent.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{agent.name}</h3>
                      <p className="text-sm text-foreground/60">{agent.role}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/70">{agent.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/60">{agent.conversationCount} conversations</span>
                  <Badge variant="secondary">{agent.status}</Badge>
                </div>

                <Button className="w-full gap-2 mt-4" onClick={() => router.push("/auth/register")}>
                  Deploy Now <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/50 py-20" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Why Choose StaffGPT?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Easy Deployment", description: "Launch AI agents in minutes, not weeks" },
              { title: "24/7 Operation", description: "Your agents work around the clock without breaks" },
              { title: "Scalable", description: "From one agent to thousands, we scale with you" },
            ].map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                    <Check className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">Pricing Plans</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Free",
              price: "$0",
              description: "Perfect for getting started",
              features: ["1 Agent", "Basic analytics", "Community support"],
            },
            {
              name: "Pro",
              price: "$49",
              description: "For growing teams",
              features: ["5 Agents", "Advanced analytics", "Priority support", "Custom branding"],
              highlighted: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              description: "For large organizations",
              features: ["Unlimited agents", "Full API access", "Dedicated support", "SLA guarantee"],
            },
          ].map((plan) => (
            <Card key={plan.name} className={plan.highlighted ? "border-primary shadow-lg" : ""}>
              <CardHeader>
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-foreground/60">{plan.description}</p>
                <p className="text-4xl font-bold text-primary mt-2">{plan.price}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground/70">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">StaffGPT</h3>
              <p className="text-sm text-foreground/60">Hire AI employees, not tools</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Security"] },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              { title: "Legal", links: ["Privacy", "Terms", "Contact"] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-foreground/60">
            <p>&copy; 2025 StaffGPT. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-foreground transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
