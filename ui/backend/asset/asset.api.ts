import axios from "axios";
import { customAxios } from "..";

const ASSET_BASE_URL = "/asset";

export async function getAssets() {
  console.log(await customAxios.get(ASSET_BASE_URL));
  return (await customAxios.get(ASSET_BASE_URL)).data as {
    data: { AssetType: string; ID: string }[];
  };
}

export async function postAssets(data: any) {
  return await customAxios.post(ASSET_BASE_URL, data);
}

export async function getAssetsByProducerId(producerId: string) {
  return (await customAxios.get(`${ASSET_BASE_URL}/${producerId}`)).data as {
    data: { AssetType: string; ID: string }[];
  };
}
