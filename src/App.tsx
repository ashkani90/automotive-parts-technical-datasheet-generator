/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Printer,
  FileText,
  CheckCircle,
  Layers,
  Activity,
  Package,
  UserCheck,
  RefreshCw,
  Info,
  ChevronDown,
  ChevronUp,
  Download
} from "lucide-react";
import { PRESETS } from "./presets";
import { AutoPartTechnicalDatasheet, TechnicalParameter, QualityTest } from "./types";
import { exportToExcel } from "./excelExport";

export default function App() {
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>("piston");
  const [currentData, setCurrentData] = useState<AutoPartTechnicalDatasheet>(
    JSON.parse(JSON.stringify(PRESETS.piston.data))
  );

  // Active tab in controls sidebar
  const [activeTab, setActiveTab] = useState<"general" | "material" | "dimensions" | "quality" | "packaging" | "approvals">("general");

  // Show helpful hint or modal?
  const [showGuide, setShowGuide] = useState<boolean>(true);

  // Handle Preset Selection
  const handlePresetChange = (presetKey: string) => {
    setSelectedPresetKey(presetKey);
    setCurrentData(JSON.parse(JSON.stringify(PRESETS[presetKey].data)));
  };

  // State update helpers
  const updateHeader = (key: string, value: string) => {
    setCurrentData((prev) => ({
      ...prev,
      header: { ...prev.header, [key]: value }
    }));
  };

  const updateGeneral = (key: string, value: string) => {
    setCurrentData((prev) => ({
      ...prev,
      general: { ...prev.general, [key]: value }
    }));
  };

  const updateMaterial = (key: string, value: string) => {
    setCurrentData((prev) => ({
      ...prev,
      material: { ...prev.material, [key]: value }
    }));
  };

  const updatePackaging = (key: string, value: string) => {
    setCurrentData((prev) => ({
      ...prev,
      packaging: { ...prev.packaging, [key]: value }
    }));
  };

  const updateApprovals = (key: string, value: string) => {
    setCurrentData((prev) => ({
      ...prev,
      approvals: { ...prev.approvals, [key]: value }
    }));
  };

  // Technical Parameters Row Handlers
  const handleParamChange = (id: string, key: keyof TechnicalParameter, value: string) => {
    setCurrentData((prev) => ({
      ...prev,
      parameters: prev.parameters.map((p) => (p.id === id ? { ...p, [key]: value } : p))
    }));
  };

  const addParamRow = () => {
    const newId = Date.now().toString();
    const newParam: TechnicalParameter = {
      id: newId,
      parameterName: "پارامتر جدید (مثلاً قطر شفت داخلی)",
      nominalValue: "10.00 mm",
      tolerance: "±0.02 mm",
      testMethod: "کولیس دیجیتال"
    };
    setCurrentData((prev) => ({
      ...prev,
      parameters: [...prev.parameters, newParam]
    }));
  };

  const deleteParamRow = (id: string) => {
    setCurrentData((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((p) => p.id !== id)
    }));
  };

  // Quality Tests Row Handlers
  const handleTestChange = (id: string, key: keyof QualityTest, value: string) => {
    setCurrentData((prev) => ({
      ...prev,
      tests: prev.tests.map((t) => (t.id === id ? { ...t, [key]: value } : t))
    }));
  };

  const addTestRow = () => {
    const newId = Date.now().toString();
    const newTest: QualityTest = {
      id: newId,
      testName: "تست جدید (مثلاً تست چسبندگی رنگ)",
      standard: "ASTM D3359",
      acceptanceCriteria: "عدم کنده‌شدن لبه‌ها کلاس 4B یا بالاتر",
      frequency: "تست تصادفی هر پارت"
    };
    setCurrentData((prev) => ({
      ...prev,
      tests: [...prev.tests, newTest]
    }));
  };

  const deleteTestRow = (id: string) => {
    setCurrentData((prev) => ({
      ...prev,
      tests: prev.tests.filter((t) => t.id !== id)
    }));
  };

  // Export Blank Template directly too!
  const downloadBlankExcel = () => {
    exportToExcel(PRESETS.blank.data);
  };

  const handleExportCurrent = () => {
    exportToExcel(currentData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-rose-100" dir="rtl" id="applet-root">
      
      {/* HEADER BAR - Sleek & Industrial */}
      <header className="bg-slate-900 text-white border-b border-rose-500 py-4 px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md sticky top-0 z-50 print:hidden" id="main-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Layers className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              سامانه مستندسازی شناسنامه فنی قطعات خودرو
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Soroush Motor Engineering & Quality Planning System
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Quick preset selector */}
          <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-300 mr-2 font-medium">الگوی فعال:</span>
            <select
              value={selectedPresetKey}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="bg-slate-900 text-slate-100 text-xs rounded border border-slate-600 py-1.5 px-3 max-w-[210px] focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
            >
              {Object.entries(PRESETS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handlePresetChange(selectedPresetKey)}
            title="بازنشانی فیلدها"
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* QUICK INDUSTRIAL ADVISORY BAR */}
      {showGuide && (
        <div className="bg-rose-50 border-b border-rose-100 px-6 py-3.5 text-slate-800 flex items-start gap-3 transition-all duration-300 print:hidden" id="guide-banner">
          <Info className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm leading-relaxed flex-1">
            <strong className="text-rose-900 font-bold block mb-1">💡 راهنما و توضیحات ممیزی صنعتی:</strong>
            شناسنامه فنی قطعه یا <span className="font-mono font-semibold">"Technical Datasheet"</span> یکی از ارکان کلیدی مدارک تضمین کیفیت خودرویی (<span className="font-semibold">SQA / PPAP</span>) است. اطلاعات زیر مطابق با چارچوب استانداردهای شرکت‌های پژو-سیتروئن (PSA)، سایپا و ساپکو شبیه‌سازی شده است. شما می‌توانید هم اطلاعات هر یک از قطعات نمونه پیش‌فرض را ویرایش کرده و خروجی بگیرید و هم قالب را به طور کامل پاکسازی کنید تا اطلاعات کارگاه خودتان را در آن درج نمایید.
          </div>
          <button
            onClick={() => setShowGuide(false)}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 bg-rose-100 hover:bg-rose-200 px-2.5 py-1 rounded transition self-center"
          >
            متوجه شدم
          </button>
        </div>
      )}

      {/* WORKSPACE DIVIDER */}
      <div className="flex-1 flex flex-col lg:flex-row print:block">
        
        {/* RIGHT SIDEBAR: INTERACTIVE CONTROLS */}
        <aside className="w-full lg:w-[480px] bg-white border-l border-slate-200 flex flex-col shrink-0 print:hidden shadow-inner" id="control-sidebar">
          
          {/* Quick Stats & Action summary */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              پنل تنظیم فیلدهای شناسنامه فنی
            </span>
            <span className="text-[11px] bg-slate-200 text-slate-700 font-mono px-2 py-0.5 rounded font-bold">
              {currentData.parameters.length} پارامتر | {currentData.tests.length} آزمون
            </span>
          </div>

          {/* Quick Export bar */}
          <div className="p-4 bg-rose-50/50 border-b border-rose-100 flex flex-col gap-2">
            <span className="text-xs font-bold text-rose-900">عملیات صدور مستندات فنی: </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleExportCurrent}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition shadow-sm hover:shadow active:scale-98"
              >
                <FileSpreadsheet className="w-4 h-4" />
                دانلود اکسل تکمیل‌شده
              </button>
              <button
                onClick={downloadBlankExcel}
                className="bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition shadow-sm hover:shadow active:scale-98"
              >
                <Download className="w-4 h-4" />
                دانلود قالب نمونه خام
              </button>
            </div>
            <button
              onClick={handlePrint}
              className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              پرینت برگه / ذخیره به صورت PDF
            </button>
          </div>

          {/* Tabs Navigation */}
          <nav className="flex overflow-x-auto border-b border-slate-200 bg-slate-100 shrink-0 select-none scrollbar-none" id="tabs-nav">
            {[
              { id: "general", label: "عمومی و سربرگ", icon: FileText },
              { id: "material", label: "جنس و متالورژی", icon: Layers },
              { id: "dimensions", label: "ابعاد و تلرانس", icon: CheckCircle },
              { id: "quality", label: "آزمون کیفی", icon: Activity },
              { id: "packaging", label: "بسته‌بندی", icon: Package },
              { id: "approvals", label: "تاییدکنندگان", icon: UserCheck }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "border-rose-600 text-rose-700 bg-white shadow-sm"
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Tab Content Section - Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 max-h-[calc(100vh-320px)] lg:max-h-[calc(100vh-250px)]" id="tab-content">
            
            {/* GENERAL TAB */}
            {activeTab === "general" && (
              <div className="space-y-4">
                <div className="p-3 bg-rose-50 text-rose-900 rounded-lg text-xs leading-relaxed font-medium">
                  در این بخش اطلاعات هویتی و اصالت سازمانی مدرک و ویژگی‌های اولیه قطعه را تعیین کنید. اطلاعات سربرگ در سند چاپی و فایل اکسل منعکس خواهد شد.
                </div>

                <div className="border border-slate-200 p-4 rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">مشخصات سند و سربرگ</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">نام سازمان صادرکننده</label>
                    <input
                      type="text"
                      value={currentData.header.companyName}
                      onChange={(e) => updateHeader("companyName", e.target.value)}
                      className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">شماره مدرک (رسمی)</label>
                      <input
                        type="text"
                        value={currentData.header.documentNo}
                        onChange={(e) => updateHeader("documentNo", e.target.value)}
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ویرایش / تجدید نظر</label>
                      <input
                        type="text"
                        value={currentData.header.revision}
                        onChange={(e) => updateHeader("revision", e.target.value)}
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">تاریخ اولین صدور</label>
                      <input
                        type="text"
                        value={currentData.header.issueDate}
                        onChange={(e) => updateHeader("issueDate", e.target.value)}
                        className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">وضعیت تایید مدرک</label>
                      <input
                        type="text"
                        value={currentData.header.status}
                        onChange={(e) => updateHeader("status", e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">مشخصات عمومی قطعه</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">نام قطعه خودرو</label>
                    <input
                      type="text"
                      value={currentData.general.partName}
                      onChange={(e) => updateGeneral("partName", e.target.value)}
                      className="w-full text-sm bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">کد فنی قطعه (پارت نامبر)</label>
                    <input
                      type="text"
                      value={currentData.general.partCode}
                      onChange={(e) => updateGeneral("partCode", e.target.value)}
                      className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">خودروهای مصرفی / مجموعه بالادستی</label>
                    <input
                      type="text"
                      value={currentData.general.vehicle}
                      onChange={(e) => updateGeneral("vehicle", e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">وزن قطعه (تقریبی)</label>
                      <input
                        type="text"
                        value={currentData.general.weight}
                        onChange={(e) => updateGeneral("weight", e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">گروه مواد قطعه</label>
                      <input
                        type="text"
                        value={currentData.general.materialGroup}
                        onChange={(e) => updateGeneral("materialGroup", e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">ابعاد بیرونی کلی (میلی‌متر)</label>
                    <input
                      type="text"
                      value={currentData.general.dimensions}
                      onChange={(e) => updateGeneral("dimensions", e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MATERIAL TAB */}
            {activeTab === "material" && (
              <div className="space-y-4">
                <div className="p-3 bg-rose-50 text-rose-900 rounded-lg text-xs leading-relaxed font-medium">
                  مشخصات شیمیایی جنس پایه، روش‌های فرآوری فیزیکی، روش‌های کنترل متالورژی و استانداردهای عیار قطعه را در این برگه تکمیل کنید.
                </div>

                <div className="border border-slate-200 p-4 rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">مشخصات آلیاژ و تکنولوژی ساخت</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">گرید و استاندارد متالورژی جنس قطعه</label>
                    <textarea
                      rows={2}
                      value={currentData.material.specification}
                      onChange={(e) => updateMaterial("specification", e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">فرآیند تولید قطعه (متدولوژی)</label>
                    <textarea
                      rows={2}
                      value={currentData.material.manufacturingProcess}
                      onChange={(e) => updateMaterial("manufacturingProcess", e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">پوشش‌های سطحی و مقاومت خوردگی</label>
                    <input
                      type="text"
                      value={currentData.material.surfaceTreatment}
                      onChange={(e) => updateMaterial("surfaceTreatment", e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">عملیات حرارتی تایید کننده ویژگی‌ها</label>
                    <input
                      type="text"
                      value={currentData.material.heatTreatment}
                      onChange={(e) => updateMaterial("heatTreatment", e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">رنج یا بازه سختی استاندارد متالورژی</label>
                    <input
                      type="text"
                      value={currentData.material.hardness}
                      onChange={(e) => updateMaterial("hardness", e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* DIMENSIONS / PARAMETERS TAB */}
            {activeTab === "dimensions" && (
              <div className="space-y-4">
                <div className="p-3 bg-rose-50 text-rose-900 rounded-lg text-xs leading-relaxed font-medium">
                  لیست پارامترهای ابعادی، تلرانس مرجع نقشه فنی و ابزار یا تجهیز کنترل کیفیت ممیزی را وارد کنید. برای اضافه کردن سطر کاربری جدید روی دکمه + کلیک نمایید.
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-slate-100 p-2 rounded-lg">
                    <span className="text-xs font-bold text-slate-700">پارامترهای ابعادی نقشه کالیبراسیون</span>
                    <button
                      onClick={addParamRow}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      رو جدید ابعادی
                    </button>
                  </div>

                  {currentData.parameters.map((param, idx) => (
                    <div key={param.id} className="border border-slate-200 p-3 rounded-lg relative space-y-2 bg-slate-50/50">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-2">
                        <span className="text-[11px] font-bold text-slate-400 font-mono">ویژگی ابعادی شماره {idx + 1}</span>
                        <button
                          onClick={() => deleteParamRow(param.id)}
                          className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 transition"
                          title="حذف این سطر"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">عنوان پارامتر (فارسی / انگلیسی)</label>
                          <input
                            type="text"
                            value={param.parameterName}
                            onChange={(e) => handleParamChange(param.id, "parameterName", e.target.value)}
                            className="w-full text-xs bg-white border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500">اندازه اسمی (نامینال)</label>
                            <input
                              type="text"
                              value={param.nominalValue}
                              onChange={(e) => handleParamChange(param.id, "nominalValue", e.target.value)}
                              className="w-full text-xs font-mono bg-white border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500">رنج تلرانس فنی مجاز</label>
                            <input
                              type="text"
                              value={param.tolerance}
                              onChange={(e) => handleParamChange(param.id, "tolerance", e.target.value)}
                              className="w-full text-xs font-mono bg-white border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">دستگاه اندازه‌گیری / آزمون کالیبره</label>
                          <input
                            type="text"
                            value={param.testMethod}
                            onChange={(e) => handleParamChange(param.id, "testMethod", e.target.value)}
                            className="w-full text-xs bg-white border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QUALITY TESTS TAB */}
            {activeTab === "quality" && (
              <div className="space-y-4">
                <div className="p-3 bg-rose-50 text-rose-900 rounded-lg text-xs leading-relaxed font-medium">
                  آزمون‌ها، معایب بحرانی، تاییدیه گواهینامه‌های استاندارد کالیبراسیون یا متولوژی آزمون کار آزمایشگاهی را برای کنترل در خط و دوره‌ای قطعه تنظیم کنید.
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-slate-100 p-2 rounded-lg">
                    <span className="text-xs font-bold text-slate-700">آزمون‌های کنترلی تضمین کیفیت (QA)</span>
                    <button
                      onClick={addTestRow}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      افزودن آزمون جدید
                    </button>
                  </div>

                  {currentData.tests.map((test, idx) => (
                    <div key={test.id} className="border border-slate-200 p-3 rounded-lg relative space-y-2 bg-slate-50/50">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-2">
                        <span className="text-[11px] font-bold text-slate-400 font-mono">آزمون فنی کیفی {idx + 1}</span>
                        <button
                          onClick={() => deleteTestRow(test.id)}
                          className="text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50 transition"
                          title="حذف این سطر"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">موضوع / عنوان آزمون فنی</label>
                          <input
                            type="text"
                            value={test.testName}
                            onChange={(e) => handleTestChange(test.id, "testName", e.target.value)}
                            className="w-full text-xs bg-white border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500">استاندارد مرجع آزمون</label>
                            <input
                              type="text"
                              value={test.standard}
                              onChange={(e) => handleTestChange(test.id, "standard", e.target.value)}
                              className="w-full text-xs bg-white border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500">فرکانس و دوره تکرار آزمون</label>
                            <input
                              type="text"
                              value={test.frequency}
                              onChange={(e) => handleTestChange(test.id, "frequency", e.target.value)}
                              className="w-full text-xs bg-white border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500">معیار قبولی ممیزی (Acceptance Criteria)</label>
                          <textarea
                            rows={2}
                            value={test.acceptanceCriteria}
                            onChange={(e) => handleTestChange(test.id, "acceptanceCriteria", e.target.value)}
                            className="w-full text-xs bg-white border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PACKAGING TAB */}
            {activeTab === "packaging" && (
              <div className="space-y-4">
                <div className="p-3 bg-rose-50 text-rose-900 rounded-lg text-xs leading-relaxed font-medium">
                  جزئیات تدارکات بسته‌بندی، متد مهار رطوبت و ترابری ضد صدمه قطعه خودرو تا تحویل به خط مونتاژ نهایی در این بخش وارد شود.
                </div>

                <div className="border border-slate-200 p-4 rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">مشخصات ترابری و انبارداری</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">نوع بسته‌بندی انفرادی / کارگاهی</label>
                    <input
                      type="text"
                      value={currentData.packaging.boxType}
                      onChange={(e) => updatePackaging("boxType", e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">تعداد ظرفیت در جعبه</label>
                      <input
                        type="text"
                        value={currentData.packaging.boxCapacity}
                        onChange={(e) => updatePackaging("boxCapacity", e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ظرفیت روی پالت صنعتی</label>
                      <input
                        type="text"
                        value={currentData.packaging.palletCapacity}
                        onChange={(e) => updatePackaging("palletCapacity", e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">روش‌های گریس‌کاری / مهارکننده زنگ زدگی و رطوبت</label>
                    <textarea
                      rows={2}
                      value={currentData.packaging.preservationMethod}
                      onChange={(e) => updatePackaging("preservationMethod", e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-1 focus:ring-rose-500 focus:bg-white outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* APPROVALS TAB */}
            {activeTab === "approvals" && (
              <div className="space-y-4">
                <div className="p-3 bg-rose-50 text-rose-900 rounded-lg text-xs leading-relaxed font-medium">
                  در نهایت چرخه کنترل مستندات و تایید صلاحیت فنی قطعه است. برای افزایش صمیمیت و اختصاصی شدن ابزار، نام کاربران پیش‌فرض متناسب با الگوها و کادر فنی سوروش موتور قرار داده شده است.
                </div>

                <div className="border border-slate-200 p-4 rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">چرخه طراحی، بازرس و مدیر فنی</h3>
                  
                  {/* Creator */}
                  <div className="border-b border-slate-100 pb-3 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">بخش اول: تهیه و تدوین سند</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700">نام تهیه کننده</label>
                        <input
                          type="text"
                          value={currentData.approvals.creatorName}
                          onChange={(e) => updateApprovals("creatorName", e.target.value)}
                          className="w-full text-xs bg-slate-50 border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700">سمت سازمانی</label>
                        <input
                          type="text"
                          value={currentData.approvals.creatorTitle}
                          onChange={(e) => updateApprovals("creatorTitle", e.target.value)}
                          className="w-full text-xs bg-slate-50 border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Checker */}
                  <div className="border-b border-slate-100 pb-3 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">بخش دوم: ممیزی و بررسی کیفی (QA)</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700">نام ممیز / بررسی کننده</label>
                        <input
                          type="text"
                          value={currentData.approvals.checkerName}
                          onChange={(e) => updateApprovals("checkerName", e.target.value)}
                          className="w-full text-xs bg-slate-50 border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700">سمت سازمانی ممیز</label>
                        <input
                          type="text"
                          value={currentData.approvals.checkerTitle}
                          onChange={(e) => updateApprovals("checkerTitle", e.target.value)}
                          className="w-full text-xs bg-slate-50 border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Approver */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">بخش سوم: تصویب محصول نهایی (R&D)</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700">نام مدیر تایید کننده</label>
                        <input
                          type="text"
                          value={currentData.approvals.approverName}
                          onChange={(e) => updateApprovals("approverName", e.target.value)}
                          className="w-full text-xs bg-slate-50 border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700">سمت سازمانی مدیر</label>
                        <input
                          type="text"
                          value={currentData.approvals.approverTitle}
                          onChange={(e) => updateApprovals("approverTitle", e.target.value)}
                          className="w-full text-xs bg-slate-50 border border-slate-300 rounded p-1.5 focus:ring-1 focus:ring-rose-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Sidebar Footer branding */}
          <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-[11px] font-mono text-slate-500 shrink-0 select-none">
            Soroush Motor Auto Quality Standard v2.1
          </div>
        </aside>

        {/* LEFT WORKSPACE: LIVE PREVIEW & SIMULATED DATASHEET */}
        <main className="flex-1 bg-slate-200/60 p-6 md:p-8 flex flex-col items-center overflow-y-auto print:bg-white print:p-0" id="preview-workspace">
          
          <div className="w-full max-w-4xl flex justify-between items-center mb-4 print:hidden">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              پیشنویس زنده برگه تایید فنی نهایی قطعه
            </span>
            <div className="text-xs text-slate-500">
              اندازه شبیه‌سازی: <span className="font-mono">A4 Portrait (RTL)</span>
            </div>
          </div>

          {/* SIMULATED A4 DOCUMENT GRAPHIC SHEET */}
          <div
            className="w-full max-w-4xl bg-white border border-slate-300 shadow-xl rounded-sm p-8 md:p-10 text-slate-900 flex flex-col font-sans select-text relative print:border-none print:shadow-none print:p-0"
            style={{ minHeight: "297mm", direction: "rtl" }}
            id="datasheet-print-area"
          >
            
            {/* QUALITY STAMP watermark look */}
            <div className="absolute top-24 left-16 border-4 border-dashed border-emerald-600/20 text-emerald-600/20 rounded-lg px-4 py-1.5 text-xs font-bold tracking-widest font-mono transform -rotate-12 select-none pointer-events-none print:hidden">
              APPROVED SYST.
            </div>

            {/* 1. DOCUMENT SERBARG DESIGN */}
            <div className="border-2 border-slate-800 p-1 mb-6">
              <div className="grid grid-cols-12 text-center items-stretch border border-slate-400">
                
                {/* Logo and Company */}
                <div className="col-span-4 border-l border-slate-400 p-3 flex flex-col justify-center items-center bg-slate-50/50">
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center mb-1">
                    <Layers className="text-white w-5 h-5" />
                  </div>
                  <strong className="text-xs font-bold block leading-relaxed text-slate-900">{currentData.header.companyName}</strong>
                  <span className="text-[9px] font-mono text-slate-500 font-bold block mt-0.5">Soroush Motor Quality Dept.</span>
                </div>

                {/* Doc Title */}
                <div className="col-span-5 border-l border-slate-400 p-3 flex flex-col justify-center items-center">
                  <h2 className="text-sm md:text-base font-extrabold text-slate-900 tracking-wide">شناسنامه فنی قطعه خودرو</h2>
                  <h3 className="text-[10px] font-medium text-slate-500 font-mono tracking-wider mt-1">TECHNICAL PASSPORT & SPECS SHEET</h3>
                </div>

                {/* Doc Metadata */}
                <div className="col-span-3 p-3 flex flex-col justify-center text-right text-[11px] bg-slate-50/50 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">شماره سند:</span>
                    <strong className="font-mono text-xs text-slate-900">{currentData.header.documentNo}</strong>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-0.5">
                    <span className="text-slate-500">شماره ویرایش:</span>
                    <strong className="font-mono text-xs text-slate-900">{currentData.header.revision}</strong>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-0.5">
                    <span className="text-slate-500">تاریخ صدور:</span>
                    <strong className="font-mono text-xs text-slate-900">{currentData.header.issueDate}</strong>
                  </div>
                </div>

              </div>
            </div>

            {/* Block 1: General Info Details */}
            <div className="mb-6">
              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 flex justify-between items-center">
                <span>۱. اطلاعات هویتی و مشخصات فیزیکی قطعه (General Information)</span>
                <span className="text-[10px] font-mono text-slate-300">Section I</span>
              </div>
              
              <div className="border border-t-0 border-slate-400">
                <div className="grid grid-cols-2 border-b border-slate-300">
                  <div className="grid grid-cols-3 border-l border-slate-300 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2 text-xs h-full flex items-center border-l border-slate-200">نام قطعه هویتی:</span>
                    <span className="col-span-2 px-2 py-2 text-xs font-bold text-slate-900">{currentData.general.partName}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2 text-xs h-full flex items-center border-l border-slate-200">کد فنی / پارت نامبر:</span>
                    <span className="col-span-2 px-2 py-2 font-mono font-bold text-xs text-slate-900">{currentData.general.partCode}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b border-slate-300">
                  <div className="grid grid-cols-3 border-l border-slate-300 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2 text-xs h-full flex items-center border-l border-slate-200">خودروی کاربردی:</span>
                    <span className="col-span-2 px-2 py-2 text-xs text-slate-900">{currentData.general.vehicle}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-1.5 text-xs h-full flex items-center border-l border-slate-200">وزن قطعه غایی:</span>
                    <span className="col-span-2 px-2 py-1.5 text-xs font-medium text-slate-900">{currentData.general.weight}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="grid grid-cols-3 border-l border-slate-300 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2 text-xs h-full flex items-center border-l border-slate-200">دسته متالورژی:</span>
                    <span className="col-span-2 px-2 py-2 text-xs text-slate-900">{currentData.general.materialGroup}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2 text-xs h-full flex items-center border-l border-slate-200">ابعاد کلی بدنه:</span>
                    <span className="col-span-2 px-2 py-2 text-xs font-medium text-slate-900">{currentData.general.dimensions}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 2: Material Tech Details */}
            <div className="mb-6">
              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 flex justify-between items-center">
                <span>۲. الزامات مواد پایه، پوشش‌های سطحی و عملیات فرآیندی (Material Specifications)</span>
                <span className="text-[10px] font-mono text-slate-300">Section II</span>
              </div>
              
              <div className="border border-t-0 border-slate-400 text-xs">
                <div className="grid grid-cols-12 border-b border-slate-300 items-stretch">
                  <span className="col-span-3 bg-slate-50 text-slate-600 font-semibold px-3 py-2 flex items-center border-l border-slate-300">آلیاژ / گرید متریال قطعه:</span>
                  <span className="col-span-9 p-3 text-slate-900 font-semibold leading-relaxed">{currentData.material.specification}</span>
                </div>
                
                <div className="grid grid-cols-12 border-b border-slate-300 items-stretch">
                  <span className="col-span-3 bg-slate-50 text-slate-600 font-semibold px-3 py-2 flex items-center border-l border-slate-300">متولوژی فرآیند تولید:</span>
                  <span className="col-span-9 p-3 text-slate-800 leading-relaxed">{currentData.material.manufacturingProcess}</span>
                </div>

                <div className="grid grid-cols-2 border-b border-slate-300 items-stretch">
                  <div className="grid grid-cols-3 border-l border-slate-300 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2 text-xs h-full flex items-center border-l border-slate-200 font-medium">پوشش آبکاری/سطح:</span>
                    <span className="col-span-2 px-2.5 py-2 text-xs text-slate-800">{currentData.material.surfaceTreatment}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2 text-xs h-full flex items-center border-l border-slate-200">عملیات حرارتی:</span>
                    <span className="col-span-2 px-2.5 py-2 text-xs text-slate-800">{currentData.material.heatTreatment}</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 items-stretch">
                  <span className="col-span-3 bg-slate-50 text-slate-600 font-semibold px-3 py-2 flex items-center border-l border-slate-300">محدوده سختی مکانیکی:</span>
                  <span className="col-span-9 px-3 py-2 text-slate-900 font-mono font-bold">{currentData.material.hardness}</span>
                </div>
              </div>
            </div>

            {/* Block 3: Dimensional Parameters Table */}
            <div className="mb-6">
              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 flex justify-between items-center">
                <span>۳. تلرانس‌های بحرانی ابعادی و زبری‌ها (Critical Dimensions & Tolerances)</span>
                <span className="text-[10px] font-mono text-slate-300">Section III</span>
              </div>

              <div className="overflow-x-auto border border-t-0 border-slate-400">
                <table className="w-full text-right text-xs items-stretch">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-400 text-slate-700 font-semibold">
                      <th className="p-2 border-l border-slate-300 text-center w-12">ردیف</th>
                      <th className="p-2 border-l border-slate-300">عنوان ویژگی ابعادی نقشه کالیبر</th>
                      <th className="p-2 border-l border-slate-300 text-center w-32">اندازه اسمی (Nominal)</th>
                      <th className="p-2 border-l border-slate-300 text-center w-32">رنج تلرانس فنی</th>
                      <th className="p-2 text-center w-48">روش ارزیابی / ابزار کنترلی</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.parameters.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-slate-400 italic">هیچ پارامتر کنترل ابعادی ثبت نشده است.</td>
                      </tr>
                    ) : (
                      currentData.parameters.map((p, index) => (
                        <tr key={p.id} className="border-b border-slate-300 hover:bg-slate-50/50 transition">
                          <td className="p-2 text-center border-l border-slate-300 font-mono font-semibold text-slate-500">{index + 1}</td>
                          <td className="p-2 border-l border-slate-300 font-medium text-slate-900">{p.parameterName}</td>
                          <td className="p-2 border-l border-slate-300 text-center font-mono font-bold text-slate-900">{p.nominalValue}</td>
                          <td className="p-2 border-l border-slate-300 text-center font-mono text-rose-700 font-bold">{p.tolerance}</td>
                          <td className="p-2 text-center text-slate-600">{p.testMethod}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Block 4: Quality & Validation Tests table */}
            <div className="mb-6">
              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 flex justify-between items-center">
                <span>۴. الزامات کیفی، تست‌های خستگی و آزمون‌های آزمایشگاهی (Quality Tests)</span>
                <span className="text-[10px] font-mono text-slate-300">Section IV</span>
              </div>

              <div className="overflow-x-auto border border-t-0 border-slate-400">
                <table className="w-full text-right text-xs items-stretch">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-400 text-slate-700 font-semibold">
                      <th className="p-2 border-l border-slate-300 text-center w-12">ردیف</th>
                      <th className="p-2 border-l border-slate-300">نام خط تست / ممیزی فیزیکی</th>
                      <th className="p-2 border-l border-slate-300 text-center w-36">استاندارد تست مرجع</th>
                      <th className="p-2 border-l border-slate-300">معیار پذیرش تضمین کیفیت (Acceptance Criteria)</th>
                      <th className="p-2 text-center w-28">فرکانس ممیزی</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.tests.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-slate-400 italic">هیچ تست کنترل کیفی دوره‌ای ثبت نشده است.</td>
                      </tr>
                    ) : (
                      currentData.tests.map((t, index) => (
                        <tr key={t.id} className="border-b border-slate-300 hover:bg-slate-50/50 transition">
                          <td className="p-2 text-center border-l border-slate-300 font-mono font-semibold text-slate-500">{index + 1}</td>
                          <td className="p-2 border-l border-slate-300 font-semibold text-slate-900">{t.testName}</td>
                          <td className="p-2 border-l border-slate-300 text-center text-slate-700 font-mono text-[10px]">{t.standard}</td>
                          <td className="p-2 border-l border-slate-300 text-slate-600 leading-relaxed text-[11px]">{t.acceptanceCriteria}</td>
                          <td className="p-2 text-center text-slate-700 font-medium text-[11px]">{t.frequency}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Block 5: Packaging Logistics */}
            <div className="mb-6">
              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 flex justify-between items-center">
                <span>۵. ضوابط بسته‌بندی انبارش کارفرمای برون سپاری (Logistics & Warehousing)</span>
                <span className="text-[10px] font-mono text-slate-300">Section V</span>
              </div>

              <div className="border border-t-0 border-slate-400">
                <div className="grid grid-cols-2 border-b border-slate-300">
                  <div className="grid grid-cols-3 border-l border-slate-300 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2 text-xs h-full flex items-center border-l border-slate-200">ظرفیت جعبه انفرادی:</span>
                    <span className="col-span-2 px-2.5 py-2 text-xs text-slate-800 font-medium">{currentData.packaging.boxType}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2 text-xs h-full flex items-center border-l border-slate-200">تعداد در هر کارتن:</span>
                    <span className="col-span-2 px-2.5 py-2 text-xs font-bold text-slate-900">{currentData.packaging.boxCapacity}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 h-full items-stretch">
                  <div className="grid grid-cols-3 border-l border-slate-300 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2.5 text-xs h-full flex items-center border-l border-slate-200">ظرفیت چیدمان پالت:</span>
                    <span className="col-span-2 px-2.5 py-2.5 text-xs font-bold text-slate-900">{currentData.packaging.palletCapacity}</span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <span className="col-span-1 bg-slate-50 text-slate-600 font-semibold px-2 py-2.5 text-xs h-full flex items-center border-l border-slate-200 font-medium">پوشش حفاظتی رطوبتی:</span>
                    <span className="col-span-2 px-2.5 py-2.5 text-xs text-slate-800 leading-relaxed">{currentData.packaging.preservationMethod}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 6: Approvals Signatures matrix */}
            <div className="mt-auto pt-6"> {/* mt-auto pushes approvals to the extreme bottom if page expands, like a true form paper */}
              <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 flex justify-between items-center">
                <span>۶. کادر تایید و صحه‌گذاری مستندات فنی تضمین کیفیت</span>
                <span className="text-[10px] font-mono text-slate-300">Section VI</span>
              </div>

              <div className="border border-t-0 border-slate-400">
                <div className="grid grid-cols-3 text-center text-xs items-stretch">
                  
                  {/* Creator */}
                  <div className="border-l border-slate-300 p-3 h-full flex flex-col justify-between min-h-[100px]">
                    <div>
                      <span className="text-slate-500 block mb-1">تهیه و تدوین کننده</span>
                      <strong className="text-slate-900 block font-bold text-[12px]">{currentData.approvals.creatorName}</strong>
                      <span className="text-[10px] text-slate-500">{currentData.approvals.creatorTitle}</span>
                    </div>
                    <div className="text-[9px] text-slate-400 border-t border-slate-100 pt-2 font-mono">امضا دیجیتال / فیزیکی</div>
                  </div>

                  {/* Checker */}
                  <div className="border-l border-slate-300 p-3 h-full flex flex-col justify-between min-h-[100px]">
                    <div>
                      <span className="text-slate-500 block mb-1">بررسی کننده کنترل کیفی</span>
                      <strong className="text-slate-900 block font-bold text-[12px]">{currentData.approvals.checkerName}</strong>
                      <span className="text-[10px] text-slate-500">{currentData.approvals.checkerTitle}</span>
                    </div>
                    <div className="text-[9px] text-slate-400 border-t border-slate-100 pt-2 font-mono">امضا دیوان تضمین کیفیت</div>
                  </div>

                  {/* Approver */}
                  <div className="p-3 h-full flex flex-col justify-between min-h-[100px]">
                    <div>
                      <span className="text-slate-500 block mb-1">تایید کننده نهایی مهندسی</span>
                      <strong className="text-slate-950 block font-extrabold text-[12px]">{currentData.approvals.approverName}</strong>
                      <span className="text-[10px] text-slate-600 font-semibold">{currentData.approvals.approverTitle}</span>
                    </div>
                    <div className="text-[9px] text-rose-700 bg-rose-50 border border-rose-200/50 rounded-sm py-0.5 font-bold animate-pulse">
                      ▲ صحه‌گذاری نهایی شد (APPROVED)
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Standard quality foot stamp */}
            <div className="mt-6 pt-2 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>ISO 9001:2015 & IATF 16949 Certified Facility Standard documentation plan</span>
              <span>مدرک انحصاری صنایع تولیدی سوروش موتور</span>
            </div>

          </div>

          {/* Quick PDF / Print visual clue */}
          <div className="w-full max-w-4xl mt-6 bg-slate-900 text-slate-200 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <Printer className="text-rose-500 w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">آماده تحویل به ممیزی یا همکاران کارگاه؟</p>
                <p className="text-xs text-slate-400 mt-1">با کلیک روی گزینه‌های پرینت می‌توانید برگه فوق را به صورت مستقیم چاپ کنید یا خروجی PDF با حاشیه چاپ خودکار ایجاد کنید.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition"
              >
                پرینت برگه / دانلود PDF
              </button>
            </div>
          </div>

        </main>

      </div>

    </div>
  );
}
