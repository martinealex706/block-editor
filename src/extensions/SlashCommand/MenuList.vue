<template>
  <Surface
    ref="scrollContainer"
    class="text-black max-h-[min(80vh,24rem)] overflow-auto flex-wrap mb-8 p-2 xs:w-72 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
  >
    <div class="grid grid-cols-1 gap-0.5">
      <template v-if="items.length">
        <div
          v-for="(group, groupIndex) in items"
          :key="`${group.title}-wrapper`"
        >
          <div
            class="text-neutral-500 text-[0.65rem] col-[1/-1] mx-2 mt-4 font-semibold tracking-wider select-none uppercase first:mt-0.5"
            :key="`${group.title}`"
          >
            {{ group.title }}
          </div>
          <DropdownButton
            v-for="(command, commandIndex) in group.commands"
            :key="`${command.label}`"
            :isActive="selectedGroupIndex === groupIndex && selectedCommandIndex === commandIndex"
            @click="() => createCommandClickHandler(groupIndex, commandIndex)"
          >
            <span class="border p-3 rounded-lg text-black">
              <Icon :name="command.iconName" />
            </span>
            <span>
              <p class="text-black">{{ command.label }}</p>
              <p>{{ command.description }}</p>
            </span>
          </DropdownButton>
        </div>
      </template>
    </div>
  </Surface>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { Command, MenuListProps } from './types';
import { Surface } from '@/components/ui/Surface';
import { DropdownButton } from '@/components/ui/Dropdown';
import { Icon } from '@/components/ui/Icon';

export default defineComponent({
  name: 'MenuList',
  props: {
    items: {
      type: Array as () => MenuListProps['items'],
      required: true
    },
    command: {
      type: Function as () => (command: Command) => void,
      required: true
    }
  },
  setup(props, { expose }) {
    const scrollContainer = ref<HTMLDivElement | null>(null);
    const activeItem = ref<HTMLButtonElement | null>(null);
    const selectedGroupIndex = ref(0);
    const selectedCommandIndex = ref(0);

    watch(() => props.items, () => {
      selectedGroupIndex.value = 0;
      selectedCommandIndex.value = 0;
    });

    const selectItem = (groupIndex: number, commandIndex: number) => {
      const command = props.items[groupIndex].commands[commandIndex];
      props.command(command);
    };

    const createCommandClickHandler = (groupIndex: number, commandIndex: number) => () => {
      selectItem(groupIndex, commandIndex);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        if (!props.items.length) return;

        const commands = props.items[selectedGroupIndex.value].commands;

        let newCommandIndex = selectedCommandIndex.value + 1;
        let newGroupIndex = selectedGroupIndex.value;

        if (commands.length - 1 < newCommandIndex) {
          newCommandIndex = 0;
          newGroupIndex = selectedGroupIndex.value + 1;
        }

        if (props.items.length - 1 < newGroupIndex) {
          newGroupIndex = 0;
        }

        selectedCommandIndex.value = newCommandIndex;
        selectedGroupIndex.value = newGroupIndex;

        return true;
      }

      if (event.key === 'ArrowUp') {
        if (!props.items.length) return;

        let newCommandIndex = selectedCommandIndex.value - 1;
        let newGroupIndex = selectedGroupIndex.value;

        if (newCommandIndex < 0) {
          newGroupIndex = selectedGroupIndex.value - 1;
          newCommandIndex = props.items[newGroupIndex]?.commands.length - 1 || 0;
        }

        if (newGroupIndex < 0) {
          newGroupIndex = props.items.length - 1;
          newCommandIndex = props.items[newGroupIndex].commands.length - 1;
        }

        selectedCommandIndex.value = newCommandIndex;
        selectedGroupIndex.value = newGroupIndex;

        return true;
      }

      if (event.key === 'Enter') {
        if (!props.items.length || selectedGroupIndex.value === -1 || selectedCommandIndex.value === -1) {
          return false;
        }

        selectItem(selectedGroupIndex.value, selectedCommandIndex.value);

        return true;
      }

      return false;
    };

    const updateScroll = () => {
      if (activeItem.value && scrollContainer.value) {
        const offsetTop = activeItem.value.offsetTop;
        const offsetHeight = activeItem.value.offsetHeight;
        scrollContainer.value.scrollTop = offsetTop - offsetHeight;
      }
    };

    watch([selectedCommandIndex, selectedGroupIndex], updateScroll);

    onMounted(() => {
      window.addEventListener('keydown', onKeyDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', onKeyDown);
    });

    expose({
      onKeyDown
    });

    return {
      scrollContainer,
      createCommandClickHandler,
      selectedGroupIndex,
      selectedCommandIndex,
      items: props.items
    };
  }
});
</script>
