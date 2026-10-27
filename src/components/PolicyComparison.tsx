import React, { useState, useMemo } from 'react';
import { Policy } from '../types';
import { mockPolicies } from '../data/mockData';
import { 
  GitCompare, 
  ShieldCheck, 
  Star, 
  Check, 
  X, 
  Filter, 
  Zap, 
  PhoneCall, 
  Sparkles,
  ChevronLeft,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface PolicyComparisonProps {
  onSelectPolicyForBooking: (policyName: string, company: string) => void;
}

export const PolicyComparison: React.FC<PolicyComparisonProps> = ({ onSelectPolicyForBooking }) => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'term' | 'whole' | 'investment'>('all');
  const [requireNoMedical, setRequireNoMedical] = useState(false);
  const [requireCashValue, setRequireCashValue] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>(['pol-1', 'pol-2']);
  const [showMatrixModal, setShowMatrixModal] = useState(false);

  // Filtered Policies
  const filteredPolicies = useMemo(() => {
    return mockPolicies.filter((p) => {
      if (selectedTypeFilter !== 'all' && p.type !== selectedTypeFilter) return false;
      if (requireNoMedical && p.medicalExamRequired) return false;
      if (requireCashValue && !p.cashValueGrowth) return false;
      return true;
    });
  }, [selectedTypeFilter, requireNoMedical, requireCashValue]);

  const toggleComparisonSelection = (id: string) => {
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(selectedForComparison.filter((i) => i !== id));
    } else {
      if (selectedForComparison.length >= 3) {
        alert('يمكنك اختيار حتى 3 بوليصات فقط للمقارنة المباشرة');
        return;
      }
      setSelectedForComparison([...selectedForComparison, id]);
    }
  };

  const selectedPoliciesList = useMemo(() => {
    return mockPolicies.filter((p) => selectedForComparison.includes(p.id));
  }, [selectedForComparison]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold border border-[#1B4332]/20 mb-2">
          <GitCompare className="w-4 h-4 text-[#2D5A27]" />
          أداة مقارنة بوليصات الشركات المعتمدة
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1B4332] tracking-tight mb-2">
          مقارنة واضحة وبسيطة بين بوليصات التأمين
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          قارن التغطيات، الأقساط الشهرية، والمزايا التكافلية بين أفضل العروض بأسلوب شفاف يساعدك على اتخاذ القرار الأصوب.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#DCD7CD] mb-6 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
        
        {/* Type Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1 ml-1">
            <Filter className="w-3.5 h-3.5 text-[#1B4332]" />
            نوع البوليصة:
          </span>
          {[
            { id: 'all', label: 'الكل' },
            { id: 'term', label: 'مؤقت (Term Life)' },
            { id: 'investment', label: 'ادخاري واستثماري' },
            { id: 'whole', label: 'مدى الحياة (Whole Life)' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedTypeFilter(type.id as any)}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                selectedTypeFilter === type.id
                  ? 'bg-[#1B4332] text-white shadow-sm'
                  : 'bg-[#F5F1E9] text-slate-700 hover:text-[#1B4332]'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Feature Checkbox Toggles */}
        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={requireNoMedical}
              onChange={(e) => setRequireNoMedical(e.target.checked)}
              className="accent-[#1B4332] rounded w-3.5 h-3.5"
            />
            بدون فحص طبي
          </label>

          <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={requireCashValue}
              onChange={(e) => setRequireCashValue(e.target.checked)}
              className="accent-[#1B4332] rounded w-3.5 h-3.5"
            />
            تتضمن قيمة ادخارية
          </label>
        </div>

      </div>

      {/* Comparison Drawer Sticky Floating Bar if selected */}
      {selectedForComparison.length > 0 && (
        <div className="sticky top-20 z-40 bg-[#1B4332] text-white p-3 rounded-xl shadow-md mb-6 flex items-center justify-between border border-[#2D5A27] transition-all">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
              {selectedForComparison.length}
            </div>
            <div>
              <span className="text-xs font-bold block">بوليصات محددة للمقارنة المباشرة</span>
              <span className="text-[10px] text-emerald-100/70">اضغط لعرض الجدول التفصيلي للخصائص</span>
            </div>
          </div>

          <button
            onClick={() => setShowMatrixModal(true)}
            className="px-3 py-1.5 rounded-lg bg-[#6D28D9] hover:bg-purple-800 text-white text-xs font-bold transition shadow-sm flex items-center gap-1"
          >
            <GitCompare className="w-3.5 h-3.5" />
            فتح جدول المقارنة التفصيلي
          </button>
        </div>
      )}

      {/* Policy Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {filteredPolicies.map((policy) => {
          const isSelected = selectedForComparison.includes(policy.id);

          return (
            <div
              key={policy.id}
              className={`bg-white rounded-2xl p-5 border transition-all duration-200 relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#6D28D9] ring-1 ring-[#6D28D9]/40 shadow-sm'
                  : 'border-[#DCD7CD] hover:border-[#1B4332]/40 hover:shadow-sm'
              }`}
            >
              {/* Popular Badge */}
              {policy.popularBadge && (
                <div className="absolute -top-2.5 right-5 bg-[#1B4332] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-white" />
                  {policy.popularBadge}
                </div>
              )}

              <div>
                {/* Header Info */}
                <div className="flex items-start justify-between mb-2 pt-1">
                  <div>
                    <span className="text-[10px] font-bold text-[#6D28D9] block mb-0.5">
                      {policy.companyName}
                    </span>
                    <h3 className="text-sm font-black text-[#1B4332]">
                      {policy.policyName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 bg-[#F5F1E9] px-2 py-0.5 rounded-md border border-[#DCD7CD] text-xs font-bold text-slate-800">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {policy.rating}
                  </div>
                </div>

                {/* Policy Type Tag */}
                <span className="inline-block px-2 py-0.5 rounded-md bg-[#F5F1E9] text-slate-600 text-[10px] font-bold border border-[#DCD7CD] mb-3">
                  {policy.typeNameAr}
                </span>

                {/* Price & Coverage */}
                <div className="bg-[#F5F1E9] p-3 rounded-xl border border-[#DCD7CD] mb-3">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[11px] text-slate-500 font-medium">القسط الشهرى الابتدائي:</span>
                    <div className="text-xl font-black text-[#1B4332]">
                      {policy.monthlyPremium} <span className="text-xs font-semibold">ر.س / ج.م</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-800 pt-1.5 border-t border-[#DCD7CD]">
                    <span>تغطية التأمين الأساسية:</span>
                    <span className="font-bold text-[#2D5A27]">{policy.coverageAmount.toLocaleString()} ر.س</span>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-xs font-bold text-slate-700 block">أبرز التغطيات والمزايا:</span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {policy.keyBenefits.slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-1.5 pt-3 border-t border-[#DCD7CD]">
                <button
                  onClick={() => toggleComparisonSelection(policy.id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                      : 'bg-[#F5F1E9] text-[#6D28D9] border-[#6D28D9]/30 hover:bg-purple-50'
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  {isSelected ? 'محددة للمقارنة (إلغاء)' : 'إضافة لمصفوفة المقارنة'}
                </button>

                <button
                  onClick={() => onSelectPolicyForBooking(policy.policyName, policy.companyName)}
                  className="w-full py-2 rounded-xl bg-[#1B4332] hover:bg-[#2D5A27] text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  حجز جلسة خصيصاً لهذه البوليصة
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* FULL MATRIX MODAL COMPARISON */}
      {showMatrixModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-5 sm:p-6 border border-[#DCD7CD] shadow-xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#DCD7CD] pb-3 mb-4">
              <div>
                <h3 className="text-base font-black text-[#1B4332] flex items-center gap-2">
                  <GitCompare className="w-5 h-5 text-[#6D28D9]" />
                  مصفوفة المقارنة المباشرة بين الوثائق
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">مقارنة الخصائص الفنية، المزايا والأقساط جانباً إلى جنب</p>
              </div>
              <button
                onClick={() => setShowMatrixModal(false)}
                className="w-8 h-8 rounded-full bg-[#F5F1E9] text-slate-700 hover:bg-[#DCD7CD] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="border-b border-[#DCD7CD]">
                    <th className="p-2.5 bg-[#F5F1E9] font-bold text-[#1B4332] w-1/4">خاصية البوليصة</th>
                    {selectedPoliciesList.map((p) => (
                      <th key={p.id} className="p-2.5 bg-[#F5F1E9] font-bold text-[#6D28D9] text-center border-r border-[#DCD7CD]">
                        <span className="block text-[10px] text-slate-500">{p.companyName}</span>
                        <span className="text-xs font-black text-[#1B4332]">{p.policyName}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCD7CD]">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-800 bg-white">القسط الشهرى الابتدائي</td>
                    {selectedPoliciesList.map((p) => (
                      <td key={p.id} className="p-2.5 text-center border-r border-[#DCD7CD] font-bold text-base text-[#1B4332]">
                        {p.monthlyPremium} ر.س
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-2.5 font-bold text-slate-800 bg-white">مبلغ التغطية الأساسي</td>
                    {selectedPoliciesList.map((p) => (
                      <td key={p.id} className="p-2.5 text-center border-r border-[#DCD7CD] font-bold text-[#2D5A27]">
                        {p.coverageAmount.toLocaleString()} ر.س
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-2.5 font-bold text-slate-800 bg-white">نوع الوثيقة</td>
                    {selectedPoliciesList.map((p) => (
                      <td key={p.id} className="p-2.5 text-center border-r border-[#DCD7CD]">
                        <span className="px-2 py-0.5 rounded bg-[#F5F1E9] text-[10px] font-bold">
                          {p.typeNameAr}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-2.5 font-bold text-slate-800 bg-white">الفحص الطبي المطلوب</td>
                    {selectedPoliciesList.map((p) => (
                      <td key={p.id} className="p-2.5 text-center border-r border-[#DCD7CD]">
                        {p.medicalExamRequired ? (
                          <span className="text-amber-700 font-bold">مطلوب لمبالغ أكبر من مليون</span>
                        ) : (
                          <span className="text-emerald-600 font-bold">غير مطلوب (إفصاح فقط)</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-2.5 font-bold text-slate-800 bg-white">نمو القيمة النقدية (الادخار)</td>
                    {selectedPoliciesList.map((p) => (
                      <td key={p.id} className="p-2.5 text-center border-r border-[#DCD7CD]">
                        {p.cashValueGrowth ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-2.5 font-bold text-slate-800 bg-white">مرونة الأقساط والسحب الجزئي</td>
                    {selectedPoliciesList.map((p) => (
                      <td key={p.id} className="p-2.5 text-center border-r border-[#DCD7CD]">
                        {p.flexiblePayments ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-2.5 font-bold text-slate-800 bg-white">الإضافات التكميلية (Riders)</td>
                    {selectedPoliciesList.map((p) => (
                      <td key={p.id} className="p-2.5 border-r border-[#DCD7CD]">
                        <ul className="space-y-0.5 text-[10px]">
                          {p.riderAddons.map((r, i) => (
                            <li key={i} className="text-slate-600">• {r}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowMatrixModal(false)}
                className="px-5 py-2 rounded-xl bg-[#1B4332] text-white font-bold text-xs hover:bg-[#2D5A27] transition"
              >
                إغلاق المصفوفة
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
