export const DATA_JAN_2026 = {
  period: "Janeiro/2026",
  cram: {
    totalAtendimentos: {
      total: 131,
      delta: "+4",
      breakdown: [
        { label: "Psicologicos", value: 42 },
        { label: "Socioassistenciais", value: 42 },
        { label: "Juridicos", value: 33 },
        { label: "Buscas Ativas", value: 8 },
      ],
    },
    consultasPsicologicas: {
      agendadas: 94,
      realizadas: 48,
      faltas: 46,
      realizadasPct: 51,
      faltasPct: 49,
      delta: "+1",
    },
    demandasJuridicas: {
      delta: "+2",
      distribuicao: [
        { label: "Direito Penal", value: 36 },
        { label: "Direito de Familia", value: 34 },
        { label: "Orientacao Multidisciplinar", value: 18 },
        { label: "Direitos Fundamentais", value: 12 },
      ],
    },
  },
  sermulher: {
    atendimentosNutricionais: {
      delta: "+3",
      series: [
        { month: "Nov", value: 13 },
        { month: "Dez", value: 9 },
        { month: "Jan", value: 5 },
      ],
    },
    salaAzul: {
      encontrosIndividuais: 31,
      gruposReflexivos: 2,
      participantesMedios: 18,
    },
    ouvidoria: {
      delta: "+1",
      series: [
        { month: "Jan 2025", value: 31 },
        { month: "Jan 2026", value: 62 },
      ],
    },
  },
};

export const CRAM_COLORS = ["#c4b5fd", "#a78bfa", "#8b5cf6", "#6d28d9"];
export const SERMU_COLORS = ["#f0abfc", "#d946ef", "#a855f7", "#7e22ce"];
