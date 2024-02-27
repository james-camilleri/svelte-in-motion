<script lang="ts">
  import type { Tweened } from 'svelte/motion'

  import { T, useTask } from '@threlte/core'

  export let distance: Tweened<number>
  export let angle: Tweened<number>
  export let rotationSpeedX: Tweened<number>
  export let rotationSpeedY: Tweened<number>
  export let rotationSpeedZ: Tweened<number>
  export let geometry: typeof T.BoxGeometry | typeof T.DodecahedronGeometry | typeof T.TetrahedronGeometry
  export let dark: boolean

  function toCartesian(radius: number, theta: number) {
    return { x: radius * Math.cos(theta), y: radius * Math.sin(theta) }
  }

  function map(value: number, low1: number, high1: number, low2: number, high2: number) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)
  }

  let x: number
  let y: number
  $: ({ x, y } = toCartesian($distance, $angle))

  $: colour = dark ? '#aaaaaa' : '#fa6742'

  let rotationX = 0
  let rotationY = 0
  let rotationZ = 0

  useTask((delta) => {
    rotationX += delta * $rotationSpeedX
    rotationY += delta * $rotationSpeedY
    rotationZ += delta * $rotationSpeedZ
  })
</script>

<!-- Wireframe. -->
<T.Mesh
  position.x={x}
  position.y={y}
  position.z={map($distance, 0, 10, 50, -20)}
  rotation.x={rotationX}
  rotation.y={rotationY}
  rotation.z={rotationZ}
>
  <svelte:component this={geometry} />
  <T.MeshStandardMaterial wireframe color="#fff" />
</T.Mesh>

<!-- Main fill. -->
<T.Mesh
  position.x={x}
  position.y={y}
  position.z={map($distance, 0, 10, 50, -20)}
  rotation.x={rotationX}
  rotation.y={rotationY}
  rotation.z={rotationZ}
>
  <svelte:component this={geometry} />
  <T.MeshStandardMaterial color={colour} />
</T.Mesh>
