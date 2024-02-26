<script lang="ts">
  import FakeTimers from '@sinonjs/fake-timers'

  import { page } from '$app/stores'
  import { clock } from '$lib/clock'

  // [svelte-meetup]
  // Install a fake controllable clock for the rendering process.

  if ($page.params.action === 'render' && !$clock) {
    $clock = FakeTimers.install()
  }

  if ($page.params.action !== 'render' && $clock) {
    $clock.uninstall()
    $clock = undefined
  }
</script>

<slot />
