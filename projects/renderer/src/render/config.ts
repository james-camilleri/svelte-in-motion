import type { RenderConfig } from './types'

export const config: RenderConfig = {
  resolution: {
    width: 1920,
    height: 1080,
  },
  framerate: 50,
  deleteFrames: true,
  compositeOnly: false,
  scenes: {
    TitleSlide: {
      length: 13,
      audioOffset: 1.6,
      data: [
        {
          name: 'James Camilleri',
          title: 'software engineer, designer',
          audio: 'tigger.mp3',
        },
      ],
    },
  },
}

export function renders() {
  return Object.entries(config.scenes)
    .map(
      ([
        name,
        { length: globalLength, audio: globalAudio, audioOffset: globalAudioOffset, skip: globalSkip, data },
      ]) => {
        return data && data.length > 0
          ? data.map(({ length, audio, audioOffset, skip, ...params }, i) => {
              return {
                scene: name,
                filename: Object.values(params)?.[0]?.toString()?.replaceAll(' ', '-') ?? `render-${i}`,
                query: new URLSearchParams({
                  ...params,
                  length: (length ?? globalLength).toString(),
                  config: JSON.stringify(config),
                }),
                length: length ?? globalLength,
                audio: audio ?? globalAudio,
                audioOffset: audioOffset ?? globalAudioOffset,
                skip,
              }
            })
          : [
              {
                scene: name,
                filename: name,
                query: new URLSearchParams({
                  length: (length ?? globalLength).toString(),
                  config: JSON.stringify(config),
                }),
                length: globalLength,
                audio: globalAudio,
                audioOffset: globalAudioOffset,
                skip: globalSkip,
              },
            ]
      },
    )
    .flat()
}
