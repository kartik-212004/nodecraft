import { Backpack as BackPackIcon } from "lucide-react"
import "../node.css"
import type { ActionProps } from "@/types/types"
import Data from "./ui/data"

export function Backpack({ data, isConnectable }: ActionProps) {
    return (
        <Data data={data} isConnectable={isConnectable} Symbol={BackPackIcon} />


    )
}
