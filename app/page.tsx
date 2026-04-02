'use client'

import { useEffect, useState } from 'react'
import { ModuleGrid } from '@/components/layout/ModuleGrid'

type Module = {
  id: string
  name: string
  icon: string
  description: string
}

export default function HomePage() {
  const [modules, setModules] = useState<Module[]>([])

  useEffect(() => {
    // Ambil daftar modul (bisa dari API nanti, sementara statis)
    const staticModules: Module[] = [
      { id: 'stok', name: 'Stok Management', icon: 'fa-boxes', description: 'Kelola stok barang' },
      { id: 'asset', name: 'Asset', icon: 'fa-building', description: 'Manajemen aset' },
      { id: 'commandcenter', name: 'Command Center', icon: 'fa-chart-line', description: 'Kontrol operasional' },
      { id: 'maintenance', name: 'Maintenance', icon: 'fa-tools', description: 'Perawatan' },
      { id: 'booking', name: 'Booking', icon: 'fa-calendar', description: 'Pemesanan ruang' },
      { id: 'k3', name: 'K3', icon: 'fa-shield-alt', description: 'Keselamatan kerja' },
      { id: 'janitor-indoor', name: 'Janitor Indoor', icon: 'fa-broom', description: 'Kebersihan dalam' },
      { id: 'janitor-outdoor', name: 'Janitor Outdoor', icon: 'fa-tree', description: 'Kebersihan luar' },
      { id: 'sekuriti', name: 'Sekuriti', icon: 'fa-shield-virus', description: 'Keamanan' },
      { id: 'ghost', name: 'Ghost Stealth', icon: 'fa-ghost', description: 'Mode rahasia' },
    ]
    setModules(staticModules)
  }, [])

  return <ModuleGrid modules={modules} />
}
