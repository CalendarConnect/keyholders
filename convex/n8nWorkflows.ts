"use node";

import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import OpenAI from "openai";

// Define interfaces for better type safety
interface ClientData {
  _id: Id<"clients">;
  name: string;
  email: string;
  creditBalance?: number;
  [key: string]: any;
}

// Validator for workflowState object
const workflowStateValidator = v.object({
  step: v.string(),
  selectedTrigger: v.optional(v.string()),
  selectedTriggerApp: v.optional(v.string()),
  selectedTriggerEvent: v.optional(v.string()),
  selectedAiModel: v.optional(v.string()),
  selectedTools: v.optional(v.array(v.string())),
  aiInstructions: v.optional(v.string()),
  promptOptions: v.optional(v.array(v.string())),
});

// Function to generate n8n workflow JSON using OpenAI
export const generateWorkflowJson = action({
  args: {
    workflowDescription: v.string(),
    clientId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Get user identity
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Unauthorized");
      }

      // Instead of directly calling getUserByTokenIdentifier, use the API
      const user = await ctx.runQuery(api.users.getUserByToken, { 
        tokenIdentifier: identity.subject 
      });
      
      if (!user) {
        throw new Error("User not found");
      }

      // Get the OpenAI API key
      const apiKeySetting = await ctx.runQuery(api.settings.getOpenAIApiKey);
      if (!apiKeySetting?.apiKey) {
        throw new Error("OpenAI API key not configured");
      }

      // Get client data for customization
      const client = await ctx.runQuery(api.clients.getClient, {
        id: args.clientId as Id<"clients">,
      });

      if (!client) {
        throw new Error("Client not found");
      }

      // Construct prompt for OpenAI
      const prompt = constructPrompt(
        args.workflowDescription,
        client as ClientData
      );

      // Call OpenAI API
      const workflow = await callOpenAIApi(apiKeySetting.apiKey, prompt, true);

      // Return the generated workflow JSON
      return { workflow };
    } catch (error) {
      console.error("Error generating workflow:", error);
      throw new Error(`Failed to generate workflow: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  },
});

// Construct the prompt for OpenAI
function constructPrompt(
  workflowDescription: string,
  client: ClientData
): string {
  return `
You are an expert n8n workflow developer creating JSON files for webhooks. You will create a detailed, working n8n workflow based on the user's description.

# Client Information
- Client Name: ${client.name}
- Client ID: ${client._id}
- Client Email: ${client.email}
- Credit Balance: ${client.creditBalance || 0}

# Special Requirements
The workflow MUST incorporate:
1. A webhook trigger as the starting point
2. Credit checking functionality using the Keyholders API with these endpoints:
   - GET /api/n8n/check-credits?clientId={{$json.clientId}}&automationId={{$json.automationId}}
   - POST /api/n8n/deduct-credit with body {"clientId": "{{$json.clientId}}", "automationId": "{{$json.automationId}}", "n8nExecutionId": "{{$execution.id}}"}
3. Proper error handling using IF nodes and "Respond to Webhook" nodes
4. Credit deduction after successful operation

# Best Practices
1. Start with a Webhook node to receive requests that include clientId and automationId
2. Add an HTTP Request node to check available credits
3. Add an IF node to proceed only if credits are available
4. Implement your workflow logic in the "true" path
5. Add another HTTP Request node at the end to deduct credits
6. Add error handling to the "false" path with proper response

# User's Workflow Description
${workflowDescription}

# Instruction for the JSON Workflow Creation
1. **Workflow Structure**
   - The workflow should start with a **Webhook Trigger** node that receives requests
   - It must check for sufficient credits before proceeding
   - It should include proper error handling
   - All node configurations must be complete and valid
   - Include **Sticky Note** nodes where helpful, adding documentation or context for the workflow
2. **Critical Configuration Requirements**
   - For **OpenAI** nodes, always set:
     - \`"operation": "complete"\`
     - \`"resource": "text"\`
     - \`"model": "gpt-4o"\` (fallback \`"gpt-3.5-turbo"\` for lower cost/faster tasks)
     - Appropriate \`"temperature"\` (e.g., 0.1 for precise tasks, 0.7 for creative)
   - Each **OpenAI** node that returns structured data must have \`"responseFormat": "json_object"\`
   - Ensure **all nodes** are connected properly in \`"connections"\`
   - Any code nodes must include error handling (try/catch)
3. **No Placeholders or Partial JSON**
   - Do not provide placeholders like \`"API_KEY_HERE"\` or \`[YOUR DOC ID]\`. Use a generic reference if needed.
   - Output the **entire** workflow in valid JSON format
4. **Output Format**
   - Produce only valid JSON, not commentary
   - Start with the opening brace and end with the closing brace

Now, create a complete, functional n8n workflow in JSON format incorporating credit checking and the user's requirements.`;
}

// Call OpenAI API
async function callOpenAIApi(apiKey: string, prompt: string, isJsonResponse: boolean = false): Promise<string> {
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    const options: any = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: isJsonResponse 
            ? "You are an expert n8n workflow developer. Respond only with valid JSON, no commentary or explanation." 
            : "You are an expert n8n workflow developer assistant helping users create workflows."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: isJsonResponse ? 0.1 : 0.7,
      max_tokens: isJsonResponse ? 4000 : 1000,
    };

    if (isJsonResponse) {
      options.response_format = { type: "json_object" };
    }

    const response = await openai.chat.completions.create(options);
    
    const content = response.choices[0].message.content || "";
    
    if (isJsonResponse) {
      try {
        // Verify it's valid JSON
        JSON.parse(content);
        return content;
      } catch (e) {
        console.error("Invalid JSON in OpenAI response:", e);
        
        // Try to extract just JSON if there's other text
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const extracted = jsonMatch[0].trim();
          // Verify the extracted portion is valid
          try {
            JSON.parse(extracted);
            return extracted;
          } catch (extractError) {
            console.error("Failed to extract valid JSON from response:", extractError);
          }
        }
        
        throw new Error("OpenAI generated invalid JSON");
      }
    }
    
    return content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}

