export const API_URL = 'http://185.244.172.108:8081/';
const eID = 114657;
const rowName = '4b77d057-0c55-4044-9a1e-81015cddfd38';

export async function createEntity() {
  const res = await fetch(API_URL + '/v1/outlay-rows/entity/create', {
    method: 'POST',
  });

  const data = await res.json();
  console.log(data);

  return Response.json(data);
}

export async function getTreeRows() {
  const res = await fetch(API_URL + `/v1/outlay-rows/entity/${eID}/row/list`, {
    method: 'GET',
  });

  const data = await res.json();
  console.log(data);

  return Response.json(data);
}

export async function createRowInEntity() {
  const res = await fetch(API_URL + `/v1/outlay-rows/entity/${eID}/row/create`, {
    method: 'POST',
  });

  const data = await res.json();
  console.log(data);

  return Response.json(data);
}

export async function updateRow() {
  const res = await fetch(API_URL + `/v1/outlay-rows/entity/${eID}/row/{rID}/update`, {
    method: 'POST',
  });

  const data = await res.json();
  console.log(data);

  return Response.json(data);
}

export async function deleteRow() {
  const res = await fetch(API_URL + `/v1/outlay-rows/entity/${eID}/row/{rID}/delete`, {
    method: 'POST',
  });

  const data = await res.json();
  console.log(data);

  return Response.json(data);
}
