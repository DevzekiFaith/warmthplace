"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_CURRENCY, CURRENCY_CONFIG } from "@/lib/constants";
import { formatPrice } from "@/lib/currency";

interface CurrencyContextType {
  currency: string;
  setCurrency: (c: string) => void;
  format: (amountInKobo: number) => string;
  currencies: typeof CURRENCY_CONFIG;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: BASE_CURRENCY,
  setCurrency: () => {},
  format: (amountInKobo: number) => formatPrice(amountInKobo, BASE_CURRENCY),
  currencies: CURRENCY_CONFIG,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<string>(BASE_CURRENCY);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("warmthplace_currency");
      if (stored && CURRENCY_CONFIG[stored]) {
        setCurrencyState(stored);
      }
    } catch {
      // LocalStorage access may fail in private mode
    }
  }, []);

  const setCurrency = (c: string) => {
    if (CURRENCY_CONFIG[c]) {
      setCurrencyState(c);
      try {
        localStorage.setItem("warmthplace_currency", c);
      } catch {
        // ignore
      }
    }
  };

  const format = (amountInKobo: number) => {
    return formatPrice(amountInKobo, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        format,
        currencies: CURRENCY_CONFIG,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
