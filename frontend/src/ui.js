// ui.js  — Canvas + React Flow

import { useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNode,
  onNodesChange,
  onEdgesChange,
  onConnect
} from './features/pipeline/pipelineSlice';
import { InputNode }    from './nodes/inputNode';
import { LLMNode }      from './nodes/llmNode';
import { OutputNode }   from './nodes/outputNode';
import { TextNode }     from './nodes/textNode';
import { NoteNode }     from './nodes/noteNode';
import { FilterNode }   from './nodes/filterNode';
import { AuthNode }     from './nodes/authNode';
import { DatabaseNode } from './nodes/databaseNode';
import { DelayNode }    from './nodes/delayNode';

import { CustomEdge } from './CustomEdge';
import 'reactflow/dist/style.css';

const GRID = 20;

const edgeTypes = {
  customEdge: CustomEdge,
};
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput:    InputNode,
  llm:            LLMNode,
  customOutput:   OutputNode,
  text:           TextNode,
  customNote:     NoteNode,
  customFilter:   FilterNode,
  customAuth:     AuthNode,
  customDatabase: DatabaseNode,
  customDelay:    DelayNode,
};

const NODE_COLORS = {
  customInput:    '#3b82f6',
  llm:            '#8b5cf6',
  customOutput:   '#10b981',
  text:           '#f97316',
  customNote:     '#eab308',
  customFilter:   '#ec4899',
  customAuth:     '#22c55e',
  customDatabase: '#06b6d4',
  customDelay:    '#f59e0b',
};

// Inner component that has access to useReactFlow hook (needs ReactFlowProvider)
const CanvasInner = () => {
  const reactFlowWrapper = useRef(null);
  const { project, getZoom, setCenter } = useReactFlow();
  const dispatch = useDispatch();

  const nodes = useSelector((state) => state.pipeline.nodes);
  const edges = useSelector((state) => state.pipeline.edges);

  const handleNodesChange = useCallback((changes) => {
    dispatch(onNodesChange(changes));
  }, [dispatch]);

  const handleEdgesChange = useCallback((changes) => {
    dispatch(onEdgesChange(changes));
  }, [dispatch]);

  const handleConnect = useCallback((connection) => {
    dispatch(onConnect(connection));
  }, [dispatch]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw = event?.dataTransfer?.getData('application/reactflow');
      if (!raw) return;
      const { nodeType: type } = JSON.parse(raw);
      if (!type) return;
      const position = project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
      dispatch(addNode({ type, position }));
    },
    [project, dispatch]
  );

  const handleMiniMapClick = useCallback(
    (event, position) => {
      setCenter(position.x, position.y, {
        zoom: getZoom(),
        duration: 600, // smooth panning animation
      });
    },
    [getZoom, setCenter]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      className="flex-1 w-full rf-canvas"
      role="main"
      aria-label="Pipeline canvas"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[GRID, GRID]}
        snapToGrid
        connectionLineType="smoothstep"
        isValidConnection={(connection) => connection.source !== connection.target}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: 'customEdge',
          animated: true,
        }}
        fitView
        fitViewOptions={{ padding: 0.35, maxZoom: 1 }}
        minZoom={0.2}
        maxZoom={2}
        deleteKeyCode="Delete"
        selectionKeyCode="Shift"
        multiSelectionKeyCode="Ctrl"
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#8aa4c0"
          gap={GRID}
          size={1.5}
        />
        <Controls
          showZoom
          showFitView
          showInteractive
          aria-label="Canvas controls"
        />
        <MiniMap
          nodeColor={(n) => NODE_COLORS[n.type] ?? '#94a3b8'}
          maskColor="rgba(241,245,249,0.80)"
          style={{ background: 'white' }}
          pannable
          zoomable
          onClick={handleMiniMapClick}
          ariaLabel="Canvas minimap"
        />
      </ReactFlow>
    </div>
  );
};

// Wrap with provider so useReactFlow works
export const PipelineUI = () => (
  <ReactFlowProvider>
    <CanvasInner />
  </ReactFlowProvider>
);
