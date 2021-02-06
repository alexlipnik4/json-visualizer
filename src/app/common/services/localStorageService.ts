type ItemType = 'file';
export class LocalStorageService {
  public static getItem<T>(key: ItemType) {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  public static setItem<T>(key: ItemType, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static removeItem(key: ItemType) {
    localStorage.removeItem(key);
  }
}
