<script setup lang="ts">
  import PlusIcon from 'vue-material-design-icons/Plus.vue';
  import MinusIcon from 'vue-material-design-icons/Minus.vue';
  import IconButton from '@/components/IconButton.vue';

  const emit = defineEmits(['increment', 'decrement']);

  const increment = () => {
    emit('increment');
  };

  const decrement = () => {
    emit('decrement');
  };

  const props = defineProps<{
    quantity: number;
  }>();
</script>

<template>
  <div class="inline-flex items-center">
    <div class="border inline-flex items-center p-1 rounded-xl gap-1">
      <IconButton @click="decrement">
        <MinusIcon
          :size="16"
          :class="[props.quantity > 1 ? 'text-primary-600' : 'text-gray-300']"
        ></MinusIcon>
      </IconButton>
      <span class="w-8 text-center text-sm">
        {{ props.quantity }}
      </span>
      <IconButton @click="increment">
        <PlusIcon :size="16" class="text-primary-600"></PlusIcon>
      </IconButton>
    </div>
  </div>
</template>

<style scoped></style>
