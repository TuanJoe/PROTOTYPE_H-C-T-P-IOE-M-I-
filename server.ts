import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock database in memory
  let userProgress = {
    totalPoints: 0,
    streak: 7,
    lastActive: new Date().toISOString(),
    units: {
      'unit-1': {
        id: 'unit-1',
        title: 'Tenses Intro',
        description: 'Làm quen với các thì cơ bản trong tiếng Anh.',
        masteryPoints: 15,
        bestScore: 0,
        attempts: 0,
        unlocked: true,
      },
      'unit-2': {
        id: 'unit-2',
        title: 'Vocabulary 1',
        description: 'Từ vựng chủ đề gia đình và trường học.',
        masteryPoints: 45,
        bestScore: 0,
        attempts: 0,
        unlocked: true,
      },
      'unit-3': {
        id: 'unit-3',
        title: 'Present Simple',
        description: 'Thì hiện tại đơn và cách dùng.',
        masteryPoints: 70,
        bestScore: 7,
        attempts: 1,
        unlocked: true,
      },
      'unit-4': {
        id: 'unit-4',
        title: 'Present Continuous',
        description: 'Thì hiện tại tiếp diễn.',
        masteryPoints: 0,
        bestScore: 0,
        attempts: 0,
        unlocked: true,
      },
      'unit-5': {
        id: 'unit-5',
        title: 'Past Simple',
        description: 'Thì quá khứ đơn.',
        masteryPoints: 0,
        bestScore: 0,
        attempts: 0,
        unlocked: false,
      }
    }
  };

  // API Routes
  app.get("/api/progress", (req, res) => {
    res.json(userProgress);
  });

  app.post("/api/submit-test", (req, res) => {
    const { unitId, score } = req.body; // score is 0-10
    const unit = userProgress.units[unitId as keyof typeof userProgress.units];
    
    if (!unit) return res.status(404).json({ error: "Unit not found" });

    const prevBest = unit.bestScore;
    const isFirstAttempt = unit.attempts === 0;
    unit.attempts += 1;

    let delta = 0;
    let feedback = "";

    if (isFirstAttempt) {
      // Rule 2: First attempt scoring
      if (score < 5) unit.masteryPoints = 0;
      else if (score === 5) unit.masteryPoints = 50;
      else if (score <= 7) unit.masteryPoints = 60 + (score - 6) * 10;
      else if (score <= 9) unit.masteryPoints = 80 + (score - 8) * 10;
      else if (score === 10) unit.masteryPoints = 100;
      
      delta = unit.masteryPoints;
      unit.bestScore = score;
    } else {
      // Rule 3: Improvement-based scoring
      delta = (score - prevBest) * 10;
      
      // Rule 4: Penalty for < 5 correct
      if (score < 5) {
        if (unit.attempts === 2) delta -= 25;
        if (unit.attempts >= 3) delta -= 50;
      }

      unit.masteryPoints = Math.max(0, Math.min(100, unit.masteryPoints + delta));
      if (score > prevBest) unit.bestScore = score;
    }

    // Unlock logic: Rule 3 in UX (Unlock next if >= 50 pts)
    if (unit.masteryPoints >= 50) {
      const unitKeys = Object.keys(userProgress.units);
      const currentIndex = unitKeys.indexOf(unitId);
      if (currentIndex !== -1 && currentIndex < unitKeys.length - 1) {
        const nextUnitId = unitKeys[currentIndex + 1];
        userProgress.units[nextUnitId as keyof typeof userProgress.units].unlocked = true;
      }
    }

    res.json({
      unit,
      delta,
      feedback: delta > 0 ? `🎉 Bạn đã tiến bộ +${delta} điểm!` : delta < 0 ? `⚠️ Bạn bị trừ ${Math.abs(delta)} điểm, hãy ôn lại bài nhé!` : "💡 Hãy cố gắng hơn ở lần sau nhé!",
      masteryLevel: unit.masteryPoints >= 100 ? 'Champion' : unit.masteryPoints >= 80 ? 'Achiever' : unit.masteryPoints >= 60 ? 'Challenger' : unit.masteryPoints >= 50 ? 'Explorer' : 'Starter'
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
