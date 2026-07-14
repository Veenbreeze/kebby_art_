export function placeholderImage(seed: string, width: number, height: number): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

export function kebbyImage(filename: string): string {
  return `/kebby/${encodeURIComponent(filename)}`
}

export function avatarImage(seed: number): string {
  return `https://i.pravatar.cc/150?img=${seed}`
}
