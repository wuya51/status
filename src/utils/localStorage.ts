export function saveToLocalStorage(key: string, value: any) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  
export function loadFromLocalStorage(key: string) {
if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    if (data) {
    return JSON.parse(data);
    }
}
return null;
}