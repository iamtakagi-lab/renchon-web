import Script from 'next/script'
import { GOOGLE_ADSENSE_ID, GOOGLE_ANALYTICS_ID } from '../consts'

export const GoogleAdsense = () => <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_ID}`} crossOrigin="anonymous"> </Script>