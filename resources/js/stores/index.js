import { defineStore } from 'pinia'
import { api } from '@/api';

export const useEntryStore = defineStore({
  id: 'entry',
  state: () => ({
    entries: [],
    entry: [],
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
        api.get('api/entries', {
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
    async fetchEntry(entryId) {
      if (!entryId) {
        return
      }

      this.entry = []
      this.loading = true
      try {
        console.log(entryId)
        return api.get(`api/entries/${entryId}`)
          .then((res) => {
            console.log(res)
            return this.entry = res.data
          })
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async createEntry(formData) {
      this.entries = []
      this.loading = true
      try {
        return api.post('api/entries', formData, {
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
    //         api.put(`api/entries/${entryId}`)
    //     }
    // },
    async deleteEntry(entryId) {
      if (!entryId) {
        return
      }
      try {
        api.delete(`api/entries/${entryId}`)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
