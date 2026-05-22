import express from "express";
import { AuthHandler } from "./auth/auth";

const app = express();
const PORT = process.env.PORT || 4000;
const basePATH = "/api/v1";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({msg: "this is the beginning"});
})

app.use(basePATH+"/auth", AuthHandler);
app.use(basePATH+"/projects", ProjectHandler);
app.use(basePATH+"/mcp", McpHandler);
app.use(basePATH+"/endpoints", EndpointHandler);
app.use(basePATH+"/workers", WorkerHandler);
app.use(basePATH+'/billing', BillingHandler);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});