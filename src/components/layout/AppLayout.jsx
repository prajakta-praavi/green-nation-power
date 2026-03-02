import { Outlet } from 'react-router-dom'
import BackToTopButton from './BackToTopButton'
import Breadcrumbs from './Breadcrumbs'
import Footer from './Footer'
import MobileStickyCta from './MobileStickyCta'
import Navbar from './Navbar'
import WhatsAppFloatingAction from './WhatsAppFloatingAction'

function AppLayout({ onOpenCalculator }) {
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
