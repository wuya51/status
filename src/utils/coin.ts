export const scaleCoin = (unscaled: number): string => {
  return (unscaled / 1_000_000).toLocaleString()
}
