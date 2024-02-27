<span>→</span>

<style lang="scss">
  span {
    position: relative;
    display: inline-block;
    padding-inline-end: 0.5rem;
    font-size: 1.5em;
    font-variation-settings:
      'wght' 1000,
      'wdth' 75;
    line-height: 0;
    color: var(--yellow-orange);

    &::before {
      position: absolute;
      top: 4px;
      left: 3px;
      z-index: -1;
      color: var(--dark);
      content: '→';
    }
  }
</style>
