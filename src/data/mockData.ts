import { Policy, Consultant, KnowledgeArticle, CRMClient, ConsultationBooking } from '../types';

export const mockPolicies: Policy[] = [
  {
    id: 'pol-1',
    companyName: 'شركة أليانز التأمين بمصر والخليج',
    companyLogo: 'allianz',
    policyName: 'بوليصة الحماية الشاملة للأسر',
    type: 'term',
    typeNameAr: 'تأمين مؤقت (Term Life)',
    monthlyPremium: 180,
    coverageAmount: 1000000,
    minimumAge: 18,
    maximumAge: 60,
    keyBenefits: [
      'تغطية الوفاة الطبيعية أو بالحوادث',
      'إمكانية التجديد حتى سن 70',
      'صرف فوري لمبلغ 100,000 في حالات الطوارئ',
      'أقساط ثابتة لا تتغير مع تقدم العمر'
    ],
    medicalExamRequired: false,
    rating: 4.9,
    cashValueGrowth: false,
    flexiblePayments: true,
    popularBadge: 'الأكثر مبيعاً للشباب',
    riderAddons: ['تغطية الأمراض المزمنة', 'العجز الكلي الدائم']
  },
  {
    id: 'pol-2',
    companyName: 'شركة التعاونية للتأمين',
    companyLogo: 'taawuniya',
    policyName: 'برنامج الأمان والأمان الاستثماري',
    type: 'investment',
    typeNameAr: 'تأمين ادخاري واستثماري (Universal Life)',
    monthlyPremium: 450,
    coverageAmount: 1500000,
    minimumAge: 21,
    maximumAge: 55,
    keyBenefits: [
      'نمو رأس المال بعوائد استثمارية إسلامية',
      'سحب جزئي مرن من القيمة الادخارية بعد 3 سنوات',
      'تغطية حياة تصل لـ 2,000,000',
      'حماية رأس المال المستثمر بالكامل'
    ],
    medicalExamRequired: true,
    rating: 4.8,
    cashValueGrowth: true,
    flexiblePayments: true,
    popularBadge: 'الخيار العائلي الأفضل',
    riderAddons: ['صندوق تعليم الأبناء', 'تغطية الحوادث المضاعفة']
  },
  {
    id: 'pol-3',
    companyName: 'مصر لتأمينات الحياة',
    companyLogo: 'misr-life',
    policyName: 'وثيقة حماية مدى الحياة الذهب',
    type: 'whole',
    typeNameAr: 'تأمين مدى الحياة (Whole Life)',
    monthlyPremium: 620,
    coverageAmount: 2000000,
    minimumAge: 20,
    maximumAge: 65,
    keyBenefits: [
      'تغطية مضمونة لمدى الحياة بدون تاريخ انتهاء',
      'قيمة نقدية متزايدة يمكن الاقتراض بضمانها',
      'أرباح سنوية مضافة للبوليصة',
      'معفاه تماماً من الرسوم والضرائب التركات'
    ],
    medicalExamRequired: true,
    rating: 4.7,
    cashValueGrowth: true,
    flexiblePayments: false,
    popularBadge: 'تخطيط المواريث والتركات',
    riderAddons: ['تغطية أمراض القلب والسرطان', 'التعويض المالي الشهري']
  },
  {
    id: 'pol-4',
    companyName: 'متلايف أليكسبيرت (MetLife)',
    companyLogo: 'metlife',
    policyName: 'بوليصة الدرع الواقي الأحدث',
    type: 'term',
    typeNameAr: 'تأمين مؤقت مرن (Flexible Term)',
    monthlyPremium: 220,
    coverageAmount: 1200000,
    minimumAge: 18,
    maximumAge: 58,
    keyBenefits: [
      'تغطية دولية تشمل العلاج والسفر',
      'بدون فحوصات طبية للمبالغ أقل من مليون',
      'تعديل قيمة التغطية سنوياً حسّب التضخم',
      'خدمة دعم وإعادة تأهيل طبي مجاني'
    ],
    medicalExamRequired: false,
    rating: 4.9,
    cashValueGrowth: false,
    flexiblePayments: true,
    popularBadge: 'الأسرع إصداراً',
    riderAddons: ['تغطية عجز العمل المؤقت', 'مساعدة الجنازة والإجراءات']
  }
];

