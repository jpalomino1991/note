<template>
    <AddEditNote
        v-model="noteContent"
        placeholder="Edit Note"
        bgColor="link-dark"
        label="Edit Note"
        ref="addEditNoteRef"
    >
        <template #buttons>
        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <button
                    @click="$router.back()"
                    class="button is-link is-light mr-2"
                >
                    Cancel
                </button>
                <button
                    @click="editNote"
                    class="button is-link has-background-link"
                    :disabled="!noteContent"
                >
                    Save Note
                </button>
            </div>
            </div>
        </template>
    </AddEditNote>
</template>

<script setup>

//  imports

    import { ref } from 'vue'
    import AddEditNote from '@/components/notes/AddEditNote.vue'
    import { useStoreNotes } from '@/store/storeNotes'
    import { useRoute, useRouter } from 'vue-router'

//  route

    const route = useRoute()
    const router = useRouter()

//  store

    const storeNotes = useStoreNotes()

//  note

    const noteContent = ref('')
    noteContent.value = storeNotes.getNoteContent(route.params.id)

//  editNote

    const editNote = () => {
        storeNotes.updateNote(route.params.id, noteContent.value)
        router.push('/')
    }

</script>