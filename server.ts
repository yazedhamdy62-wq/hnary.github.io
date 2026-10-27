import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const currentFilename = typeof import.meta?.url === "string" ? fileURLToPath(import.meta.url) : (process.argv[1] || "");
const currentDirname = typeof import.meta?.url === "string" ? path.dirname(currentFilename) : process.cwd();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Google Gen AI client with server secret
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Endpoint: AI Insurance Coverage Needs Analyzer
app.post("/api/ai-analyze-coverage", async (req, res) => {
  try {
    const { age, maritalStatus, dependentsCount, monthlyIncome, monthlyExpenses, existingDebts, financialGoals, healthStatus, occupationRisk } = req.body;

    const ai = getAiClient();
    const prompt = `أنت خبير استشارات تأمين حياة كبار المستشارين في الشرق الأوسط (Senior Life Insurance Financial Planner).
بناءً على البيانات التالية للعميل، قم بتحليل الاحتياجات المالية بدقة وإوصائه بمبلغ التغطية ونوع البوليصة الأنسب بالعملة المناسبة (أو بالدولار / الريال / الجنيه):

بيانات العميل:
- العمر: ${age || 35} سنة
- الحالة الاجتماعية: ${maritalStatus || 'متزوج'}
- عدد المعالين (الأطفال/الوالدين): ${dependentsCount || 2}
- الدخل الشهرى: ${monthlyIncome || 10000}
- المصاريف الشهرية: ${monthlyExpenses || 6000}
- الديون والقروض المتبقية: ${existingDebts || 50000}
- الأهداف المالية المستقبيلية (مثل تعليم الأبناء): ${financialGoals || 'تأمين تعليم الأبناء وتسديد الرهن'}
- الحالة الصحية والتسخين: ${healthStatus || 'جيدة جداً / غير مدخن'}
- طبيعة العمل: ${occupationRisk || 'مكتبي / مخاطر منخفضة'}

قم بتقديم توصية مالية احترافية باللغة العربية الواضحة المشجعة. يجب أن تكون الاستجابة بصيغة JSON مطابقة للنموذج التالي:
{
  "recommendedCoverage": 1500000,
  "recommendedMonthlyPremium": 350,
  "recommendedPlanType": "تأمين حياة مؤقت مع ادخار (Term with Savings)",
  "recommendedDurationYears": 20,
  "summaryText": "شرح ملخص وشامل لسبب اختيار هذا المبلغ وكيف يغطي الديون والمعالين ومصاريف معيشة الأسر لـ 10 سنوات.",
  "keyReasons": [
    "تغطية قروض وديون بقيمة 50,000",
    "توفير دخل بديل للأسرة لمدة 10 سنوات",
    "صندوق مخصص لتعليم الأطفال"
  ],
  "suggestedRiders": [
    "تغطية الأمراض الحرجة والخطيرة",
    "الإعفاء من دفع الأقساط عند العجز الكلي",
    "تغطية الحوادث الشخصية المضاعفة"
  ],
  "financialTip": "نصيحة ذهبية قصيرة لزيادة الأمان المالي للأسرة."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedCoverage: { type: Type.NUMBER },
            recommendedMonthlyPremium: { type: Type.NUMBER },
            recommendedPlanType: { type: Type.STRING },
            recommendedDurationYears: { type: Type.NUMBER },
            summaryText: { type: Type.STRING },
            keyReasons: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            suggestedRiders: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            financialTip: { type: Type.STRING },
          },
          required: [
            "recommendedCoverage",
            "recommendedMonthlyPremium",
            "recommendedPlanType",
            "recommendedDurationYears",
            "summaryText",
            "keyReasons",
            "suggestedRiders",
            "financialTip",
          ],
        },
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);
    res.json({ success: true, result: data });
  } catch (error: any) {
    console.error("AI Needs Analyzer Error:", error);
    res.status(500).json({
      success: false,
      error: "فشل في إجراء التحليل بالذكاء الاصطناعي. يُرجى المحاولة مرة أخرى.",
      details: error.message,
    });
  }
});

// Endpoint: AI Insurance Consultation Chat Assistant
app.post("/api/ai-chat-consultant", async (req, res) => {
  try {
    const { messages, userProfile } = req.body;
    const ai = getAiClient();

    const systemInstruction = `أنت "مستشار أمان الذكي" (Aman AI Advisor)، الخبير الافتراضي المعتمد في استشارات تأمين الحياة في منصة أمان.
إرشاداتك:
1. قدم إجابات موثوقة، مبسطة، ومباشرة باللغة العربية السلسة وبدون تعقيدات قانونية.
2. وضح الفروقات بين أنواع التأمين (تأمين مؤقت Term Life، تأمين مدى الحياة Whole Life، التأمين الاستثماري/الادخاري Universal Life).
3. ساعد العميل في مقارنة المنافع والتغطيات، ونبهه لأهمية الشفافية في الإفصاح الطبي.
4. إذا طلب العميل حجز جلسة مع مستشار بشري، وجهه بلطف إلى زر "حجز جلسة استشارة".
5. بيانات العميل الحالية إن وجدت: ${JSON.stringify(userProfile || {})}`;

    // Convert message history to prompt string format or Gemini content
    const lastUserMsg = messages && messages.length > 0 ? messages[messages.length - 1].content : "أهلاً، كيف يمكنني اختيار وثيقة التأمين الأنسب لعائلتي؟";

    const chatContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      reply: response.text || "عذراً، لم أستطع معالجة السؤال حالياً. كيف يمكنني مساعدتك أكثر؟",
    });
  } catch (error: any) {
    console.error("AI Chat Assistant Error:", error);
    res.status(500).json({
      success: false,
      error: "حدث خطأ أثناء التواصل مع المستشار الذكي.",
      details: error.message,
    });
  }
});

// Vite Integration Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
