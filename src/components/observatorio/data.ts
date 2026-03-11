export interface ChartItem {
  name: string;
  value: number;
}

export interface CramData {
  periodo: string;
  visaoGeral: {
    mulheresEncaminhadas: number;
    mulheresAtendidas: number;
    novosCasos: number;
    servicosRealizados: number;
    rodasTerapeuticas: number;
    atendimentosGrupo: number;
  };
  atendimentosPsicologicos: ChartItem[];
  acolhimentosSociais: number;
  orientacoesJuridicas: {
    total: number;
    distribuicao: { label: string; value: number }[];
  };
}

export interface SermulherData {
  ouvidoria: {
    totalHistorico: number;
    series: { month: string; value: number }[];
  };
  salaAzul: {
    encontrosIndividuais: number;
    gruposReflexivos: number;
    participantesMedios: number;
  };
  servicos: {
    sociais: number;
    psicologicos: number;
    juridicos: number;
    distribuicao: ChartItem[];
  };
  acoes: {
    conscientizacao: number;
    escutas: number;
    campanhas: number;
  };
  capacitacoes: {
    cursoCuidador: number;
    feiraExpositoras: number;
  };
}

export interface DashboardData {
  period: string;
  cram: CramData;
  sermulher: SermulherData;
}

export const DATA_JAN_2026: DashboardData = {
  period: "Janeiro 2026",
  cram: {
    periodo: "Janeiro 2026",
    visaoGeral: {
      mulheresEncaminhadas: 132,
      mulheresAtendidas: 67,
      novosCasos: 28,
      servicosRealizados: 131,
      rodasTerapeuticas: 4,
      atendimentosGrupo: 31,
    },
    atendimentosPsicologicos: [
      { name: "Realizadas", value: 48 },
      { name: "Faltas/Remarcações", value: 46 },
    ],
    acolhimentosSociais: 42,
    orientacoesJuridicas: {
      total: 33,
      distribuicao: [
        { label: "Direito Penal", value: 36 },
        { label: "Direito de Família", value: 34 },
        { label: "Orientação Multidisciplinar", value: 18 },
        { label: "Direitos Fundamentais", value: 12 },
      ],
    },
  },
  sermulher: {
    ouvidoria: {
      totalHistorico: 93,
      series: [
        { month: "Jan 2025", value: 31 },
        { month: "Jan 2026", value: 62 },
      ],
    },
    salaAzul: {
      encontrosIndividuais: 31,
      gruposReflexivos: 2,
      participantesMedios: 18,
    },
    servicos: {
      sociais: 28,
      psicologicos: 64,
      juridicos: 8,
      distribuicao: [
        { name: "Atendimentos Psicológicos", value: 64 },
        { name: "Atendimentos Sociais", value: 28 },
        { name: "Rodas Terapêuticas", value: 8 },
      ],
    },
    acoes: {
      conscientizacao: 26,
      escutas: 0,
      campanhas: 0,
    },
    capacitacoes: {
      cursoCuidador: 0,
      feiraExpositoras: 1,
    },
  },
};

export const DATA_FEV_2026: DashboardData = {
  period: "Fevereiro 2026",
  cram: {
    periodo: "Fevereiro 2026",
    visaoGeral: {
      mulheresEncaminhadas: 170,
      mulheresAtendidas: 84,
      novosCasos: 35,
      servicosRealizados: 339,
      rodasTerapeuticas: 6,
      atendimentosGrupo: 52,
    },
    atendimentosPsicologicos: [
      { name: "Atendimentos realizados", value: 54 },
      { name: "Faltaram ou Remarcaram", value: 57 },
    ],
    acolhimentosSociais: 33,
    orientacoesJuridicas: {
      total: 27,
      distribuicao: [
        { label: "Direito Penal", value: 40.7 },
        { label: "Direito de Família", value: 37 },
        { label: "Direito Processual Civil", value: 14.8 },
        { label: "Outros", value: 7.4 },
      ],
    },
  },
  sermulher: {
    ouvidoria: {
      totalHistorico: 129,
      series: [
        { month: "2025", value: 32 },
        { month: "JAN 2026", value: 62 },
        { month: "FEV 2026", value: 36 },
      ],
    },
    salaAzul: {
      encontrosIndividuais: 84,
      gruposReflexivos: 3,
      participantesMedios: 18,
    },
    servicos: {
      sociais: 68,
      psicologicos: 46,
      juridicos: 31,
      distribuicao: [
        { name: "Atendimentos Psicológicos", value: 62.3 },
        { name: "Atendimentos Sociais", value: 24.6 },
        { name: "Rodas Terapêuticas", value: 13.2 },
      ],
    },
    acoes: {
      conscientizacao: 31,
      escutas: 9,
      campanhas: 7,
    },
    capacitacoes: {
      cursoCuidador: 13,
      feiraExpositoras: 10,
    },
  },
};

export const CRAM_COLORS = ["#c4b5fd", "#a78bfa", "#8b5cf6", "#6d28d9"];
export const SERMU_COLORS = ["#f0abfc", "#d946ef", "#a855f7", "#7e22ce"];

export const HISTORICO_DADOS = {
  "Janeiro 2026": DATA_JAN_2026,
  "Fevereiro 2026": DATA_FEV_2026,
};

export type PeriodKey = keyof typeof HISTORICO_DADOS;
