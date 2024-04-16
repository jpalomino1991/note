<template>
    <div class="modal is-active p-2">
        <div class="modal-background"></div>
        <div
          class="modal-card"
          ref="modalCardRef"
        >
            <header class="modal-card-head">
            <p class="modal-card-title">Delete Note?</p>
            <button
              class="delete"
              @click="closeModal"
              aria-label="close"
            >
            </button>
            </header>
            <section class="modal-card-body">
                Are you sure you want to delete this note?
            </section>
            <footer class="modal-card-foot is-justify-content-flex-end">
            <div class="buttons">
                <button
                  class="button"
                  @click="closeModal"
                >
                    Cancel
                </button>
                <button
                  class="button is-danger"
                  @click="storeNotes.deleteNote(noteId)"
                >
                    Delete
                </button>
            </div>
            </footer>
        </div>
    </div>
</template>

<script setup>

//  imports

    import { ref, onMounted, onUnmounted } from 'vue'
    import { onClickOutside } from '@vueuse/core'
    import { useStoreNotes } from '@/store/storeNotes'

//  props

    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false
        },
        noteId: {
            type: String,
            required: true
        }
    })

//  store

    const storeNotes = useStoreNotes()

//  emits

    const emit = defineEmits(['update:modelValue'])

//  close modal

    const closeModal = () => {
        emit('update:modelValue', false)
    }

//  click outside to close

    const modalCardRef = ref(null)

    onClickOutside(modalCardRef, event => {
        closeModal()
    })

//  keyboard control

    const handleKeyboard = e => {
        if(e.key === 'Escape')
                closeModal()
    }

    onMounted(() => {
        document.addEventListener('keyup', handleKeyboard)
    })

    onUnmounted(() => {
        document.removeEventListener('keyup', handleKeyboard)
    })

</script>