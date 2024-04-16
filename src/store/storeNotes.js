import { defineStore } from 'pinia'
import { db } from '@/js/firebase'
import { collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy, addDoc } from 'firebase/firestore'
import { useStoreAuth } from '@/store/storeAuth'

let collectionRef
let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return { 
      notes: [],
      notesLoaded: false
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth()
      collectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      this.getNotes()
    },
    getNotes() {
      this.notesLoaded = true

      const q = query(collectionRef, orderBy('date', 'desc'))
      getNotesSnapshot = onSnapshot(q, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        })
        this.notes = notes
        this.notesLoaded = false
      })
    },
    async addNote(newNote) {
      let currentDate = new Date().getTime()
      let date = currentDate.toString()

      await addDoc(collectionRef, {
        content: newNote,
        date
      })
    },
    async deleteNote(id) {
      await deleteDoc(doc(collectionRef, id))
    },
    async updateNote(id, content) {
      await updateDoc(doc(collectionRef, id), {
        content
      })
    },
    clearNotes() {
      this.notes = []
      if(getNotesSnapshot) getNotesSnapshot()
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id)[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharacterCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})