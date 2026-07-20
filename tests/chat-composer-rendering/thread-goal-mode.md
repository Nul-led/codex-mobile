# Feature: Thread goal mode

## Prerequisites

- Run CodexApp against a Codex app-server version that exposes `thread/goal/get`, `thread/goal/set`, and `thread/goal/clear`.
- Open an existing idle chat.

## Steps

1. Send `/goal Ship the goal-mode feature with tests`.
2. Confirm the objective appears in a goal bar above the composer and app-server starts the autonomous goal loop.
3. Send `/goal` and confirm the existing goal remains visible without adding a chat message.
4. Choose **Edit**, change the objective, save it, and reload the page.
5. Choose **Pause**, then **Resume**, and verify the status label changes each time.
6. Send `/goal edit Refined objective`, `/goal pause`, and `/goal resume`; verify each command updates the same bar without appearing as a user message.
7. Open the chat at 375x812 and 768x1024 in both light and dark themes; verify the objective, status, and actions remain legible without horizontal page overflow.
8. Choose **Clear**, accept the confirmation, and reload the page.
9. From Home, send `/goal New-thread objective` and confirm a new chat is created with an active goal and its first turn starts.

## Expected Results

- Goal state is persisted by app-server, restored when selecting or reloading the thread, and updated immediately by goal notifications.
- Goal commands are handled as controls rather than ordinary chat messages.
- Goal loading is cached per thread; notifications update local state without triggering a thread-list or message reload.
- CodexApp does not issue a duplicate `turn/start`; app-server owns the autonomous goal loop.
- Editing, pausing, resuming, and clearing never start an extra agent turn.
- The goal bar is usable in light and dark themes at desktop, phone, and tablet widths.

## Rollback/Cleanup

- Clear any test goal with `/goal clear` or the **Clear** action.
