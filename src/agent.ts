import { cli, defineAgent, JobContext, voice, llm, ServerOptions, getJobContext } from '@livekit/agents';
import * as openai from '@livekit/agents-plugin-openai';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

// Load environment variables from .env
dotenv.config();

// Load and parse knowledge graph context
let knowledgeBase = '';
try {
  const filePath = path.join(process.cwd(), 'src/data/knowledge_graph.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const knowledgeGraph = JSON.parse(fileContent);
  knowledgeBase = knowledgeGraph
    .map((node: any) => {
      return `
Topic: ${node.title} (ID: ${node.id})
- Route: ${node.route}
- Description: ${node.description}
- Business Value: ${node.businessValue}
- Focus Targets/IDs on page: ${node.focusTargets?.join(', ') || 'None'}
- Suggested Actions: ${node.demoActions?.join(', ') || 'None'}
`;
    })
    .join('\n---\n');
} catch (error) {
  console.error('Error reading knowledge graph:', error);
  knowledgeBase = 'Error loading Akshay Bhat\'s knowledge graph context.';
}

const systemInstructions = `
You are the AI Solutions Twin of Akshay Bhat, serving as an Interactive Solutions Engineer. Your goal is to guide visitors through Akshay's interactive portfolio website, describing his background, technical expertise, work experience, hobbies, and projects in an engaging, professional, and conversational manner.

You have access to interactive tools that can control the user's browser in real-time. Whenever you talk about a specific project, job experience, skill, hobby, or contact form, you MUST proactively use the tools to guide the user's screen.

Here is the structured knowledge base about Akshay Bhat:
${knowledgeBase}

RULES FOR USING TOOLS:
1. When the user asks about or when you mention a specific topic/experience:
   - First, call the "navigate_to" tool if they are not already on the correct route (you can infer the route from the knowledge graph above, e.g. /, /experience, /skills, /about, /projects, /contact). Note: /experience#section contains hashtags, but you should navigate to the main route (e.g. '/', '/experience', '/about', '/projects', '/contact') first.
   - Second, use "scroll_to_section" to scroll to the relevant section ID (e.g. '#adobe-section', '#nagarro-section', '#skills-grid', '#about-hobbies', '#spotify-embed', '#awards-section', '#projects-section', '#contact-section').
   - Third, use "highlight_element" to highlight specific key metrics or highlights (e.g. '#nx-monorepo-metric', '#web-components-metric', '#performance-metric', '#angular-specialist', '#project-card-1').
2. Do not explain the tools to the user. Simply invoke them inline as you speak. The browser will update instantly, synchronizing with your voice.
3. Keep your answers relatively concise, warm, and helpful. Invite the user to ask more questions.
`;

const navigateToTool = llm.tool({
  description: "Navigate the portfolio website UI to a specific route/page.",
  parameters: z.object({
    route: z.enum(['/', '/experience', '/skills', '/about', '/projects', '/contact']).describe("The route/path to navigate to. Use '/' for the main landing page or home page."),
  }),
  execute: async ({ route }) => {
    const jobCtx = getJobContext();
    const agent = jobCtx.agent;
    if (!agent) {
      throw new Error("No agent participant found in room");
    }
    const data = new TextEncoder().encode(JSON.stringify({ action: 'navigate', route }));
    await agent.publishData(data, { reliable: true });
    return `Navigated browser to ${route}`;
  }
});

const scrollToSectionTool = llm.tool({
  description: "Scroll the user's screen to a specific section on the current page.",
  parameters: z.object({
    id: z.string().describe("The CSS selector/ID of the target section (e.g. '#adobe-section', '#nagarro-section', '#skills-grid', '#about-hobbies', '#spotify-embed', '#awards-section', '#projects-section', '#contact-section')"),
  }),
  execute: async ({ id }) => {
    const jobCtx = getJobContext();
    const agent = jobCtx.agent;
    if (!agent) {
      throw new Error("No agent participant found in room");
    }
    const data = new TextEncoder().encode(JSON.stringify({ action: 'scroll', id }));
    await agent.publishData(data, { reliable: true });
    return `Scrolled browser to section ${id}`;
  }
});

const highlightElementTool = llm.tool({
  description: "Highlight or spotlight a specific element or metric on the screen.",
  parameters: z.object({
    id: z.string().describe("The CSS selector/ID of the element to highlight (e.g. '#nx-monorepo-metric', '#web-components-metric', '#performance-metric', '#angular-specialist', '#project-card-1')"),
  }),
  execute: async ({ id }) => {
    const jobCtx = getJobContext();
    const agent = jobCtx.agent;
    if (!agent) {
      throw new Error("No agent participant found in room");
    }
    const data = new TextEncoder().encode(JSON.stringify({ action: 'highlight', id }));
    await agent.publishData(data, { reliable: true });
    return `Highlighted element ${id}`;
  }
});

export default defineAgent({
  entry: async (ctx: JobContext) => {
    console.log('Agent job entry triggered. Connecting to room...');
    await ctx.connect();
    console.log(`Connected to room: ${ctx.room.name}`);

    const participant = await ctx.waitForParticipant();
    console.log(`Participant detected: ${participant.identity}`);

    const realtimeModel = new openai.realtime.RealtimeModel({
      model: 'gpt-realtime',
      voice: 'alloy',
    });

    const session = new voice.AgentSession({
      llm: realtimeModel,
    });

    const agent = new voice.Agent({
      instructions: systemInstructions,
      tools: {
        navigate_to: navigateToTool,
        scroll_to_section: scrollToSectionTool,
        highlight_element: highlightElementTool,
      }
    });

    console.log('Starting Voice AgentSession...');
    await session.start({
      agent,
      room: ctx.room,
    });
    console.log('Agent session started and listening!');
  }
});

// Run agent runner if called directly
if (process.argv[1] === fileURLToPath(import.meta.url) || process.argv[1]?.endsWith('agent.ts') || process.argv[1]?.endsWith('agent.js')) {
  cli.runApp(new ServerOptions({
    agent: fileURLToPath(import.meta.url),
  }));
}