// Save a generated workflow (Action version for server-side operations)
export const saveWorkflow = action({
  args: {
    title: v.string(),
    description: v.string(),
    clientId: v.id("clients"),
    workflowJson: v.string(),
  },
  handler: async (ctx, args): Promise<{ workflowId: any }> => {
    // Get user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Save the workflow using internal mutation
    const result = await ctx.runMutation(api.internal.insertN8nWorkflow, {
      title: args.title,
      description: args.description,
      clientId: args.clientId,
      createdBy: identity.tokenIdentifier,
      workflowJson: args.workflowJson,
    });

    return { workflowId: result.workflowId };
  },
});

// Get all saved workflows
export const getSavedWorkflows = action({
  handler: async (ctx): Promise<any[]> => {
    // Get user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Get all workflows using runQuery instead of direct DB access
    const workflows: any[] = await ctx.runQuery(api.internal.getAllN8nWorkflows);

    // For each workflow, get client details
    const workflowsWithDetails = await Promise.all(
      workflows.map(async (workflow: any) => {
        const client = await ctx.runQuery(api.clients.getClient, { 
          id: workflow.clientId 
        });
        
        return {
          ...workflow,
          clientName: client?.name || "Unknown Client",
        };
      })
    );

    return workflowsWithDetails;
  },
});

// Get a specific workflow by ID
export const getWorkflowById = action({
  args: { id: v.id("n8nWorkflows") },
  handler: async (ctx, args): Promise<any> => {
    // Get user identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Get the workflow using runQuery
    const workflow = await ctx.runQuery(api.internal.getN8nWorkflowById, { id: args.id });
    if (!workflow) {
      throw new Error("Workflow not found");
    }

    // Get client details
    const client = await ctx.runQuery(api.clients.getClient, { id: workflow.clientId });

    // Get creator details using runQuery
    const creator = await ctx.runQuery(api.users.getUserByToken, { 
      tokenIdentifier: workflow.createdBy 
    });

    return {
      ...workflow,
      clientName: client?.name || "Unknown Client",
      creatorName: creator?.name || "Unknown User",
    };
  },
});

