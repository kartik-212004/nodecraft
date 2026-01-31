import { Backpack as BackPackIcon } from "lucide-react"
import "../node.css"
import Data from "./ui/data"
import type { ActionProps } from "@repo/common"

export function Backpack({ data, isConnectable }: ActionProps) {
    return (
        <Data data={data} isConnectable={isConnectable} Symbol={BackPackIcon} />


    )
}
