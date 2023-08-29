FROM node:18-alpine AS base

FROM base AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY --link pnpm-lock.yaml* .npmrc ./
RUN --mount=type=secret,id=NPM_AUTH_TOKEN \
  npm install -g pnpm && \
  pnpm fetch

# Rebuild the source code only when needed
COPY --link  . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm install --frozen-lockfile

WORKDIR /app/motoko-editor

# TODO: Symlinks are copied as symlinks pointing to target that does not exist in the runner image. As a workaround, we
# replace the symlink with the target.
RUN cd public/content2 && for f in $(find -type l);do cp -r --remove-destination $(readlink $f) tmp; rm -rf $f; mv tmp $f; done;

RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/motoko-editor/public ./motoko-editor/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/motoko-editor/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/motoko-editor/.next/static ./motoko-editor/.next/static

USER nextjs

EXPOSE 3010
ENV PORT 3010

WORKDIR /app/motoko-editor

CMD ["node", "server.js"]
