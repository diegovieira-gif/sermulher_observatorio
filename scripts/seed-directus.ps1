param(
  [string]$EnvFile = ".env.local"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $EnvFile)) {
  throw "Arquivo de ambiente não encontrado: $EnvFile"
}

Get-Content $EnvFile |
  Where-Object { $_ -match '^[A-Za-z_][A-Za-z0-9_]*=' } |
  ForEach-Object {
    $parts = $_ -split '=', 2
    $name = $parts[0]
    $value = $parts[1].Trim('"')
    Set-Item -Path "env:$name" -Value $value
  }

$baseUrl = $env:DIRECTUS_API_URL
if (-not $baseUrl) {
  $baseUrl = $env:NEXT_PUBLIC_DIRECTUS_URL
}

if (-not $baseUrl) {
  throw "DIRECTUS_API_URL ou NEXT_PUBLIC_DIRECTUS_URL não definidos"
}

if (-not $env:DIRECTUS_TOKEN) {
  throw "DIRECTUS_TOKEN não definido"
}

$baseUrl = $baseUrl.TrimEnd('/')
$headers = @{
  Authorization = "Bearer $($env:DIRECTUS_TOKEN)"
  "Content-Type" = "application/json"
}

function To-Array {
  param([object]$Value)

  if ($null -eq $Value) {
    return @()
  }

  if ($Value -is [System.Array]) {
    return $Value
  }

  return @($Value)
}

function Invoke-Directus {
  param(
    [Parameter(Mandatory = $true)][string]$Method,
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $false)][object]$Body
  )

  $uri = "$baseUrl$Path"

  if ($PSBoundParameters.ContainsKey('Body')) {
    $jsonBody = $Body | ConvertTo-Json -Depth 30
    return Invoke-RestMethod -Method $Method -Uri $uri -Headers $headers -Body $jsonBody
  }

  return Invoke-RestMethod -Method $Method -Uri $uri -Headers $headers
}

function Ensure-Periodo {
  param(
    [string]$Nome,
    [string]$DataReferencia,
    [int]$Ordem
  )

  $encodedNome = [uri]::EscapeDataString($Nome)
  $existing = Invoke-Directus -Method Get -Path "/items/obser_periodos?fields=id,nome_periodo&filter[nome_periodo][_eq]=$encodedNome&limit=1"
  $rows = To-Array $existing.data

  if ($rows.Count -gt 0) {
    return $rows[0].id
  }

  $created = Invoke-Directus -Method Post -Path "/items/obser_periodos" -Body @{
    nome_periodo = $Nome
    data_referencia = $DataReferencia
    ordem = $Ordem
    ativo = $true
  }

  return $created.data.id
}

function Upsert-Dashboard {
  param(
    [string]$PeriodoId,
    [hashtable]$Payload
  )

  $existing = Invoke-Directus -Method Get -Path "/items/obser_dashboards?fields=id&filter[periodo_id][_eq]=$PeriodoId&limit=1"
  $rows = To-Array $existing.data

  if ($rows.Count -gt 0) {
    $dashboardId = $rows[0].id
    Invoke-Directus -Method Patch -Path "/items/obser_dashboards/$dashboardId" -Body $Payload | Out-Null
    return $dashboardId
  }

  $createPayload = @{}
  foreach ($key in $Payload.Keys) {
    $createPayload[$key] = $Payload[$key]
  }
  $createPayload["periodo_id"] = $PeriodoId

  $created = Invoke-Directus -Method Post -Path "/items/obser_dashboards" -Body $createPayload
  return $created.data.id
}

function Replace-Children {
  param(
    [string]$Collection,
    [string]$DashboardId,
    [array]$Rows
  )

  $existing = Invoke-Directus -Method Get -Path "/items/$Collection?fields=id&filter[dashboard_id][_eq]=$DashboardId&limit=-1"
  $existingRows = To-Array $existing.data

  foreach ($item in $existingRows) {
    Invoke-Directus -Method Delete -Path "/items/$Collection/$($item.id)" | Out-Null
  }

  if (-not $Rows -or $Rows.Count -eq 0) {
    return
  }

  foreach ($row in $Rows) {
    $mapped = @{ dashboard_id = $DashboardId }

    foreach ($property in $row.PSObject.Properties.Name) {
      $mapped[$property] = $row.$property
    }

    Invoke-Directus -Method Post -Path "/items/$Collection" -Body $mapped | Out-Null
  }
}

