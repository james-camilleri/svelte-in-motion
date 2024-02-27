import { clock } from '$lib/clock'

// In routes/[action]/[...scene]
const { params } = $page
const [sceneName, frame] = params.scene.split('/')

onMount(() => {
  if (frame !== undefined) {
    const framerate = config?.framerate ?? 60
    $clock?.tick((1000 / framerate) * +frame)
  }
})
