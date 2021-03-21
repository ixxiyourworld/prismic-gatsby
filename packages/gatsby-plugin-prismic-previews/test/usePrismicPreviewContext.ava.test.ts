import test from 'ava'
import { renderHook, act } from '@testing-library/react-hooks'
import browserEnv from 'browser-env'

import { clearAllCookies } from './__testutils__/clearAllCookies'
import { createGatsbyContext } from './__testutils__/createGatsbyContext'
import { createPluginOptions } from './__testutils__/createPluginOptions'
import { createPrismicAPIDocumentNodeInput } from './__testutils__/createPrismicAPIDocumentNodeInput'

import {
  PrismicContextActionType,
  PrismicPreviewProvider,
  usePrismicPreviewAccessToken,
  usePrismicPreviewContext,
} from '../src'
import { onClientEntry } from '../src/gatsby-browser'

test.before(() => {
  browserEnv(['window', 'document'])
})
test.beforeEach(() => {
  clearAllCookies()
})

test.serial('throws if context does not exist for repository', async (t) => {
  const { result } = renderHook(() =>
    usePrismicPreviewContext('non-existent-repo'),
  )

  t.true(result.error?.message && /could not find/i.test(result.error.message))
})

test.serial('returns context for repository', async (t) => {
  const gatsbyContext = createGatsbyContext()
  const pluginOptions = createPluginOptions()

  // @ts-expect-error - Partial gatsbyContext provided
  await onClientEntry(gatsbyContext, pluginOptions)
  const { result } = renderHook(
    () => usePrismicPreviewContext(pluginOptions.repositoryName),
    { wrapper: PrismicPreviewProvider },
  )

  const context = result.current[0]

  t.true(context.repositoryName === pluginOptions.repositoryName)
  t.deepEqual(context.pluginOptions, pluginOptions)
  t.deepEqual(context.nodes, {})
  t.deepEqual(context.typePaths, {})
  // TODO: Remove once path-to-nodes map is created (to be used with unpublished previews)
  t.deepEqual(context.rootNodeMap, {})
  t.true(context.isBootstrapped === false)
})

test.serial(
  'initial state contains access token if persisted in cookie',
  async (t) => {
    const gatsbyContext = createGatsbyContext()
    const pluginOptions = createPluginOptions()
    pluginOptions.accessToken = undefined

    const persistedAccessToken = 'persistedAccessToken'

    // @ts-expect-error - Partial gatsbyContext provided
    await onClientEntry(gatsbyContext, pluginOptions)

    const { result: accessTokenResult } = renderHook(
      () => usePrismicPreviewAccessToken(pluginOptions.repositoryName),
      { wrapper: PrismicPreviewProvider },
    )
    act(() => {
      accessTokenResult.current[1].set(persistedAccessToken, true)
    })

    const { result } = renderHook(
      () => usePrismicPreviewContext(pluginOptions.repositoryName),
      { wrapper: PrismicPreviewProvider },
    )

    t.true(result.current[0].pluginOptions.accessToken === persistedAccessToken)
  },
)

test.serial('SetAccessToken action sets the access token', async (t) => {
  const gatsbyContext = createGatsbyContext()
  const pluginOptions = createPluginOptions()

  // @ts-expect-error - Partial gatsbyContext provided
  await onClientEntry(gatsbyContext, pluginOptions)
  const { result } = renderHook(
    () => usePrismicPreviewContext(pluginOptions.repositoryName),
    { wrapper: PrismicPreviewProvider },
  )
  const dispatch = result.current[1]

  const newAccessToken = 'newAccessToken'
  act(() => {
    dispatch({
      type: PrismicContextActionType.SetAccessToken,
      payload: {
        repositoryName: pluginOptions.repositoryName,
        accessToken: newAccessToken,
      },
    })
  })

  const context = result.current[0]

  t.true(context.pluginOptions.accessToken === newAccessToken)
})

test.serial('AppendNodes action adds nodes', async (t) => {
  const gatsbyContext = createGatsbyContext()
  const pluginOptions = createPluginOptions()

  // @ts-expect-error - Partial gatsbyContext provided
  await onClientEntry(gatsbyContext, pluginOptions)
  const { result } = renderHook(
    () => usePrismicPreviewContext(pluginOptions.repositoryName),
    { wrapper: PrismicPreviewProvider },
  )
  const dispatch = result.current[1]

  const nodes = [
    createPrismicAPIDocumentNodeInput(),
    createPrismicAPIDocumentNodeInput(),
  ]

  act(() => {
    dispatch({
      type: PrismicContextActionType.AppendNodes,
      payload: { repositoryName: pluginOptions.repositoryName, nodes },
    })
  })

  const context = result.current[0]

  t.deepEqual(context.nodes, {
    [nodes[0].prismicId]: nodes[0],
    [nodes[1].prismicId]: nodes[1],
  })
})

test.serial(
  'Bootstrapped action marks repository as bootstrapped',
  async (t) => {
    const gatsbyContext = createGatsbyContext()
    const pluginOptions = createPluginOptions()

    // @ts-expect-error - Partial gatsbyContext provided
    await onClientEntry(gatsbyContext, pluginOptions)
    const { result } = renderHook(
      () => usePrismicPreviewContext(pluginOptions.repositoryName),
      { wrapper: PrismicPreviewProvider },
    )
    const dispatch = result.current[1]

    t.true(result.current[0].isBootstrapped === false)

    act(() => {
      dispatch({
        type: PrismicContextActionType.Bootstrapped,
        payload: { repositoryName: pluginOptions.repositoryName },
      })
    })

    t.true(result.current[0].isBootstrapped)
  },
)