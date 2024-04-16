<template>
    <div
        class="card mb-4"
    >
        <div class="card-content">
            {{ note.content }}
            <div class="columns has-text-grey-light mt-2">
                <small class="column">{{ dateFormatted }}</small>
                <small class="column has-text-right">{{ characterLength }}</small>
            </div>
        </div>
        <footer class="card-footer">
            <RouterLink
              class="card-footer-item"
              :to="`/edit/${note.id}`"
              href="#"
            >
                Edit
            </RouterLink>
            <a
              class="card-footer-item"
              @click.prevent="modals.deleteNote = true"
              href="#"
            >
                Delete
            </a>
        </footer>
        <ModalDeleteNote 
            v-if="modals.deleteNote"
            v-model="modals.deleteNote"
            :noteId="note.id"
        />
    </div>
</template>

<script setup>
//  imports

    import { computed, reactive } from 'vue'
    import { useDateFormat } from '@vueuse/core'
    import { useStoreNotes } from '@/store/storeNotes'
    import ModalDeleteNote from '@/components/notes/ModelDeleteNote.vue'

//  store

    const storeNotes = useStoreNotes()

//  props
    const props = defineProps({
        note: {
            type: Object,
            required: true
        }
    })

//  date formatted

    const dateFormatted = computed(() => {
        let date = new Date(parseInt(props.note.date))
        return useDateFormat(date,'YYYY-MM-DD HH:mm:ss').value
    })

//  character length

    const characterLength = computed(() => {
        let length = props.note.content.length
        let description = length > 1 ? 'characters' : 'character'
        return `${length} ${description}`
    })

// modals

    const modals = reactive({
        deleteNote: false
    })

</script>