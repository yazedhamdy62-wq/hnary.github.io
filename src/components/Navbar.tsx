import React from 'react';
import { ViewMode, CustomerTab, AdminTab } from '../types';
import { 
  Shield, 
  Calculator, 
  Sparkles, 
  GitCompare, 
  Calendar, 
  BookOpen, 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  PhoneCall,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeCustomerTab: CustomerTab;
  setActiveCustomerTab: (tab: CustomerTab) => void;
  activeAdminTab: AdminTab;
  setActiveAdminTab: (tab: AdminTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  setViewMode,
  activeCustomerTab,
  setActiveCustomerTab,
  activeAdminTab,
  setActiveAdminTab,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#F5F1E9]/95 backdrop-blur-md border-b border-[#DCD7CD]">
      {/* Top Banner Accent with Theme Colors */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1B4332] via-[#6D28D9] to-[#2D5A27]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setViewMode('customer'); setActiveCustomerTab('home'); }}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B4332] to-[#6D28D9] flex items-center justify-center text-white shadow-md shadow-purple-900/10 transition hover:scale-105">
              <Shield className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-[#1B4332]">ثقة للتأمين</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 border border-purple-200">
                  ذكاء واستشارات
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links - Customer Mode */}
          {viewMode === 'customer' ? (
            <nav className="hidden lg:flex items-center gap-1 bg-white p-1 rounded-xl border border-[#DCD7CD] shadow-sm">
              <button
                onClick={() => setActiveCustomerTab('home')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeCustomerTab === 'home'
                    ? 'bg-[#1B4332] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-[#F5F1E9] hover:text-[#1B4332]'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                الرئيسية
              </button>

              <button
                onClick={() => setActiveCustomerTab('calculator')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeCustomerTab === 'calculator'
                    ? 'bg-[#1B4332] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-[#F5F1E9] hover:text-[#1B4332]'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                حاسبة الأقساط الذكية
              </button>

              <button
                onClick={() => setActiveCustomerTab('ai-analyzer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeCustomerTab === 'ai-analyzer'
                    ? 'bg-[#6D28D9] text-white shadow-sm shadow-purple-900/20'
                    : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                موصي الذكاء الاصطناعي
              </button>

              <button
                onClick={() => setActiveCustomerTab('compare')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeCustomerTab === 'compare'
                    ? 'bg-[#1B4332] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-[#F5F1E9] hover:text-[#1B4332]'
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                مقارنة البوليصات
              </button>

              <button
                onClick={() => setActiveCustomerTab('booking')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeCustomerTab === 'booking'
                    ? 'bg-[#1B4332] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-[#F5F1E9] hover:text-[#1B4332]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                حجز جلسة استشارة
              </button>

              <button
                onClick={() => setActiveCustomerTab('knowledge')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeCustomerTab === 'knowledge'
                    ? 'bg-[#1B4332] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-[#F5F1E9] hover:text-[#1B4332]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                المكتبة والمدونة
              </button>
            </nav>
          ) : (
            /* Navigation Links - Admin Mode */
            <nav className="hidden lg:flex items-center gap-1 bg-white p-1 rounded-xl border border-[#DCD7CD] shadow-sm">
              <button
                onClick={() => setActiveAdminTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeAdminTab === 'dashboard'
                    ? 'bg-[#6D28D9] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-[#F5F1E9]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                ملخص الإدارة
              </button>

              <button
                onClick={() => setActiveAdminTab('crm')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeAdminTab === 'crm'
                    ? 'bg-[#6D28D9] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-[#F5F1E9]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                إدارة العملاء (CRM)
              </button>

              <button
                onClick={() => setActiveAdminTab('consultations')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeAdminTab === 'consultations'
                    ? 'bg-[#6D28D9] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-[#F5F1E9]'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                المواعيد والعمولات
              </button>

              <button
                onClick={() => setActiveAdminTab('analytics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeAdminTab === 'analytics'
                    ? 'bg-[#6D28D9] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-[#F5F1E9]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                تحليلات القرار
              </button>
            </nav>
          )}

          {/* Right Action Controls: Mode Switcher & Call CTA */}
          <div className="flex items-center gap-2.5">
            
            {/* Switch Mode Button (Customer vs Admin) */}
            <button
              onClick={() => {
                const newMode = viewMode === 'customer' ? 'admin' : 'customer';
                setViewMode(newMode);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                viewMode === 'customer'
                  ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-600 hover:text-white'
                  : 'bg-emerald-50 text-[#1B4332] border-[#DCD7CD] hover:bg-[#1B4332] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              {viewMode === 'customer' ? 'لوحة التحكم للإدارة' : 'واجهة العملاء'}
            </button>

            {/* Quick Consultation CTA */}
            {viewMode === 'customer' && (
              <button
                onClick={() => setActiveCustomerTab('booking')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#2D5A27] text-white text-xs font-bold shadow-sm transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                استشارة مجانية
              </button>
            )}
          </div>
        </div>

        {/* Mobile Horizontal Menu Scrollbar */}
        <div className="flex lg:hidden overflow-x-auto pb-2.5 pt-1 gap-1.5 border-t border-[#DCD7CD]/60 no-scrollbar">
          {viewMode === 'customer' ? (
            <>
              <button
                onClick={() => setActiveCustomerTab('home')}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold ${
                  activeCustomerTab === 'home' ? 'bg-[#1B4332] text-white' : 'bg-white text-slate-700 border border-[#DCD7CD]'
                }`}
              >
                الرئيسية
              </button>
              <button
                onClick={() => setActiveCustomerTab('calculator')}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold ${
                  activeCustomerTab === 'calculator' ? 'bg-[#1B4332] text-white' : 'bg-white text-slate-700 border border-[#DCD7CD]'
                }`}
              >
                حاسبة الأقساط
              </button>
              <button
                onClick={() => setActiveCustomerTab('ai-analyzer')}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold ${
                  activeCustomerTab === 'ai-analyzer' ? 'bg-[#6D28D9] text-white' : 'bg-purple-50 text-purple-700 border border-purple-200'
                }`}
              >
                ✨ تحليلات AI
              </button>
              <button
                onClick={() => setActiveCustomerTab('compare')}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold ${
                  activeCustomerTab === 'compare' ? 'bg-[#1B4332] text-white' : 'bg-white text-slate-700 border border-[#DCD7CD]'
                }`}
              >
                مقارنة البوليصات
              </button>
              <button
                onClick={() => setActiveCustomerTab('booking')}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold ${
                  activeCustomerTab === 'booking' ? 'bg-[#1B4332] text-white' : 'bg-white text-slate-700 border border-[#DCD7CD]'
                }`}
              >
                حجز مواعيد
              </button>
              <button
                onClick={() => setActiveCustomerTab('knowledge')}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold ${
                  activeCustomerTab === 'knowledge' ? 'bg-[#1B4332] text-white' : 'bg-white text-slate-700 border border-[#DCD7CD]'
                }`}
              >
                المكتبة
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveAdminTab('dashboard')}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold ${
                  activeAdminTab === 'dashboard' ? 'bg-[#6D28D9] text-white' : 'bg-purple-50 text-purple-700'
                }`}
              >
                لوحة الإدارة
              </button>
              <button
                onClick={() => setActiveAdminTab('crm')}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold ${
                  activeAdminTab === 'crm' ? 'bg-[#6D28D9] text-white' : 'bg-purple-50 text-purple-700'
                }`}
              >
                إدارة CRM
              </button>
              <button
                onClick={() => setActiveAdminTab('consultations')}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold ${
                  activeAdminTab === 'consultations' ? 'bg-[#6D28D9] text-white' : 'bg-purple-50 text-purple-700'
                }`}
              >
                المواعيد والعمولات
              </button>
              <button
                onClick={() => setActiveAdminTab('analytics')}
                className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-bold ${
                  activeAdminTab === 'analytics' ? 'bg-[#6D28D9] text-white' : 'bg-purple-50 text-purple-700'
                }`}
              >
                تحليلات القرار
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
