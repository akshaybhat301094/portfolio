# AI Demo Agent Platform PRD

## Vision

Enable any company to upload product knowledge and instantly create an AI-powered demo agent that can:

- Talk with prospects using voice
- Understand user intent
- Navigate the product automatically
- Show relevant features
- Zoom, highlight, and explain UI elements
- Adapt the demo based on questions
- Drive users toward booking a meeting

---

## Problem Statement

Traditional product demos have several limitations:

- Require a sales engineer
- Follow predefined scripts
- Cannot scale to thousands of prospects
- Cannot adapt to each user's interests
- Require scheduling meetings

The platform should act like a 24/7 AI solutions engineer.

---

## Product Principles

### Conversation First
Voice should drive navigation.

### Knowledge Driven
Agent decisions come from the knowledge graph, not random browser exploration.

### Visual Storytelling
The browser is a presentation layer.

### Honest AI
When confidence is low:
> I don't currently have a demo for that topic.

---

## Target Users

### Phase 1
- Portfolio websites
- Indie hackers
- Consultants

### Phase 2
- SaaS companies
- CRM products
- Marketing platforms
- Analytics tools
- AI applications

---

## Core User Journey

1. User visits website
2. User clicks **Start Demo**
3. Voice conversation starts
4. User asks a question
5. Agent understands intent
6. Agent navigates browser
7. Agent zooms and highlights relevant content
8. Agent explains feature
9. User interrupts at any time
10. Agent pivots demo
11. Agent drives toward booking a meeting

---

## Architecture

```text
LiveKit Voice
      │
      ▼
Conversation Agent
      │
      ▼
Knowledge Graph
      │
      ▼
Demo Planner
      │
      ▼
Browser Use Agent
      │
      ▼
Playwright Browser
      │
      ▼
Visual Layer
```

---

## Agent Responsibilities

### Conversation Agent

Responsible for:

- Intent detection
- Question answering
- Context management
- Interruption handling

### Demo Planner

Responsible for:

- Creating demo journeys
- Combining multiple features
- Dynamic storytelling
- Generating browser actions

### Browser Executor

Responsible for:

- Navigation
- Scrolling
- Clicking
- Highlighting
- Zooming

### Browser Use

Used for:

- Unknown page exploration
- Selector recovery
- DOM understanding
- Runtime validation

Not responsible for:

- Business reasoning
- Storytelling
- Choosing demo flows

---

## Functional Requirements

### Voice Agent

Users can:

- Start a conversation
- Stop a conversation
- Interrupt anytime

System must:

- Support real-time voice
- Handle interruptions immediately
- Maintain conversation context

---

### Knowledge Graph

Each feature contains:

```json
{
  "id": "ai_projects",
  "title": "AI Projects",
  "description": "...",
  "businessValue": "...",
  "route": "/projects",
  "relatedFeatures": [],
  "focusTargets": [],
  "demoActions": []
}
```

---

### Dynamic Demo Planning

The planner should:

- Build demos dynamically
- Combine related features
- Personalize demos

Example:

AI Projects
+
Adobe Experience
+
Frontend Engineering

Becomes:

Career Journey Demo

---

### Visual Layer

Support:

#### Cursor

- Human-like movement
- Hover states
- Click animations

#### Zoom

- Focus user attention
- Center on relevant UI

#### Spotlight

- Darken surrounding UI
- Highlight target section

#### Callouts

Examples:

- Portfolio Optimizer
- Adobe Experience
- AI Projects

---

## Confidence Model

### High Confidence

Known feature and route.

Action:
Execute immediately.

### Medium Confidence

Known concept but unclear location.

Action:
Use Browser Use for exploration.

### Low Confidence

Unknown topic.

Action:
Respond with:
"I don't currently have a demo for that."

---

## V1 Scope

Portfolio website only.

Includes:

- LiveKit voice
- Knowledge graph
- Browser Use integration
- Playwright automation
- Dynamic demo planning
- Cursor movement
- Zooming
- Highlighting
- Interruptions

Excludes:

- Multi-tenancy
- Auto-ingestion
- Auto-generated knowledge graphs

---

## V2 Scope

Company uploads:

- Documentation
- URLs
- Screenshots
- Product knowledge

System generates:

- Knowledge graph
- Navigation graph
- Demo graph

Automatically.

---

## Suggested Tech Stack

### Frontend

- Next.js
- Tailwind CSS
- LiveKit React

### Backend

- Node.js
- Fastify

### AI

- GPT-5.5
- Browser Use

### Browser

- Playwright

### Storage

- PostgreSQL
- pgvector

### Future

- Neo4j knowledge graph
- Multi-tenant architecture

---

## Success Metrics

### User Experience

- Voice response latency < 1 second
- Intent detection < 2 seconds
- Demo start < 5 seconds

### Reliability

- Demo success rate > 95%
- Interruption handling works consistently

### Business

- Increased engagement
- Meeting bookings
- Demo completion rate

---

## Long-Term Vision

A company uploads documentation and product assets.

The platform automatically generates:

- An AI sales engineer
- An interactive demo agent
- A browser-based visual guide
- A conversational product expert

Available 24/7 for every visitor.
