import { Handle, Position } from "@xyflow/react"
import { Clock } from "lucide-react"
import "../node.css"
import type { TriggerProps } from "@repo/common"

export function TimeTrigger({ data, isConnectable }: TriggerProps) {
    const hours = data.metadata.time / 60;
    const displayTime = hours >= 1 ? `${hours} hrs` : `${data.metadata.time} mins`;

    return (
        <div className="flex  items-center gap-2 ">
            <Clock />
            <div>
                Every {displayTime}
            </div>
            <Handle
                isConnectable={isConnectable}
                type="source"
                position={Position.Right} >
            </Handle >
        </div>
    )
}
