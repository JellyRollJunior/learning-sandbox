# Learning Sandbox

- Testing stuff!
- Clone of early luna-kanban-board

# Learning Outcomes

- Draggable
    - onPointerDown
    - onPointerMove
    - onPointerUp
    - setPointerCapture
- Draggable 2
    - draggable
    - onDragStart
    - onDragEnd
    - onDragOver
    - onDragEnter
    - onDragLeave
    - onDrop
- Turborepo monorepo configuration
    - scripts
        - $ turbo build
    - pnpm-workspace.yaml configuration
- Prisma studio db viewer

# Notes

- Turborepo
    - manage build order between packages (shared -> client/server)
    - cache builds
- Prisma
    - `npx prisma studio`
        - interactive prisma db viewer

## Endpoints

| Method | URI                   | Function                   | Body (inputs)                   | Outputs         | Notes                                                                           |
| ------ | --------------------- | -------------------------- | ------------------------------- | --------------- | ------------------------------------------------------------------------------- |
| POST   | /auth/signup          | Signup                     | username, password, displayName | { displayName } | password: { 8 - 16 characters, uppercase, lowercase, number, special character} |
| POST   | /auth/login           | Login                      | username, password              | { token }       |                                                                                 |
| POST   | /auth/github          | GitHub oauth2 login/signup |                                 |                 | Login with GitHub oauth. Creates an account if no account exists                |
| POST   | /auth/github/callback | GitHub oauth2 callback     |                                 | { token }       | Callback to receive token after successful authorization                        |
| GET    | /boards               | get boards                 |                                 |                 |                                                                                 |
| GET    | /boards/:boardId      | get board                  |                                 |                 |                                                                                 |
