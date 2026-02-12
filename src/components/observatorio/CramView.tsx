"use client";

import * as React from "react";
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

import { cn } from "../../lib/utils";

const CRAM_COLORS = ["#7c3aed", "#a78bfa", "#ddd6fe", "#4c1d95", "#c084fc"];

type ChartItem = {
  name: string;
  value: number;
};

type CramData = {
  encaminhamentosTotais: number;
  atendimentosRealizadosTotais: number;
  statusAtendimento?: ChartItem[];
  volumeServicos?: ChartItem[];
  consultasPsicologicas?: ChartItem[];
  encaminhamentosSocial?: ChartItem[];
  materiasJuridicas?: ChartItem[];
};

export const CRAM_DATA_JAN: CramData = {
  encaminhamentosTotais: 132,
  atendimentosRealizadosTotais: 131,
  statusAtendimento: [
    { name: "Mulheres atendidas", value: 67 },
    { name: "Processo de agendamento", value: 9 },
    { name: "Busca Ativa", value: 8 },
    { name: "Sem interesse/Não reside", value: 8 },
    { name: "Agendadas para Fevereiro", value: 5 },
    { name: "Faltaram aos 3 serviços", value: 3 },
  ],
  volumeServicos: [
    { name: "Psicológicos", value: 48 },
    { name: "Socioassistenciais", value: 42 },
    { name: "Jurídicos", value: 33 },
    { name: "Busca Ativa", value: 8 },
  ],
  consultasPsicologicas: [
    { name: "Realizadas", value: 48 },
    { name: "Faltas/Remarcações", value: 46 },
  ],
  encaminhamentosSocial: [
    { name: "Acolhimento Psicológico", value: 45 },
    { name: "Benefícios Sociais", value: 35 },
    { name: "Orientação Jurídica", value: 10 },
    { name: "Psicológico + Jurídico", value: 10 },
  ],
  materiasJuridicas: [
    { name: "Direito Penal", value: 36 },
    { name: "Direito Família", value: 34 },
    { name: "Orientação Multidisciplinar", value: 18 },
    { name: "Direitos Fundamentais", value: 12 },
  ],
};

type CramViewProps = {
  data?: CramData;
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ payload: { name: string; value: number } }>;
};

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/5 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-0", className)} {...props} />;
}

function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold text-white", className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-1 text-sm text-slate-300", className)} {...props} />
  );
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-4", className)} {...props} />;
}

const sumValues = (items?: ChartItem[]) =>
  items?.reduce((total, item) => total + item.value, 0) ?? 0;

const formatPercent = (value: number) => `${Math.round(value)}%`;

const pieLabel = ({ value, percent }: { value: number; percent: number }) =>
  `${value} (${Math.round(percent * 100)}%)`;

const makePieTooltip = (total: number) =>
  function PieTooltip({ active, payload }: TooltipProps) {
    if (!active || !payload?.length) {
      return null;
    }

    const { name, value } = payload[0].payload;
    const percent = total ? (value / total) * 100 : 0;

    return (
      <div className="rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-xs text-slate-100 shadow-lg">
        <p className="font-semibold text-purple-100">{name}</p>
        <p className="mt-1">Valor: {value}</p>
        <p>Percentual: {formatPercent(percent)}</p>
      </div>
    );
  };

export function CramView({ data }: CramViewProps) {
  const resolvedData = data ?? CRAM_DATA_JAN;
  const statusAtendimento = resolvedData.statusAtendimento ?? [];
  const volumeServicos = resolvedData.volumeServicos ?? [];
  const consultasPsicologicas = resolvedData.consultasPsicologicas ?? [];
  const encaminhamentosSocial = resolvedData.encaminhamentosSocial ?? [];
  const materiasJuridicas = resolvedData.materiasJuridicas ?? [];

  const statusTotal = sumValues(resolvedData.statusAtendimento);
  const consultasTotal = sumValues(resolvedData.consultasPsicologicas);

  return (
    <section className="grid gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Resumo do CRAM</CardTitle>
          <CardDescription>
            Panorama do boletim de Janeiro/2026 com foco nos atendimentos
            registrados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
                Encaminhamentos totais
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {resolvedData.encaminhamentosTotais}
              </p>
              <p className="mt-2 text-xs text-slate-300">
                Mulheres acompanhadas no mês
              </p>
            </div>
            <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
                Atendimentos registrados
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {resolvedData.atendimentosRealizadosTotais}
              </p>
              <p className="mt-2 text-xs text-slate-300">Janeiro de 2026</p>
            </div>
            <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
                Consultas psicológicas
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {sumValues(consultasPsicologicas)}
              </p>
              <p className="mt-2 text-xs text-slate-300">Realizadas + faltas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status de atendimento</CardTitle>
            <CardDescription>
              Distribuição percentual das mulheres acompanhadas pelo CRAM.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-72"
              role="img"
              aria-label="Gráfico de pizza com o status de atendimento das mulheres atendidas pelo CRAM"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusAtendimento}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={4}
                    label={pieLabel}
                  >
                    {statusAtendimento.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_COLORS[index % CRAM_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={makePieTooltip(statusTotal)} />
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Volume de serviços</CardTitle>
            <CardDescription>
              Comparativo das frentes de atendimento mais acionadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-72"
              role="img"
              aria-label="Gráfico de barras horizontais com o volume de serviços do CRAM"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={volumeServicos}
                  layout="vertical"
                  margin={{ left: 10, right: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                  <XAxis type="number" stroke="#e9d5ff" />
                  <YAxis dataKey="name" type="category" stroke="#e9d5ff" />
                  <Tooltip
                    cursor={{ fill: "rgba(124, 58, 237, 0.12)" }}
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[10, 10, 10, 10]}
                    label={{ position: "right", fill: "#ffffff", fontSize: 12 }}
                  >
                    {volumeServicos.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_COLORS[index % CRAM_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultas psicológicas</CardTitle>
            <CardDescription>
              Taxa de comparecimento e remarcações das consultas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-72"
              role="img"
              aria-label="Gráfico de pizza com consultas psicológicas realizadas e faltas"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={consultasPsicologicas}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={4}
                    label={pieLabel}
                  >
                    {consultasPsicologicas.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_COLORS[(index + 1) % CRAM_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={makePieTooltip(consultasTotal)} />
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Encaminhamentos da assistência social</CardTitle>
            <CardDescription>
              Percentual de encaminhamentos para serviços complementares.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-72"
              role="img"
              aria-label="Gráfico de barras verticais com encaminhamentos da assistência social"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={encaminhamentosSocial}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                  <XAxis dataKey="name" stroke="#e9d5ff" />
                  <YAxis
                    stroke="#e9d5ff"
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Percentual"]}
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[12, 12, 0, 0]}
                    label={{ position: "top", fill: "#ffffff", fontSize: 12 }}
                  >
                    {encaminhamentosSocial.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_COLORS[index % CRAM_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Matérias jurídicas</CardTitle>
            <CardDescription>
              Distribuição percentual dos temas jurídicos mais frequentes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-72"
              role="img"
              aria-label="Gráfico de barras verticais com matérias jurídicas do CRAM"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={materiasJuridicas}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                  <XAxis dataKey="name" stroke="#e9d5ff" />
                  <YAxis
                    stroke="#e9d5ff"
                    tickFormatter={(value) => `${value}%`}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Percentual"]}
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    radius={[12, 12, 0, 0]}
                    label={{ position: "top", fill: "#ffffff", fontSize: 12 }}
                  >
                    {materiasJuridicas.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_COLORS[index % CRAM_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
