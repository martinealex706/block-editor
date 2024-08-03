<template>
  <div class="container">
    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor"
    >
      <BubbleMenuButtons :editor="editor"/>
    </bubble-menu>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import StarterKit from '@tiptap/starter-kit'
import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-3'
import BubbleMenuButtons from './BubbleMenu.vue'
import { Code } from '@tiptap/extension-code';

const editor = ref(null)
const isEditable = ref(true)

const toggleEditable = () => {
  isEditable.value = !isEditable.value
}

watch(isEditable, (value) => {
  editor.value.setEditable(value)
})

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Code
    ],
    content: `
      <p>
        Hey, try to select some text here. There will popup a menu for selecting some inline styles. Remember: you have full control about content and styling of this menu.
      </p>
    `
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>
