import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  entry: {
    "TORBEN-client": "./torben/client.js",
    "TORBEN-server": "./torben/server.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "src")
  }
}