export const mockConsultants: Consultant[] = [
  {
    id: 'c-1',
    name: 'د. أحمد الشريف',
    title: 'مستشار تخطيط مالي وتأمين حياة معتمد (CLU)',
    specialty: 'تخطيط التركات والتأمين العائلي المركب',
    rating: 4.95,
    reviewsCount: 142,
    experienceYears: 14,
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
    hourlyRate: 0, // Free initial consultation
    isFreeInitial: true,
    availableDays: ['الأحد', 'الثلاثاء', 'الخميس'],
    languages: ['العربية', 'الإنجليزية'],
    bio: 'خبير متخصص في هيكلة وثائق التأمين التكافلي والاستثماري مع خبرة 14 سنة في كبرى الشركات المالية بمصر والخليج.'
  },
  {
    id: 'c-2',
    name: 'أ. سارة منصور',
    title: 'أخصائية إدارة المخاطر وتأمين الأسر',
    specialty: 'تأمين حماية الدخل وتغطيات الأمراض الحرجة',
    rating: 4.88,
    reviewsCount: 98,
    experienceYears: 9,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    hourlyRate: 0,
    isFreeInitial: true,
    availableDays: ['الإثنين', 'الأربعاء', 'السبت'],
    languages: ['العربية', 'الفرنسية'],
    bio: 'ساعدت أكثر من 800 عائلة في صياغة خطة أمان مالي شاملة تضمن تعليم الأطفال وتسديد القروض بمرونة فائقة.'
  },
  {
    id: 'c-3',
    name: 'مهندس / محمود القاضي',
    title: 'مستشار تأمين استثماري وادخاري',
    specialty: 'برامج الادخار للتعليم والتقاعد المبكر',
    rating: 4.92,
    reviewsCount: 115,
    experienceYears: 11,
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    hourlyRate: 150,
    isFreeInitial: false,
    availableDays: ['الأحد', 'الإثنين', 'الأربعاء'],
    languages: ['العربية', 'الإنجليزية'],
    bio: 'متخصص في ربط وثائق التأمين بمحافظ استثمارية إسلامية قليلة المخاطر لتوليد عوائد ادخارية مجزية.'
  }
];

export const mockArticles: KnowledgeArticle[] = [
  {
    id: 'art-1',
    title: 'الفرق الشامل بين التأمين المؤقت (Term) والتأمين مدى الحياة (Whole Life)',
    category: 'أساسيات التأمين',
    readTime: '4 دقائق',
    summary: 'دليل مبسط يشرح الفرق في التكلفة، القيمة الادخارية، ومدة التغطية لمساعدتك في اتخاذ القرار الصح.',
    content: `
عندما تبدأ البحث عن تأمين على الحياة، أول سؤال يواجهك هو: هل أختار "تأمين مؤقت" أم "تأمين مدى الحياة"؟

1. التأمين على الحياة المؤقت (Term Life Insurance):
- الفكرة: يغطيك لفترة زمنية محددة (مثل 10، 20، أو 30 سنة).
- التكلفة: أقساط منخفضة جداً مقارنة بمبلغ التغطية الكبير.
- الهدف: حماية الأسرة في فترة الديون، الرهن العقاري، وتنشئة الأطفال.
- هل يحتوي ادخار؟ لا، إذا انتهت المدة وأنت على قيد الحياة تنتهي التغطية بدون عائد نقدي.

2. التأمين مدى الحياة (Whole Life Insurance):
- الفكرة: يغطيك طوال حياتك طالما تدفع الأقساط.
- التكلفة: أعلى من التأمين المؤقت.
- الهدف: بناء قيمة نقدية (Cash Value) يمكن سحبها أو الاقتراض بضمانها، بالإضافة لتأمين المواريث.
- هل يحتوي ادخار؟ نعم، يتكون فيه رصيد ادخاري ينمو مع الوقت.

الخلاصة: إذا كنت تبحث عن حماية أقصى بميزانية معقولة، فالتأمين المؤقت هو الخيار الأمثل للشباب والأسر الحديثة.
    `,
    icon: 'ShieldCheck',
    publishedDate: '2026-07-15',
    featured: true
  },
  {
    id: 'art-2',
    title: 'كيف تحسب مبلغ التغطية التأمينية المناسب لعائلتك بدون زيادة أو نقصان؟',
    category: 'تخطيط مالي',
    readTime: '5 دقائق',
    summary: 'معادلة DIME الذهبية لحساب مبلغ التأمين الدقيق الذي يحمي مستحقات أطفالك وتسديد الديون.',
    content: `
يعتمد التخطيط المالي الصحيح للتأمين على طريقة حسابية تُسمى قاعدة DIME:

D - Debt (الديون): إجمالي القروض، البطاقات الإئتمانية والالتزامات الحالية.
I - Income (الدخل): ضرب دخلك السنوي في عدد السنوات المطلوبة لتغطية عائلتك (عادة من 5 إلى 10 سنوات).
M - Mortgage (الرهن العقاري): المتبقي من أقساط الشقة أو المنزل.
E - Education (التعليم): مصاريف دراسة الأطفال حتى التخرج الجامعي.

جمع هذه العوامل الأربعة يعطيك الحد الأدنى للتغطية التأمينية التي توفر راحة بال حقيقية لأسرتك.
    `,
    icon: 'Calculator',
    publishedDate: '2026-07-20',
    featured: true
  },
  {
    id: 'art-3',
    title: 'ملحقات البوليصة (Riders): 3 منافع إضافية تجعل وثيقتك قوية جداً',
    category: 'نصائح الخبراء',
    readTime: '3 دقائق',
    summary: 'تعرف على بند الإعفاء من الأقساط، تغطية الأمراض الحرجة، وحوادث السير.',
    content: `
ملحقات البوليصة هي إضافات تزيد من قوة حمايتك بمبالغ زهيدة:
1. بند الإعفاء من دفع الأقساط (Waiver of Premium): في حال إصابتك بعجز يمنعك عن العمل، تتكفل شركة التأمين بدفع جميع الأقساط المتبقية نيابة عنك!
2. تغطية الأمراض المستعصية (Critical Illness): تصرف لك مبلغاً نقدياً فورياً بمجرد تشخيص مرض خطير لتمويل العلاج بدون المساس بمصروف المنزل.
3. التغطية المضاعفة للحوادث (Accidental Death Benefit): تضاعف مبلغ التغطية الأساسية مرتين في حالة الوفاة الناتجة عن حادث.
    `,
    icon: 'PlusCircle',
    publishedDate: '2026-07-25'
  }
];

