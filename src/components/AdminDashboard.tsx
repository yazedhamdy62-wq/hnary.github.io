import React, { useState } from 'react';
import { CRMClient, ConsultationBooking, AdminTab } from '../types';
import { initialCRMData, initialBookings, mockConsultants } from '../data/mockData';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Search, 
  Edit, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  BarChart2, 
  PieChart as PieIcon, 
  FileSpreadsheet, 
  Award,
  Filter,
  Sparkles,
  Star,
  MessageSquare,
  ThumbsUp,
  HeartHandshake,
  Smile
} from 'lucide-react';

interface ConsultationFeedback {
  id: string;
  clientName: string;
  consultantId: string;
  consultantName: string;
  rating: number;
  date: string;
  comment: string;
  tags: string[];
  callType: string;
}

const initialFeedbackList: ConsultationFeedback[] = [
  {
    id: 'rev-101',
    clientName: 'عمر القحطاني',
    consultantId: 'c-1',
    consultantName: 'د. أحمد الشريف',
    rating: 5,
    date: '2026-07-28',
    comment: 'جلسة ممتازة جداً وشرح وافي لفرق البوليصة المؤقتة عن الاستثمارية بدون تعقيد واستخدام مصطلحات سهلة.',
    tags: ['وضوح وحيادية', 'احترافية عالية'],
    callType: 'مكالمة فيديو'
  },
  {
    id: 'rev-102',
    clientName: 'م. خالد فاروق',
    consultantId: 'c-2',
    consultantName: 'أ. سارة منصور',
    rating: 5,
    date: '2026-07-27',
    comment: 'أشكر الأستاذة سارة على تفهمها لظروفي العائلية وتجهيز خطة ادخار وتأمين مناسبة جداً لأولادي.',
    tags: ['استجابة سريعة', 'تخطيط عائلي'],
    callType: 'مكالمة فيديو'
  },
  {
    id: 'rev-103',
    clientName: 'د. نادية عبدالحميد',
    consultantId: 'c-1',
    consultantName: 'د. أحمد الشريف',
    rating: 5,
    date: '2026-07-26',
    comment: 'رد سريع وشفافية كاملة في توضيح ملحقات الأمراض الحرجة واستثناءات التغطية.',
    tags: ['دقة بالحسابات', 'شفافية'],
    callType: 'تواصل هاتفي'
  },
  {
    id: 'rev-104',
    clientName: 'يوسف بن مبارك',
    consultantId: 'c-3',
    consultantName: 'مهندس / محمود القاضي',
    rating: 4,
    date: '2026-07-25',
    comment: 'استشارة مفيدة وحسابات دقيقة للعوائد الاستثمارية المتوقعة، التجربة كانت إيجابية جداً.',
    tags: ['دقة بالحسابات', 'عوائد ادخارية'],
    callType: 'مكالمة فيديو'
  },
  {
    id: 'rev-105',
    clientName: 'فهد العتيبي',
    consultantId: 'c-2',
    consultantName: 'أ. سارة منصور',
    rating: 5,
    date: '2026-07-24',
    comment: 'توصيات محايدة تماماً تنم عن خبرة كبيرة في مجال التأمين التكافلي وإدارة المخاطر.',
    tags: ['حيادية ممتازة', 'نصائح قيمة'],
    callType: 'تواصل هاتفي'
  },
  {
    id: 'rev-106',
    clientName: 'سعود الشمري',
    consultantId: 'c-3',
    consultantName: 'مهندس / محمود القاضي',
    rating: 5,
    date: '2026-07-22',
    comment: 'مهندس محمود ساعدني في تحسين القسط الشهري مع الحفاظ على تغطية الوفاة بحوادث.',
    tags: ['مرونة الأقساط', 'احترافية عالية'],
    callType: 'مكالمة فيديو'
  }
];
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie, 
  LineChart, 
  Line 
} from 'recharts';

