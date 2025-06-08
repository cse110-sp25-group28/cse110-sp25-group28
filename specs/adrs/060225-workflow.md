# Team 28 Workflow

This document outlines the steps for developing new features for Group 28

## 1. Backlog & Issue Creation
1. **Identify Feature/Task**  
   Add user stories or tasks to the product backlog (no more than 10 tasks per spring)
2. **Create Issue**  
   - **Title**: Brief summary
   - **Description**: Detailed acceptance criteria, user impact, UI mocks (if any)  
   - **Labels**: `feature`, `bug`, `documentation`, etc.  
   - **Assignees**: Assign the developer(s)
    Issues created during sprint meeting with small dev groups
## 2. Kanban Board
1. **Move Issue to “Ready”**  
   When features confirmed, move from **Backlog** → **Ready**.
2. **During Sprint Planning**  
   Pull issues from **Ready** → **In Progress**.

## 3. Branching Strategy
1. **Checkout Feature Branch**  
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/<ISSUE-123>-short-desc
   ```
### Naming Conventions For Branches
- `feature/123-add-login`
- `bugfix/456-fix-crash`

## 4. Development
1. **Follow Code Style** 
   - **Variables and Functions**: camelCase `(totalCount, calculateSum)`
   - **Classes**: PascalCase (UserAccount)
   - **Constants**: UPPER_CASE_SNAKE (MAX_SIZE)
   - **Files and Folders**: kebab-case(user-folder.js)
   - **Indentation and Formatting**: (2 or 4 spaces)
   - **Max Line Length**: 80 characters
   - **Allman Style** block structure
2. **Implement code changes**
   Follow _KISS_ or _DRY_ principles and **embrace trade-offs**
3. **Write Unit Tests**
4. **Run Tests Locally**

## 5. Push and Pull Request
1. **Push Branch**
   ```bash
    git push origin feature/<ISSUE-123>-short-desc
   ```
2. **Create Pull Request**
   1. Base: `dev`
   2. Compare: `feature/<ISSUE-123>-short-desc`
   3. Title: `feature/<ISSUE-123>-short-desc`
   4. Description: Screenshots, list of changes, how to test locally
3. **PR Review**
    Use template in Slack *pr* channel
    ```markdown
    @channel **PR Review Needed**
    - **Repo**: your-repo-name  
    - **Branch**: feature/123-add-login  
    - **PR**: <link>  
    - **Description**: Summary of Changes
    - **How to test**:
        1. git fetch && git checkout feature/123-add-login  
        2. npm install  
        3. npm start  
        4. Verify login button works  
    - **Reviewers**: @dev
    ```
## 6. CI
1. Upon PR CI runs lint, tests, type checks, and build
2. Fix any CI failures before merging

## 7. Code Review
1. Assign Reviewers (at least one)
2. Feedback
3. Approval (CI and at least one dev approval)

## 8. Merge & Release
1. Merge into dev
    Use Squash and Merge or Rebase and Merge
2. Move Issue to “Done”
    Update Kanban card.
3. Deploy to Staging
    Verify in staging environment
4. Release to Production
    Merge dev to main, tag release

## 9. After Merge
1. Delete Feature Branch 
2. Update Documentation: README, changelog, API docs
3. Sprint Retrospective: Discuss what went well and improvements

