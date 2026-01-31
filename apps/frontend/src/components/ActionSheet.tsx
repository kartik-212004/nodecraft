import { z } from "zod"
import { useForm } from "react-hook-form"
import { Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import type { NodeType } from "@/types/types"
import { SUPPORTED_ASSETS } from "./TriggerSheet"

const TRADING_LIST = ["backpack", "hyperliquid", "lighter"] as const

const ActionFormSchema = z.object({
    action: z.enum(TRADING_LIST),
    asset: z.enum(["long", "short"]),
    symbol: z.string().min(1, "Symbol is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
})

export type ActionForm = z.infer<typeof ActionFormSchema>

export function ActionSheet({
    onCreateAction,
    open,
    onOpenChange,
    initialPosition,
}: {
    onCreateAction: (node: NodeType) => void,
    open: boolean,
    onOpenChange: (open: boolean) => void,
    initialPosition?: { x: number; y: number }
}) {
    const { register, handleSubmit, control } = useForm<ActionForm>({
        resolver: zodResolver(ActionFormSchema),
        defaultValues: {
            action: "backpack",
            asset: "long",
            symbol: SUPPORTED_ASSETS[0],
            quantity: 1,
        },
    })

    const onSubmit = (data: ActionForm) => {
        const position = initialPosition ?? { x: 0, y: 0 };
        onCreateAction({
            type: data.action,
            id: crypto.randomUUID(),
            position,
            data: {
                type: "action",
                metadata: {
                    action: data.action,
                    asset: data.asset,
                    symbol: data.symbol,
                    quantity: data.quantity,
                }
            }
        })
        onOpenChange(false)
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Select Workflow</SheetTitle>
                    <SheetDescription>
                        Select the type of action you want to create.
                    </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
                    <div className="grid gap-1">
                        <Label htmlFor="action">Trading Exchange</Label>
                        <Controller
                            control={control}
                            name="action"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select exchange" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {TRADING_LIST.map((item) => (
                                                <SelectItem key={item} value={item}>
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="asset">Position</Label>
                        <Controller
                            control={control}
                            name="asset"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select position" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="long">long</SelectItem>
                                            <SelectItem value="short">short</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="symbol">Asset</Label>
                        <Controller
                            control={control}
                            name="symbol"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select asset" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {SUPPORTED_ASSETS.map((asset) => (
                                                <SelectItem key={asset} value={asset}>
                                                    {asset}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="quantity">Quantity</label>
                        <Input
                            type="number"
                            id="quantity"
                            {...register("quantity", {
                                valueAsNumber: true,
                            })}
                        />
                    </div>

                    <SheetFooter className="flex justify-end gap-2">
                        <Button type="submit">Save changes</Button>
                        <SheetClose asChild>
                            <Button variant="outline" type="button">
                                Close
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
