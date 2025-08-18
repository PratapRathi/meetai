"use client"
import React from 'react'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';

const AgentsView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions())

  return (
    <div>{JSON.stringify(data, null, 2)}</div>
  )
}

export const AgentsViewLoading = () => {
    return (
        <LoadingState title='Loading Agents' description='This may take a few seconds'/>
    )
}

export const AgentsViewError = () => {
    return (
        <ErrorState title='Error loading Agents' description='Something went wrong!'/>
    )
}

export default AgentsView