export type TableRow = {
  child: TableRow[];
  equipmentCosts: number;
  estimatedProfit: number;
  id: number | null;
  machineOperatorSalary: 0;
  mainCosts: 0;
  materials: 0;
  mimExploitation: 0;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: 0;
  isEdit?: boolean;
};
