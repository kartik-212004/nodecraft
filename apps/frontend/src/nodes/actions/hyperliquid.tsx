import { Droplets } from "lucide-react"
import "../node.css"
import type { ActionProps } from "@/types/types"
import Data from "./ui/data"

export function Hyperliquid({ data, isConnectable }: ActionProps) {
    return (
        <Data data={data} isConnectable={isConnectable} Symbol={Droplets} />
    )
}
