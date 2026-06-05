---
title: The Hidden Cost of Re-Explaining Everything
description: How AI amnesia is quietly draining engineering teams, and why nobody's measuring it.
date: 2026-06-05
author: Team Almond AI
cover: /blog/hidden-cost-of-re-explaining.svg
---

I had a moment last Tuesday that I can't stop thinking about.

I was working on a system design problem. Started brainstorming the architecture in ChatGPT. Moved to Claude to write the implementation. Opened Copilot in VS Code to handle some boilerplate. Three tools. One afternoon. One project.

And every single time I switched tools, I started from scratch. Re-explained the project structure. Re-described the constraints. Re-gave the same context I had already given the previous tool twenty minutes earlier. Three tools, three blank slates, three rounds of "Here's what I'm building and here's why."

That evening I did a rough calculation. I had spent about 35 minutes that day just re-explaining things to AI tools. Not thinking. Not building. Just... repeating myself.

And I thought: there's no way I'm the only one doing this.

---

## The numbers are worse than you think

I went looking for data, expecting to find a few blog posts. What I found was an entire body of research pointing to one of the most underreported productivity drains in modern engineering.

> ### $450 Billion
> Annual cost of context switching to the US economy alone (Atlassian)

That's not a typo. Atlassian's research, extrapolated from academic studies on task-switching, estimates that context switching costs the US economy $450 billion annually in lost productivity. And that research was conducted *before* most teams added three or four AI tools to their daily workflow.

Here's where it gets more specific:

Employees spend nearly four hours per week just reorienting themselves after switching between applications. Over a year, that's roughly five full working weeks, about 9% of annual work time, lost entirely to the overhead of digital tool navigation. Not doing work. Not even thinking about work. Just figuring out where they left off.

A Forrester study found that knowledge workers spend 30% of their workday searching for information. IDC puts a dollar figure on it: an enterprise with 1,000 employees loses an estimated $5.7 million per year in productivity simply because of inefficient knowledge retrieval.

And here's the part that stopped me cold: Asana's research shows that knowledge workers spend 60% of their time on "work about work": chasing updates, attending alignment meetings, switching between tools, re-establishing context. Only 40% of their time goes to the skilled, strategic work they were actually hired to do.

**We're spending the majority of our workday preparing to do work, not actually doing it.**

---

## AI was supposed to fix this. It made it worse.

This is the part nobody wants to talk about.

We adopted AI tools expecting them to save time. And individually, they do. ChatGPT is brilliant at brainstorming. Claude is exceptional at reasoning through complex problems. Copilot is fast at generating boilerplate. Each tool, in isolation, makes you faster.

But nobody works in isolation. We work *across* tools. And every tool switch triggers a full context reset.

A recent study found something remarkable about context decay within AI tools: constraint compliance drops from 73% at turn 5 to just 33% by turn 16. That means halfway through a complex task, the AI is violating its own instructions twice as often as it was at the start. That's within a *single* tool. Now multiply that across four or five tools with zero shared context.

The Pragmatic Engineer newsletter reported that developers in 2026 spend approximately 9% of their time just reviewing and cleaning AI-generated outputs. PR review time has increased by 91%. The tools generate code faster, but the humans spend more time verifying, correcting, and re-contextualizing.

There's even a name for this phenomenon: the **AI Productivity Paradox**. Teams using AI tools report feeling busier but not necessarily more productive. The tools are faster, but the workflow around them is slower.

---

## The math nobody is doing

Let me walk through a calculation that I think every engineering leader should be doing but almost nobody is.

Take a typical engineering team of 10. Each engineer uses 3 AI tools daily. Each tool switch requires roughly 15 to 20 minutes of context re-explanation: describing the project, the architecture decisions, the constraints, the current state of the work.

Conservative estimate:

> **10 engineers × 3 tool switches × 15 minutes = 450 minutes per day**

That's 7.5 hours of engineering time, nearly a full person, spent every single day on re-explanation. Per week, that's 37.5 hours. Per month, 150 hours.

At an average US software engineer rate of ~$70/hour, that's roughly $10,500 per month or $126,000 per year spent on a team of 10 just re-explaining context to AI tools that should already know what they're working on.

And this doesn't include the cognitive cost. Research shows that each context switch costs 20 to 30 minutes of deep focus. The re-explanation is just the visible tax. The invisible tax is the focus that never comes back.

> ### $126,000 / year
> Estimated cost of AI context re-explanation for a 10-person engineering team

