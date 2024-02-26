import fs from 'fs'

import { execa } from 'execa'

import { config, renders } from './config.js'

const OUTPUT_DIR = 'output'
const TRANSPARENT_BACKGROUND = false

export default async function teardown() {
  let i = -1
  console.log()

  for (const { filename, audio, audioOffset, skip } of renders()) {
    i++

    if (skip) {
      continue
    }

    const offset = (audioOffset ?? 0) * 1000
    const framerateFlag = ['-framerate', String(config.framerate)]
    const imageInputFlag = ['-i', `frames.nosync.me/${filename}-${i}/%d.png`]
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
  }

  if (config.deleteFrames) {
    fs.rmSync(`${OUTPUT_DIR}/frames.nosync.me`, { recursive: true, force: true })
  }
}