// Generate a workflow through a conversational interface
export const generateConversationalWorkflow = action({
  args: {
    messages: v.array(
      v.object({
        role: v.string(),
        content: v.string(),
      })
    ),
    clientId: v.id("clients"),
    workflowTitle: v.string(),
    forceGenerate: v.optional(v.boolean()),
    trigger: v.optional(v.string()),
    triggerApp: v.optional(v.string()),
    triggerEvent: v.optional(v.string()),
    aiModel: v.optional(v.string()),
    tools: v.optional(v.array(v.string())),
    workflowState: v.optional(workflowStateValidator),
  },
  handler: async (ctx, args): Promise<{ 
    message: string; 
    workflowJson?: string;
    workflowState?: {
      step: string;
      selectedTrigger?: string;
      selectedTriggerApp?: string;
      selectedTriggerEvent?: string;
      selectedAiModel?: string;
      selectedTools?: string[];
      aiInstructions?: string;
      promptOptions?: string[];
    };
  }> => {
    try {
      // Get user identity
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Unauthorized");
      }

      // Get the OpenAI API key
      const apiKeySetting = await ctx.runQuery(api.settings.getOpenAIApiKey);
      if (!apiKeySetting?.apiKey) {
        throw new Error("OpenAI API key not configured");
      }

      // Get client data for customization
      const client = await ctx.runQuery(api.clients.getClient, {
        id: args.clientId as Id<"clients">,
      });

      if (!client) {
        throw new Error("Client not found");
      }

      // Handle the workflow building process step by step based on workflowState
      const workflowState = args.workflowState || { step: "trigger_selection" };
      
      // If forcing generation, build the full workflow
      if (args.forceGenerate === true) {
        // Construct workflow generation prompt
        const prompt = constructFullWorkflowPrompt(
          args.messages,
          client as ClientData,
          args.workflowTitle,
          workflowState
        );

        // Call OpenAI API to generate the workflow
        const workflowJson = await callOpenAIApi(apiKeySetting.apiKey, prompt, true);
        
        return {
          message: "Workflow generated successfully!",
          workflowJson
        };
      }
      
      // Handle the workflow state machine
      switch (workflowState.step) {
        case "trigger_selection":
          return handleTriggerSelection();
        
        case "trigger_app_selection":
          return handleTriggerAppSelection(args.trigger);
          
        case "trigger_event_selection":
          return handleTriggerEventSelection(args.triggerApp);
          
        case "credit_check_confirmation":
          return handleCreditCheckConfirmation();
          
        case "ai_model_selection":
          return handleAiModelSelection();
          
        case "tool_selection":
          return handleToolSelection(args.aiModel);
          
        case "ai_instructions":
          return handleAiInstructions(args.tools);
          
        case "workflow_summary":
          return handleWorkflowSummary(workflowState);
          
        default:
          // Continue the normal conversational flow
          const messageHistory = args.messages.map((msg) => ({
            role: msg.role === "ai" ? "assistant" : msg.role,
            content: msg.content,
          }));
          
          const prompt = `You are helping create an n8n workflow. Based on the conversation so far, ask the next relevant question to understand the user's workflow needs better.

Conversation history:
${messageHistory.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n')}`;

          const responseText = await callOpenAIApi(apiKeySetting.apiKey, prompt);
          
          return {
            message: responseText
          };
      }
    } catch (error) {
      console.error("Error in conversational workflow generation:", error);
      throw new Error(
        `Conversation error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
});

// Helper functions for workflow state machine
function handleTriggerSelection() {
  return {
    message: "What is the trigger for your workflow? Select from the options below:",
    workflowState: {
      step: "trigger_selection",
      promptOptions: [
        "Trigger manually",
        "On app event",
        "On a schedule",
        "On webhook call", 
        "On form submission",
        "On chat message"
      ]
    }
  };
}

function handleTriggerAppSelection(trigger?: string) {
  if (!trigger) {
    return {
      message: "Please select a trigger type first.",
      workflowState: {
        step: "trigger_selection"
      }
    };
  }
  
  return {
    message: "Select which app should trigger this workflow:",
    workflowState: {
      step: "trigger_app_selection",
      selectedTrigger: trigger,
      promptOptions: [
        "Action Network",
        "ActiveCampaign",
        "Acuity Scheduling",
        "Adalo",
        "Affinity",
        "Agile CRM",
        "Airtable",
        "AMQP Trigger",
        "APITemplate.io",
        "Asana",
        "Autopilot",
        "AWS Certificate Manager",
        "AWS Comprehend",
        "AWS DynamoDB",
        "Google Sheets",
        "Gmail",
        "Slack",
        "Discord",
        "Twitter",
        "Telegram",
        "Notion",
        "Trello"
      ]
    }
  };
}

function handleTriggerEventSelection(triggerApp?: string) {
  if (!triggerApp) {
    return {
      message: "Please select an app first.",
      workflowState: {
        step: "trigger_app_selection"
      }
    };
  }
  
  // Different options based on the selected app
  let eventOptions: string[] = ["New row added", "Row updated"];
  
  if (triggerApp === "Google Sheets") {
    eventOptions = ["On row added", "On row updated", "On row added or updated"];
  } else if (triggerApp === "Telegram") {
    eventOptions = ["On message", "On command", "On callback query"];
  } else if (triggerApp === "Notion") {
    eventOptions = ["On database item created", "On database item updated", "On page created"];
  }
  
  return {
    message: `What event from ${triggerApp} should trigger this workflow?`,
    workflowState: {
      step: "trigger_event_selection",
      selectedTriggerApp: triggerApp,
      promptOptions: eventOptions
    }
  };
}

function handleCreditCheckConfirmation() {
  return {
    message: "Great! I've set up the trigger and added the credit check flow to ensure the client has enough credits to run this workflow. Now, let's configure the AI processing for this workflow.",
    workflowState: {
      step: "ai_model_selection"
    }
  };
}

function handleAiModelSelection() {
  return {
    message: "Which AI model would you like to use with the AI Agent node?",
    workflowState: {
      step: "ai_model_selection",
      promptOptions: [
        "OpenAI GPT-4o",
        "OpenAI GPT-3.5 Turbo",
        "Anthropic Claude 3 Opus",
        "Anthropic Claude 3 Sonnet",
        "Anthropic Claude 3 Haiku",
        "Mistral Large",
        "Mistral Medium",
        "Mistral Small",
        "Llama 3",
        "Gemini Pro",
        "Gemini Flash"
      ]
    }
  };
}

function handleToolSelection(aiModel?: string) {
  if (!aiModel) {
    return {
      message: "Please select an AI model first.",
      workflowState: {
        step: "ai_model_selection"
      }
    };
  }
  
  return {
    message: `Great choice with ${aiModel}! Now, which tools would you like to add to the AI Agent?`,
    workflowState: {
      step: "tool_selection",
      selectedAiModel: aiModel,
      promptOptions: [
        "Qdrant Vector Store",
        "Simple Vector Store",
        "Supabase Vector Store",
        "Zep Vector Store",
        "Action Network Tool",
        "ActiveCampaign Tool",
        "Adalo Tool",
        "Affinity Tool",
        "Agile CRM Tool",
        "Airtable Tool",
        "Google Sheets Tool",
        "Gmail Tool",
        "HTTP Request",
        "Function",
        "Code"
      ]
    }
  };
}

function handleAiInstructions(tools?: string[]) {
  if (!tools || tools.length === 0) {
    return {
      message: "Please select at least one tool.",
      workflowState: {
        step: "tool_selection"
      }
    };
  }
  
  return {
    message: `Perfect! I've added these tools: ${tools.join(', ')} and configured Simple Memory for the AI Agent. Now, what would you like the AI Agent to do? Please provide detailed instructions for what the AI should accomplish.`,
    workflowState: {
      step: "ai_instructions",
      selectedTools: tools
    }
  };
}

function handleWorkflowSummary(state: any) {
  const summary = `
Great! I now have all the information needed to build your workflow:

Trigger: ${state.selectedTrigger || 'Not specified'}
${state.selectedTriggerApp ? `Trigger App: ${state.selectedTriggerApp}` : ''}
${state.selectedTriggerEvent ? `Trigger Event: ${state.selectedTriggerEvent}` : ''}
AI Model: ${state.selectedAiModel || 'Not specified'}
Tools: ${state.selectedTools ? state.selectedTools.join(', ') : 'None selected'}
${state.aiInstructions ? `AI Instructions: ${state.aiInstructions}` : ''}

I've also incorporated credit checking to ensure the client has sufficient credits before running the workflow, and added credit deduction after successful execution.

Would you like to build the workflow now, or make additional changes?`;

  return {
    message: summary,
    workflowState: {
      step: "workflow_summary",
      selectedTrigger: state.selectedTrigger,
      selectedTriggerApp: state.selectedTriggerApp,
      selectedTriggerEvent: state.selectedTriggerEvent,
      selectedAiModel: state.selectedAiModel,
      selectedTools: state.selectedTools,
      aiInstructions: state.aiInstructions
    }
  };
}

// Construct the prompt for generating the final workflow
function constructFullWorkflowPrompt(
  messages: { role: string; content: string }[],
  client: ClientData, 
  workflowTitle: string,
  workflowState: any
): string {
  // Extract workflow configuration from state
  const trigger = workflowState.selectedTrigger || "On webhook call";
  const triggerApp = workflowState.selectedTriggerApp || "HTTP Request";
  const triggerEvent = workflowState.selectedTriggerEvent || "Webhook";
  const aiModel = workflowState.selectedAiModel || "OpenAI GPT-4o";
  const tools = workflowState.selectedTools || [];
  const aiInstructions = workflowState.aiInstructions || "Process the incoming data and respond with insights";
  
  // Extract all user messages to understand requirements
  const userRequirements = messages
    .filter((m: { role: string; content: string }) => m.role === "user")
    .map((m: { role: string; content: string }) => m.content)
    .join("\n\n");
  
  return `
You are an expert n8n workflow developer creating JSON files for webhooks. You will create a detailed, working n8n workflow based on the configuration and instructions provided.

# Client Information
- Client Name: ${client.name}
- Client ID: ${client._id}
- Client Email: ${client.email}
- Credit Balance: ${client.creditBalance || 0}

# Workflow Title
${workflowTitle}

# Workflow Configuration
- Trigger: ${trigger}
- Trigger App: ${triggerApp}
- Trigger Event: ${triggerEvent}
- AI Model: ${aiModel}
- Tools: ${tools.join(', ')}
- AI Instructions: ${aiInstructions}

# Conversation History and Requirements
${userRequirements}

# Special Requirements
The workflow MUST incorporate:
1. ${trigger === "On webhook call" ? "A webhook trigger as the starting point" : `A ${triggerApp} trigger with ${triggerEvent} event`}
2. Credit checking functionality using the Keyholders API with these endpoints:
   - GET /api/n8n/check-credits?clientId={{$json.clientId}}&automationId={{$json.automationId}}
   - POST /api/n8n/deduct-credit with body {"clientId": "{{$json.clientId}}", "automationId": "{{$json.automationId}}", "n8nExecutionId": "{{$execution.id}}"}
3. Proper error handling using IF nodes and "Respond to Webhook" nodes
4. Credit deduction after successful operation
${aiModel ? `5. An AI Agent node using ${aiModel} with Simple Memory` : ""}
${tools.length > 0 ? `6. The following tools connected to the AI Agent: ${tools.join(', ')}` : ""}

# Workflow Processing Instructions
${aiInstructions}

# Best Practices
1. ${trigger === "On webhook call" ? "Start with a Webhook node to receive requests that include clientId and automationId" : `Start with a ${triggerApp} ${trigger} node`}
2. Add an HTTP Request node to check available credits
3. Add an IF node to proceed only if credits are available
4. Implement your workflow logic in the "true" path
5. Add another HTTP Request node at the end to deduct credits
6. Add error handling to the "false" path with proper response

# Instruction for the JSON Workflow Creation
1. **Workflow Structure**
   - The workflow should start with the specified trigger
   - It must check for sufficient credits before proceeding
   - It should include proper error handling
   - All node configurations must be complete and valid
   - Include **Sticky Note** nodes where helpful, adding documentation or context for the workflow
2. **Critical Configuration Requirements**
   - For **AI Agent** nodes:
     - Set the correct AI model based on selection
     - Use "Simple Memory" for persistence
     - Connect the appropriate tools based on selection
     - Configure temperature appropriately for the task
   - Ensure **all nodes** are connected properly in \`"connections"\`
   - Any code nodes must include error handling (try/catch)
3. **No Placeholders or Partial JSON**
   - Do not provide placeholders like \`"API_KEY_HERE"\` or \`[YOUR DOC ID]\`. Use a generic reference if needed.
   - Output the **entire** workflow in valid JSON format
4. **Output Format**
   - Produce only valid JSON, not commentary
   - Start with the opening brace and end with the closing brace

Now, create a complete, functional n8n workflow in JSON format incorporating all the requirements.`;
} 