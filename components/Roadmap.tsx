import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"

export default function Roadmap() {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Token Launch & Platform",
      status: "completed",
      items: [
        "CFD token smart contract deployment",
        "Official website and platform launch",
        "Web3 wallet integration",
        "Initial token sale begins",
      ],
    },
    {
      phase: "Phase 2",
      title: "Casino Development",
      status: "in-progress",
      items: [
        "Casino platform development",
        "Game integration and testing",
        "Licensing and compliance",
        "Beta testing with select users",
      ],
    },
    {
      phase: "Phase 3",
      title: "Casino Launch",
      status: "upcoming",
      items: [
        "Official casino platform launch",
        "First profit distribution to holders",
        "Marketing and user acquisition",
        "Partnership announcements",
      ],
    },
    {
      phase: "Phase 4",
      title: "Expansion & Growth",
      status: "upcoming",
      items: [
        "Multi-language support",
        "Mobile app development",
        "Additional game providers",
        "Global market expansion",
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "in-progress":
        return <Clock className="h-6 w-6 text-[var(--primary-gold)]" />
      default:
        return <Circle className="h-6 w-6 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-[var(--primary-gold)] text-black">In Progress</Badge>
      default:
        return <Badge variant="outline">Upcoming</Badge>
    }
  }

  return (
    <section className="py-20 bg-[var(--dark-gray)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Development Roadmap</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our journey to revolutionize casino financing and profit distribution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roadmapItems.map((item, index) => (
            <Card key={index} className="card-gradient">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <CardTitle className="text-xl">{item.phase}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-white">{item.title}</CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex} className="flex items-center space-x-2 text-gray-300">
                      <div className="w-2 h-2 bg-[var(--primary-purple)] rounded-full"></div>
                      <span>{subItem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
