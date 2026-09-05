<script setup>
import { ref, computed } from 'vue'
import { useSettlements } from '@/stores/useSettlements.js'
import { formatNaira } from '@/stores/currency.js'

const { settlements, isModalOpen, completeSettlement, addSettlement } = useSettlements()

const settlementFilter = ref('all')

const settlementForm = ref({
  description: '',
  person: '',
  amount: 0,
  direction: 'business_owes',
})

const filteredSettlements = computed(() => {
  if (settlementFilter.value === 'all') {
    return settlements.value
  }
  return settlements.value.filter((s) => s.status === settlementFilter.value)
})

function handleSubmit() {
  const created = addSettlement(settlementForm.value)
  if (!created) return

  settlementForm.value = {
    description: '',
    person: '',
    amount: 0,
    direction: 'business_owes',
  }
  isModalOpen.value = false
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-900">Settlements</h2>
        <p class="text-sm text-slate-500 mt-0.5">Track money owed between the business and people</p>
      </div>
      <button
        @click="isModalOpen = true"
        class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg"
      >
        + New Settlement
      </button>
    </div>

    <div class="flex gap-2">
      <button
        v-for="f in ['all', 'pending', 'completed']"
        :key="f"
        @click="settlementFilter = f"
        :class="[
          'px-3 py-1.5 text-sm rounded-lg capitalize',
          settlementFilter === f
            ? 'bg-brand-100 text-brand-700 font-medium'
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50',
        ]"
      >{{ f }}</button>
    </div>

    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div v-if="filteredSettlements.length === 0" class="p-12 text-center text-slate-500 text-sm">
        No settlements match this filter.
      </div>
      <ul v-else class="divide-y divide-slate-100">
        <li
          v-for="s in filteredSettlements"
          :key="s.id"
          class="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 hover:bg-slate-50/60"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <p class="font-medium text-slate-900">{{ s.description }}</p>
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  s.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800',
                ]"
              >{{ s.status }}</span>
            </div>
            <p class="text-sm text-slate-500 mt-0.5">
              Paid by <strong>{{ s.person }}</strong>
              · {{ s.direction === 'business_owes' ? 'Business owes ' + s.person : s.person + ' owes business' }}
              · {{ s.date }}
            </p>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <span class="text-lg font-semibold tabular-nums">{{ formatNaira(s.amount) }}</span>
            <button
              v-if="s.status === 'pending'"
              @click="completeSettlement(s.id)"
              class="px-3 py-1.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
            >
              Mark Settled
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- New Settlement Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      @click.self="isModalOpen = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900">New Settlement</h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <input v-model="settlementForm.description" required placeholder="e.g. Office supplies" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Person</label>
            <input v-model="settlementForm.person" required placeholder="e.g. John" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Amount (₦)</label>
            <input v-model.number="settlementForm.amount" type="number" min="0" required class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Direction</label>
            <select v-model="settlementForm.direction" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none">
              <option value="business_owes">Business owes this person</option>
              <option value="person_owes">This person owes the business</option>
            </select>
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">Cancel</button>
            <button type="submit" class="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
