export type CartItem = { id: string; sku: string; slug: string; title: string; image?: string | null; price: number; currency: string; quantity: number };
export const CART_KEY = "nordika-container-cart-v1";
export const CART_EVENT = "nordika-cart-change";
export function readCart(): CartItem[] { if (typeof window === "undefined") return []; try { const value: unknown = JSON.parse(localStorage.getItem(CART_KEY) || "[]"); return Array.isArray(value) ? value as CartItem[] : []; } catch { return []; } }
export function writeCart(items: CartItem[]) { localStorage.setItem(CART_KEY, JSON.stringify(items)); window.dispatchEvent(new CustomEvent(CART_EVENT)); }
