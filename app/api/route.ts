export const API_URL = "http://185.244.172.108:8081/";
const eID = 114657;
const rowName = "4b77d057-0c55-4044-9a1e-81015cddfd38";

export async function createEntity() {
  const res = await fetch(API_URL + "/v1/outlay-rows/entity/create", {
    method: "POST"
  });

  const data = await res.json();
  console.log(data);

  return Response.json(data);
}
