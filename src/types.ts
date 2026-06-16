/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TechnicalParameter {
  id: string;
  parameterName: string;
  nominalValue: string;
  tolerance: string;
  testMethod: string;
}

export interface QualityTest {
  id: string;
  testName: string;
  standard: string;
  acceptanceCriteria: string;
  frequency: string;
}

export interface DatasheetHeader {
  companyName: string;
  documentNo: string;
  revision: string;
  issueDate: string;
  status: string; // e.g., "تایید شده نهایی", "نمونه کالیبراسیون", "در حال طراحی"
}

export interface GeneralInfo {
  partName: string;
  partCode: string;
  vehicle: string;
  weight: string;
  materialGroup: string;
  dimensions: string;
}

export interface MaterialInfo {
  specification: string;
  manufacturingProcess: string;
  surfaceTreatment: string;
  heatTreatment: string;
  hardness: string;
}

export interface PackagingInfo {
  boxType: string;
  boxCapacity: string;
  palletCapacity: string;
  preservationMethod: string;
}

export interface ApprovalsInfo {
  creatorName: string;
  creatorTitle: string;
  checkerName: string;
  checkerTitle: string;
  approverName: string;
  approverTitle: string;
}

export interface AutoPartTechnicalDatasheet {
  header: DatasheetHeader;
  general: GeneralInfo;
  material: MaterialInfo;
  parameters: TechnicalParameter[];
  tests: QualityTest[];
  packaging: PackagingInfo;
  approvals: ApprovalsInfo;
}
