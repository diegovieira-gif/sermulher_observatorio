import {
  DashboardData,
  HISTORICO_DADOS,
} from "../components/observatorio/data";

export type DashboardDataMap = Record<string, DashboardData>;

type DirectusRelation = string | { id: string };

type DirectusListResponse<T> = {
  data: T[];
};

type DirectusPeriodo = {
  id: string;
  nome_periodo: string;
  ordem: number;
};

type DirectusDashboard = {
  id: string;
  periodo_id: DirectusRelation;
  period_label: string;
  cram_periodo: string;
  cram_mulheres_encaminhadas: number;
  cram_mulheres_atendidas: number;
  cram_novos_casos: number;
  cram_servicos_realizados: number;
  cram_rodas_terapeuticas: number;
  cram_atendimentos_grupo: number;
  cram_busca_ativa: number;
  cram_atendimentos_recepcao: number;
  cram_acolhimentos_sociais: number;
  cram_orientacoes_juridicas_total: number;
  ser_ouvidoria_total_historico: number;
  ser_sala_azul_encontros_individuais: number;
  ser_sala_azul_grupos_reflexivos: number;
  ser_sala_azul_participantes_medios: number;
  ser_servicos_sociais: number;
  ser_servicos_psicologicos: number;
  ser_servicos_juridicos: number;
  ser_acoes_conscientizacao: number;
  ser_acoes_escutas: number;
  ser_acoes_campanhas: number;
  ser_capacitacoes_curso_cuidador: number;
  ser_capacitacoes_feira_expositoras: number;
  ser_capacitacoes_centro_vivo_data: string | null;
};

type DirectusCramAtendimentoPsicologico = {
  dashboard_id: DirectusRelation;
  nome: string;
  valor: number | string;
  ordem: number;
};

type DirectusCramOrientacaoJuridicaDistribuicao = {
  dashboard_id: DirectusRelation;
  label: string;
  valor: number | string;
  ordem: number;
};

type DirectusSermulherOuvidoriaSerie = {
  dashboard_id: DirectusRelation;
  month_label: string;
  valor: number | string;
  ordem: number;
};

type DirectusSermulherServicoDistribuicao = {
  dashboard_id: DirectusRelation;
  name: string;
  value: number | string;
  ordem: number;
};

const DASHBOARD_FIELDS = [
  "id",
  "periodo_id",
  "period_label",
  "cram_periodo",
  "cram_mulheres_encaminhadas",
  "cram_mulheres_atendidas",
  "cram_novos_casos",
  "cram_servicos_realizados",
  "cram_rodas_terapeuticas",
  "cram_atendimentos_grupo",
  "cram_busca_ativa",
  "cram_atendimentos_recepcao",
  "cram_acolhimentos_sociais",
  "cram_orientacoes_juridicas_total",
  "ser_ouvidoria_total_historico",
  "ser_sala_azul_encontros_individuais",
  "ser_sala_azul_grupos_reflexivos",
  "ser_sala_azul_participantes_medios",
  "ser_servicos_sociais",
  "ser_servicos_psicologicos",
  "ser_servicos_juridicos",
  "ser_acoes_conscientizacao",
  "ser_acoes_escutas",
  "ser_acoes_campanhas",
  "ser_capacitacoes_curso_cuidador",
  "ser_capacitacoes_feira_expositoras",
  "ser_capacitacoes_centro_vivo_data",
].join(",");

const toNumber = (value: unknown): number => {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const relationId = (
  value: DirectusRelation | null | undefined,
): string | null => {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  return value.id;
};

const toDisplayDate = (value: string | null): string | null => {
  if (!value) {
    return null;
  }

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return value;
  }

  const [, , month, day] = match;
  return `${day}/${month}`;
};

const toQueryString = (
  params: Record<string, string | number | undefined>,
): string => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue;
    }

    query.set(key, String(value));
  }

  return query.toString();
};

async function fetchDirectusCollection<T>(
  baseUrl: string,
  token: string | undefined,
  collection: string,
  params: Record<string, string | number | undefined>,
): Promise<T[]> {
  const query = toQueryString(params);
  const endpoint = `${baseUrl}/items/${collection}${query ? `?${query}` : ""}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar ${collection}: ${response.status}`);
  }

  const payload = (await response.json()) as DirectusListResponse<T>;
  return Array.isArray(payload.data) ? payload.data : [];
}

async function fetchDirectusCollectionSafe<T>(
  baseUrl: string,
  token: string | undefined,
  collection: string,
  params: Record<string, string | number | undefined>,
): Promise<T[]> {
  try {
    return await fetchDirectusCollection<T>(baseUrl, token, collection, params);
  } catch (error) {
    console.warn(`Aviso ao consultar ${collection}:`, error);
    return [];
  }
}

function groupByDashboardId<
  T extends { dashboard_id: DirectusRelation; ordem: number },
