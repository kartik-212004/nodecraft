import type { LucideProps } from 'lucide-react'
import React from 'react'
import { Handle, Position } from '@xyflow/react'

export default function Data({ data, isConnectable, Symbol }: {
    data: {
        metadata: {
            action: string,
            asset: string,
            symbol: string,
            quantity: number,
        }
    },
    isConnectable: boolean,
    Symbol: React.ComponentType<LucideProps>,
}) {
    return (
        <div className="flex flex-col gap-1 p-2 rounded-md justify-center items-center bg-white text-xm ">
            <Symbol />

            <div className="flex gap-1">
                <span >Action:</span>
                <span>{data.metadata.action}</span>
            </div>

            <div className="flex gap-1">
                <span >Asset:</span>
                <span>{data.metadata.asset}</span>
            </div>

            <div className="flex gap-1">
                <span >Quantity:</span>
                <span>{data.metadata.quantity}</span>
            </div>

            <div className="flex gap-1">
                <span >Symbol:</span>
                <span>{data.metadata.symbol}</span>
            </div>

            <Handle
                isConnectable={isConnectable}
                type="source"
                position={Position.Right}
            />
            <Handle
                isConnectable={isConnectable}
                type="target"
                position={Position.Left}
            />
        </div>
    )
}
