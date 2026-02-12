"use client";

import { ReactNode } from "react";

import { PeriodFilter } from "./PeriodFilter";

type DashboardShellProps = {
  title: string;
  subtitle: string;
  period: string;
  children: ReactNode;
};

export function DashboardShell({
  title,
  subtitle,
  period,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen w-full bg-transparent text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-purple-500/30 blur-[140px]" />
        <div className="absolute left-0 top-40 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-[160px]" />
        <div className="absolute bottom-0 right-24 h-64 w-64 rounded-full bg-violet-400/20 blur-[120px]" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-20 pt-12">
          <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
                Observatório de Dados da Mulher
              </p>
              <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-300">
                {subtitle}
              </p>
            </div>
            <PeriodFilter value={period} />
          </header>

          {children}
        </div>
      </div>
    </div>
  );
}
