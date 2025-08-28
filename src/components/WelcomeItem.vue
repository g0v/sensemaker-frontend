<template>
  <div class="mt-8 flex relative lg:mt-0 lg:py-1 lg:pl-8">
    <i class="flex place-items-center place-content-center w-8 h-8 text-gray-700 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-13 lg:w-12 lg:h-12 lg:border lg:border-gray-300 lg:bg-white lg:rounded-lg">
      <slot name="icon"></slot>
    </i>
    <div class="flex-1 ml-4 lg:ml-0">
      <h3 class="text-lg font-medium mb-2 text-gray-900">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
/* 保留一些自定義樣式，如果需要 */
</style>
