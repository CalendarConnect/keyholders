// Types for n8n API responses

export interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  nodes: N8nNode[];
  connections: Record<string, any>;
}

export interface N8nNode {
  id: string;
  name: string;
  type: string;
  parameters: Record<string, any>;
  position: [number, number];
}

export interface N8nExecution {
  id: string;
  finished: boolean;
  mode: 'manual' | 'trigger';
  startedAt: string;
  stoppedAt?: string;
  status: 'success' | 'error' | 'running';
  workflowId: string;
  workflowName: string;
  data?: any;
}

export interface N8nWebhook {
  path: string;
  webhookId: string;
  method: string;
  workflowId: string;
  workflowName: string;
}

// Error types
export class N8nApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'N8nApiError';
    this.status = status;
  }
} 