export function cutHash(hash: string, leftSlice = 4, rightSlice = 4) {
  return `${hash.slice(0, leftSlice)}......${hash.slice(-rightSlice)}`;
}
