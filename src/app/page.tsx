import { CramView } from "../components/observatorio/CramView";
import { DashboardShell } from "../components/observatorio/DashboardShell";
import { DATA_JAN_2026 } from "../components/observatorio/data";
import { SermulherView } from "../components/observatorio/SermulherView";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4c0519] via-[#2e1065] to-[#0f172a] px-4 py-8">
      <DashboardShell
        title="Gestão SERMULHER"
        subtitle="Dashboard com indicadores consolidados da SERMULHER e do CRAM."
        period={DATA_JAN_2026.period}
      >
        <Tabs defaultValue="sermulher" className="w-full">
          <TabsList className="bg-white/10">
            <TabsTrigger value="sermulher">SERMULHER</TabsTrigger>
            <TabsTrigger value="cram">CRAM</TabsTrigger>
          </TabsList>
          <TabsContent value="sermulher">
            <SermulherView data={DATA_JAN_2026.sermulher} />
          </TabsContent>
          <TabsContent value="cram">
            <CramView data={DATA_JAN_2026.cram} />
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </div>
  );
}
