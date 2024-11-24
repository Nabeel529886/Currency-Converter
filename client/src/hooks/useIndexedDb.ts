import { useCallback, useState } from "react";

interface UseIndexedDB<T> {
  addItem: (item: T) => Promise<void>;
  getItem: (key: IDBValidKey) => Promise<T | undefined>;
  deleteItem: (key: IDBValidKey) => Promise<void>;
  getAllItems: () => Promise<T[]>;
  error: Error | null;
}

const useIndexedDB = <T>(
  dbName: string,
  storeName: string
): UseIndexedDB<T> => {
  const [error, setError] = useState<Error | null>(null);

  const createDB = useCallback((): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }, [dbName, storeName]);

  const addItem = useCallback(
    async (item: T): Promise<void> => {
      try {
        const db = await createDB();
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        store.add(item);
        await new Promise<void>((resolve, reject) => {
          tx.oncomplete = () => resolve();

          tx.onerror = () => reject(tx.error);
        });
      } catch (err) {
        setError(err as Error);
      }
    },
    [createDB, storeName]
  );

  const getItem = useCallback(
    async (key: IDBValidKey): Promise<T | undefined> => {
      try {
        const db = await createDB();
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        const result = await new Promise<T | undefined>((resolve, reject) => {
          const request = store.get(key);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
        return result;
      } catch (err) {
        setError(err as Error);
        return undefined;
      }
    },
    [createDB, storeName]
  );

  const deleteItem = useCallback(
    async (key: IDBValidKey): Promise<void> => {
      try {
        const db = await createDB();
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        await new Promise<void>((resolve, reject) => {
          store.delete(key);
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      } catch (err) {
        setError(err as Error);
      }
    },
    [createDB, storeName]
  );

  const getAllItems = useCallback(async (): Promise<T[]> => {
    try {
      const db = await createDB();
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const result = await new Promise<T[]>((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      return result;
    } catch (err) {
      setError(err as Error);
      return [];
    }
  }, [createDB, storeName]);

  return { addItem, getItem, deleteItem, getAllItems, error };
};

export default useIndexedDB;
