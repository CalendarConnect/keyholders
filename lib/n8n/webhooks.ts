import crypto from 'crypto';

/**
 * Verify webhook signature from n8n
 * 
 * @param payload - The raw webhook payload as a string
 * @param signature - The signature from the x-n8n-signature header
 * @param secret - The webhook secret configured in n8n
 * @returns boolean indicating if the signature is valid
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!signature || !secret) {
    return false;
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const calculatedSignature = hmac.digest('hex');
  
  try {
    return crypto.timingSafeEqual(
      Buffer.from(calculatedSignature),
      Buffer.from(signature)
    );
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}

/**
 * Parse and validate webhook event data
 * 
 * @param data - The parsed JSON webhook payload
 * @returns The validated and typed event data
 */
export function parseWebhookEvent(data: any) {
  // Validate the event structure
  if (!data.type || !data.payload) {
    throw new Error('Invalid webhook event format');
  }
  
  // Validate the event type
  const validTypes = ['workflow.started', 'workflow.success', 'workflow.failed'];
  if (!validTypes.includes(data.type)) {
    throw new Error(`Unsupported event type: ${data.type}`);
  }
  
  // Validate payload fields
  const requiredFields = ['executionId', 'workflowId', 'timestamp'];
  for (const field of requiredFields) {
    if (!data.payload[field]) {
      throw new Error(`Missing required field in payload: ${field}`);
    }
  }
  
  return {
    type: data.type,
    executionId: data.payload.executionId,
    workflowId: data.payload.workflowId,
    workflowName: data.payload.workflowName,
    timestamp: data.payload.timestamp,
    data: data.payload.data,
  };
} 