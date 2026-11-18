import { useEffect, useState } from 'react';
import { PRODUCTS_BY_ID } from '../data/products.js';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '../data/store.js';

const STORAGE_KEY = 'dalbit-cart-v1';

// The cart state is an array of { id, quantity }. Product details are looked up from the
// catalogue instead of being copied in, so a price change can never leave a stale copy behind.
export function useCart() {
  const [cart, setCart] = useState(readStoredCart);
  // Snapshot of the cart taken right before a removal, so "Undo" can put it back exactly.
  const [undoSnapshot, setUndoSnapshot] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Private mode or full storage: the cart still works, it just won't survive a reload.
    }
  }, [cart]);

  const items = cart.map((line) => {
    const product = PRODUCTS_BY_ID.get(line.id);
    return { product, quantity: line.quantity, lineTotal: product.price * line.quantity };
  });

  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = subtotal === 0 || qualifiesForFreeShipping ? 0 : SHIPPING_FEE;

  function quantityOf(productId) {
    return cart.find((line) => line.id === productId)?.quantity ?? 0;
  }

  function addItem(productId) {
    setUndoSnapshot(null);
    setCart((current) => {
      const existing = current.find((line) => line.id === productId);
      if (!existing) return [...current, { id: productId, quantity: 1 }];
      return current.map((line) =>
        line.id === productId ? { ...line, quantity: clampToStock(productId, line.quantity + 1) } : line
      );
    });
  }

  function decreaseItem(productId) {
    if (quantityOf(productId) <= 1) {
      removeItem(productId);
      return;
    }
    setUndoSnapshot(null);
    setCart((current) =>
      current.map((line) => (line.id === productId ? { ...line, quantity: line.quantity - 1 } : line))
    );
  }

  function removeItem(productId) {
    const product = PRODUCTS_BY_ID.get(productId);
    setUndoSnapshot({ id: Date.now(), cart, message: `Removed ${product.name}` });
    setCart((current) => current.filter((line) => line.id !== productId));
  }

  function clearCart() {
    if (cart.length === 0) return;
    setUndoSnapshot({ id: Date.now(), cart, message: 'Cleared your bag' });
    setCart([]);
  }

  // Checkout empties the bag for good, so there is nothing to undo afterwards.
  function emptyAfterCheckout() {
    setUndoSnapshot(null);
    setCart([]);
  }

  function dismissUndo() {
    setUndoSnapshot(null);
  }

  function undo() {
    if (!undoSnapshot) return;
    setCart(undoSnapshot.cart);
    setUndoSnapshot(null);
  }

  return {
    items,
    itemCount,
    subtotal,
    shipping,
    total: subtotal + shipping,
    amountToFreeShipping: Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0),
    undoId: undoSnapshot?.id ?? null,
    undoMessage: undoSnapshot?.message ?? null,
    quantityOf,
    addItem,
    decreaseItem,
    removeItem,
    clearCart,
    emptyAfterCheckout,
    undo,
    dismissUndo,
  };
}

function clampToStock(productId, quantity) {
  return Math.min(quantity, PRODUCTS_BY_ID.get(productId).stock);
}

function readStoredCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    // Anything saved by an older version of the catalogue is dropped rather than trusted.
    return Array.isArray(parsed) ? parsed.filter(isValidLine) : [];
  } catch {
    return [];
  }
}

function isValidLine(line) {
  if (typeof line !== 'object' || line === null) return false;
  const product = PRODUCTS_BY_ID.get(line.id);
  return (
    product !== undefined &&
    Number.isInteger(line.quantity) &&
    line.quantity >= 1 &&
    line.quantity <= product.stock
  );
}
