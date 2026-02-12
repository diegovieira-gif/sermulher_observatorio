"use client";

import Image from "next/image";
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

const CRAM_PALETTE = [
  "#7c3aed",
  "#ec4899",
  "#06b6d4",
  "#f59e0b",
  "#10b981",
  "#6366f1",
];

const STATUS_TOTAL = 132;
const SERVICOS_TOTAL = 131;
const CONSULTAS_TOTAL = 94;
const SOCIAL_TOTAL = 42;
const JURIDICO_TOTAL = 33;

type ChartItem = {
  name: string;
  value: number;
};

type CramData = {
  statusAtendimento?: ChartItem[];
  volumeServicos?: ChartItem[];
  consultasPsicologicas?: ChartItem[];
  encaminhamentosSocial?: ChartItem[];
  materiasJuridicas?: ChartItem[];
};

export const CRAM_DATA_JAN: CramData = {
  statusAtendimento: [
    { name: "Atendidas", value: 67 },
    { name: "Agendamento", value: 9 },
    { name: "Busca Ativa", value: 8 },
    { name: "Sem interesse", value: 8 },
    { name: "Agendadas Fev", value: 5 },
    { name: "Faltas", value: 3 },
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
    { name: "Psicológico e Jurídico", value: 10 },
  ],
  materiasJuridicas: [
    { name: "Penal", value: 36 },
    { name: "Família", value: 34 },
    { name: "Multidisciplinar", value: 18 },
    { name: "Fundamentais", value: 12 },
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
        "rounded-3xl border border-slate-200 bg-white shadow-sm",
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
      className={cn("text-lg font-semibold text-slate-900", className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-1 text-sm text-slate-600", className)} {...props} />
  );
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-4", className)} {...props} />;
}

const asArray = <T,>(items: unknown, fallback: T[]): T[] =>
  Array.isArray(items) ? items : fallback;

const percentLabel = ({ value }: { value: number }) => `${value}%`;

const makePercentTooltip = (baseTotal: number) =>
  function PercentTooltip({ active, payload }: TooltipProps) {
    if (!active || !payload?.length) {
      return null;
    }

    const { name, value } = payload[0].payload;

    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-700 shadow-lg">
        <p className="font-semibold text-slate-900">{name}</p>
        <p className="mt-1">Percentual: {value}%</p>
        <p>Base: {baseTotal}</p>
      </div>
    );
  };

const makeAbsoluteTooltip = (baseTotal: number) =>
  function AbsoluteTooltip({ active, payload }: TooltipProps) {
    if (!active || !payload?.length) {
      return null;
    }

    const { name, value } = payload[0].payload;
    const percent = Math.round((value / baseTotal) * 100);

    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-700 shadow-lg">
        <p className="font-semibold text-slate-900">{name}</p>
        <p className="mt-1">Valor: {value}</p>
        <p>Percentual: {percent}%</p>
      </div>
    );
  };

