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
    - configure turbo tasks
        - turbo build -> pnpm run build in each package
    - pnpm-workspace.yaml configuration
    - configure build order
- Prisma studio db viewer
- Socket.io Admin UI setup
- Testing Socket.io events with Postman
    - how to send callback?
    - how to type callbacks on server
- PNPM workspace configuration
- Ordering items in O(1) using Fractional indexing 

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

## Todo
- frontend - pull data from server
    - create hook to fetch board
    - create function to refetch
- Realtime
    - implement create item listener
        - trigger fetch board refresh
    - server
    - shared
        - build shared on turbo build
        - item
        - board
        - socket error
        - socket event types
