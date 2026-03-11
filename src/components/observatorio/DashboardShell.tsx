"use client";

import Image from "next/image";
import { ReactNode } from "react";

import { PeriodFilter } from "./PeriodFilter";

type DashboardShellProps = {
  title: string;
  subtitle: string;
  period: string;
  availablePeriods: string[];
  onPeriodChange: (period: string) => void;
  children: ReactNode;
};

export function DashboardShell({
  title,
  subtitle,
  period,
  availablePeriods,
  onPeriodChange,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen w-full bg-transparent text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-500/30 blur-[140px]" />
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-[160px]" />
        <div className="absolute bottom-0 right-24 h-64 w-64 rounded-full bg-violet-400/20 blur-[120px]" />
 
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-12">
          <header className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <Image 
                src="/aju.png" 
                alt="Prefeitura de Aracaju" 
                width={150} 
                height={60} 
                className="object-contain drop-shadow-md" 
                priority 
              />
              <div className="h-12 w-px bg-white/20 hidden md:block" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-pink-300">
                  Observatório de Dados da Mulher
                </p>
                <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-2 max-w-2xl text-base text-slate-300">
                  {subtitle}
                </p>
              </div>
            </div>
            <PeriodFilter
              value={period}
              availablePeriods={availablePeriods || []}
              onPeriodChange={onPeriodChange}
            />
          </header>
 
          {children}
        </div>
      </div>
    </div>
  );
}
