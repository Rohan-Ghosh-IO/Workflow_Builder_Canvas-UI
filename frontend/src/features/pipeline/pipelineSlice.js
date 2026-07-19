// src/features/pipeline/pipelineSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { applyNodeChanges, applyEdgeChanges, addEdge, MarkerType } from 'reactflow';

const initialState = {
  nodes: [],
  edges: [],
  nodeIDs: {},
};

export const pipelineSlice = createSlice({
  name: 'pipeline',
  initialState,
  reducers: {
    addNode: (state, action) => {
      const { type, position } = action.payload;
      if (state.nodeIDs[type] === undefined) {
        state.nodeIDs[type] = 0;
      }
      state.nodeIDs[type] += 1;
      const id = `${type}-${state.nodeIDs[type]}`;
      state.nodes.push({
        id,
        type,
        position,
        data: { id, nodeType: type },
      });
    },
    onNodesChange: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action) => {
      state.edges = addEdge(
        {
          ...action.payload,
          type: 'customEdge',
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
        },
        state.edges
      );
    },
    updateNodeField: (state, action) => {
      const { nodeId, fieldName, fieldValue } = action.payload;
      state.nodes = state.nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      });
    },
  },
});

export const { addNode, onNodesChange, onEdgesChange, onConnect, updateNodeField } = pipelineSlice.actions;
export default pipelineSlice.reducer;
