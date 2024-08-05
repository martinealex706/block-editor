<template>
    <div
        class="bubble-menu border border-neutral-200 py-1 px-4 rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white flex">
        <div class="flex gap-2">
            <ContentType :editor="props.editor" />
            <BubbleMenu :editor="props.editor" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import ContentType from './ContentType.vue'
import BubbleMenu from './BubbleMenu.vue'

const props = defineProps({
    editor: {
        type: Object,
        required: true
    }
})
</script>