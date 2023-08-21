<template>
  <button
    :class="['btn-primary', { 'btn-primary--active': active }]"
    :style="`width: ${width}px`"
    :type="type"
    @click="$emit('onClick', e => e.target.value)"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'ButtonUi',
  props: {
    name: {
      type: String,
      default: 'Button',
    },
    width: {
      type: Number,
      default: 108,
    },
    active: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-primary {
  padding: 10px 20px;
  border-radius: 4px;
  outline: none;
  background-color: #6a9b9b;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 14px;

  &--active {
    color: white;
    background-color: #006476;
  }
}
</style>
