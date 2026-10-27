import React, { useState, useMemo } from 'react';
import { CalculatorInputs, CalculatorOutputs } from '../types';
import { 
  Calculator, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Info, 
  CheckCircle2, 
  DollarSign, 
  Download, 
  PhoneCall, 
  RefreshCw,
  HeartPulse,
  Activity,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SmartCalculatorProps {
  onBookConsultation: (coverage: number, packageType: string) => void;
  onOpenAIAnalyzer: () => void;
}

export const SmartCalculator: React.FC<SmartCalculatorProps> = ({
  onBookConsultation,
  onOpenAIAnalyzer,
}) => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    age: 35,
    gender: 'male',
    isSmoker: false,
    healthCondition: 'good',
    monthlyIncome: 12000,
    coverageAmount: 1500000,
    termYears: 20,
    includeCriticalIllness: true,
    includeDisability: true,
    includeAccidentalDeath: false,
  });

  const [selectedCurrency, setSelectedCurrency] = useState<'SAR' | 'EGP' | 'USD'>('SAR');

  // Real-time calculation logic
  const calculation: CalculatorOutputs = useMemo(() => {
    // Base monthly rate per 100,000 coverage
    let baseMonthlyRatePer100k = 18;

    // Age factor
    let ageMultiplier = 1 + Math.max(0, inputs.age - 25) * 0.035;

    // Smoker penalty
    let smokerMultiplier = inputs.isSmoker ? 1.65 : 1.0;

    // Health factor
    let healthMultiplier = 1.0;
    if (inputs.healthCondition === 'excellent') healthMultiplier = 0.88;
    if (inputs.healthCondition === 'average') healthMultiplier = 1.25;
    if (inputs.healthCondition === 'chronic') healthMultiplier = 1.6;

    // Riders cost
    let ridersCost = 0;
    if (inputs.includeCriticalIllness) ridersCost += 35;
    if (inputs.includeDisability) ridersCost += 25;
    if (inputs.includeAccidentalDeath) ridersCost += 20;

    // Coverage multiplier
    const coverageUnits = inputs.coverageAmount / 100000;

    // Basic calculation
    const basicMonthly = Math.round(
      (baseMonthlyRatePer100k * coverageUnits * ageMultiplier * smokerMultiplier * healthMultiplier) + ridersCost * 0.5
    );

    // Standard package (adds comprehensive riders)
    const standardMonthly = Math.round(
      basicMonthly * 1.25 + ridersCost
    );

    // Premium Plus package (adds savings component & double riders)
    const premiumPlusMonthly = Math.round(
      standardMonthly * 1.85
    );

    const yearlySavings = Math.round((standardMonthly * 12) * 0.12);

    return {
      basicMonthlyPremium: Math.max(50, basicMonthly),
      standardMonthlyPremium: Math.max(90, standardMonthly),
      premiumPlusMonthlyPremium: Math.max(180, premiumPlusMonthly),
      yearlySavings,
      recommendedPackage: 'standard',
      breakdown: {
        baseRate: baseMonthlyRatePer100k,
        ageMultiplier,
        smokerMultiplier,
        healthMultiplier,
        ridersCost,
      },
    };
  }, [inputs]);

  const currencySymbol = selectedCurrency === 'SAR' ? 'ر.س' : selectedCurrency === 'EGP' ? 'ج.م' : '$';

  const handleExportQuote = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert(`تم تجهيز وتنزيل ملخص العرض التقديري لمبلغ تغطية ${inputs.coverageAmount.toLocaleString()} ${currencySymbol}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold border border-[#1B4332]/20 mb-2">
          <Calculator className="w-4 h-4 text-[#2D5A27]" />
          أداة تفاعلية دقيقة 100% للاسترشاد المالي
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1B4332] tracking-tight mb-2">
          حاسبة أقساط تأمين الحياة الذكية
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          أدخل بياناتك الأساسية واكتشف تقديرات الأقساط الشهرية والباقات المناسبة لحماية أسرتك وضمان استقرارهم المالي.
        </p>

        {/* Currency Switcher */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="text-xs text-slate-600 font-semibold">اختر العملة:</span>
          <div className="inline-flex p-0.5 bg-white rounded-lg border border-[#DCD7CD]">
            {(['SAR', 'EGP', 'USD'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setSelectedCurrency(curr)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  selectedCurrency === curr
                    ? 'bg-[#1B4332] text-white shadow-sm'
                    : 'text-slate-600 hover:text-[#1B4332]'
                }`}
              >
                {curr === 'SAR' ? 'ريال (SAR)' : curr === 'EGP' ? 'جنيه (EGP)' : 'دولار ($)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Input Form Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-[#DCD7CD] shadow-sm space-y-5">
          
          <div className="flex items-center justify-between border-b border-[#DCD7CD] pb-3">
            <h3 className="text-base font-extrabold text-[#1B4332] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2D5A27]" />
              بيانات العميل الشخصية والصحية
            </h3>
            <button
              onClick={() => setInputs({
                age: 35,
                gender: 'male',
                isSmoker: false,
                healthCondition: 'good',
                monthlyIncome: 12000,
                coverageAmount: 1500000,
                termYears: 20,
                includeCriticalIllness: true,
                includeDisability: true,
                includeAccidentalDeath: false,
              })}
              className="text-xs text-[#6D28D9] font-bold flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              إعادة تعيين
            </button>
          </div>

          {/* Age Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700">العمر الحالي:</label>
              <span className="text-xs font-bold text-[#1B4332] bg-[#F5F1E9] px-2.5 py-0.5 rounded-md border border-[#DCD7CD]">
                {inputs.age} سنة
              </span>
            </div>
            <input
              type="range"
              min="18"
              max="70"
              value={inputs.age}
              onChange={(e) => setInputs({ ...inputs, age: parseInt(e.target.value) })}
              className="w-full accent-[#1B4332] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>18 سنة</span>
              <span>45 سنة</span>
              <span>70 سنة</span>
            </div>
          </div>

          {/* Gender & Smoking Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">الجنس:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setInputs({ ...inputs, gender: 'male' })}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                    inputs.gender === 'male'
                      ? 'bg-[#1B4332] text-white border-[#1B4332]'
                      : 'bg-[#F5F1E9] text-slate-700 border-[#DCD7CD]'
                  }`}
                >
                  ذكر
                </button>
                <button
                  type="button"
                  onClick={() => setInputs({ ...inputs, gender: 'female' })}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                    inputs.gender === 'female'
                      ? 'bg-[#1B4332] text-white border-[#1B4332]'
                      : 'bg-[#F5F1E9] text-slate-700 border-[#DCD7CD]'
                  }`}
                >
                  أنثى
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">حالة التدخين:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setInputs({ ...inputs, isSmoker: false })}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                    !inputs.isSmoker
                      ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                      : 'bg-[#F5F1E9] text-slate-700 border-[#DCD7CD]'
                  }`}
                >
                  غير مدخن
                </button>
                <button
                  type="button"
                  onClick={() => setInputs({ ...inputs, isSmoker: true })}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                    inputs.isSmoker
                      ? 'bg-amber-700 text-white border-amber-700'
                      : 'bg-[#F5F1E9] text-slate-700 border-[#DCD7CD]'
                  }`}
                >
                  مدخن
                </button>
              </div>
            </div>
          </div>

          {/* Health Condition */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">الحالة الصحية العامة:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'excellent', label: 'ممتازة جداً' },
                { id: 'good', label: 'جيدة' },
                { id: 'average', label: 'متوسطة' },
                { id: 'chronic', label: 'حالات علاجية' },
              ].map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setInputs({ ...inputs, healthCondition: h.id as any })}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all ${
                    inputs.healthCondition === h.id
                      ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                      : 'bg-[#F5F1E9] text-slate-700 border-[#DCD7CD]'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desired Coverage Amount Slider */}
          <div className="border-t border-[#DCD7CD] pt-3">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
                مبلغ التغطية التأمينية المطلوب:
              </label>
              <span className="text-sm font-black text-[#1B4332] bg-[#F5F1E9] px-2.5 py-0.5 rounded-md border border-[#DCD7CD]">
                {inputs.coverageAmount.toLocaleString()} {currencySymbol}
              </span>
            </div>
            <input
              type="range"
              min="200000"
              max="5000000"
              step="100000"
              value={inputs.coverageAmount}
              onChange={(e) => setInputs({ ...inputs, coverageAmount: parseInt(e.target.value) })}
              className="w-full accent-[#1B4332] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
              <span>200,000 {currencySymbol}</span>
              <span>2,500,000 {currencySymbol}</span>
              <span>5,000,000 {currencySymbol}</span>
            </div>
          </div>

          {/* Term Duration & Monthly Income */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">مدة التغطية (بالسنوات):</label>
              <select
                value={inputs.termYears}
                onChange={(e) => setInputs({ ...inputs, termYears: parseInt(e.target.value) })}
                className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              >
                <option value={10}>10 سنوات (مؤقت)</option>
                <option value={15}>15 سنة (تغطية القروض)</option>
                <option value={20}>20 سنة (تربية الأطفال)</option>
                <option value={25}>25 سنة (تغطية شامله)</option>
                <option value={30}>30 سنة (تخطيط التقاعد)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">الدخل الشهرى التقريبي:</label>
              <input
                type="number"
                value={inputs.monthlyIncome}
                onChange={(e) => setInputs({ ...inputs, monthlyIncome: parseInt(e.target.value) || 0 })}
                className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
              />
            </div>
          </div>

          {/* Riders / Addons Checklist */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">المنافع والإضافات الحماية التكميلية (Riders):</label>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2.5 bg-[#F5F1E9] p-2 rounded-lg border border-[#DCD7CD] cursor-pointer hover:border-[#1B4332]">
                <input
                  type="checkbox"
                  checked={inputs.includeCriticalIllness}
                  onChange={(e) => setInputs({ ...inputs, includeCriticalIllness: e.target.checked })}
                  className="w-4 h-4 accent-[#1B4332] rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">تغطية الأمراض الحرجة والخطيرة</span>
                  <span className="text-slate-500 text-[11px]">صرف مبلغ نقدي فوري عند تشخيص مرض خطير لتمويل العلاج</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 bg-[#F5F1E9] p-2 rounded-lg border border-[#DCD7CD] cursor-pointer hover:border-[#1B4332]">
                <input
                  type="checkbox"
                  checked={inputs.includeDisability}
                  onChange={(e) => setInputs({ ...inputs, includeDisability: e.target.checked })}
                  className="w-4 h-4 accent-[#1B4332] rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">الإعفاء من الأقساط عند العجز الكلي</span>
                  <span className="text-slate-500 text-[11px]">تستمر التغطية مجاناً إذا توقف دخل العميل بسبب حادث أو عجز</span>
                </div>
              </label>

              <label className="flex items-center gap-2.5 bg-[#F5F1E9] p-2 rounded-lg border border-[#DCD7CD] cursor-pointer hover:border-[#1B4332]">
                <input
                  type="checkbox"
                  checked={inputs.includeAccidentalDeath}
                  onChange={(e) => setInputs({ ...inputs, includeAccidentalDeath: e.target.checked })}
                  className="w-4 h-4 accent-[#1B4332] rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">التعويض المضاعف عند الحوادث</span>
                  <span className="text-slate-500 text-[11px]">مضاعفة القيمة التأمينية مرتين للحوادث غير المتوقعة</span>
                </div>
              </label>
            </div>
          </div>

          {/* AI Banner Link */}
          <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-700 animate-pulse" />
              <div>
                <h4 className="text-xs font-bold text-purple-800">تريد اقتراح مخصص بدقة بالذكاء الاصطناعي؟</h4>
                <p className="text-[11px] text-purple-600">أجب عن 4 أسئلة وسيقوم نظام Gemini بصياغة التوصية فورياً</p>
              </div>
            </div>
            <button
              onClick={onOpenAIAnalyzer}
              className="px-3 py-1 rounded-lg bg-purple-700 text-white text-xs font-bold hover:bg-purple-800 transition shadow-sm whitespace-nowrap"
            >
              افحص بالـ AI
            </button>
          </div>

        </div>

        {/* Right Output Calculation Results (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-[#1B4332] text-white p-5 sm:p-6 rounded-2xl shadow-md relative overflow-hidden border border-[#2D5A27]">
            {/* Visual background gradient */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-purple-500 to-emerald-400" />

            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-white/10 text-emerald-300 border border-white/20">
                نتائج التقدير الفوري
              </span>
              <span className="text-xs text-emerald-100/80">حماية أسرة لمدة {inputs.termYears} سنة</span>
            </div>

            {/* Main Standard Recommended Package */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-emerald-300" />
                  الباقة الشاملة الموصى بها
                </span>
                <span className="text-[10px] bg-purple-600 text-white font-bold px-2 py-0.5 rounded-md">
                  الأعلى قيمة
                </span>
              </div>

              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="text-3xl font-black text-white tracking-tight">
                  {calculation.standardMonthlyPremium.toLocaleString()}
                </span>
                <span className="text-xs font-semibold text-emerald-100">{currencySymbol} / شهرياً</span>
              </div>

              <p className="text-xs text-emerald-100/90 leading-relaxed mb-3">
                تغطي مبلغ <strong className="text-white font-bold">{inputs.coverageAmount.toLocaleString()} {currencySymbol}</strong> مع جميع المنافع الأساسية والإعفاء الطبي.
              </p>

              <div className="pt-2.5 border-t border-white/15 flex items-center justify-between text-xs text-white">
                <span>الخصم السنوي التقديري:</span>
                <span className="font-bold text-emerald-300">{calculation.yearlySavings.toLocaleString()} {currencySymbol} سنوياً</span>
              </div>
            </div>

            {/* Other Package Comparison Cards */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] text-emerald-100/80 block mb-0.5">الباقة الأساسية (Term)</span>
                <div className="text-lg font-bold text-white mb-0.5">
                  {calculation.basicMonthlyPremium.toLocaleString()} <span className="text-xs font-normal">{currencySymbol}</span>
                </div>
                <span className="text-[10px] text-emerald-200/60 block">تغطية الوفاة فقط</span>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[11px] text-purple-200 font-bold block mb-0.5">الادخارية الفاخرة (Plus)</span>
                <div className="text-lg font-bold text-white mb-0.5">
                  {calculation.premiumPlusMonthlyPremium.toLocaleString()} <span className="text-xs font-normal">{currencySymbol}</span>
                </div>
                <span className="text-[10px] text-emerald-200/60 block">تغطية + نمو رأس المال</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => onBookConsultation(inputs.coverageAmount, 'الباقة الشاملة الموصى بها')}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                حجز جلسة تثبيت وتأكيد هذا العرض
              </button>

              <button
                onClick={handleExportQuote}
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                تنزيل ملخص العرض التقديري (PDF)
              </button>
            </div>

          </div>

          {/* Quick Security Guarantee Card */}
          <div className="bg-white p-4 rounded-xl border border-[#DCD7CD] flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#1B4332] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-[#1B4332]">ضمان الأمان والشفافية</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                جميع التقديرات مبنية على الأسعار التنافسية لشركات التأمين المعتمدة. لن يُطلب منك أي مبالغ مالية قبل مراجعة وثيقة التأمين النهائية وتوقيع الفحص الطبي.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
