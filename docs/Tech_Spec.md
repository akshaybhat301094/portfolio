# AI Demo Agent Platform - Technical Specification

This document outlines the technical implementation plan and phase-wise task distribution for the AI Demo Agent Platform (V1 - Portfolio Website).

## Resolved Questions

> [!NOTE]
> **Browser Automation Architecture:** We have chosen **Option A (Simulated Client-Side)**. The backend LLM will generate DOM actions based on the `knowledge_graph.json` (e.g., `scrollTo('#adobe-section')`). The frontend Next.js app will receive these commands and simulate them using CSS transitions, JavaScript scrolling, and an animated cursor overlay.

## Proposed Changes & Task Distribution

The V1 implementation is broken down into four sequential phases. Each phase is independently testable before moving to the next.

### Phase 1: Foundation (Next.js & Portfolio UI)
Build the underlying portfolio application that the AI will eventually control.
- Initialize a Next.js (App Router) project with Tailwind CSS.
- Implement the foundational UI layout (Navigation, Hero section).
- Build the specific content sections using data from `knowledge_graph.json`:
  - `/experience` (Adobe & Nagarro details)
  - `/skills` (Angular & Frontend skills)
- Ensure all interactive and demo-able DOM elements have unique, descriptive `id` attributes (e.g., `id="adobe-section"`).

**Testability (Phase 1):**
- **Manual:** Navigate to all routes (`/experience`, `/skills`) and ensure the UI renders correctly.
- **Automated:** Write basic Playwright or Jest tests to verify that elements with the required `id` attributes are present in the DOM (crucial for future agent targeting).

### Phase 2: Real-time Communication (LiveKit)
Establish the voice infrastructure to enable the "Conversation First" experience.
- Set up a LiveKit project.
- Implement backend API routes in Next.js (`/api/livekit/token`) to generate secure connection tokens.
- Integrate `@livekit/components-react` into the frontend.
- Build the "Start Demo" UI component (microphone permissions, connection state, audio visualizer).

**Testability (Phase 2):**
- **Manual:** Click "Start Demo", accept mic permissions, and verify that the LiveKit room connects successfully and the audio visualizer responds to voice input.

### Phase 3: The Conversational Brain (LLM & Knowledge Graph)
Implement the intelligence layer to process voice, detect intent, and plan the demo.
- Integrate an LLM provider (e.g., OpenAI `gpt-4o`).
- Build the **Conversation Agent**: Receives user transcripts from LiveKit, maintains context, and detects intent.
- Build the **Demo Planner**: Uses the detected intent to query `knowledge_graph.json`.

**Testability (Phase 3):**
- **Automated/API Testing:** Create an API endpoint (`/api/test-intent`) where we can send text strings (e.g., "Tell me about your Adobe experience") and verify it returns the correct feature ID (`adobe_experience`) and associated demo actions.
- **Manual:** Speak into the Phase 2 mic and verify the backend correctly logs the extracted intent and planned actions.

### Phase 4: The Visual Layer (Automation & Storytelling)
Connect the planned actions to the visual presentation.
- Implement a command dispatcher on the frontend to listen for actions from the backend.
- Build the visual tools:
  - **Animated Cursor**: A custom SVG cursor that smoothly moves to target elements.
  - **Spotlight/Highlight**: CSS utilities to darken the page and elevate a specific `div`.
  - **Auto-scrolling**: Smoothly scrolling the window to specific anchors.

**Testability (Phase 4):**
- **Manual (E2E):** Ask a question over voice ("What did you do at Nagarro?"). Verify that the AI answers via voice, the screen auto-scrolls to the Nagarro section, and the spotlight effect triggers correctly.
- **Automated (Component Level):** Dispatch mock events to the frontend dispatcher and verify the cursor and scroll functions fire with the correct coordinates.

## Verification Plan

*(The verification steps have been integrated into each specific phase above to ensure continuous testability).*