Scale that to a company with 100 engineers and you're looking at over a million dollars annually in productivity lost to a problem that most organizations haven't even identified, let alone measured.

---

## What the best teams are doing about it (and why it's not enough)

To be fair, some teams have recognized this problem and are actively working on it. The most common approaches I've seen emerging in 2026 fall under what people are calling "Context Engineering," a term that's gaining traction as the evolution beyond prompt engineering.

The distinction is simple: prompt engineering optimizes individual interactions. Context engineering optimizes the system. According to the 2026 State of Context Management Report, 82% of IT and data leaders agree that prompt engineering alone is no longer sufficient to power AI at scale.

Here's what forward-thinking teams are doing:

- **Architecture Decision Records (ADRs):** Teams are documenting not just what they built, but *why* they built it that way. An AI agent that knows "we chose event sourcing over CRUD for the orders domain because of audit requirements" generates code consistent with that decision rather than defaulting to the simpler pattern.
- **Context files (like CLAUDE.md):** Some teams maintain a root context file in their repository covering the technology stack, 3 to 5 critical conventions, build commands, and key architectural decisions. It's a starting point, a cheat sheet for the AI.
- **Versioned context artifacts:** The most mature teams treat context like code: versioned, reviewed in PRs, updated with every release. No feature is considered complete until its context documentation is updated alongside it.

These approaches help. They genuinely reduce the re-explanation burden. But they share a fundamental limitation: they're manual, they're static, and they're still siloed per tool.

An ADR lives in your GitHub repo. It doesn't follow you into ChatGPT. A CLAUDE.md file helps Claude but does nothing for Copilot. The context exists, but it's trapped in specific tools and specific formats. The moment you switch environments, you're back to square one.

---

## The real problem isn't tooling. It's memory.

After spending weeks reading, calculating, and talking to other engineers about this, I keep arriving at the same conclusion.

The problem isn't that we have too many AI tools. The tools are individually excellent. The problem isn't that engineers are lazy about documentation. Most teams are trying harder than ever.

The problem is simpler and more fundamental: **none of our AI tools share memory.**

Every tool treats every session as the first one. Every tool treats every user as a stranger. The brilliant context you built up in one conversation, the decisions, the constraints, the "we tried X and it didn't work because of Y," all of it disappears the moment you close the tab or open a different tool.

We've spent billions making models smarter. GPT, Claude, Gemini: they're all converging in raw capability. The gap between them is shrinking every quarter. But the gap between what they *know* and what they *should know*, about your project, your team, your decisions, is getting wider every day.

I've been reading about emerging concepts like persistent memory layers, shared context architectures, and interoperability protocols like MCP (Model Context Protocol) that are trying to address this from an infrastructure perspective. It feels like the building blocks are there. The awareness is growing. But we're still in the early days.

We've been optimizing for intelligence. Maybe it's time to optimize for memory.

---

## So where does this leave us?

I don't have a clean solution to offer here. I'm not writing this to sell anything. I'm writing it because I think this is one of the most important and most overlooked problems in how we work with AI today.

We're in a strange moment. Our tools have never been more powerful. Models can reason, generate, analyze, and create at a level that would have seemed like science fiction five years ago. And yet, the experience of using them day to day still feels... fragmented. Repetitive. Like we're doing the same setup work over and over, just to access the intelligence we already paid for.

The companies and teams that figure out how to solve this, how to make context persistent, portable, and shared, are going to have an enormous advantage. Not because their models are smarter. But because their models actually *know what's going on.*

I have a feeling the next big leap in AI won't come from a smarter model. It'll come from systems that finally, genuinely remember.

---

### Sources and further reading

- [Context Switching Costs $450B/Year](https://www.waymaker.io/blog/the-cost-of-context-switching) (Waymaker Research)
- [Knowledge Workers Lose 30% of Time Looking for Data](https://www.forrester.com/blogs/) (Forrester Study)
- [The Anatomy of Work: How Work About Work Gets in the Way](https://asana.com/resources/anatomy-of-work) (Asana)
- [The AI Productivity Paradox](https://dev.to/) (DEV Community)
- [Context Switching Statistics 2026](https://www.speakwise.ai/blog) (Speakwise)
- [Context Engineering Best Practices for AI Teams](https://www.packmind.com/blog) (Packmind)
- [State of AI Agent Memory 2026](https://mem0.ai/) (Mem0)
- [The Impact of AI on Software Engineers 2026](https://newsletter.pragmaticengineer.com/) (Pragmatic Engineer)
