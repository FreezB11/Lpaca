# =========================================================
# MCP HOSTING PLATFORM API
# VERSION: v1
# =========================================================

BASE URL:
https://api.yourdomain.com/api/v1


# =========================================================
# AUTH
# =========================================================

POST   /api/v1/auth/signup
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
POST   /api/v1/auth/verify
POST   /api/v1/auth/reset-password


# =========================================================
# PROJECTS / WORKSPACES
# =========================================================

GET    /api/v1/projects/:userID # fetcht the projects list
POST   /api/v1/projects/:userID # creation of the project

POST   /api/v1/projects/:userID/:projectID/deploy # this will trigger the backed service to start docker on the server instances

# we can use either projectID or projectName 
GET    /api/v1/projects/:userID/:projectId
PATCH  /api/v1/projects/:userID/:projectId
DELETE /api/v1/projects/:userID/:projectId


# =========================================================
# MCP SERVERS
# =========================================================

GET    /api/v1/mcp
POST   /api/v1/mcp

GET    /api/v1/mcp/:serverId
PATCH  /api/v1/mcp/:serverId
DELETE /api/v1/mcp/:serverId


# =========================================================
# MCP BUILD / UPLOAD
# =========================================================

POST   /api/v1/mcp/:serverId/upload
GET    /api/v1/mcp/:serverId/builds
GET    /api/v1/mcp/:serverId/builds/:buildId


# =========================================================
# MCP DEPLOYMENTS
# =========================================================

POST   /api/v1/mcp/:serverId/deploy
POST   /api/v1/mcp/:serverId/redeploy
POST   /api/v1/mcp/:serverId/stop

GET    /api/v1/mcp/:serverId/deployments
GET    /api/v1/deployments
GET    /api/v1/deployments/:deploymentId


# =========================================================
# MCP STATUS / HEALTH
# =========================================================

GET    /api/v1/mcp/:serverId/status
GET    /api/v1/mcp/:serverId/health

GET    /api/v1/system/health


# =========================================================
# MCP LOGS
# =========================================================

GET    /api/v1/mcp/:serverId/logs
GET    /api/v1/deployments/:deploymentId/logs

# realtime logs
GET    /api/v1/mcp/:serverId/logs/stream


# =========================================================
# MCP ENV / SECRETS
# =========================================================

GET    /api/v1/mcp/:serverId/secrets
POST   /api/v1/mcp/:serverId/secrets
DELETE /api/v1/mcp/:serverId/secrets/:key


# =========================================================
# MCP ENDPOINT MANAGEMENT
# =========================================================

GET    /api/v1/endpoints/:endpointId
PATCH  /api/v1/endpoints/:endpointId
DELETE /api/v1/endpoints/:endpointId

POST   /api/v1/endpoints/:endpointId/regenerate


# =========================================================
# WORKERS
# =========================================================

GET    /api/v1/workers
GET    /api/v1/workers/:workerId
GET    /api/v1/workers/:workerId/status

POST   /api/v1/workers/:workerId/drain


# =========================================================
# INTERNAL ROUTER / MCP INVOCATION
# =========================================================

POST   /mcp/:endpointId

# OR

POST   /mcp/server/:serverId


# =========================================================
# OPTIONAL FUTURE APIs
# =========================================================

# billing
GET    /api/v1/billing
POST   /api/v1/billing/subscribe

# usage
GET    /api/v1/usage

# teams
GET    /api/v1/teams
POST   /api/v1/teams

# audit logs
GET    /api/v1/audit

# api keys
GET    /api/v1/keys
POST   /api/v1/keys
DELETE /api/v1/keys/:keyId


# =========================================================
# RECOMMENDED RESPONSE FORMAT
# =========================================================

SUCCESS:

{
  "success": true,
  "data": {}
}


ERROR:

{
  "success": false,
  "error": {
    "code": "MCP_NOT_FOUND",
    "message": "MCP server does not exist"
  }
}


# =========================================================
# COMMON MCP STATUS VALUES
# =========================================================

creating
building
deploying
running
stopped
failed
unhealthy
restarting


# =========================================================
# RECOMMENDED DATABASE TABLES
# =========================================================

users
sessions
projects
mcp_servers
builds
deployments
workers
worker_nodes
routes
endpoints
logs
secrets
health_checks
api_keys
audit_logs


# =========================================================
# REQUEST FLOW
# =========================================================

1. User login/signup
2. Create project
3. Create MCP server
4. Upload source/bundle
5. Trigger deploy
6. Worker builds runtime
7. Endpoint assigned
8. Router forwards requests
9. Health checker monitors runtime
10. Logs streamed back


# =========================================================
# SUGGESTED INFRA STRUCTURE
# =========================================================

API Gateway
│
├── Auth Service
├── MCP Service
├── Deploy Service
├── Worker Manager
├── Health Service
├── Log Aggregator
├── Router Service
└── PostgreSQL

Workers
│
├── Docker Runtime
├── Firecracker VM
└── Sandbox Runtime


# =========================================================
# SIMPLE MVP FLOW
# =========================================================

POST /auth/signup
POST /auth/login

POST /mcp
POST /mcp/:id/upload
POST /mcp/:id/deploy

GET  /mcp/:id/status
GET  /mcp/:id/logs

POST /mcp/:endpointId


# =========================================================
# EXAMPLE ENDPOINT URL
# =========================================================

https://api.yourdomain.com/mcp/ep_2hj82hsh2

# OR

https://mcp.yourdomain.com/github-tools


# =========================================================
# END
# =========================================================