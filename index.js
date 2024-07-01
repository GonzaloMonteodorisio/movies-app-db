import app from './src/app.js';
import { port } from './src/config/config.js';

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});