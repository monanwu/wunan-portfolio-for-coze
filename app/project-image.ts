export function toWebpFilename(filename: string) {
  return filename.replace(/\.(png|jpe?g)$/i, ".webp");
}

export function toProjectWebpPath(path: string) {
  return toWebpFilename(path.replace(/^\/projects\//, "/projects-webp/"));
}
