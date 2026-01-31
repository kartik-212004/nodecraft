import { useState, useCallback } from 'react';
import {
    ReactFlow, applyNodeChanges,
    useReactFlow,
    ReactFlowProvider, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange, type Connection,
    type FinalConnectionState,
    Background,
    BackgroundVariant
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger, TimeTrigger } from '@/nodes/triggers';
import type { EdgeType, NodeType } from '@/types/types';
import { ActionSheet } from './ActionSheet';
import { Backpack, Hyperliquid, Lighter } from '@/nodes/actions';

const nodeTypes = {
    "price-trigger": PriceTrigger,
    "time-trigger": TimeTrigger,
    "backpack": Backpack,
    "hyperliquid": Hyperliquid,
    "lighter": Lighter,
};

const nodeOrigin: [number, number] = [0.5, 0];

const CreateWorkflow = () => {
    const [nodes, setNodes,] = useState<NodeType[]>([]);
    const [edges, setEdges] = useState<EdgeType[]>([]);
    const { screenToFlowPosition } = useReactFlow();

    const [actionSheetOpen, setActionSheetOpen] = useState(false);
    const [pendingConnection, setPendingConnection] = useState<null | { sourceId: string; position: { x: number; y: number } }>(null);

    const onCreateAction = (newNode: NodeType) => {
        if (pendingConnection) {
            const nodeWithPos = {
                ...newNode,
                position: pendingConnection.position,
            };
            setNodes((prev) => [...prev, nodeWithPos]);
            setEdges((eds) =>
                eds.concat({
                    id: `edge${crypto.randomUUID()}`,
                    source: pendingConnection.sourceId,
                    target: nodeWithPos.id,
                }),
            );
            setPendingConnection(null);
            setActionSheetOpen(false);
            return;
        }

        setNodes((prev) => [...prev, newNode]);
    };

    const onConnectEnd = useCallback(
        (event: MouseEvent | TouchEvent, connectionState: FinalConnectionState) => {
            if (!connectionState.isValid && connectionState.fromNode) {
                const { clientX, clientY } =
                    'changedTouches' in event ? event.changedTouches[0] : event;

                const position = screenToFlowPosition({ x: clientX, y: clientY });

                setPendingConnection({ sourceId: connectionState.fromNode!.id, position });
                setActionSheetOpen(true);
            }
        },
        [screenToFlowPosition],
    );


    const onNodesChange = useCallback(
        (changes: NodeChange<NodeType>[]) => setNodes((nodesSnapshot) => applyNodeChanges<NodeType>(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange<EdgeType>[]) => setEdges((edgesSnapshot) => applyEdgeChanges<EdgeType>(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge<EdgeType>(params, edgesSnapshot)),
        [],
    );

    const onCreateTrigger = (newNode: NodeType) => {
        setNodes((prev) => [...prev, newNode]);
    };

    return (
        <div className="workflow-canvas" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnectEnd={onConnectEnd}
                onConnect={onConnect}
                fitView
                nodeOrigin={nodeOrigin}
            >
                <Background variant={BackgroundVariant.Dots} />
            </ReactFlow>
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                <TriggerSheet onCreateTrigger={onCreateTrigger} />
                <ActionSheet
                    onCreateAction={onCreateAction}
                    open={actionSheetOpen}
                    onOpenChange={(v) => { setActionSheetOpen(v); if (!v) setPendingConnection(null); }}
                    initialPosition={pendingConnection?.position}
                />
            </div>
        </div>
    );
}


export default function Workflow() {
    return (
        <ReactFlowProvider>
            <CreateWorkflow />
        </ReactFlowProvider>
    )
}