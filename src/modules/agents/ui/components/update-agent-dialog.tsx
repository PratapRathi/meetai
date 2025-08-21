import React from 'react'
import ResponsiveDialog from "@/components/responsive-dialog"
import { AgentGetOne } from '@/modules/agents/types';
import AgentForm from './agent-form';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne;
}

const UpdateAgentDialog = ({open, onOpenChange, initialValues}: Props) => {
  return (
    <ResponsiveDialog title='Edit Agent' description='Edit the Agent details' open={open} onOpenChange={onOpenChange}>
        <AgentForm onSuccess={()=> onOpenChange(false)} onCancel={()=> onOpenChange(false)} initialValues={initialValues}/>
    </ResponsiveDialog>
  )
}

export default UpdateAgentDialog