import type { ActionForm } from "@/components/ActionSheet";

export type NodeKind = "action" | "trigger";
export type NodeTrigger = "price-trigger" | "time-trigger";
export type NodeAction = "backpack" | "hyperliquid" | "lighter";

export interface TriggerSheetProps {
    onCreateTrigger: (node: NodeType) => void;
}


export interface EdgeType {
    id: string;
    source: string;
    target: string;
}

export type TriggerProps = {
    data: {
        metadata: {
            time: number
            asset: string
            price: number
        }
    }
    isConnectable: boolean
}
export type ActionProps = {
    data: {
        metadata: ActionForm
    }
    isConnectable: boolean
}

export interface NodeType {
    id: string;
    type: NodeTrigger | NodeAction;
    position: { x: number; y: number };
    data: {
        label?: string;
        type: NodeKind;
        metadata?: {
            asset?: string;
            price?: number;
            time?: number;
            action?: string,
            symbol?: string,
            quantity?: number,
        };
    };
}
