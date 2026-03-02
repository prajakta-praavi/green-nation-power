import { Phone, MessageCircle } from 'lucide-react'
import {
  CONTACT_PHONE,
  WHATSAPP_CONSULTATION_MESSAGE,
  WHATSAPP_NUMBER,
} from '../../constants'
import { toTelHref, toWhatsAppHref } from '../../solar/helpers'

function MobileStickyCta() {
  const callHref = toTelHref(CONTACT_PHONE)
  const whatsappHref = toWhatsAppHref(WHATSAPP_NUMBER, WHATSAPP_CONSULTATION_MESSAGE)

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid h-[calc(4rem+env(safe-area-inset-bottom))] grid-cols-2 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={callHref}
        className="inline-flex h-full items-center justify-center gap-2 border-r border-slate-200 text-base font-semibold text-brand-navy"
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-full items-center justify-center gap-2 bg-brand-green text-base font-semibold text-white"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp Us
      </a>
    </div>
  )
}

export default MobileStickyCta