interface AdminDashboardProps {
  activeAdminTab: AdminTab;
  setActiveAdminTab: (tab: AdminTab) => void;
  crmData: CRMClient[];
  setCrmData: React.Dispatch<React.SetStateAction<CRMClient[]>>;
  bookingsData: ConsultationBooking[];
  setBookingsData: React.Dispatch<React.SetStateAction<ConsultationBooking[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  activeAdminTab,
  setActiveAdminTab,
  crmData,
  setCrmData,
  bookingsData,
  setBookingsData,
}) => {
  // CRM Search & Filter State
  const [crmSearch, setCrmSearch] = useState('');
  const [crmStatusFilter, setCrmStatusFilter] = useState<string>('الكل');

  // Customer Satisfaction Ratings State
  const [feedbackList, setFeedbackList] = useState<ConsultationFeedback[]>(initialFeedbackList);
  const [feedbackSearch, setFeedbackSearch] = useState('');
  const [feedbackConsultantFilter, setFeedbackConsultantFilter] = useState('الكل');
  const [feedbackStarFilter, setFeedbackStarFilter] = useState<number>(0);
  
  // Add Feedback Modal State
  const [showAddFeedbackModal, setShowAddFeedbackModal] = useState(false);
  const [newFbClientName, setNewFbClientName] = useState('');
  const [newFbConsultantId, setNewFbConsultantId] = useState('c-1');
  const [newFbRating, setNewFbRating] = useState(5);
  const [newFbCallType, setNewFbCallType] = useState('مكالمة فيديو');
  const [newFbComment, setNewFbComment] = useState('');

  // CSAT Metrics Calculations
  const overallAvgRating = feedbackList.length > 0
    ? (feedbackList.reduce((sum, item) => sum + item.rating, 0) / feedbackList.length).toFixed(2)
    : '5.0';

  const positiveRatingsCount = feedbackList.filter(f => f.rating >= 4).length;
  const satisfactionRate = Math.round((positiveRatingsCount / Math.max(1, feedbackList.length)) * 100);

  // Filtered Feedback Feed
  const filteredFeedback = feedbackList.filter((fb) => {
    const matchesSearch = fb.clientName.includes(feedbackSearch) || fb.comment.includes(feedbackSearch);
    const matchesConsultant = feedbackConsultantFilter === 'الكل' || fb.consultantName.includes(feedbackConsultantFilter) || fb.consultantId === feedbackConsultantFilter;
    const matchesStars = feedbackStarFilter === 0 || fb.rating === feedbackStarFilter;
    return matchesSearch && matchesConsultant && matchesStars;
  });

  const handleAddFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFbClientName || !newFbComment) return;

    const selectedConsultant = mockConsultants.find(c => c.id === newFbConsultantId) || mockConsultants[0];

    const newEntry: ConsultationFeedback = {
      id: `rev-${Date.now()}`,
      clientName: newFbClientName,
      consultantId: selectedConsultant.id,
      consultantName: selectedConsultant.name,
      rating: newFbRating,
      date: new Date().toISOString().split('T')[0],
      comment: newFbComment,
      tags: newFbRating >= 5 ? ['شفافية كاملة', 'رضا تام'] : ['مكالمة مفيدة'],
      callType: newFbCallType
    };

    setFeedbackList([newEntry, ...feedbackList]);
    setShowAddFeedbackModal(false);
    setNewFbClientName('');
    setNewFbComment('');
    setNewFbRating(5);
  };

  // New Client Form Modal State
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientCoverage, setNewClientCoverage] = useState(1000000);
  const [newClientPolicyType, setNewClientPolicyType] = useState('تأمين مؤقت');

  // Filtered CRM Leads
  const filteredCRM = crmData.filter((client) => {
    const matchesSearch = client.name.includes(crmSearch) || client.phone.includes(crmSearch);
    const matchesStatus = crmStatusFilter === 'الكل' || client.status === crmStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalRevenue = crmData.reduce((acc, curr) => acc + curr.potentialRevenue, 0);
  const totalIssuedCount = crmData.filter((c) => c.status === 'تم إصدار البوليصة').length;
  const conversionRate = Math.round((totalIssuedCount / Math.max(1, crmData.length)) * 100);

  // Chart Data
  const packageDistributionData = [
    { name: 'تأمين مؤقت Term', count: 18, color: '#0F4C3A' },
    { name: 'تأمين ادخاري Universal', count: 12, color: '#6D28D9' },
    { name: 'تأمين مدى الحياة Whole', count: 6, color: '#10B981' },
  ];

  const monthlyRevenueData = [
    { month: 'يناير', revenue: 14000, leads: 22 },
    { month: 'فبراير', revenue: 18500, leads: 29 },
    { month: 'مارس', revenue: 24000, leads: 35 },
    { month: 'أبريل', revenue: 31000, leads: 42 },
    { month: 'مايو', revenue: 28000, leads: 38 },
    { month: 'يونيو', revenue: 39500, leads: 51 },
    { month: 'يوليو', revenue: 45000, leads: 58 },
  ];

  const handleCreateNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientPhone) return;

    const newLead: CRMClient = {
      id: `crm-${Date.now()}`,
      name: newClientName,
      phone: newClientPhone,
      email: newClientEmail || 'lead@example.com',
      age: 35,
      status: 'جديد',
      assignedConsultant: 'د. أحمد الشريف',
      requestedCoverage: newClientCoverage,
      preferredPolicyType: newClientPolicyType,
      lastContactDate: new Date().toISOString().split('T')[0],
      notes: 'عميل جديد مسجل من لوحة التحكم',
      potentialRevenue: Math.round(newClientCoverage * 0.002)
    };

    setCrmData([newLead, ...crmData]);
    setShowAddClientModal(false);
    setNewClientName('');
    setNewClientPhone('');
  };

  const handleUpdateStatus = (id: string, newStatus: CRMClient['status']) => {
    setCrmData(crmData.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Admin Bar Header */}
      <div className="bg-[#6D28D9] text-white p-5 rounded-2xl mb-6 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md border border-[#7C3AED]">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md">
              ADMIN CONTROL PANEL
            </span>
            <span className="text-xs text-white/80">لوحة إدارة الأعمال والمبيعات</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            لوحة تحكم إدارة الاستشارات والـ CRM
          </h1>
        </div>

        <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/20">
          <button
            onClick={() => setActiveAdminTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeAdminTab === 'dashboard' ? 'bg-white text-[#6D28D9] shadow-sm' : 'text-white hover:bg-white/10'
            }`}
          >
            الملخص
          </button>
          <button
            onClick={() => setActiveAdminTab('crm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeAdminTab === 'crm' ? 'bg-white text-[#6D28D9] shadow-sm' : 'text-white hover:bg-white/10'
            }`}
          >
            العملاء (CRM)
          </button>
          <button
            onClick={() => setActiveAdminTab('consultations')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeAdminTab === 'consultations' ? 'bg-white text-[#6D28D9] shadow-sm' : 'text-white hover:bg-white/10'
            }`}
          >
            المواعيد والعمولات
          </button>
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeAdminTab === 'analytics' ? 'bg-white text-[#6D28D9] shadow-sm' : 'text-white hover:bg-white/10'
            }`}
          >
            تحليلات القرار
          </button>
        </div>
      </div>

      {/* KPI Stats Widgets Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
        
        <div className="bg-white p-3.5 rounded-2xl border border-[#DCD7CD] flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">العملاء المستهدفين:</span>
            <div className="text-lg font-black text-[#1B4332] mt-0.5">{crmData.length} عميل</div>
            <span className="text-[10px] text-emerald-600 font-bold">+14% هذا الشهر</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#DCD7CD] flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">معدل التحويل:</span>
            <div className="text-lg font-black text-[#6D28D9] mt-0.5">{conversionRate}%</div>
            <span className="text-[10px] text-[#6D28D9] font-bold">بوليصات مكتملة</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#6D28D9]/10 text-[#6D28D9] flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#DCD7CD] flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">الجلسات المجدولة:</span>
            <div className="text-lg font-black text-[#1B4332] mt-0.5">{bookingsData.length} جلسة</div>
            <span className="text-[10px] text-emerald-600 font-bold">أونلاين وفيديو</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#DCD7CD] flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">رضا العملاء (CSAT):</span>
            <div className="text-lg font-black text-amber-600 mt-0.5 flex items-center gap-1">
              <span>{overallAvgRating}</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[10px] text-amber-700 font-bold">{feedbackList.length} تقييم وارد</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#DCD7CD] flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-slate-500 font-semibold block">إيرادات العمولات:</span>
            <div className="text-lg font-black text-[#1B4332] mt-0.5">{totalRevenue.toLocaleString()} ر.س</div>
            <span className="text-[10px] text-emerald-600 font-bold">تقديري سنوي</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* TAB 1: SUMMARY DASHBOARD */}
      {activeAdminTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Revenue Chart (8 cols) */}
          <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-[#DCD7CD] shadow-sm">
            <h3 className="text-sm font-bold text-[#1B4332] mb-3 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-[#6D28D9]" />
              نمو الإيرادات والعملاء الجدد شهرياً
            </h3>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #DCD7CD', fontSize: '11px' }} />
                  <Bar dataKey="revenue" fill="#1B4332" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Package Share Pie Chart (4 cols) */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-[#DCD7CD] shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-bold text-[#1B4332] mb-3 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-600" />
              توزيع الباقات الأكثر طلباً
            </h3>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={packageDistributionData}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {packageDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs pt-3 border-t border-[#DCD7CD]">
              {packageDistributionData.map((p, idx) => (
                <div key={idx} className="flex justify-between font-semibold">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </span>
                  <span className="text-[#1B4332]">{p.count} طلب</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MINI CRM FOR CLIENT LEADS */}
      {activeAdminTab === 'crm' && (
        <div className="bg-white rounded-2xl border border-[#DCD7CD] p-5 space-y-5 shadow-sm">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#DCD7CD] pb-3">
            <div>
              <h3 className="text-base font-black text-[#1B4332]">نظام إدارة العلاقات مع العملاء (Mini CRM)</h3>
              <p className="text-xs text-slate-500">تسجيل متابعات العملاء واستشارات التأمين وتأكيد العروض</p>
            </div>

            <button
              onClick={() => setShowAddClientModal(true)}
              className="px-3.5 py-2 rounded-xl bg-[#1B4332] hover:bg-[#2D5A27] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              إضافة عميل جديد
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                placeholder="ابحث باسم العميل أو رقم الجوال..."
                value={crmSearch}
                onChange={(e) => setCrmSearch(e.target.value)}
                className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg pr-8 pl-3 py-1.5 text-xs font-medium text-slate-800"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-700">تصفية الحالات:</span>
              <select
                value={crmStatusFilter}
                onChange={(e) => setCrmStatusFilter(e.target.value)}
                className="bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800"
              >
                <option value="الكل">جميع الحالات</option>
                <option value="جديد">جديد</option>
                <option value="تم الجلسة">تم الجلسة</option>
                <option value="متابعة">متابعة</option>
                <option value="تم إصدار البوليصة">تم إصدار البوليصة</option>
              </select>
            </div>
          </div>

          {/* CRM Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-[#F5F1E9] text-[#1B4332] font-bold border-b border-[#DCD7CD]">
                  <th className="p-2.5">اسم العميل والتواصل</th>
                  <th className="p-2.5">المبلغ والتغطية</th>
                  <th className="p-2.5">المستشار المتابع</th>
                  <th className="p-2.5">حالة الطلب</th>
                  <th className="p-2.5">تاريخ آخر تواصل</th>
                  <th className="p-2.5">تحديث الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCD7CD]">
                {filteredCRM.map((client) => (
                  <tr key={client.id} className="hover:bg-[#F5F1E9]/60 transition">
                    <td className="p-2.5 font-bold text-slate-800">
                      <div>{client.name}</div>
                      <div className="text-[10px] text-slate-500 font-normal" dir="ltr">{client.phone}</div>
                    </td>
                    <td className="p-2.5">
                      <span className="font-bold text-[#2D5A27]">{client.requestedCoverage.toLocaleString()} ر.س</span>
                      <span className="block text-[10px] text-slate-500">{client.preferredPolicyType}</span>
                    </td>
                    <td className="p-2.5 text-[#6D28D9] font-semibold">{client.assignedConsultant}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        client.status === 'تم إصدار البوليصة' ? 'bg-emerald-100 text-emerald-800' :
                        client.status === 'تم الجلسة' ? 'bg-purple-100 text-purple-800' :
                        client.status === 'جديد' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-500">{client.lastContactDate}</td>
                    <td className="p-2.5">
                      <select
                        value={client.status}
                        onChange={(e) => handleUpdateStatus(client.id, e.target.value as any)}
                        className="bg-[#F5F1E9] border border-[#DCD7CD] rounded-md px-2 py-0.5 text-[10px] font-bold text-slate-800"
                      >
                        <option value="جديد">جديد</option>
                        <option value="تم الجلسة">تم الجلسة</option>
                        <option value="متابعة">متابعة</option>
                        <option value="تم إصدار البوليصة">تم إصدار البوليصة</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 3: CONSULTATIONS & COMMISSIONS */}
      {activeAdminTab === 'consultations' && (
        <div className="space-y-6">
          
          {/* Consultants Roster with Commission Share */}
          <div className="bg-white rounded-2xl border border-[#DCD7CD] p-5 shadow-sm">
            <h3 className="text-base font-black text-[#1B4332] mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#6D28D9]" />
              جدول أداء المستشارين والعمولات المستحقة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockConsultants.map((consultant) => (
                <div key={consultant.id} className="bg-[#F5F1E9] p-4 rounded-xl border border-[#DCD7CD] space-y-2">
                  <div className="flex items-center gap-2.5">
                    <img src={consultant.avatarUrl} alt={consultant.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-[#1B4332]">{consultant.name}</h4>
                      <p className="text-[10px] text-[#6D28D9] font-bold">{consultant.specialty}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#DCD7CD] text-xs space-y-1 text-slate-700">
                    <div className="flex justify-between">
                      <span>إجمالي الجلسات هذا الشهر:</span>
                      <strong className="text-[#1B4332]">24 جلسة</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>نسبة إغلاق العقود:</span>
                      <strong className="text-emerald-700">68%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>العمولات المحسوبة:</span>
                      <strong className="text-[#6D28D9]">8,400 ر.س</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings Queue */}
          <div className="bg-white rounded-2xl border border-[#DCD7CD] p-5 shadow-sm">
            <h3 className="text-base font-black text-[#1B4332] mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              سجل الاستشارات المحجوزة
            </h3>

            <div className="space-y-2.5">
              {bookingsData.map((b) => (
                <div key={b.id} className="bg-[#F5F1E9] p-3 rounded-xl border border-[#DCD7CD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-xs text-[#1B4332] block">{b.clientName}</span>
                    <span className="text-slate-500 text-[11px]">{b.clientPhone} • {b.notes || 'جلسة استشارية عامة'}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-left sm:text-right">
                      <span className="font-bold text-[#6D28D9] block">{b.consultantName}</span>
                      <span className="text-slate-700 font-semibold text-[11px]">{b.date} الساعة {b.timeSlot}</span>
                    </div>

                    <span className="bg-emerald-100 text-[#1B4332] font-bold px-2.5 py-0.5 rounded-md text-[10px]">
                      {b.status === 'upcoming' ? 'مجدولة قادمة' : 'مكتملة'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOMER SATISFACTION (CSAT) RATING SECTION */}
          <div className="bg-white rounded-2xl border border-[#DCD7CD] p-5 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#DCD7CD] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    تقييم رضا العملاء CSAT
                  </span>
                  <h3 className="text-base font-black text-[#1B4332]">قسم تقييم رضا العملاء الواردة بعد كل استشارة</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">عرض متوسط التقييمات الواردة من العملاء فور الانتهاء من جلسة الاستشارة أونلاين</p>
              </div>

              <button
                onClick={() => setShowAddFeedbackModal(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                تسجيل تقييم جديد
              </button>
            </div>

            {/* Overall CSAT Summary Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#F5F1E9] p-4 rounded-xl border border-[#DCD7CD]">
              <div className="text-center sm:text-right border-b sm:border-b-0 sm:border-l border-[#DCD7CD] pb-2 sm:pb-0 sm:pl-3">
                <span className="text-[11px] text-slate-500 font-semibold block">متوسط التقييم العام:</span>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <span className="text-2xl font-black text-[#1B4332]">{overallAvgRating}</span>
                  <span className="text-xs text-slate-500 font-bold">/ 5.0</span>
                  <div className="flex text-amber-400 mr-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(Number(overallAvgRating)) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-right border-b sm:border-b-0 sm:border-l border-[#DCD7CD] pb-2 sm:pb-0 sm:px-3">
                <span className="text-[11px] text-slate-500 font-semibold block">إجمالي التقييمات:</span>
                <div className="text-xl font-black text-[#6D28D9] mt-1">{feedbackList.length} تقييم مكتمل</div>
                <span className="text-[10px] text-emerald-600 font-bold">نسبة استجابة 94% فورية</span>
              </div>

              <div className="text-center sm:text-right border-b sm:border-b-0 sm:border-l border-[#DCD7CD] pb-2 sm:pb-0 sm:px-3">
                <span className="text-[11px] text-slate-500 font-semibold block">نسبة رضا العملاء العالية:</span>
                <div className="text-xl font-black text-emerald-700 mt-1">{satisfactionRate}%</div>
                <span className="text-[10px] text-emerald-600 font-bold">مؤشر جودة ممتاز</span>
              </div>

              <div className="text-center sm:text-right sm:pr-3">
                <span className="text-[11px] text-slate-500 font-semibold block">أكثر النقاط إشادة:</span>
                <div className="flex flex-wrap gap-1 mt-1.5 justify-center sm:justify-start">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">وضوح الشرح</span>
                  <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-1.5 py-0.5 rounded">الحيادية</span>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded">دقة الحسابات</span>
                </div>
              </div>
            </div>

            {/* Per-Consultant Rating Overview */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#6D28D9]" />
                معدل تقييم رضا العملاء لكل مستشار:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {mockConsultants.map((c) => {
                  const cReviews = feedbackList.filter(f => f.consultantId === c.id || f.consultantName.includes(c.name));
                  const cAvg = cReviews.length > 0 
                    ? (cReviews.reduce((sum, r) => sum + r.rating, 0) / cReviews.length).toFixed(1)
                    : c.rating.toString();
                  const fiveStarCount = cReviews.filter(r => r.rating === 5).length;
                  const percentFive = cReviews.length > 0 ? Math.round((fiveStarCount / cReviews.length) * 100) : 90;

                  return (
                    <div key={c.id} className="bg-[#F5F1E9] p-3.5 rounded-xl border border-[#DCD7CD] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={c.avatarUrl} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <h5 className="font-bold text-xs text-[#1B4332]">{c.name}</h5>
                            <span className="text-[10px] text-slate-500 block">{c.specialty}</span>
                          </div>
                        </div>
                        <div className="bg-amber-100 border border-amber-200 text-amber-800 px-2 py-1 rounded-lg text-left">
                          <div className="text-xs font-black flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {cAvg}
                          </div>
                          <span className="text-[9px] text-slate-500 font-semibold block">{cReviews.length} تقييم</span>
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-600">
                          <span>نسبة تقييم 5 نجوم الممتاز:</span>
                          <span className="text-emerald-700 font-bold">{percentFive}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full rounded-full" style={{ width: `${percentFive}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filter & Live Reviews Feed */}
            <div className="space-y-3 pt-2 border-t border-[#DCD7CD]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#1B4332]" />
                  سجل انطباعات وآراء العملاء الأخيرة ({filteredFeedback.length}):
                </h4>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {/* Search */}
                  <div className="relative flex-1 sm:w-44">
                    <Search className="w-3 h-3 text-slate-400 absolute right-2.5 top-2" />
                    <input
                      type="text"
                      placeholder="بحث بآراء العملاء..."
                      value={feedbackSearch}
                      onChange={(e) => setFeedbackSearch(e.target.value)}
                      className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-md pr-7 pl-2 py-1 text-[11px] text-slate-800"
                    />
                  </div>

                  {/* Consultant Filter */}
                  <select
                    value={feedbackConsultantFilter}
                    onChange={(e) => setFeedbackConsultantFilter(e.target.value)}
                    className="bg-[#F5F1E9] border border-[#DCD7CD] rounded-md px-2 py-1 text-[11px] font-bold text-slate-800"
                  >
                    <option value="الكل">جميع المستشارين</option>
                    {mockConsultants.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>

                  {/* Stars Filter */}
                  <select
                    value={feedbackStarFilter}
                    onChange={(e) => setFeedbackStarFilter(Number(e.target.value))}
                    className="bg-[#F5F1E9] border border-[#DCD7CD] rounded-md px-2 py-1 text-[11px] font-bold text-slate-800"
                  >
                    <option value={0}>جميع النجوم</option>
                    <option value={5}>5 نجوم ★★★★★</option>
                    <option value={4}>4 نجوم ★★★★</option>
                    <option value={3}>3 نجوم ★★★</option>
                  </select>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredFeedback.map((item) => (
                  <div key={item.id} className="bg-[#F5F1E9] p-3.5 rounded-xl border border-[#DCD7CD] space-y-2 hover:border-[#1B4332] transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-xs text-[#1B4332] block">{item.clientName}</span>
                        <span className="text-[10px] text-slate-500 font-medium">جلسة مع: <strong className="text-[#6D28D9]">{item.consultantName}</strong> ({item.callType})</span>
                      </div>

                      <div className="text-left">
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${s <= item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] text-slate-400 block mt-0.5">{item.date}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-white/80 p-2.5 rounded-lg border border-[#DCD7CD]/60 italic">
                      "{item.comment}"
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-200/60">
                            ✓ {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: DECISION SUPPORT ANALYTICS */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6">
          
          <div className="bg-[#1B4332] text-white p-6 sm:p-8 rounded-2xl border border-[#2D5A27] shadow-lg space-y-3.5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-black">تقرير دعم اتخاذ القرار بالذكاء الاصطناعي (Decision Support System)</h3>
            </div>
            
            <p className="text-xs text-white/80 leading-relaxed">
              بناءً على تحليلات زيارات العملاء واستخدام حاسبة أقساط التأمين خلال الشهر الحالي:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs pt-1">
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/15">
                <span className="text-emerald-300 font-bold block mb-1">1. أعلى شريحة طلباً:</span>
                <p className="text-white/90">تغطيات حماية الدخل بقيم تتراوح بين 1,000,000 إلى 2,000,000 ر.س للفئة العمرية 30-45 سنة.</p>
              </div>

              <div className="bg-white/10 p-3.5 rounded-xl border border-white/15">
                <span className="text-purple-300 font-bold block mb-1">2. المزايا الإضافية الأكثر تفضيلاً:</span>
                <p className="text-white/90">82% من العملاء يفضلون إضافة بند الإعفاء من دفع الأقساط عند العجز لتشجيع الأمان الفعلي.</p>
              </div>

              <div className="bg-white/10 p-3.5 rounded-xl border border-white/15">
                <span className="text-emerald-300 font-bold block mb-1">3. توصية التوسع:</span>
                <p className="text-white/90">زيادة عدد جلسات الاستشارة المجانية المرئية يرفع معدل تحويل البوليصات بنسبة 24%.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ADD CLIENT MODAL */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-[#DCD7CD] shadow-xl relative">
            <h3 className="text-base font-black text-[#1B4332] mb-3">تسجيل عميل جديد بـ CRM</h3>

            <form onSubmit={handleCreateNewLead} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">اسم العميل:</label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-1.5 font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">رقم الجوال:</label>
                <input
                  type="tel"
                  required
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-1.5 font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">مبلغ التغطية المطلوبة:</label>
                <input
                  type="number"
                  value={newClientCoverage}
                  onChange={(e) => setNewClientCoverage(parseInt(e.target.value) || 0)}
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-1.5 font-bold text-slate-800"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#1B4332] text-white font-bold hover:bg-[#2D5A27] transition"
                >
                  حفظ العميل
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#F5F1E9] text-slate-800 font-bold hover:bg-[#DCD7CD] transition"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD FEEDBACK MODAL */}
      {showAddFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-[#DCD7CD] shadow-xl relative">
            <div className="flex items-center justify-between border-b border-[#DCD7CD] pb-3 mb-3">
              <h3 className="text-base font-black text-[#1B4332] flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                تسجيل تقييم عميل جديد بعد الاستشارة
              </h3>
              <button
                onClick={() => setShowAddFeedbackModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFeedbackSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">اسم العميل:</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: عبدالله الشمري"
                  value={newFbClientName}
                  onChange={(e) => setNewFbClientName(e.target.value)}
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-1.5 font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">المستشار الذي أدار الجلسة:</label>
                <select
                  value={newFbConsultantId}
                  onChange={(e) => setNewFbConsultantId(e.target.value)}
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-1.5 font-bold text-slate-800"
                >
                  {mockConsultants.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.specialty})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">تقييم العميل بالنجوم:</label>
                <div className="flex items-center gap-2 bg-[#F5F1E9] p-2 rounded-lg border border-[#DCD7CD]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setNewFbRating(s)}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star className={`w-5 h-5 ${s <= newFbRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 mr-2">{newFbRating} من 5 نجوم</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">نوع الجلسة:</label>
                <select
                  value={newFbCallType}
                  onChange={(e) => setNewFbCallType(e.target.value)}
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-1.5 font-bold text-slate-800"
                >
                  <option value="مكالمة فيديو">مكالمة فيديو مرئية</option>
                  <option value="تواصل هاتفي">تواصل هاتفي</option>
                  <option value="جلسة حضورية">جلسة حضورية</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ملاحظات وانطباع العميل:</label>
                <textarea
                  required
                  rows={3}
                  placeholder="اكتب تفاصيل تعليق العميل بعد انتهاء المكالمة..."
                  value={newFbComment}
                  onChange={(e) => setNewFbComment(e.target.value)}
                  className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg p-2 font-medium text-slate-800"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#1B4332] text-white font-bold hover:bg-[#2D5A27] transition"
                >
                  حفظ التقييم
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddFeedbackModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#F5F1E9] text-slate-800 font-bold hover:bg-[#DCD7CD] transition"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
