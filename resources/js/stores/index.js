import axios from 'axios'
import { defineStore } from 'pinia'

export const useEntryStore = defineStore({
  id: 'entry',
  state: () => ({
    entries: [],
    currentPage: null,
    lastPage: null,
    entry: null,
    loading: false,
    error: null,
    deleteModalVisibility: false
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
    setEntry(entryId) {
        this.entry = entryId
    },
    setDeleteModalVisibility(visibility) {
        this.deleteModalVisibility = visibility
    },
    // async fetchEntry(id) {}
    async deleteEntry() {
        if (!entry) {
            return
        }
        try {
          axios.delete('api/entries', {
              params: {
                  id: entry
              }
          })
        } catch (error) {
          this.error = error
        } finally {
          this.loading = false
        }
    }
  }
})