export function CramView({ data }: CramViewProps) {
  const resolved = data ?? CRAM_DATA_JAN;

  const statusAtendimento = asArray(
    resolved.statusAtendimento,
    CRAM_DATA_JAN.statusAtendimento ?? [],
  );
  const volumeServicos = asArray(
    resolved.volumeServicos,
    CRAM_DATA_JAN.volumeServicos ?? [],
  );
  const consultasPsicologicas = asArray(
    resolved.consultasPsicologicas,
    CRAM_DATA_JAN.consultasPsicologicas ?? [],
  );
  const encaminhamentosSocial = asArray(
    resolved.encaminhamentosSocial,
    CRAM_DATA_JAN.encaminhamentosSocial ?? [],
  );
  const materiasJuridicas = asArray(
    resolved.materiasJuridicas,
    CRAM_DATA_JAN.materiasJuridicas ?? [],
  );

  return (
    <section className="grid gap-6">
      <Image
        src="/cram.jpeg"
        alt="Logo CRAM"
        width={220}
        height={80}
        className="mx-auto mb-8"
        priority
      />

      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle>Resumo de Janeiro/2026</CardTitle>
          <CardDescription>
            Dados consolidados da Secretaria da Mulher com foco em atendimento e
            encaminhamentos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Mulheres encaminhadas
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {STATUS_TOTAL}
              </p>
              <p className="mt-2 text-xs text-slate-500">Status geral do mês</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Atendimentos realizados
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {SERVICOS_TOTAL}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Volume total de serviços
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Consultas agendadas
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {CONSULTAS_TOTAL}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                48 realizadas e 46 faltas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Status de atendimento</CardTitle>
            <CardDescription>
              Distribuição percentual das 132 mulheres encaminhadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-[350px]"
              role="img"
              aria-label="Gráfico de pizza com o status de atendimento"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <Pie
                    data={statusAtendimento}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={4}
                    label={percentLabel}
                  >
                    {statusAtendimento.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_PALETTE[index % CRAM_PALETTE.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={makePercentTooltip(STATUS_TOTAL)} />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-xs text-slate-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Volume de atendimentos</CardTitle>
            <CardDescription>
              Distribuição dos 131 atendimentos realizados no mês.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-[350px]"
              role="img"
              aria-label="Gráfico de barras horizontais com o volume de atendimentos"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={volumeServicos}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#64748b"
                    width={140}
                    tickMargin={6}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip content={makeAbsoluteTooltip(SERVICOS_TOTAL)} />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                    <LabelList
                      dataKey="value"
                      position="right"
                      fill="#0f172a"
                      fontSize={12}
                    />
                    {volumeServicos.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_PALETTE[index % CRAM_PALETTE.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Consultas psicológicas</CardTitle>
            <CardDescription>
              Realizadas versus faltas/remarcações nas 94 consultas agendadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-[350px]"
              role="img"
              aria-label="Gráfico de pizza com consultas psicológicas realizadas e faltas"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <Pie
                    data={consultasPsicologicas}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={4}
                    label={({ value }) => `${value}`}
                  >
                    {consultasPsicologicas.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_PALETTE[(index + 2) % CRAM_PALETTE.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={makeAbsoluteTooltip(CONSULTAS_TOTAL)} />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-xs text-slate-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Encaminhamentos socioassistenciais</CardTitle>
            <CardDescription>
              Percentual dos 42 acolhimentos sociais realizados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-[350px]"
              role="img"
              aria-label="Gráfico de barras verticais com encaminhamentos sociais"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={encaminhamentosSocial}
                  margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    angle={-20}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    tickMargin={6}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    stroke="#64748b"
                    domain={[0, 50]}
                    label={{
                      value: "Percentual",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#64748b",
                    }}
                  />
                  <Tooltip content={makePercentTooltip(SOCIAL_TOTAL)} />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    <LabelList
                      dataKey="value"
                      position="top"
                      fill="#0f172a"
                      fontSize={12}
                      formatter={(value: number) => `${value}%`}
                    />
                    {encaminhamentosSocial.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_PALETTE[index % CRAM_PALETTE.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Matérias jurídicas</CardTitle>
            <CardDescription>
              Percentual das 33 orientações jurídicas registradas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="h-[350px]"
              role="img"
              aria-label="Gráfico de barras verticais com matérias jurídicas"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={materiasJuridicas}
                  margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    angle={-20}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    tickMargin={6}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    stroke="#64748b"
                    domain={[0, 40]}
                    label={{
                      value: "Percentual",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#64748b",
                    }}
                  />
                  <Tooltip content={makePercentTooltip(JURIDICO_TOTAL)} />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    <LabelList
                      dataKey="value"
                      position="top"
                      fill="#0f172a"
                      fontSize={12}
                      formatter={(value: number) => `${value}%`}
                    />
                    {materiasJuridicas.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_PALETTE[index % CRAM_PALETTE.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Image
        src="/rodape.jpeg"
        alt="Rodapé Sermulher"
        width={1200}
        height={180}
        className="w-full mt-12"
      />
    </section>
  );
}
