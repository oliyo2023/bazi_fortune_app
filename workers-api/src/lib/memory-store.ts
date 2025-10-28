// 简单的内存存储，用于开发环境演示
interface MemoryStore {
  [key: string]: any;
}

const store: MemoryStore = {};

export const memoryStore = {
  get: (key: string) => store[key],
  set: (key: string, value: any) => {
    store[key] = value;
  },
  delete: (key: string) => {
    delete store[key];
  },
  clear: () => {
    Object.keys(store).forEach(key => delete store[key]);
  }
};