$seedData = @(
  @{
    nome_periodo = "Janeiro 2026"
    data_referencia = "2026-01-01"
    ordem = 202601
    dashboard = @{
      period_label = "Janeiro 2026"
      cram_periodo = "Janeiro 2026"
      cram_mulheres_encaminhadas = 131
      cram_mulheres_atendidas = 122
      cram_novos_casos = 54
      cram_servicos_realizados = 184
      cram_rodas_terapeuticas = 2
      cram_atendimentos_grupo = 14
      cram_busca_ativa = 8
      cram_atendimentos_recepcao = 53
      cram_acolhimentos_sociais = 42
      cram_orientacoes_juridicas_total = 33
      ser_ouvidoria_total_historico = 56
      ser_sala_azul_encontros_individuais = 31
      ser_sala_azul_grupos_reflexivos = 1
      ser_sala_azul_participantes_medios = 18
      ser_servicos_sociais = 16
      ser_servicos_psicologicos = 29
      ser_servicos_juridicos = 6
      ser_acoes_conscientizacao = 1
      ser_acoes_escutas = 0
      ser_acoes_campanhas = 1
      ser_capacitacoes_curso_cuidador = 0
      ser_capacitacoes_feira_expositoras = 0
      ser_capacitacoes_centro_vivo_data = $null
    }
    cram_psicologicos = @(
      @{ nome = "Realizadas"; valor = 48; ordem = 1 },
      @{ nome = "Faltas/Remarcações"; valor = 46; ordem = 2 }
    )
    cram_juridico_distribuicao = @(
      @{ label = "Direito Penal"; valor = 36; ordem = 1 },
      @{ label = "Direito de Família"; valor = 34; ordem = 2 },
      @{ label = "Orientação Multidisciplinar"; valor = 18; ordem = 3 },
      @{ label = "Direitos Fundamentais"; valor = 12; ordem = 4 }
    )
    ouvidoria_series = @(
      @{ month_label = "2025"; valor = 26; ordem = 1 },
      @{ month_label = "Jan 2026"; valor = 30; ordem = 2 }
    )
    servicos_distribuicao = @(
      @{ name = "Atendimentos Psicológicos"; value = 56.9; ordem = 1 },
      @{ name = "Atendimentos Sociais"; value = 31.4; ordem = 2 },
      @{ name = "Atendimentos Jurídicos"; value = 11.7; ordem = 3 }
    )
  },
  @{
    nome_periodo = "Fevereiro 2026"
    data_referencia = "2026-02-01"
    ordem = 202602
    dashboard = @{
      period_label = "Fevereiro 2026"
      cram_periodo = "Fevereiro 2026"
      cram_mulheres_encaminhadas = 170
      cram_mulheres_atendidas = 84
      cram_novos_casos = 35
      cram_servicos_realizados = 340
      cram_rodas_terapeuticas = 6
      cram_atendimentos_grupo = 52
      cram_busca_ativa = 31
      cram_atendimentos_recepcao = 195
      cram_acolhimentos_sociais = 33
      cram_orientacoes_juridicas_total = 27
      ser_ouvidoria_total_historico = 94
      ser_sala_azul_encontros_individuais = 32
      ser_sala_azul_grupos_reflexivos = 2
      ser_sala_azul_participantes_medios = 25
      ser_servicos_sociais = 8
      ser_servicos_psicologicos = 18
      ser_servicos_juridicos = 4
      ser_acoes_conscientizacao = 9
      ser_acoes_escutas = 0
      ser_acoes_campanhas = 1
      ser_capacitacoes_curso_cuidador = 13
      ser_capacitacoes_feira_expositoras = 0
      ser_capacitacoes_centro_vivo_data = $null
    }
    cram_psicologicos = @(
      @{ nome = "Atendimentos realizados"; valor = 54; ordem = 1 },
      @{ nome = "Faltaram ou Remarcaram"; valor = 57; ordem = 2 }
    )
    cram_juridico_distribuicao = @(
      @{ label = "Direito Penal"; valor = 40.7; ordem = 1 },
      @{ label = "Direito de Família"; valor = 37; ordem = 2 },
      @{ label = "Direito Processual Civil"; valor = 14.8; ordem = 3 },
      @{ label = "Outros"; valor = 7.4; ordem = 4 }
    )
    ouvidoria_series = @(
      @{ month_label = "2025"; valor = 26; ordem = 1 },
      @{ month_label = "Jan 2026"; valor = 30; ordem = 2 },
      @{ month_label = "Fev 2026"; valor = 38; ordem = 3 }
    )
    servicos_distribuicao = @(
      @{ name = "Atendimentos Psicológicos"; value = 60.0; ordem = 1 },
      @{ name = "Atendimentos Sociais"; value = 26.7; ordem = 2 },
      @{ name = "Atendimentos Jurídicos"; value = 13.3; ordem = 3 }
    )
  },
  @{
    nome_periodo = "Março 2026"
    data_referencia = "2026-03-01"
    ordem = 202603
    dashboard = @{
      period_label = "Março 2026"
      cram_periodo = "Março 2026"
      cram_mulheres_encaminhadas = 0
      cram_mulheres_atendidas = 0
      cram_novos_casos = 0
      cram_servicos_realizados = 0
      cram_rodas_terapeuticas = 0
      cram_atendimentos_grupo = 0
      cram_busca_ativa = 0
      cram_atendimentos_recepcao = 0
      cram_acolhimentos_sociais = 0
      cram_orientacoes_juridicas_total = 0
      ser_ouvidoria_total_historico = 94
      ser_sala_azul_encontros_individuais = 0
      ser_sala_azul_grupos_reflexivos = 0
      ser_sala_azul_participantes_medios = 0
      ser_servicos_sociais = 0
      ser_servicos_psicologicos = 0
      ser_servicos_juridicos = 0
      ser_acoes_conscientizacao = 0
      ser_acoes_escutas = 0
      ser_acoes_campanhas = 0
      ser_capacitacoes_curso_cuidador = 0
      ser_capacitacoes_feira_expositoras = 1
      ser_capacitacoes_centro_vivo_data = "2026-03-08"
    }
    cram_psicologicos = @(
      @{ nome = "Realizadas"; valor = 0; ordem = 1 },
      @{ nome = "Faltas/Remarcações"; valor = 0; ordem = 2 }
    )
    cram_juridico_distribuicao = @()
    ouvidoria_series = @(
      @{ month_label = "2025"; valor = 26; ordem = 1 },
      @{ month_label = "Jan 2026"; valor = 30; ordem = 2 },
      @{ month_label = "Fev 2026"; valor = 38; ordem = 3 },
      @{ month_label = "Mar 2026"; valor = 0; ordem = 4 }
    )
    servicos_distribuicao = @()
  }
)

