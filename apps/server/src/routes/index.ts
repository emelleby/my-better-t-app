import { Hono } from "hono";
import auth from "./auth";

// This will be the main routes aggregator for /api/v1
const routes = new Hono();

// Health check route for API
routes.get("/health", (c) => {
  return c.json({ 
    status: "OK", 
    message: "VSME Guru API v1",
    timestamp: new Date().toISOString()
  });
});

// Mount auth routes
routes.route("/auth", auth);

// Future routes will be mounted here:
// routes.route("/users", users);
// routes.route("/profile", profile);
// routes.route("/projects", projects);

// Export the routes app for mounting
export default routes;