"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
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

export const CRAM_DATA_JAN = {
  periodo: "Janeiro/2026",
  resumo: {
    mulheresAcompanhadas: 132,
    atendimentosRegistrados: 131,
    consultasPsicologicas: 94,
  },
  statusAtendimento: [
    { label: "Atendidas", value: 67 },
    { label: "Em processo de agendamento", value: 9 },
    { label: "Busca Ativa", value: 8 },
    { label: "Sem interesse/Não reside", value: 8 },
    { label: "Agendadas Fev", value: 5 },
    { label: "Faltaram todos", value: 3 },
  ],
  volumeServicos: [
    { label: "Psicológicos", value: 48 },
    { label: "Socioassistenciais", value: 42 },
    { label: "Jurídicos", value: 33 },
    { label: "Busca Ativa", value: 8 },
  ],
  consultasPsicologicas: [
    { label: "Realizadas", value: 48 },
    { label: "Faltas/Remarcações", value: 46 },
  ],
  encaminhamentosAssistenteSocial: [
    { label: "Acolhimento Psicológico", value: 45 },
    { label: "Benefícios", value: 35 },
    { label: "Jurídico", value: 10 },
    { label: "Psicológico + Jurídico", value: 10 },
  ],
  materiasJuridicas: [
    { label: "Direito Penal", value: 36 },
    { label: "Direito Família", value: 34 },
    { label: "Orientação Multidisciplinar", value: 18 },
    { label: "Direitos Fundamentais", value: 12 },
  ],
} as const;

type CramViewProps = {
  data: typeof CRAM_DATA_JAN;
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ payload: { label: string; value: number } }>;
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

const sumValues = (items: Array<{ value: number }>) =>
  items.reduce((total, item) => total + item.value, 0);

const formatPercent = (value: number) => `${Math.round(value)}%`;

const pieLabel = ({ value, percent }: { value: number; percent: number }) =>
  `${value} (${Math.round(percent * 100)}%)`;

const makePieTooltip = (total: number) =>
  function PieTooltip({ active, payload }: TooltipProps) {
    if (!active || !payload?.length) {
      return null;
    }

    const { label, value } = payload[0].payload;
    const percent = total ? (value / total) * 100 : 0;

    return (
      <div className="rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-xs text-slate-100 shadow-lg">
        <p className="font-semibold text-purple-100">{label}</p>
        <p className="mt-1">Valor: {value}</p>
        <p>Percentual: {formatPercent(percent)}</p>
      </div>
    );
  };

export function CramView({ data }: CramViewProps) {
  const statusTotal = sumValues(data.statusAtendimento);
  const consultasTotal = sumValues(data.consultasPsicologicas);

  return (
    <section className="grid gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Resumo do CRAM</CardTitle>
          <CardDescription>
            Panorama do boletim de {data.periodo} com foco nos atendimentos
            registrados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
                Mulheres acompanhadas
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {data.resumo.mulheresAcompanhadas}
              </p>
              <p className="mt-2 text-xs text-slate-300">Base ativa no mês</p>
            </div>
            <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
                Atendimentos registrados
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {data.resumo.atendimentosRegistrados}
              </p>
              <p className="mt-2 text-xs text-slate-300">Janeiro de 2026</p>
            </div>
            <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
                Consultas psicológicas
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {data.resumo.consultasPsicologicas}
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
                    data={data.statusAtendimento}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={4}
                    label={pieLabel}
                  >
                    {data.statusAtendimento.map((entry, index) => (
                      <Cell
                        key={entry.label}
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
                  data={data.volumeServicos}
                  layout="vertical"
                  margin={{ left: 10, right: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                  <XAxis type="number" stroke="#e9d5ff" />
                  <YAxis dataKey="label" type="category" stroke="#e9d5ff" />
                  <Tooltip
                    cursor={{ fill: "rgba(124, 58, 237, 0.12)" }}
                    contentStyle={{
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                    {data.volumeServicos.map((entry, index) => (
                      <Cell
                        key={entry.label}
                        fill={CRAM_COLORS[index % CRAM_COLORS.length]}
                      />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="right"
                      fill="#ddd6fe"
                      fontSize={12}
                    />
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
                    data={data.consultasPsicologicas}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={4}
                    label={pieLabel}
                  >
                    {data.consultasPsicologicas.map((entry, index) => (
                      <Cell
                        key={entry.label}
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
                <BarChart data={data.encaminhamentosAssistenteSocial}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                  <XAxis dataKey="label" stroke="#e9d5ff" />
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
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {data.encaminhamentosAssistenteSocial.map(
                      (entry, index) => (
                        <Cell
                          key={entry.label}
                          fill={CRAM_COLORS[index % CRAM_COLORS.length]}
                        />
                      ),
                    )}
                    <LabelList
                      dataKey="value"
                      position="top"
                      formatter={(value: number) => `${value}%`}
                      fill="#ddd6fe"
                      fontSize={12}
                    />
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
                <BarChart data={data.materiasJuridicas}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
                  <XAxis dataKey="label" stroke="#e9d5ff" />
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
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {data.materiasJuridicas.map((entry, index) => (
                      <Cell
                        key={entry.label}
                        fill={CRAM_COLORS[index % CRAM_COLORS.length]}
                      />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="top"
                      formatter={(value: number) => `${value}%`}
                      fill="#ddd6fe"
                      fontSize={12}
                    />
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