$createdDashboards = @()

foreach ($entry in $seedData) {
  $periodoId = Ensure-Periodo -Nome $entry.nome_periodo -DataReferencia $entry.data_referencia -Ordem $entry.ordem

  $dashboardId = Upsert-Dashboard -PeriodoId $periodoId -Payload $entry.dashboard

  try {
    Replace-Children -Collection "obser_cram_atendimentos_psicologicos" -DashboardId $dashboardId -Rows $entry.cram_psicologicos
  }
  catch {
    Write-Output "Aviso: sem permissão ou coleção indisponível em obser_cram_atendimentos_psicologicos"
  }

  try {
    Replace-Children -Collection "obser_cram_orientacoes_juridicas_distribuicao" -DashboardId $dashboardId -Rows $entry.cram_juridico_distribuicao
  }
  catch {
    Write-Output "Aviso: sem permissão ou coleção indisponível em obser_cram_orientacoes_juridicas_distribuicao"
  }

  try {
    Replace-Children -Collection "obser_sermulher_ouvidoria_series" -DashboardId $dashboardId -Rows $entry.ouvidoria_series
  }
  catch {
    Write-Output "Aviso: sem permissão ou coleção indisponível em obser_sermulher_ouvidoria_series"
  }

  try {
    Replace-Children -Collection "obser_sermulher_servicos_distribuicao" -DashboardId $dashboardId -Rows $entry.servicos_distribuicao
  }
  catch {
    Write-Output "Aviso: sem permissão ou coleção indisponível em obser_sermulher_servicos_distribuicao"
  }

  $createdDashboards += [PSCustomObject]@{
    periodo = $entry.nome_periodo
    dashboard_id = $dashboardId
  }
}

$periodosCount = (To-Array (Invoke-Directus -Method Get -Path "/items/obser_periodos?fields=id&limit=-1").data).Count
$dashboardsCount = (To-Array (Invoke-Directus -Method Get -Path "/items/obser_dashboards?fields=id&limit=-1").data).Count

Write-Output "Seed concluído com sucesso."
Write-Output "Total de períodos: $periodosCount"
Write-Output "Total de dashboards: $dashboardsCount"
$createdDashboards | Format-Table | Out-String | Write-Output
