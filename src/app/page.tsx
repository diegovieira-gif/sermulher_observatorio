import { ObservatorioClient } from "../components/observatorio/ObservatorioClient";
import { getDashboardDataMap } from "../lib/observatorio-directus";

export const dynamic = "force-dynamic";

export default async function Home() {
  const historicoDados = await getDashboardDataMap();

  return <ObservatorioClient historicoDados={historicoDados} />;
}
