import STORAGE from "@/constants/storage";

interface StoreData {
  key: string;
  value: string | number | Object;
}

export const store = (data: StoreData) => {
  return storeData({ data });
};

export const storeData = ({
  storageType = STORAGE.LOCAL,
  data,
}: {
  storageType?: STORAGE;
  data: StoreData;
}) => {
  const { key } = data;
  const existingData = getData({ key: key });

  let value: any = JSON.stringify([data.value]);

  if (existingData) {
    if (Array.isArray(existingData)) {
      value = JSON.stringify([...existingData, data.value]);
    }
  }

  switch (storageType) {
    case STORAGE.LOCAL:
      localStorage.setItem(key, value);
      break;

    default:
      localStorage.setItem(key, value);
  }

  return { added: data.value, result: JSON.parse(value) };
};

export const getData = ({
  storageType = STORAGE.LOCAL,
  key,
}: {
  storageType?: STORAGE;
  key: string;
}) => {
  let value: string | null;
  let existingData: number | string | Object;

  switch (storageType) {
    case STORAGE.LOCAL:
      value = localStorage.getItem(key);
      break;

    default:
      value = localStorage.getItem(key);
  }

  existingData = value ? JSON.parse(value) : null;

  return existingData;
};
