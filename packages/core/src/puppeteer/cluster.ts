import type { UnlighthousePuppeteerCluster } from '../types'
import { Cluster } from 'puppeteer-cluster'
import { useUnlighthouse } from '../unlighthouse'

/**
 * Create an instance of puppeteer-cluster
 */
export async function launchPuppeteerCluster(): Promise<UnlighthousePuppeteerCluster> {
  const { resolvedConfig } = useUnlighthouse()
  // @ts-expect-error untyped
  const cluster = await Cluster.launch({
    puppeteerOptions: resolvedConfig.puppeteerOptions,
    ...resolvedConfig.puppeteerClusterOptions,
  }) as unknown as UnlighthousePuppeteerCluster
  // hacky solution to mock the display which avoids spamming the console while still monitoring system stats
  cluster.display = {
    log() {},
    resetCursor() {},
  }
  return cluster
}
