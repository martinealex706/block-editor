<template>
  <div class="flex">
    <select id="H1"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      @change="handleHeadingChange">
      <option v-for="(button, index) in ContentTypeButtons" :key="index" :value="index">
        <div>
          <img :src="button.icon" alt="icon" class="border" />
          <label>{{ button.label }}</label>
        </div>
      </option>
    </select>
  </div>
</template>
<script lang="ts" setup>

import Heading1 from '../assets/svg/heading1.svg';
import paragraph from '../assets/svg/paragraph.svg';
import bulletList from '../assets/svg/bullet-list.svg';
import { computed, ref } from 'vue';

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

const ContentTypeButtons = ref([
  {
    group: 'HIERARCHY',
    label: 'Paragraph',
    icon: paragraph,
    action: () => props.editor.chain().focus().setParagraph().run(),
    isActive: computed(() => props.editor.isActive('paragraph')),
  },
  {
    group: 'HIERARCHY',
    label: 'Heading 1',
    icon: Heading1,
    action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: computed(() => props.editor.isActive('heading', { level: 1 })),
  },
  {
    group: 'HIERARCHY',
    label: 'Heading 2',
    icon: Heading1,
    action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: computed(() => props.editor.isActive('heading', { level: 2 })),
  },
  {
    group: 'HIERARCHY',
    label: 'Heading 3',
    icon: Heading1,
    action: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: computed(() => props.editor.isActive('heading', { level: 3 })),
  },
  {
    group: 'LISTS',
    label: 'Bullet list',
    icon: bulletList,
    action: () => props.editor.chain().focus().toggleBulletList().run(),
    isActive: computed(() => props.editor.isActive('bulletList')),
  },
]);

function handleHeadingChange(event: Event) {
  const selectedIndex: any = (event.target as HTMLSelectElement).value
  const selectedButton = ContentTypeButtons.value[selectedIndex]
  if (selectedButton && typeof selectedButton.action === 'function') {
    selectedButton.action()
  }
}
</script>