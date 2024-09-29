FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# Установим curl
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy the download script and entrypoint script
COPY download-tessdata.sh /usr/src/app/download-tessdata.sh
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/download-tessdata.sh /usr/src/app/entrypoint.sh

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/sockets.js .
COPY --from=prerelease /usr/src/app/worker.js .
COPY --from=prerelease /usr/src/app/package.json .

# run the app
USER bun

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]