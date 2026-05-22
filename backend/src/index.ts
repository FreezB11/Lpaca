import express from "express";
import { AuthRouter } from "./auth/auth";
import { McpRouter } from "./mcp/mcp";
import { WorkerRouter } from "./workers/worker";
import { ProjectRouter } from "./projects/projects";
import { EndpointRouter } from "./endpoints/endpoint";
import { BillingRouter } from "./billing/bills";

const app = express();
const PORT = process.env.PORT || 4000;
const basePATH = "/api/v1";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({msg: "this is the beginning"});
})

app.use(basePATH+"/auth", AuthRouter);
app.use(basePATH+"/projects", ProjectRouter);
app.use(basePATH+"/mcp", McpRouter);
app.use(basePATH+"/endpoints", EndpointRouter);
app.use(basePATH+"/workers", WorkerRouter);
app.use(basePATH+'/billing', BillingRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});