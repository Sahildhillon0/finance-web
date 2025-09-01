"use client"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"
import { CarForm } from "@/components/car-form"
import { useEffect, useState } from "react"
import { LogoutButton } from "@/components/admin/logout-button"

// Skeleton loader for table rows
function TableSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse space-y-3 rounded-lg bg-slate-800/50 p-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-16 rounded-lg bg-slate-700/50"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-slate-700/50"></div>
              <div className="h-3 w-1/2 rounded bg-slate-800/50"></div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 rounded bg-slate-800/50"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    available: 'bg-green-500/20 text-green-400',
    sold: 'bg-red-500/20 text-red-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    default: 'bg-slate-700/50 text-slate-300'
  }
  
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || statusStyles.default}`}>
      <span className={`mr-1.5 h-2 w-2 rounded-full ${status === 'available' ? 'bg-green-400' : status === 'sold' ? 'bg-red-400' : 'bg-yellow-400'}`}></span>
      {status?.charAt(0).toUpperCase() + status?.slice(1) || 'N/A'}
    </span>
  )
}

// Action button component
function ActionButton({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center rounded-lg p-2 transition-all duration-200 ${color} hover:opacity-90`}
    >
      <span className="mr-1.5">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

async function getStats() {
  const res = await fetch("/api/stats", { cache: "no-store" })
  if (!res.ok) return { total: 0, available: 0, soldThisMonth: 0, recently: 0 }
  return res.json()
}

async function getCars() {
  const res = await fetch("/api/cars?limit=100", { cache: "no-store" })
  if (!res.ok) return { items: [] }
  return res.json()
}

export default function AdminPageClient() {
  const [stats, setStats] = useState({ total: 0, available: 0, soldThisMonth: 0, recently: 0 })
  const [cars, setCars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  // Function to fetch cars data
  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/cars?limit=100", { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setCars(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsResp] = await Promise.all([
          getStats(),
          fetchCars() // Use the new fetchCars function
        ]);
        setStats(statsResp);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [])

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-200">
      <SiteHeader className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50" />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Admin <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-sm text-slate-400">
                Welcome back! Here's what's happening with your inventory today.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { 
              label: "Total Vehicles", 
              value: stats.total,
              icon: (
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              ),
              change: '',
              trend: 'up'
            },
            { 
              label: "Available", 
              value: stats.available,
              icon: (
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              change: '',
              trend: 'up'
            },
            { 
              label: "Sold This Month", 
              value: stats.soldThisMonth,
              icon: (
                <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              change: '',
              trend: 'up'
            },
            { 
              label: "Recently Added", 
              value: stats.recently,
              icon: (
                <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              change: '',
              trend: 'up'
            },
          ].map((stat) => (
            <div 
              key={stat.label} 
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20"
            >
              <div className="absolute right-4 top-4 opacity-10">
                {stat.icon}
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-lg bg-slate-700/50 p-2">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <span className="ml-2 flex items-center text-xs font-medium text-green-400">
                      <svg className={`h-3 w-3 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.trend === 'up' ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs and Actions */}
        <div className="mb-6 flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div className="flex space-x-1 rounded-lg bg-slate-800/50 p-1">
            <a 
              href="#inventory" 
              className="flex items-center rounded-md px-4 py-2 text-sm font-medium text-blue-400 transition-all duration-200 hover:bg-slate-700/50"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Car Inventory
            </a>
            <a 
              href="#add" 
              className="flex items-center rounded-md px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-700/50"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Car
            </a>
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search cars..."
                className="block w-full rounded-lg border border-slate-700 bg-slate-800/50 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="sold">Sold</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Inventory Section */}
        <section id="inventory" className="mb-10">
          <div className="overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
            {isLoading ? (
              <div className="p-6">
                <TableSkeleton />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/30">
                    <tr className="text-left text-sm font-medium text-slate-400">
                      <th className="px-6 py-4">Car Details</th>
                      <th className="px-4 py-4">Price</th>
                      <th className="px-4 py-4">Status</th>
                      <th className="px-4 py-4">Type</th>
                      <th className="px-4 py-4">Added</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {cars.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                          <div className="mx-auto max-w-md">
                            <svg className="mx-auto h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a2 2 0 01-2.828 0l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-white">No cars found</h3>
                            <p className="mt-1 text-sm text-slate-500">Get started by adding a new car to your inventory.</p>
                            <div className="mt-6">
                              <a
                                href="#add"
                                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Car
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      cars.map((c: any) => (
                        <tr key={String(c._id)} className="transition-colors hover:bg-slate-800/30">
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                                <img
                                  className="h-full w-full object-cover"
                                  src={c.imageUrl || "/placeholder.svg?height=48&width=64&query=car"}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-white">{c.name || 'Unnamed Vehicle'}</div>
                                <div className="mt-1 text-sm text-slate-400 line-clamp-1">{c.description || 'No description'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="text-base font-semibold text-blue-400">₹{c.price?.toLocaleString("en-IN") || 'N/A'}</div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <StatusBadge status={c.status?.toLowerCase()} />
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex items-center rounded-full bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300">
                              {c.type === "new" ? "New" : "Used"}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                            {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            }) : 'N/A'}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <ActionButton
                                icon={
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                }
                                label="View"
                                color="text-blue-400 hover:bg-blue-900/30"
                                onClick={() => window.open(`/cars/${c._id}`, '_blank')}
                              />
                              <ActionButton
                                icon={
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                }
                                label="Edit"
                                color="text-amber-400 hover:bg-amber-900/30"
                                onClick={() => window.location.href = `/admin/edit/${c._id}`}
                              />
                              <ActionButton
                                icon={
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                }
                                label="Delete"
                                color="text-rose-400 hover:bg-rose-900/30"
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this car?')) {
                                    fetch(`/api/cars/${c._id}`, { 
                                      method: 'DELETE' 
                                    }).then(() => window.location.reload())
                                  }
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Add New Car Section */}
        <section id="add" className="mb-16 mt-12 rounded-2xl border border-slate-800/50 bg-slate-900/50 p-6 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Add New Vehicle</h2>
              <p className="mt-1 text-sm text-slate-400">Fill in the details below to add a new car to your inventory</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                View Inventory
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800/50 bg-slate-900/30 p-6">
            <CarForm onSuccess={fetchCars} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
