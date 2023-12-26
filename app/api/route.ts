import { TableRow } from '../main/components/project/table/table.types';
import {
  CreateTableRowDTO,
  DeleteTableRowDTO,
  RecalculatedRows,
  UpdateTableRowDTO,
} from './dto.type';

export const API_URL = 'http://185.244.172.108:8081';
const eID = 115147;
const rowName = '4b77d057-0c55-4044-9a1e-81015cddfd38';

export async function createEntity() {
  const res = await fetch(API_URL + '/v1/outlay-rows/entity/create', {
    method: 'POST',
  });

  const data = await res.json();

  return data;
}

export async function getTreeRows() {
  const res = await fetch(API_URL + `/v1/outlay-rows/entity/${eID}/row/list`, {
    method: 'GET',
  });

  const data: TableRow[] = await res.json();

  return data;
}

export async function createRowInEntity(dto: CreateTableRowDTO) {
  const res = await fetch(
    API_URL + `/v1/outlay-rows/entity/${eID}/row/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    }
  );

  const data: RecalculatedRows = await res.json();

  return data;
}

export async function updateRow(dto: UpdateTableRowDTO) {
  const res = await fetch(
    API_URL + `/v1/outlay-rows/entity/${eID}/row/${dto.id}/update`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    }
  );

  const data: RecalculatedRows = await res.json();

  return data;
}

export async function deleteRow(dto: DeleteTableRowDTO) {
  const res = await fetch(
    API_URL + `/v1/outlay-rows/entity/${eID}/row/${dto.id}/delete`,
    {
      method: 'DELETE',
    }
  );

  const data = await res.json();

  return Response.json(data);
}
