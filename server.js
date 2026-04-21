import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running on http://localhost:${PORT}`);
});
