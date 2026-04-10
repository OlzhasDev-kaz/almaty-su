# Pack static site for FTP upload (excludes tools/).
# Run: powershell -ExecutionPolicy Bypass -File tools/pack-deploy.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
$web  = Join-Path $root "web"
if (-not (Test-Path (Join-Path $web "index.html"))) {
  throw "Expected web\index.html — статика в папке web/."
}

$outDir = Join-Path $root "dist-pack"
$zip    = Join-Path $root "almatysu-site.zip"

if (Test-Path $outDir) { Remove-Item $outDir -Recurse -Force }
New-Item -ItemType Directory -Path $outDir | Out-Null

Copy-Item (Join-Path $web "*.html") $outDir
Copy-Item (Join-Path $web "css") $outDir -Recurse
Copy-Item (Join-Path $web "js") $outDir -Recurse
if (Test-Path (Join-Path $web "assets")) {
  Copy-Item (Join-Path $web "assets") $outDir -Recurse
}
$pHt = Join-Path $web ".htaccess"
if (Test-Path $pHt) { Copy-Item $pHt $outDir }
foreach ($f in @("netlify.toml", "vercel.json")) {
  $p = Join-Path $root $f
  if (Test-Path $p) { Copy-Item $p $outDir }
}

if (Test-Path $zip) { Remove-Item $zip -Force }
$items = Get-ChildItem $outDir -Force | ForEach-Object { $_.FullName }
Compress-Archive -LiteralPath $items -DestinationPath $zip -Force
Remove-Item $outDir -Recurse -Force

Write-Host "OK: $zip"
Write-Host "Upload extracted files to site root (e.g. public_html)."
