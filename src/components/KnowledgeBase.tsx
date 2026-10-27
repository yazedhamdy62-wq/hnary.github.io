import React, { useState } from 'react';
import { KnowledgeArticle } from '../types';
import { mockArticles } from '../data/mockData';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Award,
  ChevronRight,
  Calculator
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface KnowledgeBaseProps {
  onOpenCalculator: () => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ onOpenCalculator }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(null);

  // Interactive Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: 'إذا كان هدفك الحماية المباشرة ضد الديون ومصاريف الأسرة بأسعار منخفضة جداً، ما البوليصة الأنسب؟',
      options: [
        'التأمين المؤقت (Term Life)',
        'التأمين مدى الحياة (Whole Life)',
        'التأمين التجاري'
      ],
      correctIndex: 0,
      explanation: 'التأمين المؤقت يمنحك أعلى قيمة تغطية بأقل قسط شهري لمرحلة الرهن والأطفال.'
    },
    {
      id: 2,
      question: 'ما هو الملحق (Rider) الذي يستمر في دفع الأقساط عنك إذا تعطلت عن العمل بسبب عجز؟',
      options: [
        'ملحق الحوادث الشخصية',
        'بند الإعفاء من دفع الأقساط (Waiver of Premium)',
        'تغطية المواريث'
      ],
      correctIndex: 1,
      explanation: 'بند الإعفاء يتكفل بدفع جميع الأقساط المتبقية نيابة عنك لحماية وثيقتك من التوقف.'
    },
    {
      id: 3,
      question: 'ما هي قاعدة DIME الشهيرة في حساب التغطية التأمينية؟',
      options: [
        'ضرب الدخل في 2 فقط',
        'جمع الديون (Debt) + الدخل (Income) + الرهن (Mortgage) + التعليم (Education)',
        'قسمة الراتب على 12'
      ],
      correctIndex: 1,
      explanation: 'قاعدة DIME تجمع كافة الالتزامات والأهداف المستقبلية لأسرتك لضمان حساب دقيق.'
    }
  ];

  const filteredArticles = selectedCategory === 'all'
    ? mockArticles
    : mockArticles.filter((a) => a.category === selectedCategory);

  const handleCalculateScore = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) correctCount++;
    });

    if (correctCount === quizQuestions.length) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold border border-[#1B4332]/20 mb-2">
          <BookOpen className="w-4 h-4 text-[#2D5A27]" />
          المكتبة التوعوية والمدونة (Insurance 101)
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1B4332] tracking-tight mb-2">
          دليلك المبسط لفهم تأمين الحياة والتخطيط المالي
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          مقالات وإرشادات بلغة عربية سلسة بعيداً عن المصطلحات القانونية المعقدة لتمكينك من اتخاذ القرار الصحيح.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex justify-center gap-1.5 mb-6">
        {[
          { id: 'all', label: 'جميع المقالات' },
          { id: 'أساسيات التأمين', label: 'أساسيات التأمين' },
          { id: 'تخطيط مالي', label: 'تخطيط مالي' },
          { id: 'نصائح الخبراء', label: 'نصائح الخبراء' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedCategory === cat.id
                ? 'bg-[#1B4332] text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-[#F5F1E9] border border-[#DCD7CD]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl p-5 border border-[#DCD7CD] hover:border-[#1B4332] hover:shadow-sm transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-[#6D28D9]/10 text-[#6D28D9] font-bold px-2 py-0.5 rounded-md border border-[#6D28D9]/20">
                  {article.category}
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-sm font-black text-[#1B4332] mb-1.5 leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {article.summary}
              </p>
            </div>

            <button
              onClick={() => setActiveArticle(article)}
              className="w-full py-2 rounded-xl bg-[#1B4332] hover:bg-[#2D5A27] text-white text-xs font-bold transition flex items-center justify-center gap-1"
            >
              قراءة المقال بالكامل
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Quiz Section */}
      <div className="bg-[#1B4332] text-white p-6 sm:p-8 rounded-2xl border border-[#2D5A27] shadow-lg max-w-4xl mx-auto space-y-5">
        <div className="flex items-center gap-3 border-b border-white/15 pb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">اختبر معلوماتك التأمينية (Quiz)</h3>
            <p className="text-xs text-emerald-100/80">3 أسئلة سريعة لتتأكد هل خطتك لحماية أسرتك جاهزة ومدروسة</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {quizQuestions.map((q) => (
            <div key={q.id} className="bg-white/10 p-4 rounded-xl border border-white/15 space-y-2.5">
              <h4 className="font-bold text-xs text-white">{q.id}. {q.question}</h4>
              <div className="space-y-1.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = quizAnswers[q.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: optIdx })}
                      className={`w-full text-right p-2.5 rounded-lg border text-xs font-bold transition ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-white/5 text-white/90 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className={`p-2.5 rounded-lg text-xs font-medium ${
                  quizAnswers[q.id] === q.correctIndex ? 'bg-emerald-900/60 text-emerald-200' : 'bg-rose-900/60 text-rose-200'
                }`}>
                  <strong>{quizAnswers[q.id] === q.correctIndex ? 'إجابة صحيحة! ' : 'الإجابة الصحيحة: '}</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}

          {!quizSubmitted ? (
            <button
              onClick={handleCalculateScore}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
            >
              عرض نتيجتي وتوصية الخبير
            </button>
          ) : (
            <div className="text-center pt-1">
              <button
                onClick={onOpenCalculator}
                className="px-5 py-2 rounded-xl bg-white text-[#1B4332] font-bold text-xs hover:bg-[#F5F1E9] transition"
              >
                انتقل الآن لحاسبة الأقساط الذكية
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ARTICLE READ MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 border border-[#DCD7CD] shadow-xl relative max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#DCD7CD] pb-3 mb-3">
              <span className="text-xs font-bold bg-[#6D28D9]/10 text-[#6D28D9] px-2.5 py-0.5 rounded-md">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-7 h-7 rounded-full bg-[#F5F1E9] text-slate-700 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <h2 className="text-base font-black text-[#1B4332] mb-2">
              {activeArticle.title}
            </h2>

            <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-[#F5F1E9] p-4 rounded-xl border border-[#DCD7CD] mb-4">
              {activeArticle.content}
            </div>

            <button
              onClick={() => setActiveArticle(null)}
              className="w-full py-2 rounded-xl bg-[#1B4332] text-white text-xs font-bold hover:bg-[#2D5A27] transition"
            >
              إغلاق المقال
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
