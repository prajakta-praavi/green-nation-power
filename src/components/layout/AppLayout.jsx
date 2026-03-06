import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BackToTopButton from './BackToTopButton'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'
import MobileStickyCta from './MobileStickyCta'
import Navbar from './Navbar'
import WhatsAppFloatingAction from './WhatsAppFloatingAction'

function AppLayout({ onOpenCalculator }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="min-h-screen bg-white text-brand-navy">
      <Navbar onOpenCalculator={onOpenCalculator} />
      <Breadcrumbs />
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
      <WhatsAppFloatingAction />
      <MobileStickyCta />
    </div>
  )
}

export default AppLayout
