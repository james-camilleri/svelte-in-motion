<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { AmbientLight } from 'three'

  let rotation = 0
  useTask((delta) => {
    rotation += delta
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, -30]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<T.Mesh position={[0, 0, 0]} rotation.y={rotation} rotation.z={rotation * 1.5}>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="#f96743" />
  <!-- <T.MeshBasicMaterial color="#ffffff" wireframe wireframeLinewidth={7} /> -->
</T.Mesh>

<!-- <T.DirectionalLight position={[0, 0, 50]} /> -->
<T.AmbientLight />
