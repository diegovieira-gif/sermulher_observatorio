"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CRAM_COLORS } from "./data";
import { DataCard } from "./DataCard";

type CramViewProps = {
  data: typeof import("./data").DATA_JAN_2026.cram;
};

export function CramView({ data }: CramViewProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <DataCard
          title="Atendimentos totais"
          value={data.totalAtendimentos.total}
          subtitle="Janeiro 2026"
          delta={data.totalAtendimentos.delta}
        />
        <DataCard
          title="Consultas psicologicas"
          value={`${data.consultasPsicologicas.realizadas}/${data.consultasPsicologicas.agendadas}`}
          subtitle="Realizadas vs agendadas"
          delta={data.consultasPsicologicas.delta}
        />
        <DataCard
          title="Demandas juridicas"
          value="4 frentes"
          subtitle="Distribuicao por tema"
          delta={data.demandasJuridicas.delta}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:shadow-lg">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
              Tipos de atendimentos
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Distribuicao do CRAM por area
            </p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.totalAtendimentos.breakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                <XAxis dataKey="label" stroke="#e9d5ff" />
                <YAxis stroke="#e9d5ff" />
                <Tooltip
                  cursor={{ fill: "rgba(167, 139, 250, 0.15)" }}
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                  {data.totalAtendimentos.breakdown.map((entry, index) => (
                    <Cell
                      key={entry.label}
                      fill={CRAM_COLORS[index % CRAM_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:shadow-lg">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
                Consultas psicologicas
              </p>
              <p className="mt-2 text-sm text-slate-300">Taxa de absenteismo</p>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      {
                        label: "Realizadas",
                        value: data.consultasPsicologicas.realizadasPct,
                      },
                      {
                        label: "Faltas",
                        value: data.consultasPsicologicas.faltasPct,
                      },
                    ]}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    <Cell fill={CRAM_COLORS[1]} />
                    <Cell fill={CRAM_COLORS[3]} />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-xs text-slate-200">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm transition hover:shadow-lg">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
                Demandas juridicas
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Distribuicao percentual
              </p>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.demandasJuridicas.distribuicao}
                    dataKey="value"
                    nameKey="label"
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {data.demandasJuridicas.distribuicao.map((entry, index) => (
                      <Cell
                        key={entry.label}
                        fill={CRAM_COLORS[index % CRAM_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
