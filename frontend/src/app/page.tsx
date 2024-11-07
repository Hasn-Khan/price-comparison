'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CloudPrice {
  id: number
  cloud_type: string
  location: string
  num_cpu: number
  ram_gb: number
  price: string
}

export default function Home() {
  const [prices, setPrices] = useState<CloudPrice[]>([])
  const [filters, setFilters] = useState({
    cloud_type: '',
    location: '',
    num_cpus: '',
    ram_gb: '',
  })

  const fetchPrices = async () => {
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value)
    })

    try {
      console.log(queryParams.toString())
      const response = await fetch(
        `http://localhost:8000/api/?${queryParams.toString()}`
      )
      const data = await response.json()
      console.log("Data",data)
      setPrices(data)
    } catch (error) {
      console.error('Error fetching prices:', error)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Cloud Price Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Select
              onValueChange={(value) =>
                setFilters({ ...filters, cloud_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Cloud Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="azure">Azure</SelectItem>
                <SelectItem value="gcp">GCP</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Location"
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Number of CPUs"
              onChange={(e) =>
                setFilters({ ...filters, num_cpus: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="RAM (GB)"
              onChange={(e) => setFilters({ ...filters, ram_gb: e.target.value })}
            />
          </div>

          <Button onClick={fetchPrices}>Search Prices</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cloud Provider</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>CPUs</TableHead>
                <TableHead>RAM (GB)</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices.map((price) => (
                <TableRow key={price.id}>
                  <TableCell className="font-medium">
                    {price.cloud_type.toUpperCase()}
                  </TableCell>
                  <TableCell>{price.location}</TableCell>
                  <TableCell>{price.num_cpu}</TableCell>
                  <TableCell>{price.ram_gb}</TableCell>
                  <TableCell>${price.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
