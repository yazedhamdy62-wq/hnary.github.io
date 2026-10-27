import React from 'react';
import { Shield, Phone, Mail, MapPin, Award, Lock, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1B4332] text-white border-t border-[#2D5A27] mt-16 relative overflow-hidden">
      {/* Visual Accent Background Radial Glares */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6D28D9]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2D5A27]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          
          {/* Col 1: About Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-400 border border-white/20">
                <Shield className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">منصة ثقة للتأمين</span>
            </div>
            <p className="text-emerald-100/80 text-xs leading-relaxed mb-4">
              منصتكم الرقمية لاستشارات وتأمين الحياة الذكي. نجمع بين خبرات كبار المستشارين والذكاء الاصطناعي لتأمين مستقبل عائلتك بأسلوب شفاف ومبسط.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>جميع الاستشارات مشفرة ومحميّة بأعلى معايير الخصوصية</span>
            </div>
          </div>

          {/* Col 2: Customer Facing Services */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 border-r-2 border-emerald-400 pr-2.5 uppercase tracking-wider">
              الخدمات المتاحة للعملاء
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li className="hover:text-white transition cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                حاسبة أقساط التأمين الذكية
              </li>
              <li className="hover:text-white transition cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                المُوصي الذكي للتغطية بالذكاء الاصطناعي
              </li>
              <li className="hover:text-white transition cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                أداة مقارنة وثائق التأمين المقترحة
              </li>
              <li className="hover:text-white transition cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                حجز جلسات مرئية مع خبراء معتمدين
              </li>
              <li className="hover:text-white transition cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                مكتبة وموسوعة التوعية التكافلية
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Regulatory */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 border-r-2 border-purple-400 pr-2.5 uppercase tracking-wider">
              المعايير والتراخيص
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                مستشارون معتمدون CLU & RFC
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                متوافق مع هيئات الرقابة المالية للتأمين
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                شراكات مع كبرى شركات التأمين الإقليمية
              </li>
              <li className="text-emerald-100/70 pt-1 font-normal leading-relaxed text-[11px]">
                تنويه: التقديرات المالية الناتجة هي للاسترشاد وبناءً على البيانات المرفقة من قبل العميل.
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Help */}
          <div>
            <h4 className="text-xs font-bold text-white mb-4 border-r-2 border-emerald-400 pr-2.5 uppercase tracking-wider">
              التواصل والدعم الفني
            </h4>
            <div className="space-y-3 text-xs text-emerald-100/80">
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span dir="ltr">+20 800 555 2626</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@thiqa-advisory.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>مركز ثقة المالي - القاهرة والرياض</span>
              </div>
              <div className="pt-1">
                <span className="inline-block px-2.5 py-1 rounded-md bg-white/10 text-white font-semibold text-[10px] border border-white/10">
                  ساعات العمل: 9:00 ص - 9:00 م
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-200/70 gap-3">
          <p>© {new Date().getFullYear()} منصة ثقة لاستشارات تأمين الحياة. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <span>صُممت بعناية لحماية الأسر العربية</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          </div>
        </div>
      </div>
    </footer>
  );
};
