<script setup>
import { ref, computed } from 'vue'
import { useClaims } from '@/stores/useClaims.js'
import { useCategories } from '@/stores/useCategories.js'
import { formatNaira } from '@/stores/currency.js'

const { claims, isModalOpen, updateClaim, addClaim } = useClaims()
const { categories } = useCategories()

const claimFilter = ref('all')

const claimForm = ref({
  employee: '',
  amount: 0,
  category: 'Transportation',
  description: '',
})

const filteredClaims = computed(() => {
  if (claimFilter.value === 'all') {
    return claims.value
  }
  return claims.value.filter((c) => c.status === claimFilter.value)
})

function handleSubmit() {
  const created = addClaim(claimForm.value)
  if (!created) return

  claimForm.value = {
    employee: '',
    amount: 0,
    category: 'Transportation',
    description: '',
  }
  isModalOpen.value = false
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-900">Expense Claims</h2>
        <p class="text-sm text-slate-500 mt-0.5">Employees submit claims → Manager approves / rejects</p>
      </div>
      <button
        @click="isModalOpen = true"
        class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg"
      >
        + Submit Claim
      </button>
    </div>

    <div class="flex gap-2">
      <button
        v-for="f in ['all', 'pending', 'approved', 'rejected']"
        :key="f"
        @click="claimFilter = f"
        :class="[
          'px-3 py-1.5 text-sm rounded-lg capitalize',
          claimFilter === f
            ? 'bg-brand-100 text-brand-700 font-medium'
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50',
        ]"
      >{{ f }}</button>
    </div>

    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div v-if="filteredClaims.length === 0" class="p-12 text-center text-slate-500 text-sm">
        No claims match this filter.
      </div>
      <ul v-else class="divide-y divide-slate-100">
        <li
          v-for="c in filteredClaims"
          :key="c.id"
          class="px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-4 hover:bg-slate-50/60"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="font-medium text-slate-900">{{ c.description }}</p>
              <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{{ c.category }}</span>
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  c.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                  c.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800',
                ]"
              >{{ c.status }}</span>
            </div>
            <p class="text-sm text-slate-500 mt-1">
              {{ c.employee }} · {{ c.date }}
              <span v-if="c.receipt" class="ml-2 text-brand-600">📎 Receipt attached</span>
            </p>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <span class="text-lg font-semibold tabular-nums">{{ formatNaira(c.amount) }}</span>
            <template v-if="c.status === 'pending'">
              <button
                @click="updateClaim(c.id, 'approved')"
                class="px-3 py-1.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
              >Approve</button>
              <button
                @click="updateClaim(c.id, 'rejected')"
                class="px-3 py-1.5 text-sm font-medium bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg"
              >Reject</button>
            </template>
          </div>
        </li>
      </ul>
    </div>

    <!-- Submit Claim Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      @click.self="isModalOpen = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900">Submit Expense Claim</h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Employee</label>
            <input v-model="claimForm.employee" required placeholder="e.g. Sarah" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Amount (₦)</label>
            <input v-model.number="claimForm.amount" type="number" min="0" required class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select v-model="claimForm.category" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none">
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <input v-model="claimForm.description" required placeholder="e.g. Client meeting transport" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Receipt</label>
            <div class="border border-dashed border-slate-300 rounded-lg px-4 py-6 text-center text-sm text-slate-500">
              <p>📎 Upload receipt (placeholder)</p>
              <p class="text-xs mt-1">In production this would open a file picker</p>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <button type="button" @click="isModalOpen = false" class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">Cancel</button>
            <button type="submit" class="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium">Submit Claim</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
