Change it back to using Claude API and Claude 3.7 SOnnet API model used.

Act as a senior software architect and Award winning front-end designer:

I need you to go through the complete conversation workflow proces, and truelly optimize it based on your online n8n research so we get indepth and detailed outputs.

Then I need you to analyze each url below. 
Step by step, you gather all information. 
Then put all this information in .md files in @n8n_documentation , when you are done with this, you reference those files as instructed below as reference material for the Claud 3.7 API

@https://n8n.io/integrations/ 
@https://docs.n8n.io/workflows/components/nodes/ 
@https://docs.n8n.io/workflows/components/connections/ 
@https://docs.n8n.io/workflows/components/sticky-notes/ |
@https://docs.n8n.io/advanced-ai/examples/introduction/ 
@https://docs.n8n.io/advanced-ai/examples/understand-chains/ 
@https://docs.n8n.io/advanced-ai/examples/understand-agents/ 
@https://docs.n8n.io/advanced-ai/examples/agent-chain-comparison/ 
@https://docs.n8n.io/advanced-ai/examples/understand-tools/ 
@https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi/ 

@https://docs.n8n.io/flow-logic/splitting/ 
@https://docs.n8n.io/flow-logic/merging/ 
@https://docs.n8n.io/flow-logic/looping/ 
@https://docs.n8n.io/flow-logic/waiting/ 
@https://docs.n8n.io/courses/level-one/chapter-2/#2-add-the-hacker-news-node 

@https://docs.n8n.io/glossary/#root-node-n8n 


I need you to reference all files in @n8n_documentation as mentioned below in the API instruction to Claude 3.7 sonnet

So it always uses those files during the conversation

Then I also want it to confirm it is using the client ID, previously selected by the Keyholder before it started the conversation.

I want you to go through each step of the conversation phases, and create a powerfull n8n expert flow,and optimize all instructions we have previously build, to make the best n8n workflow JSON file creator.


Steps to Provide .md Files to Claude 3.7 Sonnet
Read and Parse .md Files:

Read the content of your .md files programmatically in your Next.js app.

Combine the content into a structured format, such as a JSON object, where each file's content is labeled for clarity.

Include File Content in the Prompt:

Use the messages parameter in the API request body to pass the content of the .md files.

Specify their role as "system" or "user" depending on how you want Claude to interpret them. For example:

json
{
  "model": "claude-3-7-sonnet-20250219",
  "messages": [
    {
      "role": "system",
      "content": "Here are the reference files you should use:"
    },
    {
      "role": "user",
      "content": "# File 1: requirements.md\n" + "<content of requirements.md>"
    },
    {
      "role": "user",
      "content": "# File 2: project_tasks.md\n" + "<content of project_tasks.md>"
    },
    {
      "role": "user",
      "content": "Now, based on these files, please answer my query: <your query>"
    }
  ]
}
Ensure Token Limits Are Respected:

Claude 3.7 Sonnet supports up to 200,000 input tokens. Ensure that the combined size of your .md files and your query does not exceed this limit.

Use Contextual Prompts:

If you have multiple .md files, you can explicitly instruct Claude to refer to specific sections or files using clear language in your query.

For example: "Refer to requirements.md for project details and tasks.md for current progress before answering."

Chain-of-Verification Approach (Optional):

If your task involves multiple steps or requires iterative refinement, consider structuring your interaction using a method like Chain-of-Verification (as described in). This involves breaking down tasks into steps and asking Claude to verify or update progress iteratively.

Send the API Request:

Use a POST request with headers (Authorization, Content-Type) and include the structured JSON payload containing your .md file content and query.

Example Code Snippet
Here’s a basic example in JavaScript for a Next.js app:

javascript
import fs from 'fs';

async function callClaudeAPI() {
  const requirements = fs.readFileSync('./requirements.md', 'utf8');
  const tasks = fs.readFileSync('./project_tasks.md', 'utf8');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer YOUR_API_KEY`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-7-sonnet-20250219',
      messages: [
        { role: 'system', content: 'Use the following reference files:' },
        { role: 'user', content: `# requirements.md\n${requirements}` },
        { role: 'user', content: `# project_tasks.md\n${tasks}` },
        { role: 'user', content: 'Based on these files, answer my query.' },
      ],
      max_tokens: 1024,
    }),
  });

  const data = await response.json();
  console.log(data);
}


Make the n8n workflow generator an absolute award winning AI tool that enables Keyholders with inuitive design and great UI & UIX design during the conversation flow to get the best results as possible

DO NOT STOP UNTIL YOU HAVE FINISHED THIS