export const initialCRMData: CRMClient[] = [
  {
    id: 'crm-101',
    name: 'عمر القحطاني',
    phone: '+966 50 123 4567',
    email: 'omar.q@gmail.com',
    age: 38,
    status: 'تم إصدار البوليصة',
    assignedConsultant: 'د. أحمد الشريف',
    requestedCoverage: 1500000,
    preferredPolicyType: 'تأمين حياة مؤقت',
    lastContactDate: '2026-07-28',
    notes: 'تم توقيع الفحص الطبي واختيار بوليصة أليانز مع ملحق الأمراض الحرجة.',
    potentialRevenue: 2400
  },
  {
    id: 'crm-102',
    name: 'م. خالد فاروق',
    phone: '+20 100 888 9911',
    email: 'k.farouk@techcorp.com',
    age: 42,
    status: 'تم الجلسة',
    assignedConsultant: 'أ. سارة منصور',
    requestedCoverage: 2000000,
    preferredPolicyType: 'تأمين ادخاري واستثماري',
    lastContactDate: '2026-07-29',
    notes: 'مهتم جداً بخطة التعليم لأولاده الاثنين. ينتظر جدول التدفقات النقدية.',
    potentialRevenue: 5400
  },
  {
    id: 'crm-103',
    name: 'د. نادية عبدالحميد',
    phone: '+966 55 444 3322',
    email: 'nadia.med@hospital.org',
    age: 34,
    status: 'جديد',
    assignedConsultant: 'لم يحدد بعد',
    requestedCoverage: 1000000,
    preferredPolicyType: 'تأمين مؤقت مرن',
    lastContactDate: '2026-07-29',
    notes: 'أدخلت البيانات عبر حاسبة أقساط التأمين وتطلب مكالمة استشارية مرئية.',
    potentialRevenue: 2100
  },
  {
    id: 'crm-104',
    name: 'يوسف بن مبارك',
    phone: '+965 99 887 766',
    email: 'youssef.mbk@outlook.com',
    age: 49,
    status: 'متابعة',
    assignedConsultant: 'مهندس / محمود القاضي',
    requestedCoverage: 2500000,
    preferredPolicyType: 'تأمين مدى الحياة الذهب',
    lastContactDate: '2026-07-27',
    notes: 'تمت إحالة الملف لقسم الاكتتاب الطبي لإبداء النظر في التغطيات.',
    potentialRevenue: 7400
  }
];

export const initialBookings: ConsultationBooking[] = [
  {
    id: 'bk-501',
    clientName: 'م. خالد فاروق',
    clientPhone: '+20 100 888 9911',
    clientEmail: 'k.farouk@techcorp.com',
    consultantId: 'c-2',
    consultantName: 'أ. سارة منصور',
    date: '2026-07-30',
    timeSlot: '11:00 صباحاً',
    callType: 'video',
    notes: 'مناقشة بوليصة الاستثمار والتأمين التكافلي العائلي',
    status: 'upcoming',
    price: 0,
    createdAt: '2026-07-28'
  },
  {
    id: 'bk-502',
    clientName: 'د. نادية عبدالحميد',
    clientPhone: '+966 55 444 3322',
    clientEmail: 'nadia.med@hospital.org',
    consultantId: 'c-1',
    consultantName: 'د. أحمد الشريف',
    date: '2026-07-31',
    timeSlot: '04:00 مساءً',
    callType: 'video',
    notes: 'جلسة استشارية مجانية أولية لحساب الأقساط',
    status: 'upcoming',
    price: 0,
    createdAt: '2026-07-29'
  }
];
