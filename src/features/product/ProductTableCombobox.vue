<script setup lang="ts">
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'

const props = defineProps<{
  options: {
    value: string
    label: string
  }[]
  placeholder: string
}>()

const model = defineModel<string>({
  default: '',
})

const open = ref(false)

const selectedOption = computed(() => props.options.find((option) => option.value === model.value))

function selectOption(selectedValue: string) {
  model.value = selectedValue === model.value ? '' : selectedValue

  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child class="flex-1">
      <Button variant="outline" role="combobox" :aria-expanded="open" class="justify-between">
        {{ selectedOption?.label || placeholder }}

        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="p-0">
      <Command>
        <CommandList>
          <CommandEmpty>No option found.</CommandEmpty>

          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="
                (ev) => {
                  selectOption(ev.detail.value as string)
                }
              "
            >
              {{ option.label }}

              <CheckIcon
                :class="cn('ml-auto', model === option.value ? 'opacity-100' : 'opacity-0')"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
