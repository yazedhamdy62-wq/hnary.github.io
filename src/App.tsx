import React, { useState } from 'react';
import { ViewMode, CustomerTab, AdminTab, ConsultationBooking as BookingType, CRMClient } from './types';
import { initialCRMData, initialBookings, mockPolicies } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SmartCalculator } from './components/SmartCalculator';
import { AINeedsAnalyzer } from './components/AINeedsAnalyzer';
import { PolicyComparison } from './components/PolicyComparison';
import { ConsultationBooking } from './components/ConsultationBooking';
import { KnowledgeBase } from './components/KnowledgeBase';
import { AdminDashboard } from './components/AdminDashboard';
import { 
  Shield, 
  Calculator, 
  Sparkles, 
  GitCompare, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  Star, 
  TrendingUp, 
  Users, 
  Lock, 
  PhoneCall, 
  ArrowLeft,
  ChevronLeft,
  Award,
  Zap,
  HeartHandshake,
  LayoutDashboard
} from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('customer');
  const [activeCustomerTab, setActiveCustomerTab] = useState<CustomerTab>('home');
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('dashboard');

  // Shared state for CRM and Bookings
  const [crmData, setCrmData] = useState<CRMClient[]>(initialCRMData);
  const [bookingsData, setBookingsData] = useState<BookingType[]>(initialBookings);

  // Booking prefills
  const [prefillCoverage, setPrefillCoverage] = useState<number | undefined>(undefined);
  const [prefillPolicyName, setPrefillPolicyName] = useState<string | undefined>(undefined);

  const handleBookFromCalculator = (coverage: number, packageType: string) => {
    setPrefillCoverage(coverage);
    setPrefillPolicyName(`حساب الأقساط - ${packageType}`);
    setActiveCustomerTab('booking');
  };

  const handleBookFromPolicyComparison = (policyName: string, company: string) => {
    setPrefillPolicyName(`${policyName} (${company})`);
    setActiveCustomerTab('booking');
  };

  const handleNewBookingCreated = (booking: BookingType) => {
    setBookingsData([booking, ...bookingsData]);

    // Automatically add to CRM as well
    const newCRMLead: CRMClient = {
      id: `crm-${Date.now()}`,
      name: booking.clientName,
      phone: booking.clientPhone,
      email: booking.clientEmail,
      age: 35,
      status: 'جديد',
      assignedConsultant: booking.consultantName,
      requestedCoverage: prefillCoverage || 1500000,
      preferredPolicyType: prefillPolicyName || 'تأمين حياة عائلي',
      lastContactDate: new Date().toISOString().split('T')[0],
      notes: booking.notes || 'حجز جلسة استشارية أونلاين عبر الموقع',
      potentialRevenue: 2500,
    };

    setCrmData([newCRMLead, ...crmData]);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#1E293B] flex flex-col font-sans selection:bg-[#6D28D9] selection:text-white">
      
      {/* Top Main Navigation */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeCustomerTab={activeCustomerTab}
        setActiveCustomerTab={setActiveCustomerTab}
        activeAdminTab={activeAdminTab}
        setActiveAdminTab={setActiveAdminTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {viewMode === 'customer' && (
          <>
            {/* TAB: HOME PAGE (Overview Landing) */}
            {activeCustomerTab === 'home' && (
              <div className="space-y-12 py-6">
                
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-4 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                  
                  {/* Subtle Background Radial Accent Gradients */}
                  <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#1B4332]/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#6D28D9]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Hero Left Content (7 cols) */}
                    <div className="lg:col-span-7 space-y-5 text-right">
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold border border-[#1B4332]/20">
                        <Shield className="w-4 h-4 text-[#2D5A27]" />
                        <span>منصة استشارات تأمين الحياة الأولى والموثوقة</span>
                      </div>

                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1B4332] leading-tight">
                        تأمين مستقبـل أسرتك، <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4332] via-[#6D28D9] to-[#2D5A27]">
                          بذكاء وشفافية وحسابات دقيقة
                        </span>
                      </h1>

                      <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-2xl">
                        نساعدك في حساب الأقساط التأمينية، اختيار البوليصة المناسبة، واستشارة كبار خبراء تأمين الحياة المعتمدين والمُوصي بالذكاء الاصطناعي مجاناً.
                      </p>

                      {/* Primary Actions */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                          onClick={() => setActiveCustomerTab('calculator')}
                          className="px-5 py-3 rounded-xl bg-[#1B4332] hover:bg-[#2D5A27] text-white font-bold text-xs transition shadow-md flex items-center gap-2 transform hover:-translate-y-0.5"
                        >
                          <Calculator className="w-4 h-4" />
                          حاسبة الأقساط الذكية
                        </button>

                        <button
                          onClick={() => setActiveCustomerTab('ai-analyzer')}
                          className="px-5 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#7C3AED] text-white font-bold text-xs transition shadow-md shadow-purple-900/10 flex items-center gap-2 transform hover:-translate-y-0.5"
                        >
                          <Sparkles className="w-4 h-4 text-purple-200 animate-pulse" />
                          محلل التغطية بالـ AI
                        </button>
                      </div>

                      {/* Trust Badges */}
                      <div className="pt-5 border-t border-[#DCD7CD] flex flex-wrap items-center gap-6 text-xs text-slate-600 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" />
                          <span>100% متوافق مع الضوابط المالية</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-[#6D28D9]" />
                          <span>أكثر من 12,000 عائلة محمية</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>تقييم 4.9/5 من العملاء</span>
                        </div>
                      </div>

                    </div>

                    {/* Hero Right Interactive Quick Portal Box (5 cols) */}
                    <div className="lg:col-span-5">
                      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#DCD7CD] shadow-sm relative overflow-hidden space-y-4">
                        
                        <div className="flex items-center justify-between border-b border-[#DCD7CD] pb-3">
                          <h3 className="text-sm font-extrabold text-[#1B4332] flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#2D5A27]" />
                            الخدمات الأساسية السريعة
                          </h3>
                          <span className="text-[10px] bg-[#1B4332] text-white font-bold px-2 py-0.5 rounded-md">
                            منصة ثقة
                          </span>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="grid grid-cols-1 gap-2.5 text-xs">
                          
                          <div 
                            onClick={() => setActiveCustomerTab('calculator')}
                            className="bg-[#F5F1E9] p-3.5 rounded-xl border border-[#DCD7CD] hover:border-[#1B4332] cursor-pointer transition flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-bold">
                                <Calculator className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-bold text-[#1B4332] group-hover:text-[#2D5A27]">حاسبة الأقساط الذكية</h4>
                                <p className="text-[11px] text-slate-500">ادخل عمرك ودخلك واكتشف القسط الشهري فورياً</p>
                              </div>
                            </div>
                            <ChevronLeft className="w-4 h-4 text-[#1B4332] group-hover:-translate-x-1 transition" />
                          </div>

                          <div 
                            onClick={() => setActiveCustomerTab('ai-analyzer')}
                            className="bg-[#F5F1E9] p-3.5 rounded-xl border border-[#DCD7CD] hover:border-[#6D28D9] cursor-pointer transition flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-[#6D28D9]/10 text-[#6D28D9] flex items-center justify-center font-bold">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-bold text-[#6D28D9] group-hover:text-[#7C3AED]">محلل الاحتياجات بالـ AI</h4>
                                <p className="text-[11px] text-slate-500">توصية ذكية بمبلغ التأمين المناسب لأسرتك</p>
                              </div>
                            </div>
                            <ChevronLeft className="w-4 h-4 text-[#6D28D9] group-hover:-translate-x-1 transition" />
                          </div>

                          <div 
                            onClick={() => setActiveCustomerTab('compare')}
                            className="bg-[#F5F1E9] p-3.5 rounded-xl border border-[#DCD7CD] hover:border-[#1B4332] cursor-pointer transition flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center font-bold">
                                <GitCompare className="w-4 h-4 text-[#2D5A27]" />
                              </div>
                              <div>
                                <h4 className="font-bold text-[#1B4332]">مقارنة البوليصات</h4>
                                <p className="text-[11px] text-slate-500">مقارنة واضحة بين عروض شركات التأمين المعتمدة</p>
                              </div>
                            </div>
                            <ChevronLeft className="w-4 h-4 text-[#1B4332] group-hover:-translate-x-1 transition" />
                          </div>

                          <div 
                            onClick={() => setActiveCustomerTab('booking')}
                            className="bg-[#F5F1E9] p-3.5 rounded-xl border border-[#DCD7CD] hover:border-[#1B4332] cursor-pointer transition flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-bold">
                                <Calendar className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-bold text-[#1B4332]">حجز موعد مع مستشار</h4>
                                <p className="text-[11px] text-slate-500">جلسة استشارية مرئية مجانية بدون التزام</p>
                              </div>
                            </div>
                            <ChevronLeft className="w-4 h-4 text-[#1B4332] group-hover:-translate-x-1 transition" />
                          </div>

                        </div>

                      </div>
                    </div>

                  </div>
                </section>

                {/* Section: Features & Services Highlights */}
                <section className="bg-white py-12 border-y border-[#DCD7CD]">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-10">
                      <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider block mb-1">
                        لماذا تختار منصة ثقة؟
                      </span>
                      <h2 className="text-2xl font-extrabold text-[#1B4332]">
                        استشارة تأمينية متكاملة تضمن أقصى حماية لمستقبلك
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      <div className="bg-[#F5F1E9] p-5 rounded-2xl border border-[#DCD7CD] space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-white flex items-center justify-center font-bold">
                          <Calculator className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-bold text-[#1B4332]">دقة وشفافية الأرقام</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          نحسب لك القسط الشهري ومبلغ التغطية المطلوب بناءً على خوارزميات الاكتتاب المعتمدة بدون أي رسوم خفية.
                        </p>
                      </div>

                      <div className="bg-[#F5F1E9] p-5 rounded-2xl border border-[#DCD7CD] space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#6D28D9] text-white flex items-center justify-center font-bold">
                          <Sparkles className="w-5 h-5 text-purple-200" />
                        </div>
                        <h3 className="text-sm font-bold text-[#6D28D9]">مستشار ذكاء اصطناعي 24/7</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          إجابات فورية واستشارات متخصصة لمقارنة البوليصات وفهم شروط التغطيات المعقدة باللغة العربية.
                        </p>
                      </div>

                      <div className="bg-[#F5F1E9] p-5 rounded-2xl border border-[#DCD7CD] space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center font-bold">
                          <HeartHandshake className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-bold text-[#1B4332]">خبراء معتمدون بشركتك</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          احجز مواعيد استشارية مع أخصائيين مرخصين في تخطيط المواريث، التكافل العائلي، وتأمين حماية الدخل.
                        </p>
                      </div>

                    </div>

                  </div>
                </section>

                {/* Quick Policy Highlights Carousel / Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#1B4332]">أبرز بوليصات التأمين المتاحة</h3>
                      <p className="text-xs text-slate-500 mt-0.5">اختر البوليصة المناسبة أو استخدم أداة المقارنة المباشرة</p>
                    </div>

                    <button
                      onClick={() => setActiveCustomerTab('compare')}
                      className="text-xs font-bold text-[#6D28D9] flex items-center gap-1 hover:underline"
                    >
                      عرض جميع البوليصات والمقارنة
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {mockPolicies.slice(0, 3).map((policy) => (
                      <div key={policy.id} className="bg-white p-5 rounded-2xl border border-[#DCD7CD] shadow-sm space-y-3">
                        <span className="text-[10px] font-bold text-[#6D28D9] bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-md">
                          {policy.companyName}
                        </span>
                        <h4 className="text-sm font-bold text-[#1B4332]">{policy.policyName}</h4>
                        <div className="text-xl font-extrabold text-[#1B4332]">
                          {policy.monthlyPremium} <span className="text-xs font-normal text-slate-500">ر.س / شهرياً</span>
                        </div>
                        <p className="text-xs text-slate-600">تغطية أساسية تصل لـ <strong className="text-[#2D5A27]">{policy.coverageAmount.toLocaleString()} ر.س</strong></p>
                        <button
                          onClick={() => handleBookFromPolicyComparison(policy.policyName, policy.companyName)}
                          className="w-full py-2 rounded-xl bg-[#1B4332] text-white text-xs font-bold hover:bg-[#2D5A27] transition"
                        >
                          استشارة حول هذه البوليصة
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            )}

            {/* TAB: SMART CALCULATOR */}
            {activeCustomerTab === 'calculator' && (
              <SmartCalculator
                onBookConsultation={handleBookFromCalculator}
                onOpenAIAnalyzer={() => setActiveCustomerTab('ai-analyzer')}
              />
            )}

            {/* TAB: AI NEEDS ANALYZER */}
            {activeCustomerTab === 'ai-analyzer' && (
              <AINeedsAnalyzer
                onBookConsultation={(coverage, note) => {
                  setPrefillCoverage(coverage);
                  setPrefillPolicyName(note);
                  setActiveCustomerTab('booking');
                }}
              />
            )}

            {/* TAB: POLICY COMPARISON */}
            {activeCustomerTab === 'compare' && (
              <PolicyComparison
                onSelectPolicyForBooking={handleBookFromPolicyComparison}
              />
            )}

            {/* TAB: CONSULTATION BOOKING */}
            {activeCustomerTab === 'booking' && (
              <ConsultationBooking
                onNewBookingCreated={handleNewBookingCreated}
                prefillCoverage={prefillCoverage}
                prefillPolicyName={prefillPolicyName}
              />
            )}

            {/* TAB: KNOWLEDGE BASE */}
            {activeCustomerTab === 'knowledge' && (
              <KnowledgeBase
                onOpenCalculator={() => setActiveCustomerTab('calculator')}
              />
            )}
          </>
        )}

        {/* ADMIN MODE */}
        {viewMode === 'admin' && (
          <AdminDashboard
            activeAdminTab={activeAdminTab}
            setActiveAdminTab={setActiveAdminTab}
            crmData={crmData}
            setCrmData={setCrmData}
            bookingsData={bookingsData}
            setBookingsData={setBookingsData}
          />
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
