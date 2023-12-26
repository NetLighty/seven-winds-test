import { TableRow } from './table.types';

export const emptyTableRow: TableRow = {
  child: [],
  id: null,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  supportCosts: 0,
  equipmentCosts: 0,
  estimatedProfit: 0,
  overheads: 0,
  salary: 0,
  rowName: '',
  isEdit: true,
};

export function extractNumbersFromString(input: string): string {
  return input.replace(/\D/g, '');
}

export function removeRowById(
  treeRows: TableRow[],
  rowId: number | null
): TableRow[] {
  const removeRecursive = (data: TableRow): TableRow | null => {
    if (data.id === rowId) return null;

    const updatedChild = data.child
      .map(removeRecursive)
      .filter(Boolean) as TableRow[];

    return {
      ...data,
      id: data.id === null ? null : data.id,
      child: updatedChild,
    };
  };

  return treeRows.map(removeRecursive).filter(Boolean) as TableRow[];
}

export function updateRowById(
  treeRows: TableRow[],
  rowId: number | null,
  updatedRow: TableRow
): TableRow[] {
  const updateRecursive = (data: TableRow): TableRow => {
    if (data.id === rowId) return updatedRow;

    const updatedChild = data.child.map(updateRecursive);

    return {
      ...data,
      child: updatedChild,
    };
  };

  return treeRows.map(updateRecursive);
}

export function addRowByParentId(
  treeRows: TableRow[],
  parentId: number | null,
  childData: TableRow
): TableRow[] {
  if (parentId === null) return [...treeRows, childData];
  return treeRows.map((item) => {
    if (item.id === parentId) {
      return {
        ...item,
        child: [...item.child, childData],
      };
    } else if (item.child) {
      return {
        ...item,
        child: addRowByParentId(item.child, parentId, childData),
      };
    }

    return item;
  });
}
