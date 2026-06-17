import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// ARTIFACT=1 inlines all JS/CSS into one self-contained dist/index.html —
// paste it into Claude as an HTML artifact. Normal build stays code-split.
const artifact = process.env.ARTIFACT === '1';

export default defineConfig({
  plugins: [react(), ...(artifact ? [viteSingleFile()] : [])],
});
