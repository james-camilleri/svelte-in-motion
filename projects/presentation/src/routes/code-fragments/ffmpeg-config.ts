const offset = (audioOffset ?? 0) * 1000
const framerateFlag = ['-framerate', String(config.framerate)]
const imageInputFlag = ['-i', `frames/${filename}-${i}/%d.png`]
const audioInputFlag = audio ? ['-i', `../assets/audio/${audio}`] : []
const audioDelayFlag = audio ? ['-filter_complex', `adelay=${offset}|${offset}`] : []
const overwriteFlag = ['-y']

const output = TRANSPARENT_BACKGROUND
  ? ['-c:v', 'png', `${i}-${filename}.mov`]
  : ['-c:v', 'libx264', `${i}-${filename}.mp4`]

console.log(`Compiling frames for ${output[0]}`)

await execa(
  'ffmpeg',
  [...framerateFlag, ...imageInputFlag, ...audioInputFlag, ...audioDelayFlag, ...overwriteFlag, ...output],
  { cwd: OUTPUT_DIR },
)

if (config.deleteFrames) {
  fs.rmSync(`${OUTPUT_DIR}/frames`, { recursive: true, force: true })
}
