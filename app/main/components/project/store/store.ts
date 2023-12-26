import { create } from 'zustand';
import { TableRow } from '../table/table.types';
import {
  createRowInEntity,
  deleteRow,
  getTreeRows,
  updateRow,
} from '@/app/api/route';
import {
  addRowByParentId,
  emptyTableRow,
  removeRowById,
  updateRowById,
} from '../table/table.service';
import {
  CreateTableRowDTO,
  DeleteTableRowDTO,
  UpdateTableRowDTO,
} from '@/app/api/dto.type';

interface TableState {
  treeRows: TableRow[];
  isLoading: boolean;
  setRows: () => void;
  deleteRow: (deleteDTO: DeleteTableRowDTO) => void;
  createRow: (createDTO: CreateTableRowDTO) => void;
  updateRow: (updateDTO: UpdateTableRowDTO, tableRow: TableRow) => void;
  addEmptyRow: (parentId: number) => void;
}

export const useTableStore = create<TableState>()((set) => ({
  treeRows: [],
  isLoading: true,
  setRows: async () => {
    try {
      const response = await getTreeRows();
      set({ treeRows: response });
      set({ isLoading: false });
    } catch (error) {
      console.error('Error getTreeRows', error);
    }
  },
  createRow: async (createDTO) => {
    try {
      const response = await createRowInEntity(createDTO);
      set((state) => ({
        treeRows: addRowByParentId(state.treeRows, createDTO.parentId, {
          ...response.current,
          child: [],
        }),
      }));
    } catch (error) {
      console.error('Error getTreeRows', error);
    }
  },
  updateRow: async (updateDTO, tableRow) => {
    try {
      const response = await updateRow(updateDTO);
      set((state) => ({
        treeRows: updateRowById(state.treeRows, updateDTO.id, {
          ...tableRow,
          ...updateDTO,
        }),
      }));
    } catch (error) {
      console.error('Error getTreeRows', error);
    }
  },
  addEmptyRow: (parentId) => {
    set((state) => ({
      treeRows: addRowByParentId(state.treeRows, parentId, emptyTableRow),
    }));
  },
  deleteRow: async (deleteDTO) => {
    try {
      set((state) => ({
        treeRows: removeRowById(state.treeRows, deleteDTO.id),
      }));
      const response = await deleteRow(deleteDTO);
    } catch (error) {
      console.error('Error getTreeRows', error);
    }
  },
}));