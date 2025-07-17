import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

export default function Tokenomics() {
  const distributionData = [
    { name: "Public Sale", value: 60, color: "#4400FF" },
    { name: "Team & Advisors", value: 15, color: "#6600CC" },
    { name: "Marketing", value: 10, color: "#FFD700" },
    { name: "Development", value: 10, color: "#FFA500" },
    { name: "Reserve", value: 5, color: "#8800AA" },
  ]

  const profitData = [
    { month: "Month 1", profit: 50000, distribution: 2500 },
    { month: "Month 2", profit: 75000, distribution: 3750 },
    { month: "Month 3", profit: 100000, distribution: 5000 },
    { month: "Month 4", profit: 125000, distribution: 6250 },
    { month: "Month 5", profit: 150000, distribution: 7500 },
    { month: "Month 6", profit: 200000, distribution: 10000 },
  ]

  return (
    <section className="py-20 casino-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Tokenomics & Distribution</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transparent token distribution and profit sharing mechanism
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-2xl">Token Distribution</CardTitle>
              <CardDescription>Total Supply: 1,000,000,000 CFD</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-2xl">Projected Profit Distribution</CardTitle>
              <CardDescription>5% of monthly casino profits distributed to holders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `$${value.toLocaleString()}`,
                        name === "profit" ? "Casino Profit" : "USDT Distribution",
                      ]}
                    />
                    <Bar dataKey="profit" fill="#4400FF" />
                    <Bar dataKey="distribution" fill="#FFD700" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="card-gradient text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-[var(--primary-gold)]">1B</CardTitle>
              <CardDescription>Total CFD Supply</CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-gradient text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-[var(--primary-purple)]">5%</CardTitle>
              <CardDescription>Monthly Profit Share</CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-gradient text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-[var(--primary-gold)]">30</CardTitle>
              <CardDescription>Days Minimum Hold</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  )
}
