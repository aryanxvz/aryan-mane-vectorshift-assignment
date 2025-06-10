from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
from collections import defaultdict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    if not edges:
        return True
        
    graph = defaultdict(list)
    in_degree = {}
    node_ids = [node['id'] for node in nodes]
    
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source == target:
            return False
        graph[source].append(target)
        in_degree[target] += 1
    
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    count = 0
    
    while queue:
        u = queue.pop(0)
        count += 1
        
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    return count == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    dag = is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag
    }