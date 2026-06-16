/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AutoPartTechnicalDatasheet } from "./types";

export const PRESETS: Record<string, { label: string; data: AutoPartTechnicalDatasheet }> = {
  piston: {
    label: "پیستون موتور EF7 (نمونه پر شده)",
    data: {
      header: {
        companyName: "صنایع تولیدی و مهندسی سروش موتور",
        documentNo: "SM-TD-EF7-3029",
        revision: "02",
        issueDate: "1405/03/26",
        status: "تایید شده نهایی (Active)"
      },
      general: {
        partName: "پیستون موتور خودرو EF7 (ملی)",
        partCode: "902140508",
        vehicle: "سمند LX، دنا، سورن با موتور EF7",
        weight: "295 گرم (±5g)",
        materialGroup: "آلیاژهای آلومینیوم (غیرآهنی)",
        dimensions: "قطر 78.5 میلی‌متر × ارتفاع 48.2 میلی‌متر"
      },
      material: {
        specification: "آلومینیوم-سیلیسیم پیستونی غنی شده (Al-Si12CuNiMg)",
        manufacturingProcess: "ریخته‌گری گرانشی نیمه‌جامد تحت فشار کنترل‌شده (Squeeze Casting)",
        surfaceTreatment: "پوشش‌دهی دامن پیستون با گرافیت روان‌کننده (Moly/Graphite Coating) + آنودایز رینگ‌لند اول",
        heatTreatment: "سخت‌کاری رسوبی (عملیات حرارتی انحلال و پیرسختی مصنوی T6)",
        hardness: "110 - 130 HB"
      },
      parameters: [
        {
          id: "1",
          parameterName: "قطر خارجی بدنه دامن پیستون (Piston Skirt OD)",
          nominalValue: "78.470 mm",
          tolerance: "+0.005 / -0.005 mm",
          testMethod: "دستگاه میکرومتر دیجیتال دما-ثابت"
        },
        {
          id: "2",
          parameterName: "قطر سوراخ گژن‌پین (Gudgeon Pin Bore Diameter)",
          nominalValue: "20.003 mm",
          tolerance: "+0.003 / -0.001 mm",
          testMethod: "سنجش با گیج بادی (Air Gauging System)"
        },
        {
          id: "3",
          parameterName: "عرض شیار رینگ اول سر پیستون (Ring Groove Width)",
          nominalValue: "1.220 mm",
          tolerance: "+0.020 / +0.010 mm",
          testMethod: "پروژکتور اندازه گیری نوری یا پروفایلر"
        },
        {
          id: "4",
          parameterName: "تلرانس هم‌راستایی سوراخ گژن‌پین نسبت به خط تقارن دامن",
          nominalValue: "0.000 mm",
          tolerance: "حداکثر 0.010 mm",
          testMethod: "دستگاه اندازه گیری دقیق سه بعدی (CMM)"
        },
        {
          id: "5",
          parameterName: "زبری سطح دامن پیستون (Surface Roughness Ra)",
          nominalValue: "1.80 µm",
          tolerance: "1.20 µm ~ 2.40 µm",
          testMethod: "دستگاه زبری سنج مکانیکی (Roughness Tester)"
        }
      ],
      tests: [
        {
          id: "t1",
          testName: "آزمون بررسی ساختار میکروسکوپی و توزیع ذرات سیلیسیم (Metallurgical Test)",
          standard: "ASTM E3 / ISO 3057",
          acceptanceCriteria: "توزیع یکنواخت ذرات ریز فاز یوتکتیک و عدم حضور تخلخل گاز یا آخال فلزی مرز دانه‌ای",
          frequency: "۱ نمونه از هر بچ تولید ریخته‌گری (به ازای هر ۵۰۰ قطعه)"
        },
        {
          id: "t2",
          testName: "آزمون سختی‌سنجی برینل (Hardness Testing)",
          standard: "ASTM E10 / ISO 6506-1",
          acceptanceCriteria: "کفایت رنج سختی در محدوده ۱۱۰ تا ۱۳۰ برینل روی تاج پیستون در دمای اتاق",
          frequency: "۱۰۰٪ قطعات پس از خط عملیات حرارتی"
        },
        {
          id: "t3",
          testName: "آزمون ترک‌یابی به روش جریان گردابی و ماوراء بنفش (NDT Crack Detection)",
          standard: "ASTM E1417 / ISO 3452-1",
          acceptanceCriteria: "فقدان هرگونه ترک میکرونی سطحی مویی روی شیار رینگ‌ها و لبه سوراخ گژن‌پین",
          frequency: "۱۰۰٪ قطعات ماشین‌کاری شده"
        },
        {
          id: "t4",
          testName: "اندازه‌گیری چگالی آلیاژ و بالانس وزنی قطعات (Weight Balancing Test)",
          standard: "پک تلورانس کیفی سازندگان (PSA PV30)",
          acceptanceCriteria: "تفاوت وزن قطعات یک دسته حداکثر ±۳ گرم بر روی ترازو کالیبریک",
          frequency: "۱۰۰٪ روی اتوماسیون خروجی خط تولید"
        }
      ],
      packaging: {
        boxType: "جعبه کارتن لمینت شده مجزا با فوم ایمن داخلی پلی‌استایرن ضدضربه",
        boxCapacity: "4 عدد (یک ست رینگ و پیستون موتور کامل)",
        palletCapacity: "240 عدد (60 ست در پالت یورو مهارشده با استرچ فیلم)",
        preservationMethod: "روغن حفاظتی تبخیر شونده ضد زنگ (VCI Oil) + کاغذ هیدروفوب محافظ رطوبت"
      },
      approvals: {
        creatorName: "مهندس مهدی پورعلی",
        creatorTitle: "کارشناس ارشد طراحی و تکوین قطعات",
        checkerName: "مهندس سهراب علوی",
        checkerTitle: "سرپرست کنترل کیفیت و تضمین کیفیت (QA)",
        approverName: "مهندس پورسان",
        approverTitle: "مدیر مهندسی و تکوین محصول سوروش موتور"
      }
    }
  },
  brake_disc: {
    label: "دیسک ترمز چرخ جلو (نمونه پر شده)",
    data: {
      header: {
        companyName: "صنایع تولیدی و مهندسی سروش موتور",
        documentNo: "SM-TD-BD-2015",
        revision: "01",
        issueDate: "1405/01/15",
        status: "تایید شده نهایی (Active)"
      },
      general: {
        partName: "دیسک ترمز خنک‌شونده چرخ جلو پژو 206 تیپ 5",
        partCode: "305411702",
        vehicle: "پژو 206 (تیپ 5 و 6)، پژو 207، رانا",
        weight: "4.85 کیلوگرم",
        materialGroup: "چدن خاکستری آلیاژی",
        dimensions: "قطر خارجی 266 میلی‌متر × ضخامت کل 34 میلی‌متر"
      },
      material: {
        specification: "چدن خاکستری با گرافیت ورقی کلاس GG25 (DIN 1691) غنی‌شده با مس و کروم",
        manufacturingProcess: "ریخته‌گری در ماسه تر قطعه‌بندی تمام اتوماتیک (Disamatic Mold) + تراشکاری CNC دوطرفه همزمان",
        surfaceTreatment: "پوشش ضد زنگ داکرومات الکترواستاتیک (Geomet / Dacromet Coating) طوسی مات در نواحی غیردرگیر",
        heatTreatment: "تنش‌زدایی حرارتی پس از ریخته‌گری جهت حذف تنش‌های پسماند قالب",
        hardness: "180 - 220 HB"
      },
      parameters: [
        {
          id: "1",
          parameterName: "قطر خارجی دیسک ترمز (Outer Diameter)",
          nominalValue: "266.0 mm",
          tolerance: "+0.0 / -0.5 mm",
          testMethod: "کولیس دیجیتال کالیبره شده صنایع"
        },
        {
          id: "2",
          parameterName: "ضخامت لایه های ترمز چرخ جلو (Braking Face Thickness)",
          nominalValue: "22.0 mm",
          tolerance: "+0.10 / -0.10 mm",
          testMethod: "میکرومتر خارجی ضخامت سنج در چهار زاویه"
        },
        {
          id: "3",
          parameterName: "تلرانس تابیدگی صفحه ترمز (Lateral Runout)",
          nominalValue: "0.00 mm",
          tolerance: "최대 0.030 mm (زیر ۳۰ میکرون)",
          testMethod: "پایه ساعت اندیکاتور با دقت ۰.۰۰۱ روی فیکسچر چرخان"
        },
        {
          id: "4",
          parameterName: "ناهمراستایی و لنگی در انطباق مرکزی (Center Bore Runout)",
          nominalValue: "66.0 mm",
          tolerance: "+0.030 / +0.010 mm",
          testMethod: "گیج توپی برون‌بر و لنگی سنج اتوماتیک"
        },
        {
          id: "5",
          parameterName: "زبری سطح ترمز (Surface Finish Ra)",
          nominalValue: "1.20 µm",
          tolerance: "0.80 µm ~ 1.60 µm (پس از عملیات سنگ‌زنی دوار)",
          testMethod: "زبری سنج تماسی در مسیر شعاعی"
        }
      ],
      tests: [
        {
          id: "t1",
          testName: "آزمون ریخته‌گری تست متالوگرافی و بررسی کربن معادل",
          standard: "ASTM A247",
          acceptanceCriteria: "نوع توزیع پولکی گرافیت نوع A با اندازه ۴ تا ۶ و غلبه فاز پرلیتی (بیش از ۹۰٪)",
          frequency: "به صورت ذوب به ذوب (پاتیل ریخته‌گری)"
        },
        {
          id: "t2",
          testName: "آزمون مقاومت تنش شبیه‌سازی ترمز مکرر (Thermal Fatigue / Crack)",
          standard: "استاندارد ملی ISIRI 1835 / استانداردهای پژو PSA",
          acceptanceCriteria: "تحمل ۱۵۰ چرخه گرمایشی بحرانی تا ۶۰۰ درجه سانتیگراد بدون ایجاد ریزترک‌های حرارتی شعاعی",
          frequency: "سالانه یا هنگام تغییر ترکیب ذوب فرمولاسیون"
        },
        {
          id: "t3",
          testName: "آزمون بالانس استاتیکی و دینامیکی دیسک چرخ",
          standard: "ISO 1940 (سطح بالانس G 6.3)",
          acceptanceCriteria: "گشتاور نابالانسی مجاز حداکثر 10 g.mm اعمالی با سنگ‌زنی شیار لبه خارجی دیسک ترمز",
          frequency: "۱۰۰٪ قطعات تولیدی در انتهای خط ماشین‌کاری"
        },
        {
          id: "t4",
          testName: "اندازه‌گیری چگالی و سلامت باطن قطعه با التراسونیک",
          standard: "ASTM E114",
          acceptanceCriteria: "عدم وجود حفره گازی، تخلخل انقباضی و حباب در بدنه پره‌ها و گلویی مرکزی دیسک",
          frequency: "تست اتفاقی روزانه ۵ قطعه از خط تولید"
        }
      ],
      packaging: {
        boxType: "کارتن ضخیم ۵ لایه با لیره کلوخه گیر فوم پلیمری چندوجهی",
        boxCapacity: "2 عدد (جفت دیسک چپ و راست در یک بسته بندی)",
        palletCapacity: "100 عدد (50 کارتن بر روی پالت صنعتی چوبی با بست فلزی تسمه کش)",
        preservationMethod: "پوشش واکس ضد زنگ چسبنده محافظ یا مهارکننده رطوبت با بسته‌های نایلون ضد خوردگی VCI"
      },
      approvals: {
        creatorName: "مهندس رضا علیزاده",
        creatorTitle: "کارشناس متالورژی و ریخته‌گری",
        checkerName: "مهندس حسین نظری",
        checkerTitle: "سرپرست کنترل کیفیت متالوگرافی",
        approverName: "مهندس پورسان",
        approverTitle: "مدیر مهندسی و تکوین محصول سوروش موتور"
      }
    }
  },
  spark_plug: {
    label: "شمع موتور انژکتور (نمونه پر شده)",
    data: {
      header: {
        companyName: "صنایع تولیدی و مهندسی سروش موتور",
        documentNo: "SM-TD-SP-4055",
        revision: "01",
        issueDate: "1405/02/10",
        status: "تایید شده نهایی (Active)"
      },
      general: {
        partName: "شمع موتور انژکتوری بنزینی تک-الکترود پایه کوتاه",
        partCode: "201859030",
        vehicle: "پژو 405، سمند، پراید، پارس با موتورهای XU7 / GT",
        weight: "43 گرم",
        materialGroup: "الکتریکال، فلزات آهنی و سرامیک پرسلان",
        dimensions: "رزوه M14 x 1.25 با طول رزوه 19 میلی‌متر"
      },
      material: {
        specification: "سرامیک عایق آلومینا (Al2O3  > 95%)، بدنه فلزی کربنی لو-دی زینک، هسته الکترود مسی با روکش نیکل",
        manufacturingProcess: "فورج سرد رزوه پوسته فلزی، سینترینگ دمای بالای سرامیک بدنه، پرس مونتاژی شیشه‌ای آب‌بند",
        surfaceTreatment: "پوشش نیکل کروم براق آبکاری شده روی رزوه و شش‌گوش فلزی بدنه بارانی ضد خورندگی",
        heatTreatment: "تمپرینگ پوسته فلزی جهت بهبود استحکام مکانیکی رزوه",
        hardness: "بدنه فلزی: 140 - 165 HV / عایق سرامیک: درجه سختی موس 8"
      },
      parameters: [
        {
          id: "1",
          parameterName: "دهانه شمع (Spark Gap - فاصله بین الکترودها)",
          nominalValue: "0.85 mm",
          tolerance: "+0.03 / -0.03 mm",
          testMethod: "فیلر سنج دیجیتال مخصوص اپتیکی خودکار"
        },
        {
          id: "2",
          parameterName: "مقاومت داخلی هسته شمع (Internal Resistor)",
          nominalValue: "5.0 kΩ",
          tolerance: "محدوده مجاز 3.0 kΩ الی 7.5 kΩ",
          testMethod: "اهم‌متر دیجیتالی دما-ثابت در آزمون الکتریکی"
        },
        {
          id: "3",
          parameterName: "ابعاد دهانه آچار شمع (Hex Cut Size)",
          nominalValue: "16.00 mm",
          tolerance: "+0.00 / -0.15 mm",
          testMethod: "کالیبر دهانه رینگی برو-نرو کارگاهی"
        },
        {
          id: "4",
          parameterName: "گام رزوه پایه (Thread Pitch)",
          nominalValue: "1.250 mm",
          tolerance: "مطابق استاندارد رزوه ISO 965-1",
          testMethod: "شابلون رزوه مرجع و پروجکتور نوری دندانه‌ساز"
        }
      ],
      tests: [
        {
          id: "t1",
          testName: "آزمون تحمل ولتاژ الکتریکی بالای سرامیک (Dielectric Strength)",
          standard: "ISO 11565 / SAE J1208",
          acceptanceCriteria: "مقاومت در برابر تخلیه الکترومغناطیسی با اعمال ولتاژ متناوب ۳۰ کیلوولت بدون شکست عایق",
          frequency: "تست نمونه‌ای نیم درصد بچ تولیدی به صورت ساعتی"
        },
        {
          id: "t2",
          testName: "آزمون نشتی گاز سیلندر تحت فشار کمپرس (Gas Tightness Test)",
          standard: "ISO 11565 clause 5.4",
          acceptanceCriteria: "میزان نشت گاز در دمای ۲۰۰ درجه تحت بار فشار ۲۰ بار کمتر از ۰.۲ سی‌سی بر دقیقه",
          frequency: "۱۰۰٪ قطعات بعد از مرحله مونتاژ شیشه‌ای هسته"
        },
        {
          id: "t3",
          testName: "آزمون مقاومت چسبندگی و کنده شدن ترمینال بالا",
          standard: "JIS D 5101",
          acceptanceCriteria: "توانایی تحمل نیروی کششی مکانیکی مستقیم بیش از ۳۵۰ نیوتن بدون گسست یا پیچش مخرب",
          frequency: "روزانه ۱۰ قطعه از شیفت کاری طراحی و ساخت"
        }
      ],
      packaging: {
        boxType: "هارد باکس کارتنی انفرادی با لوله محافظ پلاستیکی رزوه دور دهانه شمع",
        boxCapacity: "4 عدد در کارتن دستی کوچک مصرف کننده",
        palletCapacity: "2000 عدد شمع موتور (500 کارتن کوچک در مادرکیس مهارشده با پالت چوبی پپ)",
        preservationMethod: "پوشش ژل میکروکوتینگ محافظ روی نوک الکترودها و کلاهک نایلونی محافظت دندانه‌ها"
      },
      approvals: {
        creatorName: "مهندس نیما بهرامی",
        creatorTitle: "کارشناس قطعات برقی و الکترونیک خودرو",
        checkerName: "مهندس سارا فلاح",
        checkerTitle: "سرپرست تضمین کیفیت قطعات های‌تک",
        approverName: "مهندس پورسان",
        approverTitle: "مدیر مهندسی و تکوین محصول سوروش موتور"
      }
    }
  },
  blank: {
    label: "قالب کاملاً خام (آماده پر کردن)",
    data: {
      header: {
        companyName: "صنایع تولیدی و مهندسی سروش موتور",
        documentNo: "SM-TD-XXXX-001",
        revision: "01",
        issueDate: "1405/03/26",
        status: "در حال انتظار تایید / پیش‌نویس"
      },
      general: {
        partName: "[نام قطعه در این بخش وارد شود]",
        partCode: "[کد قطعه یا پارت نامبر]",
        vehicle: "[خودروی مصرفی / مجموعه بالادستی]",
        weight: "[وزن قطعه بر حسب گرم یا کیلوگرم]",
        materialGroup: "[گروه مواد مانند فلزات، پلاستیک‌ها، آب‌بندها]",
        dimensions: "[ابعاد فیزیکی قطعه شامل طول، عرض، ارتفاع، قطر]"
      },
      material: {
        specification: "[استاندارد و گرید متالورژیکی یا پلیمری جنس قطعه]",
        manufacturingProcess: "[روش ساخت مانند تزریق پلاستیک، فورج، ماشین‌کاری، ریخته‌گری]",
        surfaceTreatment: "[پوشش سطحی مانند آبکاری آب‌شیرین، فسفاته، رنگ کوره، داکرومات]",
        heatTreatment: "[عملیات حرارتی مانند پیرسختی، سخت‌کاری سطحی، کوئنچ تمپر یا بدون عملیات]",
        hardness: "[رنج سختی مجاز مانند راکول، برینل یا ویکرز]"
      },
      parameters: [
        {
          id: "1",
          parameterName: "[پارامتر ابعادی یا فیزیکی ۱ - مثال: قطر بوش داخلی]",
          nominalValue: "0.00 mm",
          tolerance: "±0.05 mm",
          testMethod: "[مثال: کولیس دستی / مارکروفورم]"
        },
        {
          id: "2",
          parameterName: "[پارامتر ابعادی یا فیزیکی ۲ - مثال: ضخامت دیواره]",
          nominalValue: "0.00 mm",
          tolerance: "±0.05 mm",
          testMethod: "[مثال: کولیس دیجیتال / ضخامت سنج اولتراسونیک]"
        }
      ],
      tests: [
        {
          id: "t1",
          testName: "[نام تست کنترل کیفی - مثال: آزمون اسپری نمک دوازه ساعته]",
          standard: "[استاندارد مرجع آزمون - مانند ASTM B117 / ISIRI]",
          acceptanceCriteria: "[معیار پذیرش آزمون - مثال: عدم مشاهده شوره قرمز یا تاول سطحی رنگ]",
          frequency: "[تناوب آزمون - فرکانس نمونه برداری - مثال: یک نمونه در هر پارت تولیدی]"
        }
      ],
      packaging: {
        boxType: "[نوع بسته‌بندی - مانند جعبه کارتنی ۵ لایه، نایلون حباب‌دار، جعبه پلاستیکی klt]",
        boxCapacity: "[تعداد قطعه درون هر تک جعبه]",
        palletCapacity: "[تعداد کل قطعه بر روی پالت مادر حمل و نقل]",
        preservationMethod: "[روش ضد زنگ، رطوبت‌گیری یا گریس‌کاری حفاظتی انبار]"
      },
      approvals: {
        creatorName: "[نام و نام‌خانوادگی تهیه کننده]",
        creatorTitle: "کارشناس فنی و طراح مهندسی",
        checkerName: "[نام و نام‌خانوادگی بررسی کننده]",
        checkerTitle: "سرپرست کنترل کیفیت یا آزمایشگاه",
        approverName: "مهندس پورسان",
        approverTitle: "مدیر مهندسی و تکوین محصول سوروش موتور"
      }
    }
  }
};
