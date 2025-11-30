'use client'

import { GoogleAnalytics } from '@next/third-parties/google'

const GOOGLE_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || ''

export function Analytics() {
  if (!GOOGLE_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <GoogleAnalytics gaId={GOOGLE_MEASUREMENT_ID} />
      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
    </>
  )
}
