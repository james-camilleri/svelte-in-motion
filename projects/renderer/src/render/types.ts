export interface SceneData {
  /**
   * The length of the scene to render, in seconds.
   */
  length?: number

  /**
   * Path to the audio file to be composited with the video.
   */
  audio?: string

  /**
   * Offset time in seconds, if the audio is to start after the video.
   */
  audioOffset?: number

  /**
   * Skips rendering this variant if set to `true`.
   */
  skip?: boolean
}

export interface Scene {
  /**
   * The length of the scene to render, in seconds.
   */
  length: number

  /**
   * Path to the audio file to be composited with the video.
   */
  audio?: string

  /**
   * Offset time in seconds, if the audio is to start after the video.
   */
  audioOffset?: number

  /**
   * Skips rendering this scene if set to `true`.
   */
  skip?: boolean

  /**
   * Data for variants of the scene. Length, audio, audio offset, and skip
   * values will override the global settings. Any other properties
   * will be forwarded to the svelte Scene via query parameters.
   */
  data?: (SceneData & Record<string, string | number>)[]
}

export interface RenderConfig {
  /**
   * The resolution of the output video.
   */
  resolution: {
    width: number
    height: number
  }

  /**
   * The framerate of the output video.
   */
  framerate: number

  /**
   * Whether the rendered frames should be deleted after compiling the final video.
   * Set to false if rendering large/complex projects, just in case you
   * need to re-render any malformed frames.
   */
  deleteFrames: boolean

  /**
   * Set to `true` if the frames have already been rendered in a separate run
   * and a simple composite of the existing frames is required.
   */
  compositeOnly: boolean

  /**
   * A map of scenes and their scene-specific config.
   * Names should match the Svelte component in `$scenes`.
   */
  scenes: {
    [name: string]: Scene
  }
}
