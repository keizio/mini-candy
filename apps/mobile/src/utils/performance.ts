export class ObjectPool<T> {
  private pool: T[] = [];
  private factory: () => T;
  private reset: (item: T) => void;

  constructor(factory: () => T, reset: (item: T) => void, initialSize = 50) {
    this.factory = factory;
    this.reset = reset;
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory());
    }
  }

  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.factory();
  }

  release(item: T): void {
    this.reset(item);
    this.pool.push(item);
  }

  clear(): void {
    this.pool.length = 0;
  }
}

const debounceTimers = new Map<string, number>();

export function debounce(key: string, fn: () => void, delay: number): void {
  const existing = debounceTimers.get(key);
  if (existing) clearTimeout(existing);
  debounceTimers.set(key, setTimeout(() => {
    debounceTimers.delete(key);
    fn();
  }, delay) as unknown as number);
}

export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  limit: number
): T {
  let inThrottle = false;
  return ((...args: any[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  }) as T;
}

export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
): (...args: Args) => Result {
  const cache = new Map<string, Result>();
  return (...args: Args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

export function objectPool<T extends { active: boolean }>(
  factory: () => T,
  maxSize = 100
) {
  const pool: T[] = [];

  return {
    get: (): T => {
      const existing = pool.find((item) => !item.active);
      if (existing) {
        existing.active = true;
        return existing;
      }
      if (pool.length < maxSize) {
        const item = factory();
        item.active = true;
        pool.push(item);
        return item;
      }
      return pool[0];
    },
    release: (item: T) => {
      item.active = false;
    },
    size: () => pool.length,
  };
}
