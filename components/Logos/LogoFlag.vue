<template>
  <div id="logo-flag">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.626 36">
      <defs>
        <style>
          .cls-1 {
            fill: #fff;
            fill-rule: evenodd;
          }
        </style>
      </defs>
      <g id="uts-logo-anchor-white" transform="translate(3773 -4247)">
        <path
          id="Path_244"
          data-name="Path 244"
          class="cls-1"
          d="M4.63,10.529,2.315,8.212,0,10.529l2.314,2.317,2.317-2.317m5.182.553,1.763,1.764,2.314-2.317-2.358-2.36a2.431,2.431,0,0,0-3.439,0L0,16.268l2.314,2.317,7.5-7.5M9.262,20.9,6.946,18.585,5.184,20.35,3.421,18.585,1.1,20.9l2.359,2.362a2.429,2.429,0,0,0,3.439,0L9.261,20.9m.553,4.082L8.05,23.22,5.735,25.537,8.094,27.9a2.431,2.431,0,0,0,3.439,0l2.359-2.36L11.577,23.22,9.813,24.984"
          transform="translate(-3773 4254.39)"
        />
        <path
          id="Path_245"
          data-name="Path 245"
          class="cls-1"
          d="M13.441,27.84l-1.763-1.765L9.364,28.391l2.359,2.363a2.429,2.429,0,0,0,3.439,0l2.358-2.362-2.314-2.318L13.441,27.84m.553-4.083,2.317,2.318,2.314-2.317L16.309,21.44l-2.314,2.317m-5.184-.55L7.048,21.441,4.734,23.758l2.358,2.36a2.431,2.431,0,0,0,3.439,0l8.094-8.1L16.309,15.7l-7.5,7.505M11.9,3.192,8.812.1,5.724,3.19,8.812,6.282,11.9,3.192"
          transform="translate(-3771.998 4246.9)"
        />
        <path
          id="Path_246"
          data-name="Path 246"
          class="cls-1"
          d="M5.713,9.283H7.926v4.386a3.222,3.222,0,0,1,3.275,0V9.283h2.215l1.45,1.452,3.087-3.09-3.087-3.09-1.45,1.452h-7.7L4.262,4.555,1.175,7.645l3.087,3.09,1.45-1.452"
          transform="translate(-3772.751 4247.843)"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    light: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

#logo-flag {
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
}

svg {
  height: inherit;
  width: 100%;
}

.logo-light {
  .logo__fill {
    fill: $color-white;
  }
}
</style>
