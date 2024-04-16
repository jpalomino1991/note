<template>
    <div
      class="card p-4 mb-5"
      :class="`is-background-${ bgColor }`"
    >
        <div class="field">
            <label
              class="label has-text-white"
              v-if="label"
            >
                {{ label }}
            </label>
            <div class="control">
                <textarea
                    :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                    class="textarea"
                    :placeholder="placeholder"
                    ref="textAreaRef"
                    v-autofocus
                    maxlength="100"
                />
            </div>
            </div>

            <div class="field is-grouped is-grouped-right">
            <div class="control">
                <slot name="buttons" />
            </div>
        </div>
    </div>
</template>

<script setup>
//  imports

    import { ref } from 'vue'
    import { vAutofocus } from '@/directives/vAutofocus'

//  props
    const props = defineProps({
        modelValue: {
            type: String,
            required: true
        },
        bgColor: {
            type: String,
            default: 'success'
        },
        placeholder: {
            type: String,
            default: 'Type Something...'
        },
        label: {
            type: String
        }
    })

//  emits

    const emit = defineEmits(['update:modelValue'])

//  focus textarea

    const textAreaRef = ref(null)

    const focusTextArea = () => {
        textAreaRef.value.focus()
    }

    defineExpose({
        focusTextArea
    })

</script>