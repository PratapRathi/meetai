"use client"
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { DataTable } from '@/components/data-table';
import { columns } from '@/modules/agents/ui/components/columns';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client'
import { EmptyState } from '@/modules/agents/ui/components/empty-state';
import DataPagination from "@/components/data-pagination";
import { useRouter } from "next/navigation";

const AgentsView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const [filters, setFilters] = useAgentsFilters();
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions({...filters}))

  return (
    <div className='flex-1 px-4 pb-4 md:px-8 flex flex-col gap-y-4'>
        <DataTable data={data.items} columns={columns} onRowClick={(row)=> router.push(`/agents/${row.id}`)}/>
        <DataPagination page={filters.page} totalPages={data.totalPages} onPageChange={(page)=> setFilters({page})}/>
        {data.items.length === 0 && (
            <EmptyState title='Create your first Agent' description='Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call.'/>
        )}
    </div>
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