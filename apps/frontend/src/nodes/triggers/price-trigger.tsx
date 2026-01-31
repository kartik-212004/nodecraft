import { Handle, Position } from "@xyflow/react"
import { Merge } from "lucide-react"
import "../node.css"
import type { TriggerProps } from "@/types/types"

export function PriceTrigger({ data, isConnectable }: TriggerProps) {
    return (
        <div className="flex flex-col gap-2 items-center">
            <Merge />
            <span>
                {data.metadata.price}
                {" "}{data.metadata.asset}
            </span>
            <Handle
                isConnectable={isConnectable}
                type="source"
                position={Position.Right} >
            </Handle >
        </div>

    )
}
