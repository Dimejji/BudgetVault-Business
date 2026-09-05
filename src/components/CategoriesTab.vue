<script setup>
import { ref } from 'vue'
import { useCategories } from '@/stores/useCategories.js'

const { categories, defaultCategories, isModalOpen, addCategory, removeCategory } = useCategories()

const newCategory = ref('')

function handleSubmit() {
  const created = addCategory(newCategory.value)
  if (!created) return

  newCategory.value = ''
  isModalOpen.value = false
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-900">Spending Categories</h2>
        <p class="text-sm text-slate-500 mt-0.5">Default categories + your custom ones</p>
      </div>
      <button
        @click="isModalOpen = true"
        class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg"
      >
        + Custom Category
      </button>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      <div
        v-for="cat in categories"
        :key="cat"
        class="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm"
      >
        <span class="text-sm font-medium text-slate-800">{{ cat }}</span>
        <span v-if="defaultCategories.includes(cat)" class="text-[10px] uppercase tracking-wide text-slate-400">Default</span>
        <button
          v-else
          @click="removeCategory(cat)"
          class="text-slate-400 hover:text-red-500 text-xs"
        >Remove</button>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      @click.self="isModalOpen = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900">Add Custom Category</h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Category name</label>
            <input v-model="newCategory" required placeholder="e.g. Software Subscriptions" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">Cancel</button>
            <button type="submit" class="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
