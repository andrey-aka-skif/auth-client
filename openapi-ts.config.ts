import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
    input: './src/shared/api/manifest/swagger.json',
    output: './src/shared/api/generated',
    plugins: ['@hey-api/client-axios'], 
})
