import STORAGE from "@/constants/storage";

// Start - Storage
export const storeData = <T>({
  storageType = STORAGE.LOCAL,
  key,
  value,
}: {
  storageType?: STORAGE;
  key: string;
  value: T;
}) => {
  const v = JSON.stringify(value);

  switch (storageType) {
    case STORAGE.LOCAL:
      localStorage.setItem(key, v);
      break;

    default:
      localStorage.setItem(key, v);
  }
};

export const getData = <T>({
  storageType = STORAGE.LOCAL,
  key,
}: {
  storageType?: STORAGE;
  key: string;
}) => {
  let value: string | null;
  let existingData: T;

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
// End - Storage
