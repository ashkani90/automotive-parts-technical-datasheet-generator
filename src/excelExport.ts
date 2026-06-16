/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as XLSX from "xlsx";
import { AutoPartTechnicalDatasheet } from "./types";

/**
 * Generates and downloads a beautifully styled and RTL-formatted Excel file
 * representing the technical datasheet of an automotive part.
 */
export function exportToExcel(datasheet: AutoPartTechnicalDatasheet) {
  // 1. Prepare rows matrix
  const matrix: any[][] = [];
  const merges: XLSX.Range[] = [];

  // Helper to push a row and keep track of actual indices
  const appendRow = (rowItems: any[]): number => {
    matrix.push(rowItems);
    return matrix.length - 1;
  };

  // Helper to add a merge range
  const addMerge = (startRow: number, startCol: number, endRow: number, endCol: number) => {
    merges.push({
      s: { r: startRow, c: startCol },
      e: { r: endRow, c: endCol }
    });
  };

  // --- ROW 0: MAIN BANNER ---
  const r0 = appendRow([
    `شناسنامه فنی و مهندسی قطعات خودرو (طرح تکوین کیفیت سوروش موتور)`,
    "", "", "", "", ""
  ]);
  addMerge(r0, 0, r0, 5);

  // --- ROW 1: HEADER SECTION - METADATA ---
  const r1 = appendRow([
    `نام شرکت: ${datasheet.header.companyName}`,
    "",
    `شماره مدرک: ${datasheet.header.documentNo}`,
    "",
    `ویرایش: ${datasheet.header.revision}`,
    `وضعیت مدرک: ${datasheet.header.status}`
  ]);
  addMerge(r1, 0, r1, 1);
  addMerge(r1, 2, r1, 3);

  // --- ROW 2: OTHER HEADER METADATA ---
  const r2 = appendRow([
    `تاریخ اولین صدور: ${datasheet.header.issueDate}`,
    "", "",
    `واحد صادرکننده: مدیریت مهندسی و تکوین محصول`,
    "", ""
  ]);
  addMerge(r2, 0, r2, 2);
  addMerge(r2, 3, r2, 5);

  // Spacer
  appendRow(["", "", "", "", "", ""]);

  // --- SECTION 1: GENERAL INFO BANNER ---
  const rSection1 = appendRow([
    "۱. مشخصات عمومی و ابعاد کلی قطعه (General Specifications)",
    "", "", "", "", ""
  ]);
  addMerge(rSection1, 0, rSection1, 5);

  // General details
  const rGen1 = appendRow([
    "نام قطعه:", datasheet.general.partName, "",
    "کد فنی قطعه (Part No):", datasheet.general.partCode, ""
  ]);
  addMerge(rGen1, 1, rGen1, 2);
  addMerge(rGen1, 4, rGen1, 5);

  const rGen2 = appendRow([
    "خودروی مصرفی / مجموعه بالا دستی:", datasheet.general.vehicle, "",
    "وزن خالص قطعه:", datasheet.general.weight, ""
  ]);
  addMerge(rGen2, 1, rGen2, 2);
  addMerge(rGen2, 4, rGen2, 5);

  const rGen3 = appendRow([
    "گروه مواد قطعه:", datasheet.general.materialGroup, "",
    "ابعاد کلی قطعه (کیفیت نما):", datasheet.general.dimensions, ""
  ]);
  addMerge(rGen3, 1, rGen3, 2);
  addMerge(rGen3, 4, rGen3, 5);

  // Spacer
  appendRow(["", "", "", "", "", ""]);

  // --- SECTION 2: MATERIALS & PROCESSES BANNER ---
  const rSection2 = appendRow([
    "۲. مشخصات فنی جنس، عملیات و خواص مکانیکی (Material & Process Details)",
    "", "", "", "", ""
  ]);
  addMerge(rSection2, 0, rSection2, 5);

  const rMat1 = appendRow([
    "استاندارد متالورژی/گرید جنس:", datasheet.material.specification, "",
    "فرآیند ساخت و تولید:", datasheet.material.manufacturingProcess, ""
  ]);
  addMerge(rMat1, 1, rMat1, 2);
  addMerge(rMat1, 4, rMat1, 5);

  const rMat2 = appendRow([
    "پوشش سطحی / عملیات محافظتی:", datasheet.material.surfaceTreatment, "",
    "عملیات حرارتی / تنش زدایی:", datasheet.material.heatTreatment, ""
  ]);
  addMerge(rMat2, 1, rMat2, 2);
  addMerge(rMat2, 4, rMat2, 5);

  const rMat3 = appendRow([
    "سختی مجاز متالوگرافی:", datasheet.material.hardness, "", "", "", ""
  ]);
  addMerge(rMat3, 1, rMat3, 5);

  // Spacer
  appendRow(["", "", "", "", "", ""]);

  // --- SECTION 3: KEY TECHNICAL PARAMETERS BANNER ---
  const rSection3 = appendRow([
    "۳. ابعاد کنترلی نقشه فنی، تلرانس‌های حساس و ضوابط تست (Critical Tolerances & Inspection Parameters)",
    "", "", "", "", ""
  ]);
  addMerge(rSection3, 0, rSection3, 5);

  // Table Headers
  const rTab1H = appendRow([
    "ردیف",
    "پارامتر بحرانی / ویژگی اندازه گیری قطعه",
    "",
    "اندازه اسمی (Nominal)",
    "رنج تلرانس مجاز (Tolerance)",
    "روش ممیزی اندازه‌گیری / تجهیزات تست"
  ]);
  addMerge(rTab1H, 1, rTab1H, 2);

  // Add parameter rows
  datasheet.parameters.forEach((param, index) => {
    const rowIdx = appendRow([
      index + 1,
      param.parameterName,
      "",
      param.nominalValue,
      param.tolerance,
      param.testMethod
    ]);
    addMerge(rowIdx, 1, rowIdx, 2);
  });

  // Spacer
  appendRow(["", "", "", "", "", ""]);

  // --- SECTION 4: QUALITY TESTS BANNER ---
  const rSection4 = appendRow([
    "۴. استانداردها و آزمون‌های صحه‌گذاری کیفی قطعه (Validation & Endurance Tests)",
    "", "", "", "", ""
  ]);
  addMerge(rSection4, 0, rSection4, 5);

  // Table Headers
  const rTab2H = appendRow([
    "ردیف",
    "عنوان لایحه ممیزی / آزمون کیفی",
    "استاندارد مرجع کالیبراسیون",
    "شرایط پذیرش و آستانه قبولی (Acceptance Criteria)",
    "",
    "تناوب بازرسی کیفی"
  ]);
  addMerge(rTab2H, 3, rTab2H, 4);

  // Add test rows
  datasheet.tests.forEach((test, index) => {
    const rowIdx = appendRow([
      index + 1,
      test.testName,
      test.standard,
      test.acceptanceCriteria,
      "",
      test.frequency
    ]);
    addMerge(rowIdx, 3, rowIdx, 4);
  });

  // Spacer
  appendRow(["", "", "", "", "", ""]);

  // --- SECTION 5: PACKAGING & STORAGE BANNER ---
  const rSection5 = appendRow([
    "۵. استاندارد ظرفیت ها، نوع بسته‌بندی و نگهداری (Packaging & Warehousing)",
    "", "", "", "", ""
  ]);
  addMerge(rSection5, 0, rSection5, 5);

  const rPack1 = appendRow([
    "نوع بسته‌بندی انفرادی/کارگاهی:", datasheet.packaging.boxType, "",
    "تعداد در جعبه (بسته خرد):", datasheet.packaging.boxCapacity, ""
  ]);
  addMerge(rPack1, 1, rPack1, 2);
  addMerge(rPack1, 4, rPack1, 5);

  const rPack2 = appendRow([
    "تعداد روی پالت مادر صنعتی:", datasheet.packaging.palletCapacity, "",
    "روش‌های ترابری و ضد زنگ کاری:", datasheet.packaging.preservationMethod, ""
  ]);
  addMerge(rPack2, 1, rPack2, 2);
  addMerge(rPack2, 4, rPack2, 5);

  // Spacer
  appendRow(["", "", "", "", "", ""]);

  // --- SECTION 6: APPROVALS BANNER ---
  const rSection6 = appendRow([
    "۶. کاروان صحه‌گذاری، امضاها و تاییدیه کیفی مهندسی محصول",
    "", "", "", "", ""
  ]);
  addMerge(rSection6, 0, rSection6, 5);

  const rAppH = appendRow([
    "تهیه و تدوین کننده", "",
    "بررسی و ممیزی کننده (کنترل کیفی)", "",
    "تایید کننده نهایی مهندسی و تکوین محصول", ""
  ]);
  addMerge(rAppH, 0, rAppH, 1);
  addMerge(rAppH, 2, rAppH, 3);
  addMerge(rAppH, 4, rAppH, 5);

  const rAppName = appendRow([
    `نام: ${datasheet.approvals.creatorName}`, "",
    `نام: ${datasheet.approvals.checkerName}`, "",
    `نام: ${datasheet.approvals.approverName}`, ""
  ]);
  addMerge(rAppName, 0, rAppName, 1);
  addMerge(rAppName, 2, rAppName, 3);
  addMerge(rAppName, 4, rAppName, 5);

  const rAppTitle = appendRow([
    `سمت: ${datasheet.approvals.creatorTitle}`, "",
    `سمت: ${datasheet.approvals.checkerTitle}`, "",
    `سمت: ${datasheet.approvals.approverTitle}`, ""
  ]);
  addMerge(rAppTitle, 0, rAppTitle, 1);
  addMerge(rAppTitle, 2, rAppTitle, 3);
  addMerge(rAppTitle, 4, rAppTitle, 5);

  const rAppSign = appendRow([
    `امضاء و تاریخ:`, "",
    `امضاء و تاریخ:`, "",
    `امضاء و تاریخ:`, ""
  ]);
  addMerge(rAppSign, 0, rAppSign, 1);
  addMerge(rAppSign, 2, rAppSign, 3);
  addMerge(rAppSign, 4, rAppSign, 5);


  // 2. Generate worksheet
  const ws = XLSX.utils.aoa_to_sheet(matrix);

  // 3. Set merges
  ws["!merges"] = merges;

  // 4. Set row-by-row & column widths
  // Cols are (A to F)
  ws["!cols"] = [
    { wch: 25 }, // Col A
    { wch: 30 }, // Col B
    { wch: 15 }, // Col C
    { wch: 22 }, // Col D
    { wch: 25 }, // Col E
    { wch: 25 }  // Col F
  ];

  // 5. Force Right-To-Left (RTL) view direction for perfect Persian rendering in Microsoft Excel
  if (!ws["!views"]) ws["!views"] = [];
  ws["!views"].push({ RTL: true });

  // 6. Complete book creation and save
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "شناسنامه فنی قطعه");

  // Write file
  const fileName = `Technical_Passport_${datasheet.general.partCode || "Auto_Part"}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
