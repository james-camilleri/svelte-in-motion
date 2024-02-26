<script lang="ts">
  import { onMount } from 'svelte'

  import { page } from '$app/stores'
  import { clock } from '$lib/clock'
  import { setResolution } from '$lib/units'
  import * as scenes from '$scenes'

  const { params, url } = $page
  const [sceneName, frame] = params.scene.split('/')
  const scene = scenes[sceneName]
  const props = Object.fromEntries(url.searchParams)
  const config = props?.config && JSON.parse(props.config)

  setResolution({
    width: config?.width,
    height: config?.height,
  })

  onMount(() => {
    if (frame !== undefined) {
      // Assume 60fps if not given.
      const framerate = config?.framerate ?? 60

      $clock?.tick((1000 / framerate) * +frame)
    }
  })
</script>

<svelte:component this={scene} {...props} {config} />
