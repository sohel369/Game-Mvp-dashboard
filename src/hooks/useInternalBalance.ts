import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

export function useInternalBalance() {
    const { address } = useAccount()

    return useQuery({
        queryKey: ['internalBalance', address],
        queryFn: async () => {
            if (!address) return null
            const res = await fetch(`/api/user?walletAddress=${address}`)
            if (!res.ok) throw new Error('Failed to fetch balance')
            return res.json()
        },
        enabled: !!address,
        refetchInterval: 5000
    })
}
