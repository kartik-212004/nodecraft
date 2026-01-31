import { Button } from "@/components/ui/button"
import { useState } from "react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select"

import { Input } from "./ui/input";
import type { NodeTrigger, NodeType, TriggerSheetProps } from "@repo/common";
import { Label } from "./ui/label";

const TRIGGER_TYPES: { id: NodeTrigger; label: string; }[] = [{
    id: 'price-trigger',
    label: 'Price Trigger',
}, {
    id: 'time-trigger',
    label: 'Time Trigger',
}]

export const SUPPORTED_ASSETS = ['BTC', 'ETH', 'SOL', 'USDC', 'USDT'] as const;
const TIME_INTERVALS = ['10', '20', '30', '60', '120'];




export const TriggerSheet = ({ onCreateTrigger }: TriggerSheetProps) => {
    const [open, setOpen] = useState(true);
    const [kind, setKind] = useState<NodeTrigger | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [time, setTime] = useState<number | null>(null);
    const [asset, setAsset] = useState<string | null>(null);

    const handleCreate = () => {
        if (!kind) return;

        const metadata = kind === 'time-trigger'
            ? { time: time! }
            : { asset: asset!, price: price! };

        const newNode: NodeType = {
            id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: kind,
            position: { x: 250, y: 100 },
            data: {
                type: "trigger",
                metadata: metadata,
            }
        };

        onCreateTrigger(newNode);
        setOpen(false);
        setKind(null);
        setPrice(null);
        setTime(null);
        setAsset(null);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="p-2">
                <SheetHeader>
                    <SheetTitle>Select Trigger</SheetTitle>
                    <SheetDescription>
                        Select the type of trigger you would like to add to your workflow.
                    </SheetDescription>
                </SheetHeader>
                <Select onValueChange={(value) => setKind(value as NodeTrigger)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup >
                            {TRIGGER_TYPES.map(({ id, label }) => (
                                <SelectItem key={id} value={id}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {kind == "price-trigger" && (
                    <div className="flex flex-col gap-2">
                        <Label id="price">Price</Label>
                        <Input id="price" type="number" onChange={(e) => setPrice(Number(e.target.value))} />
                        <Label id="asset">Asset</Label>
                        <Select onValueChange={(value) => setAsset(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select asset" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_ASSETS.map((assetOption, id) => (
                                        <SelectItem key={id} value={assetOption}>
                                            {assetOption}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                )
                }
                {kind == "time-trigger" && (
                    <Select onValueChange={(value) => { setTime(Number(value)) }}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup >
                                {TIME_INTERVALS.map((interval, id) => (
                                    <SelectItem key={id} value={interval}>
                                        {interval} Minutes
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )
                }

                <SheetFooter>
                    <Button onClick={handleCreate} disabled={!kind}>Create Trigger</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet >
    )
};
