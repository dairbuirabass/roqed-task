import { defineStore } from 'pinia'
import { api } from '@/api';

export const useEntryStore = defineStore({
  id: 'entries',
  state: () => ({
    entries: [],
    entry: [],
    search: '',
    currentPage: 1,
    lastPage: undefined,
    total: undefined,
    from: 0,
    to: undefined,
    error: []
  }),
  actions: {
    async fetchEntries() {
      this.entries = []
      try {
        return api.get('api/entries', {
          params: {
            page: this.currentPage,
            search: this.search
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
      }
    },
    setSearch(searchValue) {
      this.search = searchValue
    },
    setCurrentPage(page) {
      this.currentPage = page
    },
    async fetchEntry(entryId) {
      if (!entryId) {
        return
      }
      this.entry = []
      try {
        return api.get(`api/entries/${entryId}`)
          .then((res) => {
            return this.entry = res.data
          })
      } catch (error) {
        this.error = error
      }
    },
    async createEntry(formData) {
      this.entries = []
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
    async updateEntry(entryId, formData) {
      try {
        return api.post(`api/entries/${entryId}`, formData, {
          headers: { 'content-type': 'multipart/form-data' }
        })
          .then((res) => {
            return res
          })
      } catch (error) {
        this.error = error
      }
    },
    async deleteEntry(entryId) {
      if (!entryId) {
        return
      }
      try {
        return api.delete(`api/entries/${entryId}`)
      } catch (error) {
        this.error = error
      }
    }
  }
})
