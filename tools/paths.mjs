/**
 * Корень репозитория и папка публикуемого сайта (статика для Netlify / FTP).
 */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const projectRoot = path.resolve(__dirname, "..");
export const webRoot = path.join(projectRoot, "web");
