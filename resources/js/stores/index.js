import axios from 'axios'
import { defineStore } from 'pinia'

export const useEntryStore = defineStore({
  id: 'entry',
  state: () => ({
    entries: [],
    currentPage: null,
    lastPage: null,
    total: null,
    from: null,
    to: null,
    loading: false,
    error: null,
    messages: []
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
            this.entries = res.data.data
            this.currentPage = res.data.current_page
            this.lastPage = res.data.last_page
            this.total = res.data.total
            this.from = res.data.from
            this.to = res.data.to
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
            return axios.post('api/entries', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            .then((res) => {
                return res
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
