import type { UnlighthouseRouteReport } from '../src/types'
import { describe, expect, it } from 'vitest'
import { DefaultColumns } from '../../core/src/constants'
import { generateReportPayload } from '../src/reporters'
import _lighthouseReport from './__fixtures__/lighthouseReport.mjs'

const lighthouseReport = _lighthouseReport as any as UnlighthouseRouteReport[]

describe('csv reports', () => {
  it('basic', () => {
    const actual = generateReportPayload('csv', lighthouseReport)
    expect(actual).toMatchInlineSnapshot(`
      "URL,Score,Performance,Accessibility,Best Practices,SEO
      "/",98,100,100,100,92
      "/blog",97,100,97,100,92
      "/blog/2023-february",97,100,97,100,92
      "/blog/2023-march",97,100,97,100,92
      "/blog/how-the-heck-does-vite-work",97,100,97,100,92
      "/blog/modern-package-development",95,100,97,92,92
      "/blog/vue-automatic-component-imports",97,100,97,100,92
      "/projects",97,100,97,100,92
      "/sponsors",97,100,97,100,92
      "/talks",97,100,97,100,92"
    `)
  })

  it('expanded', () => {
    const actual = generateReportPayload('csvExpanded', lighthouseReport, { columns: DefaultColumns })
    expect(actual).toMatchInlineSnapshot(`
      "URL,Score,Performance,Accessibility,Best Practices,SEO,FCP,LCP,CLS,FID,TBT,Color Contrast,Headings,Image Alts,Link Names,Errors,Inspector Issues,Images Responsive,Image Aspect Ratio,Indexable
      "/",98,100,100,100,92,140.98,279.17,0,68.82,0,1,1,1,1,1,1,1,1,1
      "/blog",97,100,97,100,92,149.49,271.21,0,51.46,0,0,1,1,1,1,1,1,1,1
      "/blog/2023-february",97,100,97,100,92,210.35,350.38,0,61.1,0,0,1,1,1,1,1,1,1,1
      "/blog/2023-march",97,100,97,100,92,392.09,486.98,0,44.92,0,0,1,1,1,1,1,1,1,1
      "/blog/how-the-heck-does-vite-work",97,100,97,100,92,205.31,332.11,0,52.51,2.51,0,1,1,1,1,1,1,1,1
      "/blog/modern-package-development",95,100,97,92,92,422.26,568.43,0,55.73,5.73,0,1,1,1,1,1,1,1,1
      "/blog/vue-automatic-component-imports",97,100,97,100,92,225.64,507.04,0,91.53,81.86,0,1,1,1,1,1,1,1,1
      "/projects",97,100,97,100,92,236.85,391.93,0,75.74,25.74,0,1,1,1,1,1,1,1,1
      "/sponsors",97,100,97,100,92,226.68,405.03,0,58.72,0,0,1,1,1,1,1,1,1,1
      "/talks",97,100,97,100,92,224.75,244.35,0,33.67,0,0,1,1,1,1,1,1,1,1"
    `)
  })
})
