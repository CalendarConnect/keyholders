import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/admin/',
          '/_next/',
          '/sign-in/',
          '/sign-up/'
        ],
      },
    ],
    sitemap: 'https://keyholders.agency/sitemap.xml',
    host: 'https://keyholders.agency',
  }
}