'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { fetchPriceByApi } from '@/lib/features/tickerPrice/tickerPriceSlice'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    // storeRef.current.dispatch(fetchPriceByApi("SOL_USDC"))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
