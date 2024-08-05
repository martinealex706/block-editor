<template>
  <div class="container">
    <bubble-menu
      :editor="editor"
      :tippy-options="{ duration: 100 }"
      v-if="editor"
    >
      <TextManu :editor="editor"/>
    </bubble-menu>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-3';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '`@tiptap/extension-bullet-list`';
import Paragraph from '@tiptap/extension-paragraph';
import TextManu from './TextManu.vue';

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
    extensions: [StarterKit, Underline, Heading.configure({
          levels: [1, 2, 3], BulletList, Paragraph
        })],
    content: `
      <p>
        Hey, try to select some text here. There will popup a menu for selecting some inline styles. Remember: you have full control about content and styling of this menu.
      </p>
    `,
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})
</script>
<style lang="scss">
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* Heading styles */
  h1,
  h2,
  h3 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  /* List styles */
  ul,
  ol {
    list-style: disc;
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }
}
</style>