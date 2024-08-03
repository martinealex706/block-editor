<template>
  <div
    class="bubble-menu border border-neutral-200 py-1 px-4 rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white">
    <div class="flex gap-2">
      <button v-for="(button, index) in buttons" :key="index" @click="button.action" 
        class="relative group/icon hover:bg-neutral-200 hover:opacity-100 rounded-lg size-8 flex items-center justify-center">
        <img :src="button.icon" alt="icon" class="opacity-60 group-hover/icon:opacity-100"/>
        <span
          class="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/icon:opacity-100 text-neutral-400 transition-opacity bg-white text-xs px-2 py-1 rounded border border-gray-300">
          {{ button.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import bold from '../assets/svg/bold.svg';
import italic from '../assets/svg/italic.svg';
import strike from '../assets/svg/strike.svg';
import underline from '../assets/svg/underline.svg';

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
});

const buttons = ref([
  {
    label: 'Bold',
    action: () => props.editor.chain().focus().toggleBold().run(),
    isActive: computed(() => props.editor.isActive('bold')),
    icon: bold
  },
  {
    label: 'Italic',
    action: () => props.editor.chain().focus().toggleItalic().run(),
    isActive: computed(() => props.editor.isActive('italic')),
    icon: italic
  },
  {
    label: 'Strike',
    action: () => props.editor.chain().focus().toggleStrike().run(),
    isActive: computed(() => props.editor.isActive('strike')),
    icon: strike
  },
  {
    label: 'Underline',
    action: () => props.editor.chain().focus().toggleUnderline().run(),
    isActive: computed(() => props.editor.isActive('underline')),
    icon: underline
  }
]);
</script>
