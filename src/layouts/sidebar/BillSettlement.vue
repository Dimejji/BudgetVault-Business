```vue
<script setup>
import { ref, computed } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import Settlements from '@/components/Settlements.vue'
import Expenseclaims from '@/components/Expenseclaims.vue'

/* =========================================================
   TABS
========================================================= */

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'settlements', label: 'Settlements' },
  { id: 'claims', label: 'Expense Claims' },
  { id: 'categories', label: 'Categories' }
]

const activeTab = ref('overview')

/* =========================================================
   SETTLEMENTS
========================================================= */

const settlements = ref([
  {
    id: 1,
    description: 'Office supplies',
    person: 'John',
    amount: 85000,
    direction: 'business_owes',
    status: 'pending',
    date: '28 Aug 2026'
  },
  {
    id: 2,
    description: 'Client lunch',
    person: 'Aisha',
    amount: 42000,
    direction: 'business_owes',
    status: 'pending',
    date: '26 Aug 2026'
  },
  {
    id: 3,
    description: 'Advance repayment',
    person: 'Chinedu',
    amount: 50000,
    direction: 'person_owes',
    status: 'pending',
    date: '20 Aug 2026'
  },
  {
    id: 4,
    description: 'Printer ink & paper',
    person: 'Fatima',
    amount: 28500,
    direction: 'business_owes',
    status: 'completed',
    date: '12 Aug 2026'
  },
  {
    id: 5,
    description: 'Taxi for airport run',
    person: 'Tunde',
    amount: 18500,
    direction: 'business_owes',
    status: 'completed',
    date: '05 Aug 2026'
  }
])

const settlementFilter = ref('all')
const openSettlementModal = ref(false)

const settlementForm = ref({
  description: '',
  person: '',
  amount: 0,
  direction: 'business_owes'
})

const filteredSettlements = computed(() => {
  if (settlementFilter.value === 'all') {
    return settlements.value
  }

  return settlements.value.filter((settlement) => settlement.status === settlementFilter.value)
})

const pendingSettlements = computed(() =>
  settlements.value.filter((settlement) => settlement.status === 'pending')
)

const pendingSettlementTotal = computed(() =>
  pendingSettlements.value.reduce((total, settlement) => total + Number(settlement.amount || 0), 0)
)

/* =========================================================
   SETTLEMENT ACTIONS
========================================================= */

function openNewSettlement() {
  activeTab.value = 'settlements'
  openSettlementModal.value = true
}

function addSettlement() {
  const description = settlementForm.value.description.trim()
  const person = settlementForm.value.person.trim()
  const amount = Number(settlementForm.value.amount) || 0

  if (!description || !person || amount <= 0) {
    return
  }

  settlements.value.unshift({
    id: Date.now(),
    description,
    person,
    amount,
    direction: settlementForm.value.direction,
    status: 'pending',
    date: getCurrentDate()
  })

  resetSettlementForm()

  openSettlementModal.value = false
  activeTab.value = 'settlements'
}

function completeSettlement(id) {
  const settlement = settlements.value.find((item) => item.id === id)

  if (settlement) {
    settlement.status = 'completed'
  }
}

function resetSettlementForm() {
  settlementForm.value = {
    description: '',
    person: '',
    amount: 0,
    direction: 'business_owes'
  }
}

/* =========================================================
   EXPENSE CLAIMS
========================================================= */

const claims = ref([
  {
    id: 1,
    employee: 'Sarah',
    amount: 75000,
    category: 'Transportation',
    description: 'Client meeting transport',
    receipt: true,
    status: 'pending',
    date: '29 Aug 2026'
  },
  {
    id: 2,
    employee: 'Emmanuel',
    amount: 32000,
    category: 'Entertainment',
    description: 'Team lunch after sprint',
    receipt: true,
    status: 'pending',
    date: '27 Aug 2026'
  },
  {
    id: 3,
    employee: 'Ngozi',
    amount: 18500,
    category: 'Technology',
    description: 'USB-C hub for laptop',
    receipt: false,
    status: 'approved',
    date: '22 Aug 2026'
  },
  {
    id: 4,
    employee: 'Ibrahim',
    amount: 45000,
    category: 'Transportation',
    description: 'Uber to client site (3 days)',
    receipt: true,
    status: 'approved',
    date: '18 Aug 2026'
  },
  {
    id: 5,
    employee: 'Blessing',
    amount: 12000,
    category: 'Other',
    description: 'Office birthday cake',
    receipt: false,
    status: 'rejected',
    date: '15 Aug 2026'
  }
])

const claimFilter = ref('all')
const openClaimModal = ref(false)

const claimForm = ref({
  employee: '',
  amount: 0,
  category: 'Transportation',
  description: ''
})

const filteredClaims = computed(() => {
  if (claimFilter.value === 'all') {
    return claims.value
  }

  return claims.value.filter((claim) => claim.status === claimFilter.value)
})

const pendingClaims = computed(() => claims.value.filter((claim) => claim.status === 'pending'))

const pendingClaimsTotal = computed(() =>
  pendingClaims.value.reduce((total, claim) => total + Number(claim.amount || 0), 0)
)

const approvedClaimsTotal = computed(() =>
  claims.value
    .filter((claim) => claim.status === 'approved')
    .reduce((total, claim) => total + Number(claim.amount || 0), 0)
)

/* =========================================================
   CLAIM ACTIONS
========================================================= */

function openNewClaim() {
  activeTab.value = 'claims'
  openClaimModal.value = true
}

function addClaim() {
  const employee = claimForm.value.employee.trim()
  const description = claimForm.value.description.trim()
  const amount = Number(claimForm.value.amount) || 0

  if (!employee || !description || amount <= 0) {
    return
  }

  claims.value.unshift({
    id: Date.now(),
    employee,
    amount,
    category: claimForm.value.category,
    description,
    receipt: false,
    status: 'pending',
    date: getCurrentDate()
  })

  resetClaimForm()

  openClaimModal.value = false
  activeTab.value = 'claims'
}

function updateClaim(id, status) {
  const claim = claims.value.find((item) => item.id === id)

  if (claim) {
    claim.status = status
  }
}

function resetClaimForm() {
  claimForm.value = {
    employee: '',
    amount: 0,
    category: 'Transportation',
    description: ''
  }
}

/* =========================================================
   CATEGORIES
========================================================= */

const defaultCategories = [
  'Operations',
  'Payroll',
  'Marketing',
  'Transportation',
  'Utilities',
  'Rent',
  'Inventory',
  'Suppliers',
  'Technology',
  'Entertainment',
  'Taxes',
  'Bank Fees',
  'Other'
]

const categories = ref([...defaultCategories])

const openCategoryModal = ref(false)
const newCategory = ref('')

/* =========================================================
   CATEGORY ACTIONS
========================================================= */

function openNewCategory() {
  openCategoryModal.value = true
}

function addCategory() {
  const category = newCategory.value.trim()

  if (!category) {
    return
  }

  const exists = categories.value.some((item) => item.toLowerCase() === category.toLowerCase())

  if (!exists) {
    categories.value.push(category)
  }

  newCategory.value = ''
  openCategoryModal.value = false
}

function removeCategory(category) {
  if (defaultCategories.includes(category)) {
    return
  }

  categories.value = categories.value.filter((item) => item !== category)
}

/* =========================================================
   SPENDING HISTORY
========================================================= */

const augustSpending = ref([
  {
    name: 'Payroll',
    amount: 3800000
  },
  {
    name: 'Operations',
    amount: 1200000
  },
  {
    name: 'Marketing',
    amount: 800000
  },
  {
    name: 'Utilities',
    amount: 420000
  },
  {
    name: 'Transportation',
    amount: 300000
  },
  {
    name: 'Other',
    amount: 180000
  }
])

const julyTotal = 5800000

const augustTotal = computed(() =>
  augustSpending.value.reduce((total, item) => total + Number(item.amount || 0), 0)
)

const spendingChange = computed(() => {
  if (!julyTotal) {
    return 0
  }

  return ((augustTotal.value - julyTotal) / julyTotal) * 100
})

/* =========================================================
   REPORTS
========================================================= */

const report = {
  revenue: 8500000,
  expenses: 5900000,
  net: 2600000,
  savings: 1200000,
  goalProgress: 8.2
}

const budgetVsActual = [
  {
    name: 'Payroll',
    budget: 3500000,
    actual: 3800000
  },
  {
    name: 'Marketing',
    budget: 600000,
    actual: 800000
  },
  {
    name: 'Operations',
    budget: 1300000,
    actual: 1200000
  },
  {
    name: 'Utilities',
    budget: 400000,
    actual: 420000
  }
]

const largestExpenses = [
  {
    name: 'Payroll (August)',
    amount: 3800000
  },
  {
    name: 'Office rent',
    amount: 650000
  },
  {
    name: 'Google Ads campaign',
    amount: 420000
  },
  {
    name: 'Cloud infrastructure',
    amount: 185000
  }
]

/* =========================================================
   HELPERS
========================================================= */

function formatNaira(amount) {
  const value = Number(amount)

  if (!Number.isFinite(value)) {
    return '₦0'
  }

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

function getCurrentDate() {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date())
}
</script>

<template>
  <MainLayout>
    <div class="min-h-screen text-slate-800 antialiased">
      <!-- =====================================================
           TOP NAVIGATION
      ====================================================== -->

      <header class="border-b border-slate-200 sticky top-0 z-30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <p class="text-xl text-slate-500 font-bold">Spending & Settlement</p>
          </div>

          <div class="flex items-center gap-2">
            <!-- Settlement Button -->
            <button
              type="button"
              @click="openNewSettlement"
              class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              + Settlement
            </button>

            <!-- Expense Claim Button -->
            <button
              type="button"
              @click="openNewClaim"
              class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg shadow-sm transition bg-gold"
            >
              + Expense Claim
            </button>
          </div>
        </div>
      </header>

      <!-- =====================================================
           TABS
      ====================================================== -->

      <div class="border-b border-white/10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center gap-2 overflow-x-auto py-3 text-sm font-medium">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              type="button"
              @click="activeTab = tab.id"
              :class="[
                'whitespace-nowrap rounded-lg px-5 py-2.5 transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-white text-[#074033] shadow-sm'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>

      <!-- =====================================================
           MAIN CONTENT
      ====================================================== -->

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <!-- ===================================================
             OVERVIEW
        ==================================================== -->

        <template v-if="activeTab === 'overview'">
          <!-- Summary Cards -->

          <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p class="text-sm font-medium text-slate-500">Pending Settlements</p>

              <p class="mt-1 text-3xl font-bold text-slate-900">
                {{ pendingSettlements.length }}
              </p>

              <p class="text-xs text-slate-500 mt-1">
                {{ formatNaira(pendingSettlementTotal) }} owed
              </p>
            </div>

            <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p class="text-sm font-medium text-slate-500">Pending Claims</p>

              <p class="mt-1 text-3xl font-bold text-slate-900">
                {{ pendingClaims.length }}
              </p>

              <p class="text-xs text-slate-500 mt-1">
                {{ formatNaira(pendingClaimsTotal) }} awaiting
              </p>
            </div>

            <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p class="text-sm font-medium text-slate-500">Aug Spending</p>

              <p class="mt-1 text-2xl font-bold text-slate-900">
                {{ formatNaira(augustTotal) }}
              </p>

              <p
                class="text-xs mt-1"
                :class="spendingChange >= 0 ? 'text-red-600' : 'text-emerald-600'"
              >
                {{ spendingChange >= 0 ? '↑' : '↓' }}
                {{ Math.abs(spendingChange).toFixed(1) }}% vs July
              </p>
            </div>

            <div class="bg-brand-50 border border-brand-200 rounded-xl p-5 shadow-sm">
              <p class="text-sm font-medium text-brand-700">Net Cash Flow (Aug)</p>

              <p class="mt-1 text-2xl font-bold text-brand-800">
                {{ formatNaira(report.net) }}
              </p>

              <p class="text-xs text-brand-600 mt-1">Revenue − Expenses</p>
            </div>
          </section>

          <!-- Quick Insight -->

          <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 class="font-semibold text-slate-900 mb-2">Why spending changed</h3>

            <p class="text-sm text-slate-600 leading-relaxed">
              Spending increased primarily because
              <strong>payroll increased ₦400k</strong> and
              <strong>marketing spending increased ₦350k</strong>. Operations and utilities stayed
              relatively flat.
            </p>
          </div>

          <!-- Spending + Settlements -->

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Spending -->

            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div class="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 class="font-semibold text-slate-900">August Spending</h3>
              </div>

              <ul class="divide-y divide-slate-100">
                <li
                  v-for="category in augustSpending"
                  :key="category.name"
                  class="px-5 py-3 flex justify-between text-sm"
                >
                  <span class="text-slate-600">
                    {{ category.name }}
                  </span>

                  <span class="font-medium tabular-nums">
                    {{ formatNaira(category.amount) }}
                  </span>
                </li>

                <li class="px-5 py-3 flex justify-between text-sm font-semibold bg-slate-50">
                  <span>Total</span>

                  <span class="text-brand-700">
                    {{ formatNaira(augustTotal) }}
                  </span>
                </li>
              </ul>
            </div>

            <!-- Pending Settlements -->

            <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div class="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 class="font-semibold text-slate-900">Pending Settlements</h3>

                <button
                  type="button"
                  @click="activeTab = 'settlements'"
                  class="text-sm text-brand-600 hover:text-brand-700 font-medium"
                >
                  View all →
                </button>
              </div>

              <ul class="divide-y divide-slate-100">
                <li
                  v-for="settlement in pendingSettlements.slice(0, 4)"
                  :key="settlement.id"
                  class="px-5 py-3 flex items-center justify-between gap-3 text-sm"
                >
                  <div class="min-w-0">
                    <p class="font-medium text-slate-900 truncate">
                      {{ settlement.description }}
                    </p>

                    <p class="text-xs text-slate-500">
                      {{ settlement.person }} ·
                      {{
                        settlement.direction === 'business_owes' ? 'Business owes' : 'Owes business'
                      }}
                    </p>
                  </div>

                  <span class="font-semibold tabular-nums shrink-0">
                    {{ formatNaira(settlement.amount) }}
                  </span>
                </li>

                <li
                  v-if="pendingSettlements.length === 0"
                  class="px-5 py-8 text-center text-slate-500 text-sm"
                >
                  No pending settlements
                </li>
              </ul>
            </div>
          </div>
        </template>

        <!-- ===================================================
             SETTLEMENTS
        ==================================================== -->

        <Settlements
          :settlements="filteredSettlements"
          :filter="settlementFilter"
          @update:filter="settlementFilter = $event"
          @complete="completeSettlement"
          @new-settlement="openNewSettlement"
        />

        <!-- ===================================================
             EXPENSE CLAIMS
        ==================================================== -->

        <Expenseclaims
          v-if="activeTab === 'claims'"
          :claims="filteredClaims"
          :filter="claimFilter"
          @update:filter="claimFilter = $event"
          @update-claim="updateClaim($event.id, $event.status)"
          @new-claim="openNewClaim"
        />

        <!-- ===================================================
             CATEGORIES
        ==================================================== -->

        <template v-if="activeTab === 'categories'">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold text-slate-900">Spending Categories</h2>

              <p class="text-sm text-slate-500 mt-0.5">Default categories + your custom ones</p>
            </div>

            <button
              type="button"
              @click="openNewCategory"
              class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg"
            >
              + Custom Category
            </button>
          </div>

          <!-- Categories -->

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <div
              v-for="category in categories"
              :key="category"
              class="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm"
            >
              <span class="text-sm font-medium text-slate-800">
                {{ category }}
              </span>

              <span
                v-if="defaultCategories.includes(category)"
                class="text-[10px] uppercase tracking-wide text-slate-400"
              >
                Default
              </span>

              <button
                v-else
                type="button"
                @click="removeCategory(category)"
                class="text-slate-400 hover:text-red-500 text-xs"
              >
                Remove
              </button>
            </div>
          </div>
        </template>
      </main>

      <!-- =====================================================
           SETTLEMENT MODAL
      ====================================================== -->

      <div
        v-if="openSettlementModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        @click.self="openSettlementModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900">New Settlement</h3>

            <button
              type="button"
              @click="openSettlementModal = false"
              class="text-slate-400 hover:text-slate-600"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form @submit.prevent="addSettlement" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"> Description </label>

              <input
                v-model="settlementForm.description"
                required
                placeholder="e.g. Office supplies"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"> Person </label>

              <input
                v-model="settlementForm.person"
                required
                placeholder="e.g. John"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"> Amount (₦) </label>

              <input
                v-model.number="settlementForm.amount"
                type="number"
                min="0"
                required
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"> Direction </label>

              <select
                v-model="settlementForm.direction"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              >
                <option value="business_owes">Business owes this person</option>

                <option value="person_owes">This person owes the business</option>
              </select>
            </div>

            <div class="flex gap-3 pt-2">
              <button
                type="button"
                @click="openSettlementModal = false"
                class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- =====================================================
           CLAIM MODAL
      ====================================================== -->

      <div
        v-if="openClaimModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        @click.self="openClaimModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900">Submit Expense Claim</h3>

            <button
              type="button"
              @click="openClaimModal = false"
              class="text-slate-400 hover:text-slate-600"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form @submit.prevent="addClaim" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"> Employee </label>

              <input
                v-model="claimForm.employee"
                required
                placeholder="e.g. Sarah"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"> Amount (₦) </label>

              <input
                v-model.number="claimForm.amount"
                type="number"
                min="0"
                required
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"> Category </label>

              <select
                v-model="claimForm.category"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              >
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"> Description </label>

              <input
                v-model="claimForm.description"
                required
                placeholder="e.g. Client meeting transport"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"> Receipt </label>

              <div
                class="border border-dashed border-slate-300 rounded-lg px-4 py-6 text-center text-sm text-slate-500"
              >
                <p>📎 Upload receipt</p>

                <p class="text-xs mt-1">In production this would open a file picker</p>
              </div>
            </div>

            <div class="flex gap-3 pt-2">
              <button
                type="button"
                @click="openClaimModal = false"
                class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium"
              >
                Submit Claim
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- =====================================================
           CATEGORY MODAL
      ====================================================== -->

      <div
        v-if="openCategoryModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        @click.self="openCategoryModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
          <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900">Add Custom Category</h3>

            <button
              type="button"
              @click="openCategoryModal = false"
              class="text-slate-400 hover:text-slate-600"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form @submit.prevent="addCategory" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1"> Category name </label>

              <input
                v-model="newCategory"
                required
                placeholder="e.g. Software Subscriptions"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>

            <div class="flex gap-3 pt-2">
              <button
                type="button"
                @click="openCategoryModal = false"
                class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="flex-1 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
```
