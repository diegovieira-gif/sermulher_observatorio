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
    { name: "Atendimentos Psicologicos", value: 64 },
    { name: "Atendimentos Sociais", value: 28 },
    { name: "Rodas Terapeuticas", value: 8 },
  ];

  return (
    <div className="space-y-6 bg-white">
      <Image
        src="/rodape.jpeg"
        alt="Header Sermulher"
        width={1200}
        height={150}
        className="w-full h-auto rounded-xl mb-8 object-cover"
        priority
      />

      <div className="grid gap-6 lg:grid-cols-2">
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
          <CardDescription>Distribuicao dos atendimentos</CardDescription>
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
                16 atendimentos psicologicos
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: SALA_AZUL_COLORS[2] }}
                />
                02 rodas terapeuticas
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
    </div>
  );
}
