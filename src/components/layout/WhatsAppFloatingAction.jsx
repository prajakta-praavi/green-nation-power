import {
  WHATSAPP_CONSULTATION_MESSAGE,
  WHATSAPP_NUMBER,
} from '../../constants'
import { toWhatsAppHref } from '../../solar/helpers'

function WhatsAppFloatingAction() {
  const href = toWhatsAppHref(WHATSAPP_NUMBER, WHATSAPP_CONSULTATION_MESSAGE)

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-[calc(9.75rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-105 md:bottom-28 md:right-8"
      aria-label="WhatsApp Green Nations Power"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" aria-hidden>
        <path d="M19.11 17.21c-.26-.13-1.52-.75-1.76-.84-.24-.09-.41-.13-.58.13s-.67.84-.82 1.01c-.15.17-.3.2-.56.07-.26-.13-1.09-.4-2.08-1.27-.77-.68-1.3-1.52-1.45-1.78-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.58-1.39-.8-1.91-.21-.5-.42-.44-.58-.45h-.5c-.17 0-.45.07-.69.32-.24.26-.91.89-.91 2.17s.93 2.52 1.06 2.69c.13.17 1.83 2.79 4.43 3.91.62.27 1.11.43 1.49.55.63.2 1.21.17 1.66.1.51-.08 1.52-.62 1.74-1.22.21-.6.21-1.11.15-1.22-.05-.1-.22-.16-.48-.29Z" />
        <path d="M16.01 3.2c-7 0-12.68 5.67-12.68 12.68 0 2.23.58 4.41 1.68 6.34L3.2 28.8l6.77-1.78a12.65 12.65 0 0 0 6.03 1.54h.01c7 0 12.68-5.67 12.68-12.68S23.01 3.2 16.01 3.2Zm0 23.15h-.01a10.4 10.4 0 0 1-5.29-1.45l-.38-.23-4.01 1.05 1.07-3.91-.25-.4a10.42 10.42 0 0 1-1.61-5.54c0-5.76 4.69-10.45 10.46-10.45 2.79 0 5.41 1.09 7.38 3.06a10.36 10.36 0 0 1 3.07 7.39c0 5.76-4.69 10.45-10.45 10.45Z" />
      </svg>
    </a>
  )
}

export default WhatsAppFloatingAction
