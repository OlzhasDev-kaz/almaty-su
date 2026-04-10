/**
 * Обёртка: генерирует заглушки страниц (перезапись!).
 * Windows PowerShell: $env:ALMATY_SU_SCAFFOLD='1'; node tools/gen-pages.mjs
 */
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const r = spawnSync(process.execPath, [path.join(__dirname, "gen-pages.mjs")], {
  env: { ...process.env, ALMATY_SU_SCAFFOLD: "1" },
  stdio: "inherit",
});
process.exit(r.status ?? 1);
