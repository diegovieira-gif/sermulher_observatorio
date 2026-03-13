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
    buscaAtiva: number;
    atendimentosRecepcao: number;
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
      mulheresEncaminhadas: 131,
      mulheresAtendidas: 122,
      novosCasos: 54,
      servicosRealizados: 184,
      rodasTerapeuticas: 2,
      atendimentosGrupo: 14,
      buscaAtiva: 8,
      atendimentosRecepcao: 53,
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
      totalHistorico: 56,
      series: [
        { month: "2025", value: 26 },
        { month: "Jan 2026", value: 30 },
      ],
    },
    salaAzul: {
      encontrosIndividuais: 31,
      gruposReflexivos: 1,
      participantesMedios: 18,
    },
    servicos: {
      sociais: 16,
      psicologicos: 29,
      juridicos: 6,
      distribuicao: [
        { name: "Atendimentos Psicológicos", value: 56.9 },
        { name: "Atendimentos Sociais", value: 31.4 },
        { name: "Atendimentos Jurídicos", value: 11.7 },
      ],
    },
    acoes: {
      conscientizacao: 1,
      escutas: 0,
      campanhas: 1,
    },
    capacitacoes: {
      cursoCuidador: 0,
      feiraExpositoras: 0,
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
      servicosRealizados: 340,
      rodasTerapeuticas: 6,
      atendimentosGrupo: 52,
      buscaAtiva: 31,
      atendimentosRecepcao: 195,
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
      totalHistorico: 94,
      series: [
        { month: "2025", value: 26 },
        { month: "Jan 2026", value: 30 },
        { month: "Fev 2026", value: 38 },
      ],
    },
    salaAzul: {
      encontrosIndividuais: 32,
      gruposReflexivos: 2,
      participantesMedios: 25,
    },
    servicos: {
      sociais: 8,
      psicologicos: 18,
      juridicos: 4,
      distribuicao: [
        { name: "Atendimentos Psicológicos", value: 60.0 },
        { name: "Atendimentos Sociais", value: 26.7 },
        { name: "Atendimentos Jurídicos", value: 13.3 },
      ],
    },
    acoes: {
      conscientizacao: 9,
      escutas: 0,
      campanhas: 1,
    },
    capacitacoes: {
      cursoCuidador: 13,
      feiraExpositoras: 0,
    },
  },
};

export const DATA_MAR_2026: DashboardData = {
  period: "Março 2026",
  cram: {
    periodo: "Março 2026",
    visaoGeral: {
      mulheresEncaminhadas: 0,
      mulheresAtendidas: 0,
      novosCasos: 0,
      servicosRealizados: 0,
      rodasTerapeuticas: 0,
      atendimentosGrupo: 0,
      buscaAtiva: 0,
      atendimentosRecepcao: 0,
    },
    atendimentosPsicologicos: [
      { name: "Realizadas", value: 0 },
      { name: "Faltas/Remarcações", value: 0 },
    ],
    acolhimentosSociais: 0,
    orientacoesJuridicas: {
      total: 0,
      distribuicao: [],
    },
  },
  sermulher: {
    ouvidoria: {
      totalHistorico: 94,
      series: [
        { month: "2025", value: 26 },
        { month: "Jan 2026", value: 30 },
        { month: "Fev 2026", value: 38 },
        { month: "Mar 2026", value: 0 },
      ],
    },
    salaAzul: {
      encontrosIndividuais: 0,
      gruposReflexivos: 0,
      participantesMedios: 0,
    },
    servicos: {
      sociais: 0,
      psicologicos: 0,
      juridicos: 0,
      distribuicao: [],
    },
    acoes: {
      conscientizacao: 0,
      escutas: 0,
      campanhas: 0,
    },
    capacitacoes: {
      cursoCuidador: 0,
      feiraExpositoras: 1, // Centro Vivo aconteceu em 08/03
    },
  },
};

export const CRAM_COLORS = ["#c4b5fd", "#a78bfa", "#8b5cf6", "#6d28d9"];
export const SERMU_COLORS = ["#f0abfc", "#d946ef", "#a855f7", "#7e22ce"];

export const HISTORICO_DADOS = {
  "Janeiro 2026": DATA_JAN_2026,
  "Fevereiro 2026": DATA_FEV_2026,
  "Março 2026": DATA_MAR_2026,
};

export type PeriodKey = keyof typeof HISTORICO_DADOS;
