declare module 'opossum' {
  interface CircuitBreakerOptions {
    timeout?: number;
    errorThresholdPercentage?: number;
    resetTimeout?: number;
    name?: string;
    enabled?: boolean;
    volumeThreshold?: number;
  }

  type CircuitBreakerState = 'OPEN' | 'CLOSED' | 'HALF_OPEN';

  class CircuitBreaker<T = any, R = any> {
    constructor(
      action: (...args: any[]) => Promise<R> | R,
      options?: CircuitBreakerOptions,
    );

    fire(...args: any[]): Promise<R>;
    open(): void;
    close(): void;
    halfOpen(): void;
    enable(): void;
    disable(): void;

    on(event: 'open' | 'close' | 'halfOpen' | 'fire' | 'cacheHit' | 'cacheMiss' | 'reject' | 'timeout' | 'success' | 'failure', handler: (...args: any[]) => void): void;
    once(event: 'open' | 'close' | 'halfOpen' | 'fire' | 'cacheHit' | 'cacheMiss' | 'reject' | 'timeout' | 'success' | 'failure', handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
    removeAllListeners(event?: string): void;

    readonly state: CircuitBreakerState;
    readonly enabled: boolean;
    readonly pending: boolean;
    readonly closed: boolean;
    readonly opened: boolean;
    readonly halfOpen: boolean;
    readonly isShutdown: boolean;
    readonly stats: {
      fires: number;
      cacheHits: number;
      cacheMisses: number;
      rejects: number;
      timeouts: number;
      successes: number;
      failures: number;
      fallbacks: number;
      semaphoreRejections: number;
      percentiles: any;
      latencyMean: number;
      latency: any;
    };
  }

  export = CircuitBreaker;
}

