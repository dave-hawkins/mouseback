"use client"

import Script from "next/script"

declare global {
  interface Window {
    mountMouseback: any
  }
}

export default function Mouseback() {
  const MOUSEBACK_WIDGET_SCRIPT =
    process.env.NEXT_PUBLIC_MOUSEBACK_WIDGET_SCRIPT
  return <Script src={MOUSEBACK_WIDGET_SCRIPT} defer></Script>
}
