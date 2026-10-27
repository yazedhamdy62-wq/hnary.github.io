import React, { useState } from 'react';
import { AIAnalysisRequest, AIAnalysisResponse } from '../types';
import { 
  Sparkles, 
  Bot, 
  Send, 
  User, 
  CheckCircle2, 
  ShieldAlert, 
  Lightbulb, 
  TrendingUp, 
  HelpCircle, 
  Loader2, 
  PhoneCall, 
  RefreshCw,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AINeedsAnalyzerProps {
  onBookConsultation: (coverage: number, note: string) => void;
}

export const AINeedsAnalyzer: React.FC<AINeedsAnalyzerProps> = ({ onBookConsultation }) => {
  const [activeSubTab, setActiveSubTab] = useState<'analyzer' | 'chat'>('analyzer');

  // Analyzer Form State
  const [formData, setFormData] = useState<AIAnalysisRequest>({
    age: 36,
    maritalStatus: 'متزوج ولديه أطفال',
    dependentsCount: 3,
    monthlyIncome: 15000,
    monthlyExpenses: 9000,
    existingDebts: 120000,
    financialGoals: 'تأمين تعليم الأبناء وتسديد القرض العقاري المتبقي',
    healthStatus: 'جيدة جداً، لا توجد أمراض مزمنة، غير مدخن',
    occupationRisk: 'مهندس مكتبي - مخاطر منخفضة',
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Chat Assistant State
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; content: string; time: string }>>([
    {
      id: 'm-1',
      role: 'assistant',
      content: 'أهلاً بك! أنا "مستشار أمان الذكي". كيف يمكنني مساعدتك اليوم في اختيار أو فهم وثائق تأمين الحياة المناسبة لأسرتك؟',
      time: 'الآن',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatSending, setIsChatSending] = useState(false);

  // Handler: Run Gemini AI Needs Analyzer
  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/ai-analyze-coverage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success && data.result) {
        setAnalysisResult(data.result);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } else {
        setErrorMessage(data.error || 'عذراً، حدث خطأ أثناء إجراء التحليل.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('تعذر الاتصال بالخادم. يُرجى التثبت من شبكة الاتصال وإعادة المحاولة.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handler: Send Message in AI Chat
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatSending) return;

    const userText = chatInput.trim();
    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: userText,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setChatInput('');
    setIsChatSending(true);

    try {
      const response = await fetch('/api/ai-chat-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          userProfile: formData,
        }),
      });

      const data = await response.json();
      if (data.success && data.reply) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: data.reply,
            time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'عذراً، تعذر معالجة استفسارك حالياً. يُرجى إعادة السؤال أو طلب حجز جلسة مباشرة مع مستشارنا البشري.',
            time: 'الآن',
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsChatSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title & Subtab Selector */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#6D28D9]/10 text-[#6D28D9] text-xs font-bold border border-[#6D28D9]/20 mb-2">
          <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
          مستشار الذكاء الاصطناعي التفاعلي (Gemini AI)
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1B4332] tracking-tight mb-2">
          مُوصي التغطية التأمينية والمستشار الذكي
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed mb-4">
          أداة تحليل الاحتياجات بالذكاء الاصطناعي تقيّم وضعك المالي والعائلي وتقدم توصيات مخصصة بدقة عالية مع إمكانية الدردشة المباشرة.
        </p>

        {/* Subtabs Switcher */}
        <div className="inline-flex p-1 bg-white rounded-xl border border-[#DCD7CD]">
          <button
            onClick={() => setActiveSubTab('analyzer')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'analyzer'
                ? 'bg-[#6D28D9] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#6D28D9]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            تحليل الاحتياجات الشامل
          </button>
          <button
            onClick={() => setActiveSubTab('chat')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'chat'
                ? 'bg-[#6D28D9] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#6D28D9]'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            الدردشة الاستشارية المباشرة
          </button>
        </div>
      </div>

      {/* SUBTAB 1: AI NEEDS ANALYZER FORM & RESULTS */}
      {activeSubTab === 'analyzer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Questionnaire Form (6 cols) */}
          <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border border-[#DCD7CD] shadow-sm">
            <h3 className="text-sm font-bold text-[#1B4332] mb-3 flex items-center gap-2 border-b border-[#DCD7CD] pb-2.5">
              <User className="w-4 h-4 text-[#6D28D9]" />
              أسئلة التقييم المالي والعائلي
            </h3>

            <form onSubmit={handleRunAnalysis} className="space-y-3 text-xs">
              
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">العمر:</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-2.5 py-1.5 font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">عدد المعالين:</label>
                  <input
                    type="number"
                    value={formData.dependentsCount}
                    onChange={(e) => setFormData({ ...formData, dependentsCount: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-2.5 py-1.5 font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الحالة الاجتماعية:</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-2.5 py-1.5 font-bold text-slate-800"
                >
                  <option value="أعزب">أعزب / عزباء</option>
                  <option value="متزوج ولديه أطفال">متزوج / متزوجة ولديه أطفال</option>
                  <option value="متزوج بدون أطفال">متزوج بدون أطفال</option>
                  <option value="معيل أسرة بمفرده">معيل أسرة بمفرده</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">الدخل الشهرى:</label>
                  <input
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-2.5 py-1.5 font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">المصاريف الشهرية للأسرة:</label>
                  <input
                    type="number"
                    value={formData.monthlyExpenses}
                    onChange={(e) => setFormData({ ...formData, monthlyExpenses: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-2.5 py-1.5 font-bold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">إجمالي الديون والرهون القائمة:</label>
                <input
                  type="number"
                  value={formData.existingDebts}
                  onChange={(e) => setFormData({ ...formData, existingDebts: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-2.5 py-1.5 font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الأهداف المالية المستقبلية:</label>
                <textarea
                  rows={2}
                  value={formData.financialGoals}
                  onChange={(e) => setFormData({ ...formData, financialGoals: e.target.value })}
                  placeholder="مثال: ضمان تعليم الأبناء وتسديد الرهن العقاري..."
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-2.5 py-1.5 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">الحالة الصحية والتاريخ العلاجي:</label>
                <input
                  type="text"
                  value={formData.healthStatus}
                  onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })}
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-2.5 py-1.5 font-medium text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-2.5 rounded-xl bg-[#6D28D9] hover:bg-purple-800 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-1.5 mt-3"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    جاري التقييم بواسطة الذكاء الاصطناعي...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    توليد التوصية التأمينية الذكية
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right AI Analysis Result (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                {errorMessage}
              </div>
            )}

            {!analysisResult && !isAnalyzing && (
              <div className="bg-white border-2 border-dashed border-[#DCD7CD] p-8 rounded-2xl text-center flex flex-col items-center justify-center h-full min-h-[350px]">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#6D28D9] flex items-center justify-center mb-3">
                  <Bot className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[#1B4332] mb-1">في انتظار إدخال البيانات</h4>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  قم بتعبئة الأسئلة واضغط على "توليد التوصية التأمينية الذكية" للحصول على تقرير تفصيلي معتمد بالذكاء الاصطناعي.
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div className="bg-white border border-[#DCD7CD] p-8 rounded-2xl text-center flex flex-col items-center justify-center h-full min-h-[350px] space-y-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-[#6D28D9] flex items-center justify-center animate-bounce">
                  <Sparkles className="w-6 h-6 text-[#6D28D9]" />
                </div>
                <h4 className="text-sm font-bold text-[#6D28D9]">جاري معالجة أرقامك المالية...</h4>
                <p className="text-xs text-slate-500">نحسب معادلات حماية الدخل والديون ومصروفات الأبناء بالذكاء الاصطناعي</p>
              </div>
            )}

            {analysisResult && !isAnalyzing && (
              <div className="bg-[#1B4332] text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-4 border border-[#2D5A27]">
                
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <h3 className="text-sm font-bold text-white">نتيجة التحليل الذكي</h3>
                  </div>
                  <span className="text-[10px] bg-[#6D28D9] px-2 py-0.5 rounded-md font-bold">
                    Gemini Recommendation
                  </span>
                </div>

                {/* Big Number Banner */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center">
                  <span className="text-xs text-emerald-100 font-medium block mb-0.5">مبلغ التغطية التكافلية الموصى به:</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-300 tracking-tight">
                    {analysisResult.recommendedCoverage.toLocaleString()} <span className="text-xs font-bold text-white">ر.س / ج.م</span>
                  </div>
                  <p className="text-xs text-emerald-100/80 mt-1">
                    القسط الشهرى التقديري المتوقع: <strong className="text-white font-bold">{analysisResult.recommendedMonthlyPremium}</strong> تقريباً
                  </p>
                </div>

                {/* Plan type & duration */}
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
                    <span className="text-emerald-100/70 block text-[10px]">نوع البوليصة المقترحة:</span>
                    <span className="font-bold text-white mt-0.5 block">{analysisResult.recommendedPlanType}</span>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-lg border border-white/10">
                    <span className="text-emerald-100/70 block text-[10px]">مدة التغطية المثالية:</span>
                    <span className="font-bold text-white mt-0.5 block">{analysisResult.recommendedDurationYears} سنة</span>
                  </div>
                </div>

                {/* Summary Text */}
                <div className="text-xs text-emerald-100/90 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                  <p className="font-medium">{analysisResult.summaryText}</p>
                </div>

                {/* Key Reasons Checklist */}
                <div>
                  <h4 className="text-xs font-bold text-emerald-300 mb-1.5">أسباب وأهداف هذه التغطية:</h4>
                  <ul className="space-y-1 text-xs text-emerald-100">
                    {analysisResult.keyReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggested Riders */}
                {analysisResult.suggestedRiders && (
                  <div>
                    <h4 className="text-xs font-bold text-purple-200 mb-1.5">الملحقات والإضافات المقترحة:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.suggestedRiders.map((r, idx) => (
                        <span key={idx} className="bg-purple-900/50 text-white text-[10px] px-2 py-0.5 rounded-md border border-purple-500/30 font-medium">
                          + {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Financial Tip */}
                <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-500/30 flex items-start gap-2 text-xs">
                  <Lightbulb className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-200 block font-bold">نصيحة الخبير:</strong>
                    <span className="text-purple-100/90">{analysisResult.financialTip}</span>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onBookConsultation(analysisResult.recommendedCoverage, `بناءً على تحليل الـ AI: ${analysisResult.recommendedPlanType}`)}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  حجز موعد استشارة بناءً على التوصية
                </button>

              </div>
            )}

          </div>

        </div>
      )}

      {/* SUBTAB 2: AI CHAT ASSISTANT */}
      {activeSubTab === 'chat' && (
        <div className="bg-white rounded-2xl border border-[#DCD7CD] p-4 sm:p-5 shadow-sm max-w-4xl mx-auto">
          
          <div className="flex items-center justify-between border-b border-[#DCD7CD] pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#6D28D9] text-white flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#1B4332]">مستشار أمان الذكي المباشر</h3>
                <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  متصل الآن لمساعدتك 24/7
                </span>
              </div>
            </div>

            <button
              onClick={() => setChatMessages([
                {
                  id: 'm-1',
                  role: 'assistant',
                  content: 'مرحباً مجدداً! يسعدني إجابة أي أسئلة حول أنواع وثائق التأمين أو مقارنة الشركات.',
                  time: 'الآن'
                }
              ])}
              className="text-xs text-slate-500 hover:text-[#1B4332] font-semibold"
            >
              مسح المحادثة
            </button>
          </div>

          {/* Chat Messages Box */}
          <div className="space-y-3 mb-3 max-h-[380px] overflow-y-auto p-1">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#1B4332] text-white rounded-br-none shadow-sm'
                      : 'bg-[#F5F1E9] text-slate-800 border border-[#DCD7CD] rounded-bl-none'
                  }`}
                >
                  <div className="font-bold text-[10px] opacity-70 mb-0.5">
                    {msg.role === 'user' ? 'أنت' : 'مستشار أمان الذكي'} • {msg.time}
                  </div>
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}

            {isChatSending && (
              <div className="flex justify-start">
                <div className="bg-[#F5F1E9] border border-[#DCD7CD] text-[#6D28D9] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  جاري كتابة الإجابة الاستشارية...
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="text-[10px] text-slate-500 font-bold self-center">أسئلة شائعة:</span>
            {[
              'ما هو الفرق بين التأمين المؤقت والتأمين مدى الحياة؟',
              'هل يحق لي إلغاء البوليصة واسترداد المبلغ؟',
              'ما أهمية بند الإعفاء من دفع الأقساط؟',
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => setChatInput(q)}
                className="bg-[#F5F1E9] hover:bg-[#6D28D9] hover:text-white text-slate-700 text-[10px] px-2.5 py-1 rounded-md border border-[#DCD7CD] transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendChatMessage} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="اكتب استفسارك هنا..."
              className="flex-1 bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#6D28D9]"
            />
            <button
              type="submit"
              disabled={isChatSending || !chatInput.trim()}
              className="px-4 py-2 rounded-lg bg-[#6D28D9] hover:bg-purple-800 disabled:opacity-50 text-white font-bold text-xs transition flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              إرسال
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
