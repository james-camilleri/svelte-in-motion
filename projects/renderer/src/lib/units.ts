const resolution = {
  width: 1920,
  height: 1080,
}

export function setResolution({ width, height }: { width?: number; height?: number }) {
  if (width) {
    resolution.width = width
  }

  if (height) {
    resolution.height = height
  }
}

export function vw(w: number) {
  return (resolution.width / 100) * w
}

export function vh(h: number) {
  return (resolution.height / 100) * h
}

export function toMs(timeInSeconds: number) {
  return timeInSeconds * 1000
}
