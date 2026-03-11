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
import { SermulherData } from "./data";

const OUVIDORIA_COLORS = ["#D8B4FE", "#818CF8", "#6366f1"];
const SALA_AZUL_COLORS = ["#C4B5FD", "#93C5FD", "#FBCFE8"];
const SERVICOS_COLORS = ["#A78BFA", "#DDD6FE", "#C4B5FD"];

interface SermulherViewProps {
  data: SermulherData;
}

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
  const ouvidoriaChartData = data.ouvidoria.series.map((item) => ({
    label: item.month,
    value: item.value,
  }));

  const salaAzulChartData = data.servicos.distribuicao;

  return (
    <div className="w-full space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-purple-900">
              Ouvidoria da Mulher
            </CardTitle>
            <CardDescription>Comparativo de atendimentos (Histórico)</CardDescription>
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
                  <XAxis type="number" domain={[0, 'auto']} tickLine={false} />
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
              Total Acumulado Ouvidoria
            </CardTitle>
            <CardDescription>Registros históricos totais</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-56">
            <p className="text-7xl font-bold text-purple-600">
              {data.ouvidoria.totalHistorico}
            </p>
            <p className="mt-4 text-slate-500 uppercase tracking-widest text-xs">Registros</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Sala Azul
          </CardTitle>
          <CardDescription>Distribuição dos atendimentos e encontros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:items-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.servicos.distribuicao}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    stroke="none"
                  >
                    {data.servicos.distribuicao.map((entry, index) => (
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
                    formatter={(value: number) => `${value}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-xs uppercase text-slate-500 font-medium">Encontros Individuais</p>
                <p className="mt-2 text-4xl font-bold text-purple-600">{data.salaAzul.encontrosIndividuais}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-xs uppercase text-slate-500 font-medium">Grupos Reflexivos</p>
                <p className="mt-2 text-4xl font-bold text-purple-600">{data.salaAzul.gruposReflexivos}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-xs uppercase text-slate-500 font-medium">Participantes Médios</p>
                <p className="mt-2 text-4xl font-bold text-purple-600">{data.salaAzul.participantesMedios}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nova Seção: Ações e Capacitações */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                 <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <CardTitle className="text-xl font-bold text-slate-900">
                Ações de Impacto
              </CardTitle>
            </div>
            <CardDescription>Escuta comunitária e conscientização</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
               <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{data.acoes.conscientizacao}</p>
                <p className="text-xs text-slate-500 mt-1">Conscientização</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{data.acoes.escutas}</p>
                <p className="text-xs text-slate-500 mt-1">Escutas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">{data.acoes.campanhas}</p>
                <p className="text-xs text-slate-500 mt-1">Campanhas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
              </span>
              <CardTitle className="text-xl font-bold text-slate-900">
                Capacitações
              </CardTitle>
            </div>
            <CardDescription>Formação e empreendedorismo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl">
                <span className="text-sm text-slate-600 font-medium">Curso Cuidador de Idosos</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{data.capacitacoes.cursoCuidador} part.</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl">
                <span className="text-sm text-slate-600 font-medium">Feira Centro Vivo</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{data.capacitacoes.feiraExpositoras} expos.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">
              Serviços Prestados
            </CardTitle>
            <CardDescription>
              Volume quantitativo por área
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-purple-50 rounded-3xl text-center">
                <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">Social</p>
                <p className="text-2xl font-bold text-purple-900 mt-1">{data.servicos.sociais}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-3xl text-center">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Psico</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">{data.servicos.psicologicos}</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-3xl text-center">
                <p className="text-xs text-pink-600 font-bold uppercase tracking-wider">Jurídico</p>
                <p className="text-2xl font-bold text-pink-900 mt-1">{data.servicos.juridicos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">
              Distribuição Relativa
            </CardTitle>
            <CardDescription>Frequência percentual das modalidades</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.servicos.distribuicao}>
                   <XAxis dataKey="name" hide />
                   <Tooltip />
                   <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {data.servicos.distribuicao.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SERVICOS_COLORS[index % SERVICOS_COLORS.length]} />
                    ))}
                    <LabelList dataKey="value" position="top" formatter={(v: any) => `${v}%`} />
                   </Bar>
                </BarChart>
              </ResponsiveContainer>
             </div>
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
