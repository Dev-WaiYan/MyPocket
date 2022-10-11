import type TodoModel from "@/models/TodoModel";
import { getData, storeData } from "@/utils/store";

export const retrieveAll = (key: string) => {
  return getData<TodoModel[]>({ key });
};

export const retrieveOne = (key: string, id: number) => {
  const datas = getData<TodoModel[]>({ key });
  return datas.find((d: TodoModel) => d.id === id);
};

export const store = (key: string, data: TodoModel) => {
  const existingData = retrieveAll(key);

  let value = [data];

  if (existingData) {
    if (Array.isArray(existingData)) {
      value = [...existingData, data];
    }
  }
  storeData({ key, value });

  return value;
};

export const removeOne = (key: string, id: number) => {
  const existingData = retrieveAll(key);
  let value: TodoModel[] = [];

  if (existingData) {
    if (Array.isArray(existingData)) {
      value = existingData.filter((data: TodoModel) => data.id !== id);
      storeData({
        key,
        value,
      });
    }
  }
  return value;
};

export const removeAll = (key: string) => {
  const value: [] = [];
  storeData({
    key,
    value,
  });

  return value;
};

export const update = (key: string, data: TodoModel) => {
  const existingData: TodoModel[] = retrieveAll(key);

  const value: TodoModel[] = existingData.map((d) => {
    if (d.id === data.id) {
      return data;
    }
    return d;
  });

  storeData({ key, value });

  return value;
};
