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
import type { TooltipProps } from "recharts";
import type {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

import { cn } from "../../lib/utils";
import { CramData } from "./data";

const CRAM_PALETTE = [
  "#7c3aed",
  "#ec4899",
  "#06b6d4",
  "#f59e0b",
  "#10b981",
  "#6366f1",
];

type CramViewProps = {
  data: CramData;
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

type TooltipDataPoint = {
  label?: string;
  name?: string;
  value?: number | string;
  percent?: number;
};

const getTooltipDataPoint = (
  payload: TooltipProps<ValueType, NameType>["payload"],
): TooltipDataPoint | null => {
  if (!payload?.length) {
    return null;
  }

  const rawPayload = payload[0]?.payload;
  if (!rawPayload || typeof rawPayload !== "object") {
    return null;
  }

  return rawPayload as TooltipDataPoint;
};

const makePercentTooltip = (baseTotal: number) =>
  function PercentTooltip({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) {
    if (!active || !payload?.length) {
      return null;
    }

    const dataPoint = getTooltipDataPoint(payload);
    if (!dataPoint) {
      return null;
    }

    const { label, name, value, percent } = dataPoint;
    const displayName = label || name;
    const numericValue = Number(value ?? 0);
    const percentage = percent
      ? (percent * 100).toFixed(1)
      : ((numericValue / baseTotal) * 100).toFixed(1);

    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-700 shadow-lg">
        <p className="font-semibold text-slate-900">{displayName}</p>
        <p className="mt-1 text-purple-600">
          {numericValue.toFixed(1)} ({percentage}%)
        </p>
      </div>
    );
  };

const makeAbsoluteTooltip = (baseTotal: number) =>
  function AbsoluteTooltip({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) {
    if (!active || !payload?.length) {
      return null;
    }

    const dataPoint = getTooltipDataPoint(payload);
    if (!dataPoint) {
      return null;
    }

    const { name, value } = dataPoint;
    const numericValue = Number(value ?? 0);
    const percent = Math.round((numericValue / baseTotal) * 100);

    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-700 shadow-lg">
        <p className="font-semibold text-slate-900">{name}</p>
        <p className="mt-1">Valor: {numericValue}</p>
        <p>Percentual: {percent}%</p>
      </div>
    );
  };

export function CramView({ data }: CramViewProps) {
  const vG = data.visaoGeral;

  const volumeServicosData = [
    {
      name: "Psicológicos",
      value: data.atendimentosPsicologicos.reduce(
        (acc, curr) =>
          acc +
          (curr.name.includes("realizados") || curr.name.includes("Realizadas")
            ? curr.value
            : 0),
        0,
      ),
    },
    { name: "Socioassistenciais", value: data.acolhimentosSociais },
    { name: "Jurídicos", value: data.orientacoesJuridicas.total },
    { name: "Atend. Grupo", value: vG.atendimentosGrupo },
    { name: "Busca Ativa", value: vG.buscaAtiva },
    { name: "Recepção", value: vG.atendimentosRecepcao },
  ];

  return (
    <section className="grid gap-6">
      <Image
        src="/cram.jpeg"
        alt="Logo CRAM"
        width={110}
        height={40}
        className="mx-auto mb-8"
        priority
      />

      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle>Resumo de {data.periodo}</CardTitle>
          <CardDescription>
            Dados consolidados da Secretaria da Mulher com foco em atendimento e
            encaminhamentos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-tight text-slate-500 font-bold">
                Mulheres Encaminhadas
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {vG.mulheresEncaminhadas}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Demanda espontânea e direta
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-tight text-slate-500 font-bold">
                Mulheres Atendidas
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {vG.mulheresAtendidas}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {vG.novosCasos} novos casos
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-tight text-slate-500 font-bold">
                Serviços Realizados
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {vG.servicosRealizados}
              </p>
              <p className="mt-2 text-xs text-slate-500">Volume total do mês</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-tight text-slate-500 font-bold">
                Rodas Terapêuticas
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {vG.rodasTerapeuticas}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {vG.atendimentosGrupo} atend. em grupo
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-tight text-slate-500 font-bold">
                Busca Ativa
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {vG.buscaAtiva}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Ações de campo/contato
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-tight text-slate-500 font-bold">
                Atend. Recepção
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {vG.atendimentosRecepcao}
              </p>
              <p className="mt-2 text-xs text-slate-500">Acolhimento inicial</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Consultas Psicológicas</CardTitle>
            <CardDescription>
              Comparativo entre atendimentos realizados e faltas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <Pie
                    data={data.atendimentosPsicologicos}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    label={({ value }) => `${value}`}
                  >
                    {data.atendimentosPsicologicos.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_PALETTE[(index + 1) % CRAM_PALETTE.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={makeAbsoluteTooltip(
                      data.atendimentosPsicologicos.reduce(
                        (a, b) => a + b.value,
                        0,
                      ),
                    )}
                  />
                  <Legend verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Orientações Jurídicas</CardTitle>
            <CardDescription>
              Distribuição por área do Direito (Total:{" "}
              {data.orientacoesJuridicas.total}).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.orientacoesJuridicas.distribuicao}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="label"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={makePercentTooltip(100)} />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    <LabelList
                      dataKey="value"
                      position="top"
                      formatter={(v: number) => `${v}%`}
                      fill="#475569"
                      fontSize={11}
                    />
                    {data.orientacoesJuridicas.distribuicao.map(
                      (entry, index) => (
                        <Cell
                          key={entry.label}
                          fill={CRAM_PALETTE[index % CRAM_PALETTE.length]}
                        />
                      ),
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white md:col-span-2">
          <CardHeader>
            <CardTitle>Volume de Atendimentos por Área</CardTitle>
            <CardDescription>
              Resumo quantitativo dos acolhimentos e orientações.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={volumeServicosData}
                  layout="vertical"
                  margin={{ top: 5, right: 80, left: 10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
                  />
                  <Tooltip />
                  <Bar dataKey="value" barSize={35} radius={[0, 20, 20, 0]}>
                    <LabelList
                      dataKey="value"
                      position="right"
                      fill="#0f172a"
                      fontSize={14}
                      fontWeight={600}
                      offset={10}
                    />
                    {volumeServicosData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={CRAM_PALETTE[(index + 2) % CRAM_PALETTE.length]}
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
        alt="Rodapé SERMULHER"
        width={1000}
        height={150}
        className="w-full mt-12 rounded-3xl opacity-90"
      />
    </section>
  );
}
