import axios from 'axios'
import { defineStore } from 'pinia'

export const useEntryStore = defineStore({
  id: 'entry',
  state: () => ({
    entries: [],
    currentPage: null,
    lastPage: null,
    loading: false,
    error: null,
  }),
  getters: {},
  actions: {
    async fetchEntries() {
      this.entries = []
      this.loading = true
      try {
        axios.get('api/entries', {
            params: {
                page: this.currentPage
            }
        })
        .then((res) => {
            this.currentPage = res.data.current_page
            this.lastPage = res.data.last_page
            this.entries = res.data.data
        })
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    setCurrentPage(page) {
        this.currentPage = page
    },
    // async fetchEntry(entryId) {
    // },
    async createEntry(formData) {
        this.entries = []
        this.loading = true
        try {
            axios.post('api/entries', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
        } catch (error) {
            this.error = error
        }
    },
    // async updateEntry(entryId) {
    //     try {
    //         axios.put(`api/entries/${entryId}`)
    //     }
    // },
    async deleteEntry(entryId) {
        if (!entryId) {
            return
        }
        try {
          axios.delete(`api/entries/${entryId}`)
        } catch (error) {
          this.error = error
        } finally {
          this.loading = false
        }
    }
  }
})
