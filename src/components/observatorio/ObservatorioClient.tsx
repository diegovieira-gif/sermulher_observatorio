"use client";

import { useMemo, useState } from "react";

import { CramView } from "./CramView";
import { DashboardShell } from "./DashboardShell";
import { DashboardData } from "./data";
import { SermulherView } from "./SermulherView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type ObservatorioClientProps = {
  historicoDados: Record<string, DashboardData>;
};

const DEFAULT_PERIOD = "Fevereiro 2026";

export function ObservatorioClient({
  historicoDados,
}: ObservatorioClientProps) {
  const availablePeriods = useMemo(
    () => Object.keys(historicoDados),
    [historicoDados],
  );

  const [selectedPeriod, setSelectedPeriod] = useState<string>(() => {
    if (availablePeriods.includes(DEFAULT_PERIOD)) {
      return DEFAULT_PERIOD;
    }

    return availablePeriods[0] ?? "";
  });

  const normalizedPeriod = availablePeriods.includes(selectedPeriod)
    ? selectedPeriod
    : (availablePeriods[0] ?? "");

  const activeData = normalizedPeriod
    ? historicoDados[normalizedPeriod]
    : undefined;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4c0519] via-[#2e1065] to-[#0f172a] px-4 py-8">
      <DashboardShell
        title="Gestão SERMULHER"
        subtitle="Dashboard com indicadores consolidados da SERMULHER e do CRAM."
        period={normalizedPeriod}
        availablePeriods={availablePeriods}
        onPeriodChange={setSelectedPeriod}
      >
        {activeData ? (
          <Tabs defaultValue="sermulher" className="w-full">
            <TabsList className="bg-white/10">
              <TabsTrigger value="sermulher">SERMULHER</TabsTrigger>
              <TabsTrigger value="cram">CRAM</TabsTrigger>
            </TabsList>
            <TabsContent value="sermulher">
              <SermulherView data={activeData.sermulher} />
            </TabsContent>
            <TabsContent value="cram">
              <CramView data={activeData.cram} />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="rounded-3xl border border-white/15 bg-white/5 px-6 py-10 text-center text-slate-200">
            Nenhum dado encontrado para exibição.
          </div>
        )}
      </DashboardShell>
    </div>
  );
}
