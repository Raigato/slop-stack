import { z } from 'zod'

const envSchema = z.object({
  VITE_APP_NAME: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  console.error('Invalid environment variables:', z.treeifyError(parsed.error))
  throw new Error('Invalid environment variables')
}

export const env: Env = parsed.data
