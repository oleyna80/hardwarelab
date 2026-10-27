# Agent Roles — Navigation Only

The actual role briefs live in [`.agents/roles/`](../../.agents/roles/README.md). **Only** [Development Protocol](development.md) defines classification, project P/stage W, Critic/Reviewer/Verifier gates and autonomy. Roles/Skills cannot grant permissions.

- [Orchestrator](../../.agents/roles/orchestrator.md) — Owner specification support, Project Critic → Owner exact-P approval, autonomous W/Critic/REWORK, coordination and evidence.
- [Architect](../../.agents/roles/architect.md) — discovery, feasible P/W design and bounded technical alternatives.
- [Critic](../../.agents/roles/critic.md) — independent challenge to **project P before Owner** or **stage W before Coder**.
- [Coder](../../.agents/roles/coder.md) — routine bounded mission **or** significant approved P + Stage-READY W.
- [Reviewer](../../.agents/roles/reviewer.md) — independent exact-source S review.
- [Verifier](../../.agents/roles/verifier.md) — actual acceptance checks on the **same S**.

Native subagent/session execution and actual permissions belong to the selected harness. Separate mission identity is not guaranteed OS isolation; report actual limits. Short routine work does not automatically require every role. Exact outputs and next action are maintained through authorized task-local handoffs/reports.
