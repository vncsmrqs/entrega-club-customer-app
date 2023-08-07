<script setup lang="ts">
  import { computed } from 'vue';
  import { generateHashId } from '@/utils';
  import LockIcon from 'vue-material-design-icons/Lock.vue';

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
      placeholder?: string;
      required?: boolean;
      label?: string;
      small?: boolean;
      error?: string;
      blocked?: boolean;
      disabled?: boolean;
    }>(),
    {},
  );
  const emit = defineEmits(['focus', 'blur', 'submit', 'update:modelValue']);

  const fieldId = generateHashId(8);

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
  <div class="relative" :class="{ 'opacity-50': props.disabled }">
    <label :id="fieldId" class="font-medium text-sm ml-2.5 relative">
      {{ props.label }}
      <span
        v-if="required"
        class="text-xs ml-1 text-danger-600 absolute bottom-0"
        >*</span
      >
    </label>
    <div class="relative">
      <div
        v-if="$slots.left"
        class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none"
      >
        <slot name="left"></slot>
      </div>
      <input
        :id="fieldId"
        v-bind="$attrs"
        v-model="internalValue"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        :class="{
          'pl-10': $slots.left,
          'pr-10': $slots.right || props.blocked,
          'p-2.5': props.small,
          'px-2.5 py-4': !props.small,
          'outline outline-danger-600': error,
        }"
        class="block w-full text-gray-900 rounded-xl ring-primary-600 bg-gray-100 focus:outline-none focus:ring-2"
        :placeholder="props.placeholder"
        :required="props.required"
        :disabled="props.disabled || props.blocked"
      />
      <div
        v-if="$slots.right || props.blocked"
        class="absolute inset-y-0 right-0 pr-2.5 flex items-center"
      >
        <slot name="right">
          <LockIcon class="text-gray-500" />
        </slot>
      </div>
    </div>
    <span class="text-sm text-danger-600 ml-2.5 absolute">{{ error }}</span>
  </div>
</template>

<style scoped></style>
