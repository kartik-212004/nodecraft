import { Flame } from "lucide-react"
import "../node.css"
import type { ActionProps } from "@repo/common"
import Data from "./ui/data"

export function Lighter({ data, isConnectable }: ActionProps) {
    return (
        <Data data={data} isConnectable={isConnectable} Symbol={Flame} />

    )
}
