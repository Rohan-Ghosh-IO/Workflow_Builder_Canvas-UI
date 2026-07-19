from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS for frontend cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    # Build adjacency list: node_id -> list of neighbor target IDs
    adj = {node["id"]: [] for node in nodes}
    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        # Ensure target node is tracked in case it isn't listed in nodes
        if source not in adj:
            adj[source] = []
        if target not in adj:
            adj[target] = []
        adj[source].append(target)

    # 3 states: 0 = unvisited, 1 = visiting, 2 = visited
    state = {node_id: 0 for node_id in adj}

    def has_cycle(node: str) -> bool:
        state[node] = 1 # Visiting
        for neighbor in adj[node]:
            if state[neighbor] == 1:
                return True
            if state[neighbor] == 0:
                if has_cycle(neighbor):
                    return True
        state[node] = 2 # Visited
        return False

    for node_id in list(adj.keys()):
        if state[node_id] == 0:
            if has_cycle(node_id):
                return False
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    is_dag_result = is_dag(data.nodes, data.edges)
    return {
        'num_nodes': len(data.nodes),
        'num_edges': len(data.edges),
        'is_dag': is_dag_result
    }