>(rows: T[]): Map<string, T[]> {
  const grouped = new Map<string, T[]>();

  for (const row of rows) {
    const dashboardId = relationId(row.dashboard_id);
    if (!dashboardId) {
      continue;
    }

    const currentRows = grouped.get(dashboardId) ?? [];
    currentRows.push(row);
    grouped.set(dashboardId, currentRows);
  }

  for (const rowsByDashboard of grouped.values()) {
    rowsByDashboard.sort(
      (first, second) => toNumber(first.ordem) - toNumber(second.ordem),
    );
  }

  return grouped;
}

export async function getDashboardDataMap(): Promise<DashboardDataMap> {
  const directusUrl =
    process.env.DIRECTUS_API_URL?.replace(/\/$/, "") ??
    process.env.NEXT_PUBLIC_DIRECTUS_URL?.replace(/\/$/, "");
  const directusToken = process.env.DIRECTUS_TOKEN;

  if (!directusUrl) {
    return HISTORICO_DADOS;
  }

  try {
    const periodos = await fetchDirectusCollection<DirectusPeriodo>(
      directusUrl,
      directusToken,
      "obser_periodos",
      {
        fields: "id,nome_periodo,ordem",
        sort: "ordem",
        "filter[ativo][_eq]": "true",
        limit: "-1",
      },
    );

    if (!periodos.length) {
      return HISTORICO_DADOS;
    }

    const periodoIds = periodos.map((periodo) => periodo.id);
    if (!periodoIds.length) {
      return HISTORICO_DADOS;
    }

    const dashboards = await fetchDirectusCollection<DirectusDashboard>(
      directusUrl,
      directusToken,
      "obser_dashboards",
      {
        fields: DASHBOARD_FIELDS,
        "filter[periodo_id][_in]": periodoIds.join(","),
        limit: "-1",
      },
    );

    if (!dashboards.length) {
      return HISTORICO_DADOS;
    }

    const dashboardIds = dashboards.map((dashboard) => dashboard.id);

    const [
      cramAtendimentosPsicologicos,
      cramOrientacoesJuridicasDistribuicao,
      sermulherOuvidoriaSeries,
      sermulherServicosDistribuicao,
    ] = await Promise.all([
      fetchDirectusCollectionSafe<DirectusCramAtendimentoPsicologico>(
        directusUrl,
        directusToken,
        "obser_cram_atendimentos_psicologicos",
        {
          fields: "dashboard_id,nome,valor,ordem",
          sort: "dashboard_id,ordem",
          "filter[dashboard_id][_in]": dashboardIds.join(","),
          limit: "-1",
        },
      ),
      fetchDirectusCollectionSafe<DirectusCramOrientacaoJuridicaDistribuicao>(
        directusUrl,
        directusToken,
        "obser_cram_orientacoes_juridicas_distribuicao",
        {
          fields: "dashboard_id,label,valor,ordem",
          sort: "dashboard_id,ordem",
          "filter[dashboard_id][_in]": dashboardIds.join(","),
          limit: "-1",
        },
      ),
      fetchDirectusCollectionSafe<DirectusSermulherOuvidoriaSerie>(
        directusUrl,
        directusToken,
        "obser_sermulher_ouvidoria_series",
        {
          fields: "dashboard_id,month_label,valor,ordem",
          sort: "dashboard_id,ordem",
          "filter[dashboard_id][_in]": dashboardIds.join(","),
          limit: "-1",
        },
      ),
      fetchDirectusCollectionSafe<DirectusSermulherServicoDistribuicao>(
        directusUrl,
        directusToken,
        "obser_sermulher_servicos_distribuicao",
        {
          fields: "dashboard_id,name,value,ordem",
          sort: "dashboard_id,ordem",
          "filter[dashboard_id][_in]": dashboardIds.join(","),
          limit: "-1",
        },
      ),
    ]);

    const dashboardsByPeriodoId = new Map<string, DirectusDashboard>();
    for (const dashboard of dashboards) {
      const periodoId = relationId(dashboard.periodo_id);
      if (periodoId) {
        dashboardsByPeriodoId.set(periodoId, dashboard);
      }
    }

    const cramPsicoByDashboard = groupByDashboardId(
      cramAtendimentosPsicologicos,
    );
    const cramJuridicoByDashboard = groupByDashboardId(
      cramOrientacoesJuridicasDistribuicao,
    );
    const sermulherOuvidoriaByDashboard = groupByDashboardId(
      sermulherOuvidoriaSeries,
    );
    const sermulherServicosByDashboard = groupByDashboardId(
      sermulherServicosDistribuicao,
    );

    const mappedData: DashboardDataMap = {};

    for (const periodo of periodos) {
      const dashboard = dashboardsByPeriodoId.get(periodo.id);
      if (!dashboard) {
        const fallbackData =
          HISTORICO_DADOS[periodo.nome_periodo as keyof typeof HISTORICO_DADOS];
        if (fallbackData) {
          mappedData[periodo.nome_periodo] = fallbackData;
        }
        continue;
      }

      const dashboardId = dashboard.id;
      const periodLabel = dashboard.period_label || periodo.nome_periodo;
      const fallbackData =
        HISTORICO_DADOS[periodLabel as keyof typeof HISTORICO_DADOS] ??
        HISTORICO_DADOS[periodo.nome_periodo as keyof typeof HISTORICO_DADOS];

      const cramAtendimentosPsicologicosItems = (
        cramPsicoByDashboard.get(dashboardId) ?? []
      ).map((item) => ({
        name: item.nome,
        value: toNumber(item.valor),
      }));

      const cramJuridicoDistribuicaoItems = (
        cramJuridicoByDashboard.get(dashboardId) ?? []
      ).map((item) => ({
        label: item.label,
        value: toNumber(item.valor),
      }));

      const sermulherOuvidoriaSeriesItems = (
        sermulherOuvidoriaByDashboard.get(dashboardId) ?? []
      ).map((item) => ({
        month: item.month_label,
        value: toNumber(item.valor),
      }));

      const sermulherServicosDistribuicaoItems = (
        sermulherServicosByDashboard.get(dashboardId) ?? []
      ).map((item) => ({
        name: item.name,
        value: toNumber(item.value),
      }));

      mappedData[periodLabel] = {
        period: periodLabel,
        cram: {
          periodo: dashboard.cram_periodo || periodLabel,
          visaoGeral: {
            mulheresEncaminhadas: toNumber(
              dashboard.cram_mulheres_encaminhadas,
            ),
            mulheresAtendidas: toNumber(dashboard.cram_mulheres_atendidas),
            novosCasos: toNumber(dashboard.cram_novos_casos),
            servicosRealizados: toNumber(dashboard.cram_servicos_realizados),
            rodasTerapeuticas: toNumber(dashboard.cram_rodas_terapeuticas),
            atendimentosGrupo: toNumber(dashboard.cram_atendimentos_grupo),
            buscaAtiva: toNumber(dashboard.cram_busca_ativa),
            atendimentosRecepcao: toNumber(
              dashboard.cram_atendimentos_recepcao,
            ),
          },
          atendimentosPsicologicos:
            cramAtendimentosPsicologicosItems.length > 0
              ? cramAtendimentosPsicologicosItems
              : (fallbackData?.cram.atendimentosPsicologicos ?? []),
          acolhimentosSociais: toNumber(dashboard.cram_acolhimentos_sociais),
          orientacoesJuridicas: {
            total: toNumber(dashboard.cram_orientacoes_juridicas_total),
            distribuicao:
              cramJuridicoDistribuicaoItems.length > 0
                ? cramJuridicoDistribuicaoItems
                : (fallbackData?.cram.orientacoesJuridicas.distribuicao ?? []),
          },
        },
        sermulher: {
          ouvidoria: {
            totalHistorico: toNumber(dashboard.ser_ouvidoria_total_historico),
            series:
              sermulherOuvidoriaSeriesItems.length > 0
                ? sermulherOuvidoriaSeriesItems
                : (fallbackData?.sermulher.ouvidoria.series ?? []),
          },
          salaAzul: {
            encontrosIndividuais: toNumber(
              dashboard.ser_sala_azul_encontros_individuais,
            ),
            gruposReflexivos: toNumber(
              dashboard.ser_sala_azul_grupos_reflexivos,
            ),
            participantesMedios: toNumber(
              dashboard.ser_sala_azul_participantes_medios,
            ),
          },
          servicos: {
            sociais: toNumber(dashboard.ser_servicos_sociais),
            psicologicos: toNumber(dashboard.ser_servicos_psicologicos),
            juridicos: toNumber(dashboard.ser_servicos_juridicos),
            distribuicao:
              sermulherServicosDistribuicaoItems.length > 0
                ? sermulherServicosDistribuicaoItems
                : (fallbackData?.sermulher.servicos.distribuicao ?? []),
          },
          acoes: {
            conscientizacao: toNumber(dashboard.ser_acoes_conscientizacao),
            escutas: toNumber(dashboard.ser_acoes_escutas),
            campanhas: toNumber(dashboard.ser_acoes_campanhas),
          },
          capacitacoes: {
            cursoCuidador: toNumber(dashboard.ser_capacitacoes_curso_cuidador),
            feiraExpositoras: toNumber(
              dashboard.ser_capacitacoes_feira_expositoras,
            ),
            centroVivoData: toDisplayDate(
              dashboard.ser_capacitacoes_centro_vivo_data,
            ),
          },
        },
      };
    }

    if (!Object.keys(mappedData).length) {
      return HISTORICO_DADOS;
    }

    return mappedData;
  } catch (error) {
    console.error("Erro ao carregar dados do Directus:", error);
    return HISTORICO_DADOS;
  }
}
