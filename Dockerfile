FROM node:18-alpine AS base

FROM base AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY . .

WORKDIR /app/motoko-editor

RUN pnpm i --frozen-lockfile

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm build
CMD ["/bin/sh"]

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/motoko-editor/public ./motoko-editor/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/motoko-editor/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/motoko-editor/.next/static ./motoko-editor/.next/static

# TODO: content packages are not discovered by output file tracing
COPY --from=builder --chown=nextjs:nodejs /app/packages/content-common ./motoko-editor/node_modules/@agorapp/content-common
COPY --from=builder --chown=nextjs:nodejs /app/packages/content-motoko-tutorial ./motoko-editor/node_modules/@agorapp/content-motoko-tutorial
COPY --from=builder --chown=nextjs:nodejs /app/packages/content-common ./packages/content-common
COPY --from=builder --chown=nextjs:nodejs /app/packages/content-motoko-tutorial ./packages/content-motoko-tutorial

USER nextjs

EXPOSE 3010

ENV PORT 3010

WORKDIR /app/motoko-editor

CMD ["node", "server.js"]
