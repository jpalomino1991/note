<template>
    <div class="notes">
        <AddEditNote
          v-model="newNote"
          placeholder="Add Note"
          ref="addEditNoteRef"
        >
          <template #buttons>
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                  <button
                    @click="addNote"
                    :disabled="!newNote"
                    class="button is-link has-background-success"
                  >Add note</button>
                </div>
              </div>
          </template>
        </AddEditNote>

        <progress
          v-if="storeNotes.notesLoaded"
          class="progress is-large is-success"
          max="100"
        />
        <template v-else>
          <Note 
            v-for="note in storeNotes.notes"
            :key="note.id"
            :note="note"
          />

          <div
            v-show="!storeNotes.notes.length"
            class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
          >
            No tienes notas ctm ..!..
          </div>
        </template>
        
    </div>
</template>

<script setup>

//  imports

    import { ref } from 'vue'
    import Note from '@/components/notes/Note.vue'
    import AddEditNote from '@/components/notes/AddEditNote.vue'
    import { useStoreNotes } from '@/store/storeNotes'
    import { useWatchCharacter } from '@/use/useWatchCharacter'

//  store

    const storeNotes = useStoreNotes()

//  notes
    const newNote = ref('')
    const addEditNoteRef = ref(null)

    const addNote = () => {
      storeNotes.addNote(newNote.value)

      newNote.value = ''
      addEditNoteRef.value.focusTextArea()
    }

//  watch character

    useWatchCharacter(newNote,100)

</script>