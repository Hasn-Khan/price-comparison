'use client'

import { useState, useEffect } from 'react'

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
      const response = await fetch(
        `http://localhost:8000/api/?${queryParams.toString()}`
      )
      const data = await response.json()
      setPrices(data)
    } catch (error) {
      console.error('Error fetching prices:', error)
    }
  }

  useEffect(() => {
    fetchPrices()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Cloud Price Comparison</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFilters({ ...filters, cloud_type: e.target.value })}
            >
              <option value="">Select Cloud Provider</option>
              <option value="aws">AWS</option>
              <option value="azure">Azure</option>
              <option value="gcp">GCP</option>
            </select>

            <input
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Location"
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />

            <input
              type="number"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Number of CPUs"
              onChange={(e) => setFilters({ ...filters, num_cpus: e.target.value })}
            />

            <input
              type="number"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="RAM (GB)"
              onChange={(e) => setFilters({ ...filters, ram_gb: e.target.value })}
            />
          </div>

          <button
            onClick={fetchPrices}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search Prices
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cloud Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPUs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RAM (GB)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prices.length > 0 ? (
                  prices.map((price: CloudPrice) => (
                    <tr key={price.id}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{price.cloud_type.toUpperCase()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{price.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{price.num_cpu}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{price.ram_gb}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${price.price}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="px-6 py-4 text-center">No data found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
