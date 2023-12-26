export type RecalculatedRows = {
  changed: RowResponse[],
  current: RowResponse,
}

export type RowResponse = {
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: 0;
  mainCosts: 0;
  materials: 0;
  mimExploitation: 0;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: 0;
  total: number;
}

export type UpdateTableRowDTO = {
  equipmentCosts: number;
  estimatedProfit: number;
  id: number;
  machineOperatorSalary: 0;
  mainCosts: 0;
  materials: 0;
  mimExploitation: 0;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: 0;
};

export type CreateTableRowDTO = {
  equipmentCosts: number;
  estimatedProfit: number;
  parentId: number | null;
  machineOperatorSalary: 0;
  mainCosts: 0;
  materials: 0;
  mimExploitation: 0;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: 0;
};

export type DeleteTableRowDTO = {
  id: number;
};
