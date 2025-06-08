---
# Configuration for the Jekyll template "Just the Docs"
parent: Decisions
nav_order: 100
title: Team 28 Feature Development Workflow ADR

# These are optional elements. Feel free to remove any of them.
status: accepted
date: 2025-05-24
# decision-makers: {list everyone involved in the decision}
# consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
# informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---
<!-- we need to disable MD025, because we use the different heading "ADR Template" in the homepage (see above) than it is foreseen in the template -->
<!-- markdownlint-disable-next-line MD025 -->
# Team 28 Feature Development Workflow

## Context and Problem Statement

Group 28 needed a single, documented workflow to reduce ambiguity during feature development. Previously, branching conventions, code review expectations, and release steps varied by developer, causing merge conflicts and inconsistent quality. This ADR records the agreed upon workflow so that every team member follows the same process.

<!-- This is an optional element. Feel free to remove. -->
## Decision Drivers

* Establish clear, repeatable steps from idea to release.
* Minimize merge conflicts and integration issues.
* Enforce code quality via automated CI and mandatory reviews.
* Keep sprint scope realistic (≤ 10 issues) and visible on a Kanban board.
* Provide traceability between backlog items, branches, and pull requests.

## Considered Options

* **Option 1 – Kanban-centric “Team 28 Workflow”**  
  (Backlog → Ready → In Progress → Done with feature branches, squash/rebase merge, CI gates.)
* **Option 2 – Classic GitFlow**  
  (Long-lived `develop`, release branches, hotfix branches.)
* **Option 3 – Direct-to-main with lightweight code reviews**  
  (Developers push fixes straight to `main` after peer approval.)

## Decision Outcome

Chosen option: **“Team 28 Workflow”** (Option 1), because it best balances visibility, discipline, and agility while keeping overhead low compared with full GitFlow.

<!-- This is an optional element. Feel free to remove. -->
### Consequences

* **Good, because** the whole team shares one playbook (issues, branch names, PR templates, CI gates) improving onboarding  and release predictability.  
* **Bad, because** the added ceremony (issue templates, branch naming, CI fixes) requires discipline and may slow small fixes.  
* Continuous improvement is achieved via retrospectives.

<!-- This is an optional element. Feel free to remove. -->
### Confirmation

Compliance is confirmed through:

* Code review checklist ensuring branch naming, tests, and documentation updates.  
* CI pipeline (lint → unit tests → type checks → build) must pass before merge.  

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### Option 1 – Team 28 Workflow

* **Good, because** Kanban limits WIP and keeps sprint scope.  
* **Good, because** feature branches + rebase provide a clean history.
* **Neutral, because** some overhead exists (issue templates, PR checklist).  
* **Bad, because** small hotfixes still need a branch and PR.  

### Option 2 – Classic GitFlow

* **Good, because** clearly separates development and production histories.  
* **Good, because** release branches allow stable previews without blocking new work.  
* **Neutral, because** familiar to many developers.  
* **Bad, because** multiple permanent branches increase merge complexity and CI load.  
* **Bad, because** slower pace for small feature releases.

### Option 3 – Direct-to-main

* **Good, because** minimal process, fastest path to production.  
* **Good, because** fewer branches to manage.  
* **Neutral, because** relies heavily on discipline for reviews and testing.  
* **Bad, because** higher risk of broken `main`, no staging environment, poor traceability.

<!-- This is an optional element. Feel free to remove. -->
## More Information

The full workflow (including backlog creation, branch commands, PR Slack channel, and CI/CD pipeline) is documented in the internal “Team 28 Workflow” page. 
