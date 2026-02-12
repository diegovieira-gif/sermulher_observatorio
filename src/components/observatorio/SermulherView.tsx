"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DataCard } from "./DataCard";

// Cores baseadas na identidade visual da Sermulher (Roxos/Lilás)
const SERMU_COLORS = ["#7c3aed", "#a78bfa", "#ddd6fe", "#4c1d95"];

interface SermulherViewProps {
  data: {
    atendimentosNutricionais: {
      series: { month: string; value: number }[];
      delta: number;
    };
    ouvidoria: {
      series: { month: string; value: number }[];
      delta: number;
    };
    salaAzul: {
      encontrosIndividuais: number;
      gruposReflexivos: number;
      participantesMedios: number;
    };
  };
}

export function SermulherView({ data }: SermulherViewProps) {
  return (
    <div className="grid gap-6">
      {/* Cards de Resumo Superior */}
      <div className="grid gap-4 md:grid-cols-3">
        <DataCard
          title="Atendimentos Nutricionais"
          value={data.atendimentosNutricionais.series[2].value}
          subtitle="Janeiro 2026"
          delta={data.atendimentosNutricionais.delta} // -44% em relação a Dezembro
        />
        <DataCard
          title="Sala Azul"
          value={data.salaAzul.encontrosIndividuais}
          subtitle="Encontros individuais"
        />
        <DataCard
          title="Ouvidoria"
          value={data.ouvidoria.series[1].value}
          subtitle="Atendimentos em Jan 2026"
          delta={data.ouvidoria.delta} // +100% em relação a Jan 2025
        />
      </div>

      {/* Gráficos de Evolução */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
              Evolução Nutricional
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Atendimentos de Nov/2025 a Jan/2026
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.atendimentosNutricionais.series}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#4c1d95"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#e9d5ff"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#e9d5ff"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Atendimentos"
                  stroke={SERMU_COLORS[1]}
                  strokeWidth={3}
                  dot={{ r: 4, fill: SERMU_COLORS[0] }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
              Ouvidoria
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Comparativo Jan 2025 vs Jan 2026
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.ouvidoria.series}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#4c1d95"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#e9d5ff"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#e9d5ff"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Total de Casos"
                  stroke={SERMU_COLORS[0]}
                  strokeWidth={3}
                  dot={{ r: 4, fill: SERMU_COLORS[3] }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Painel Sala Azul */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
              Sala Azul
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Panorama dos encontros e grupos reflexivos
            </p>
          </div>
          <div className="grid gap-4 text-sm text-white sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-center">
              <p className="text-xs uppercase text-purple-200">Individuais</p>
              <p className="mt-2 text-2xl font-semibold">
                {data.salaAzul.encontrosIndividuais}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-center">
              <p className="text-xs uppercase text-purple-200">Grupos</p>
              <p className="mt-2 text-2xl font-semibold">
                {data.salaAzul.gruposReflexivos}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-center">
              <p className="text-xs uppercase text-purple-200">Média Part.</p>
              <p className="mt-2 text-2xl font-semibold">
                {data.salaAzul.participantesMedios}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
