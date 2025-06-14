import { defineStore } from 'pinia'

function includeUsers(rules, value) {
  return rules.some(item => {
    return Object.entries(item).every(key => value[key[0]].toLowerCase().includes(key[1].toLowerCase()))
  })
}
function excludeUsers(rules, value) {
  return rules.every(item => {
    return Object.entries(item).some(key => !value[key[0]].toLowerCase().includes(key[1].toLowerCase()))
  })
}
function sortUsers(users, sortArray) {
  const sortBy = sortArray
  function recursiveSort(a, b, sortBy, i = 0){
    if (sortBy.length === i) return 0

    const first = a[sortBy[i]].toLowerCase()
    const second =  b[sortBy[i]].toLowerCase()
    
    if (first === second) return recursiveSort(a, b, sortBy, i + 1) 
    return first > second ? 1 : -1
  }
  
  return [...users].sort((a, b) => recursiveSort(a, b, sortBy))
}

export const useUserStore = defineStore('counter', {
  state: () => ({
    config: {
      fields: [
        {id:'name', validation: (value) => value.length > 3},
        {id:'phone'},
        {id:'email'}
      ]
    },
    users: [
      { id: '001', name: 'Vlad', email: 'okuma4000@gmail.com', phone: '+380501234567'},
      { id: '002', name: 'Yura', email: 'boss@gmail.com', phone: '+380991234567'},
      { id: '003', name: 'Sergey', email: 'boss2@gmail.com', phone: '+38221234567'},
      { id: '004', name: 'Maksim', email: 'cowboy@gmail.com', phone: '+3822234567'},
      { id: '005', name: 'Ruslasn', email: 'ruslan@gmail.com', phone: '+380991234567'},
      { id: '006', name: 'Desil', email: 'bmw@gmail.com', phone: '+380671234567'},
      { id: '007', name: 'Alexey', email: 'vladosdos@gmail.com', phone: '+380731321567'},
      { id: '008', name: 'Alexander', email: 'abrakadabra@gmail.com', phone: '+380731321567'},
      { id: '009', name: 'Vlad', email: 'vladosdos@gmail.com', phone: '+380981324567'},
      { id: '010', name: 'Daniil', email: 'iphone@gmail.com', phone: '+380975434567'},
      { id: '011', name: 'Daniil', email: 'abcserj@gmail.com', phone: '+380975434567'},
    ],
    sortBy: [],
    filterOptions: {
      include: [],
      exclude: []
    }
  }),
  actions: {
    addUser(user) {
      this.users.push(user)
    },
    setSortOptions(param) {
      const idx = this.sortBy.findIndex(item => item === param)
      if (idx === -1) {
        this.sortBy = [...this.sortBy, param]
      } else {
        this.sortBy = [...this.sortBy.slice(0, idx), ...this.sortBy.slice(idx + 1)]
      }
    },
    addFilter(type, value) {
      this.filterOptions[type] = [...this.filterOptions[type], value]
    },
    deleteFilter(type, idx) {
      this.filterOptions[type] = [...this.filterOptions[type].slice(0, idx), ...this.filterOptions[type].slice(idx + 1)]
    }
  },
  getters: {
    takeFields: (state) => {
      return ['id', ...state.config.fields.map(field => field.id)]
    },
    filteredAndSortedUsers(state) {
      const sorted = sortUsers(state.users, state.sortBy)

      const includeRules = state.filterOptions.include
      const inlude = includeRules.length ? [...sorted].filter(item => includeUsers(includeRules, item)) : sorted

      const excludeRules = state.filterOptions.exclude
      const exclude = excludeRules.length ? [...inlude].filter(item => excludeUsers(excludeRules, item)) : inlude

      return exclude
    },
  }
})