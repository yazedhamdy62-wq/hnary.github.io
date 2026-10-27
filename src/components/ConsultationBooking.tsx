import React, { useState } from 'react';
import { Consultant, ConsultationBooking as BookingType } from '../types';
import { mockConsultants } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  UserCheck, 
  Star, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConsultationBookingProps {
  onNewBookingCreated: (booking: BookingType) => void;
  prefillCoverage?: number;
  prefillPolicyName?: string;
}

export const ConsultationBooking: React.FC<ConsultationBookingProps> = ({
  onNewBookingCreated,
  prefillCoverage,
  prefillPolicyName,
}) => {
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant>(mockConsultants[0]);
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-02');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:00 صباحاً');
  const [callType, setCallType] = useState<'video' | 'audio' | 'in-person'>('video');

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState(
    prefillPolicyName 
      ? `استفسار بخصوص بوليصة: ${prefillPolicyName}` 
      : prefillCoverage 
      ? `مبلغ التغطية المستهدف: ${prefillCoverage.toLocaleString()} ر.س` 
      : ''
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<BookingType | null>(null);

  const timeSlots = [
    '10:00 صباحاً',
    '11:00 صباحاً',
    '01:00 ظهراً',
    '03:00 مساءً',
    '05:00 مساءً',
    '07:00 مساءً'
  ];

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('يُرجى إدخال اسمك ورقم الهاتف للتواصل المحفوظ');
      return;
    }

    const newBooking: BookingType = {
      id: `bk-${Date.now()}`,
      clientName,
      clientPhone,
      clientEmail: clientEmail || 'client@aman-advisory.com',
      consultantId: selectedConsultant.id,
      consultantName: selectedConsultant.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      callType,
      notes: clientNotes,
      status: 'upcoming',
      price: selectedConsultant.hourlyRate,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onNewBookingCreated(newBooking);
    setCreatedBooking(newBooking);
    setIsSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#1B4332]/10 text-[#1B4332] text-xs font-bold border border-[#1B4332]/20 mb-2">
          <Calendar className="w-4 h-4 text-[#2D5A27]" />
          استشارات هاتفية ومرئية أونلاين
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#1B4332] tracking-tight mb-2">
          حجز جلسة استشارة مع مستشاري تأمين الحياة
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          اختر المستشار المفضل والوقت الأنسب للحصول على جلسة مجانية فردية للإجابة عن تساؤلاتك وتصميم التغطية المالية لأسرتك.
        </p>
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Step 1: Consultant Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-2 border-b border-[#DCD7CD] pb-2">
              <UserCheck className="w-4 h-4 text-[#6D28D9]" />
              1. اختر المستشار المالي المعتمد
            </h3>

            <div className="space-y-3">
              {mockConsultants.map((consultant) => {
                const isSelected = selectedConsultant.id === consultant.id;

                return (
                  <div
                    key={consultant.id}
                    onClick={() => setSelectedConsultant(consultant)}
                    className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#1B4332] ring-1 ring-[#1B4332]/30 bg-white shadow-sm'
                        : 'border-[#DCD7CD] hover:border-[#1B4332]/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={consultant.avatarUrl}
                        alt={consultant.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#1B4332]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-[#1B4332]">{consultant.name}</h4>
                          {consultant.isFreeInitial && (
                            <span className="bg-[#1B4332]/10 text-[#1B4332] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#1B4332]/20">
                              جلسة أولى مجانية
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#6D28D9] font-bold mt-0.5">{consultant.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{consultant.bio}</p>

                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-700">
                          <span className="flex items-center gap-1 font-bold text-amber-700">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {consultant.rating} ({consultant.reviewsCount} تقييم)
                          </span>
                          <span>• خبرة {consultant.experienceYears} سنة</span>
                        </div>
                      </div>
                    </div>

                    <div className="self-end sm:self-center shrink-0">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold block text-center ${
                        isSelected ? 'bg-[#1B4332] text-white' : 'bg-[#F5F1E9] text-[#1B4332] border border-[#DCD7CD]'
                      }`}>
                        {isSelected ? 'محدد حالياً' : 'اختيار'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 2: Date & Time Picker */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DCD7CD] space-y-3.5 shadow-sm">
              <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-2 border-b border-[#DCD7CD] pb-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                2. اختر تاريخ وساعة الجلسة
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">التاريخ المحدد:</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">نوع التواصل:</label>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      type="button"
                      onClick={() => setCallType('video')}
                      className={`py-1.5 rounded-md text-[11px] font-bold border ${
                        callType === 'video' ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'bg-[#F5F1E9] text-slate-700 border-[#DCD7CD]'
                      }`}
                    >
                      فيديو
                    </button>
                    <button
                      type="button"
                      onClick={() => setCallType('audio')}
                      className={`py-1.5 rounded-md text-[11px] font-bold border ${
                        callType === 'audio' ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'bg-[#F5F1E9] text-slate-700 border-[#DCD7CD]'
                      }`}
                    >
                      صوتي
                    </button>
                    <button
                      type="button"
                      onClick={() => setCallType('in-person')}
                      className={`py-1.5 rounded-md text-[11px] font-bold border ${
                        callType === 'in-person' ? 'bg-[#1B4332] text-white border-[#1B4332]' : 'bg-[#F5F1E9] text-slate-700 border-[#DCD7CD]'
                      }`}
                    >
                      حضوري
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">المواعيد المتاحة لهذا اليوم:</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition border ${
                        selectedTimeSlot === slot
                          ? 'bg-[#6D28D9] text-white border-[#6D28D9]'
                          : 'bg-[#F5F1E9] text-slate-700 border-[#DCD7CD] hover:border-[#6D28D9]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Step 3: Client Info Form & Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DCD7CD] shadow-sm space-y-3.5">
              <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-2 border-b border-[#DCD7CD] pb-2">
                <ShieldCheck className="w-4 h-4 text-[#1B4332]" />
                3. بيانات التواصل لإرسال رابط الجلسة
              </h3>

              <form onSubmit={handleSubmitBooking} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">الاسم الكامل *:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: عبدالله محمد العلي"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-2 font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">رقم الجوال *:</label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 50 123 4567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-2 font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">البريد الإلكتروني:</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-2 font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">ملاحظات أو أسئلة ترغب في مناقشتها:</label>
                  <textarea
                    rows={3}
                    placeholder="مثال: أريد استفساراً عن تغطية دراسة الأبناء وتوليد عوائد ادخارية..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full bg-[#F5F1E9] border border-[#DCD7CD] rounded-lg px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                  />
                </div>

                {/* Booking Summary Box */}
                <div className="bg-[#1B4332] text-white p-3.5 rounded-xl space-y-1.5">
                  <div className="flex justify-between font-bold text-xs">
                    <span>المستشار المحجوز:</span>
                    <span className="text-emerald-300">{selectedConsultant.name}</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/80">
                    <span>الموعد:</span>
                    <span>{selectedDate} • {selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/80">
                    <span>رسوم الجلسة الأولى:</span>
                    <span className="text-emerald-300 font-bold">
                      {selectedConsultant.hourlyRate === 0 ? 'مجانية بالكامل (0.00)' : `${selectedConsultant.hourlyRate} ر.س`}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#2D5A27] text-white font-bold text-xs transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  تأكيد حجز الجلسة مجاناً
                </button>
              </form>
            </div>

          </div>

        </div>
      ) : (
        /* Booking Confirmation Card */
        <div className="max-w-2xl mx-auto bg-[#1B4332] text-white p-6 sm:p-8 rounded-2xl border border-[#2D5A27] text-center shadow-xl space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-400/40 animate-pulse">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-1">
              تم الحجز بنجاح ومزامنته في النظام
            </span>
            <h2 className="text-xl font-black text-white">
              شكراً لك {createdBooking?.clientName}! تم حجز موعد استشارتك.
            </h2>
          </div>

          <div className="bg-white/10 p-4 rounded-xl border border-white/15 text-right text-xs space-y-1.5 text-white/90">
            <p><strong>المستشار:</strong> {createdBooking?.consultantName}</p>
            <p><strong>التاريخ والوقت:</strong> {createdBooking?.date} في تمام {createdBooking?.timeSlot}</p>
            <p><strong>طريقة التواصل:</strong> {createdBooking?.callType === 'video' ? 'مكالمة فيديو عبر Google Meet' : 'تواصل هاتفي مباشر'}</p>
            <p><strong>رقم الحجز المرجعي:</strong> {createdBooking?.id}</p>
          </div>

          <div className="bg-[#6D28D9]/30 p-3 rounded-lg border border-[#6D28D9]/50 text-xs text-white/90">
            تم إرسال تفاصيل الموعد ورابط المكالمة عبر واتساب ورسالة SMS إلى هاتفك المحمول <strong className="text-white">{createdBooking?.clientPhone}</strong>.
          </div>

          <button
            onClick={() => { setIsSubmitted(false); setClientName(''); }}
            className="px-5 py-2 rounded-xl bg-white text-[#1B4332] font-bold text-xs hover:bg-[#F5F1E9] transition"
          >
            حجز جلسة أخرى
          </button>
        </div>
      )}

    </div>
  );
};
