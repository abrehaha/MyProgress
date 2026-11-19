import "dotenv/config";
import express from "express";
import cors from "cors";
import { requireAuth } from "./middleware/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// Public
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Protected: returns the authenticated user. Use this to verify the middleware.
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
});

// Future protected routes: app.use("/api/workouts", requireAuth, workoutsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));