import { Hono } from "hono";
import auth from "./auth";

// This will be the main routes aggregator
const routes = new Hono();

// Test route
routes.get("/test", (c) => {
  return c.json({ message: "Routes are working!" });
});

// Mount auth routes
routes.route("/auth", auth);

// Export the routes app for mounting
export default routes;

// Export the app type for RPC integration
export type AppType = typeof routes;