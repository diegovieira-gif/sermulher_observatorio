"use client";

import Image from "next/image";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "../../lib/utils";

const OUVIDORIA_COLORS = ["#D8B4FE", "#818CF8"];
const SALA_AZUL_COLORS = ["#C4B5FD", "#93C5FD", "#FBCFE8"];
const SERVICOS_COLORS = ["#A78BFA", "#DDD6FE", "#C4B5FD"];

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

const fallbackData: SermulherViewProps["data"] = {
  atendimentosNutricionais: {
    series: [
      { month: "Nov", value: 13 },
      { month: "Dez", value: 9 },
      { month: "Jan", value: 5 },
    ],
    delta: -44,
  },
  ouvidoria: {
    series: [
      { month: "2025", value: 31 },
      { month: "JAN 2026", value: 62 },
    ],
    delta: 100,
  },
  salaAzul: {
    encontrosIndividuais: 31,
    gruposReflexivos: 2,
    participantesMedios: 18,
  },
};

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white bg-opacity-100 text-slate-900 shadow-xl",
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
    <p className={cn("mt-1 text-sm text-slate-500", className)} {...props} />
  );
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-4", className)} {...props} />;
}

export function SermulherView({ data }: SermulherViewProps) {
  const resolvedData = data ?? fallbackData;
  const ouvidoriaChartData = resolvedData.ouvidoria.series.map((item) => ({
    label: item.month,
    value: item.value,
  }));

  const nutricaoChartData = resolvedData.atendimentosNutricionais.series.map(
    (item) => ({
      label: item.month,
      value: item.value,
    }),
  );

  const salaAzulChartData = [
    { name: "Atendimentos Psicológicos", value: 64 },
    { name: "Atendimentos Sociais", value: 28 },
    { name: "Rodas Terapêuticas", value: 8 },
  ];

  const servicosChartData = [
    { label: "Atendimentos Psicológicos", percent: 15 },
    { label: "Acolhimentos Sociais", percent: 9 },
    { label: "Acolhimentos Jurídicos", percent: 11 },
  ];

  return (
    <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-purple-900">
              Ouvidoria da Mulher
            </CardTitle>
            <CardDescription>Comparativo anual de atendimentos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ouvidoriaChartData}
                  layout="vertical"
                  margin={{ left: 0, right: 24, top: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 70]} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={100}
                    interval={0}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#475569", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Bar dataKey="value" barSize={28} radius={[12, 12, 12, 12]}>
                    {ouvidoriaChartData.map((entry, index) => (
                      <Cell
                        key={`${entry.label}-${entry.value}`}
                        fill={OUVIDORIA_COLORS[index % OUVIDORIA_COLORS.length]}
                      />
                    ))}
                    <LabelList dataKey="value" position="right" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">
              Atendimentos Nutricionais
            </CardTitle>
            <CardDescription>Novembro, Dezembro e Janeiro</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={nutricaoChartData}
                  layout="vertical"
                  margin={{ left: 0, right: 24, top: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={100}
                    interval={0}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#475569", fontSize: 12 }}
                  />
                  <Bar dataKey="value" fill="#FDE047" barSize={24} radius={8}>
                    <LabelList dataKey="value" position="right" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Sala Azul
          </CardTitle>
          <CardDescription>Distribuição dos atendimentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:items-center">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salaAzulChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    stroke="none"
                  >
                    {salaAzulChartData.map((entry, index) => (
                      <Cell
                        key={`${entry.name}-${entry.value}`}
                        fill={SALA_AZUL_COLORS[index % SALA_AZUL_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: SALA_AZUL_COLORS[0] }}
                />
                16 atendimentos psicológicos
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: SALA_AZUL_COLORS[2] }}
                />
                02 rodas terapêuticas
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: SALA_AZUL_COLORS[1] }}
                />
                07 atendimentos sociais
              </div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-slate-300" />
                Mais de 31 mulheres participaram das rodas
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">
              Serviços SERMULHER
            </CardTitle>
            <CardDescription>
              Distribuição percentual dos atendimentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={servicosChartData}
                  layout="vertical"
                  margin={{ left: 0, right: 24, top: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={160}
                    interval={0}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#475569", fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value: number) => `${value}%`}
                    contentStyle={{
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Bar dataKey="percent" barSize={24} radius={10}>
                    {servicosChartData.map((entry, index) => (
                      <Cell
                        key={`${entry.label}-${entry.percent}`}
                        fill={SERVICOS_COLORS[index % SERVICOS_COLORS.length]}
                      />
                    ))}
                    <LabelList
                      dataKey="percent"
                      position="right"
                      formatter={(value: number) => `${value}%`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#DDD6FE] text-purple-600">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M12 2a1 1 0 0 1 1 1v1.06a7 7 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 6a1 1 0 0 1 1 1v2.59l1.3 1.3a1 1 0 0 1-1.42 1.42l-1.6-1.6A1 1 0 0 1 11 12V9a1 1 0 0 1 1-1z" />
                </svg>
              </span>
              <CardTitle className="text-xl font-bold text-slate-900">
                Capacitações
              </CardTitle>
            </div>
            <CardDescription>Ações formativas do mês</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              Ação integrada SERMULHER-SETUR na Feira de Empreendedorismo
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">
              Sala Azul (Jan/2026)
            </CardTitle>
            <CardDescription>Indicadores consolidados do mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white bg-opacity-100 px-4 py-5 text-center text-slate-900 shadow-xl">
                <p className="text-xs uppercase text-slate-500">
                  Encontros Individuais
                </p>
                <p className="mt-3 text-3xl font-semibold">31</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white bg-opacity-100 px-4 py-5 text-center text-slate-900 shadow-xl">
                <p className="text-xs uppercase text-slate-500">
                  Grupos Reflexivos
                </p>
                <p className="mt-3 text-3xl font-semibold">02</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white bg-opacity-100 px-4 py-5 text-center text-slate-900 shadow-xl">
                <p className="text-xs uppercase text-slate-500">
                  Média de Participantes
                </p>
                <p className="mt-3 text-3xl font-semibold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#DDD6FE] text-purple-600">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M12 2 2 7l10 5 10-5-10-5zm0 8.2L4.24 6.7 3 7.35l9 4.5 9-4.5-1.24-.66L12 10.2zM3 10.65l9 4.5 9-4.5V17l-9 4.5L3 17v-6.35z" />
                </svg>
              </span>
              <CardTitle className="text-xl font-bold text-slate-900">
                Ações de Conscientização
              </CardTitle>
            </div>
            <CardDescription>Violência contra a mulher</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-purple-600">26</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Image
          src="/rodape.jpeg"
          alt="Footer"
          width={1000}
          height={150}
          className="mx-auto h-auto object-contain mb-8"
        />
      </div>
    </div>
  );
}
