<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
      placeholder?: string;
      required?: boolean;
      label?: string;
    }>(),
    {},
  );
  const emit = defineEmits(['focus', 'blur', 'submit', 'update:modelValue']);

  const internalValue = computed({
    get() {
      return props.modelValue || '';
    },
    set(value: string) {
      emit('update:modelValue', value);
    },
  });
</script>

<template>
  <div class="relative">
    <label class="font-medium text-xs">{{ props.label }}</label>
    <div
      v-if="$slots.left"
      class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
    >
      <slot name="left"></slot>
    </div>
    <input
      v-bind="$attrs"
      v-model="internalValue"
      @focus="emit('focus')"
      @blur="emit('blur')"
      type="text"
      :class="{ 'pl-10': $slots.left }"
      class="block w-full p-2.5 text-gray-900 rounded-xl ring-primary-600 bg-gray-100 focus:outline-none focus:ring-2"
      :placeholder="props.placeholder"
      :required="props.required"
    />
  </div>
</template>

<style scoped></style>
