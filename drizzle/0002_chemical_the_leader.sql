ALTER TABLE "tipo" ALTER COLUMN "efficacia" SET DEFAULT '{"offensivo":{"superefficace":[],"poco_efficace":[],"inefficace":[]},"diffensivo":{"superefficace":[],"poco_efficace":[],"inefficace":[]}}'::jsonb;