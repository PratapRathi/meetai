import UpgradeView, { UpgradeViewError, UpgradeViewLoading } from '@/modules/premium/ui/views/upgrade-view';
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const UpgradePage = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.premium.getCurrentSubscription.queryOptions());
    void queryClient.prefetchQuery(trpc.premium.getProducts.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<UpgradeViewLoading/>}>
            <ErrorBoundary fallback={<UpgradeViewError/>}>
                <UpgradeView/>
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  )
}

export default UpgradePage