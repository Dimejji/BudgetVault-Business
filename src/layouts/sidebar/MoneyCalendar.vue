```vue
<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { ref, computed } from 'vue'

/* =========================================================
   MODALS
========================================================= */

const showAllModal = ref(false)
const showAddModal = ref(false)
const showEmployeeModal = ref(false)

const selectedEmployee = ref(null)

/* =========================================================
   EMPLOYEES
========================================================= */

const employees = ref([
  {
    id: 1,
    name: 'Emmanuel Okoro',
    role: 'Developer',
    base: 350000,
    transport: 50000,
    allowance: 30000,
    other: 0,
    accountName: 'Emmanuel Okoro',
    accountNumber: '0123456789',
    bank: 'GTBank',
    paymentStatus: 'Pending'
  },
  {
    id: 2,
    name: 'Aisha Bello',
    role: 'Product Manager',
    base: 420000,
    transport: 45000,
    allowance: 40000,
    other: 15000,
    accountName: 'Aisha Bello',
    accountNumber: '1029384756',
    bank: 'Access Bank',
    paymentStatus: 'Pending'
  },
  {
    id: 3,
    name: 'Chinedu Eze',
    role: 'Designer',
    base: 280000,
    transport: 35000,
    allowance: 25000,
    other: 10000,
    accountName: 'Chinedu Eze',
    accountNumber: '2233445566',
    bank: 'First Bank',
    paymentStatus: 'Pending'
  },
  {
    id: 4,
    name: 'Fatima Yusuf',
    role: 'Backend Engineer',
    base: 380000,
    transport: 50000,
    allowance: 35000,
    other: 20000,
    accountName: 'Fatima Yusuf',
    accountNumber: '3344556677',
    bank: 'UBA',
    paymentStatus: 'Pending'
  },
  {
    id: 5,
    name: 'Tunde Adeyemi',
    role: 'DevOps',
    base: 400000,
    transport: 55000,
    allowance: 40000,
    other: 25000,
    accountName: 'Tunde Adeyemi',
    accountNumber: '4455667788',
    bank: 'Zenith Bank',
    paymentStatus: 'Pending'
  },
  {
    id: 6,
    name: 'Ngozi Okafor',
    role: 'QA Engineer',
    base: 260000,
    transport: 30000,
    allowance: 20000,
    other: 10000,
    accountName: 'Ngozi Okafor',
    accountNumber: '5566778899',
    bank: 'Kuda',
    paymentStatus: 'Pending'
  },
  {
    id: 7,
    name: 'Ibrahim Musa',
    role: 'Frontend Engineer',
    base: 320000,
    transport: 40000,
    allowance: 30000,
    other: 15000,
    accountName: 'Ibrahim Musa',
    accountNumber: '6677889900',
    bank: 'OPay',
    paymentStatus: 'Pending'
  },
  {
    id: 8,
    name: 'Blessing Okeke',
    role: 'HR Lead',
    base: 300000,
    transport: 40000,
    allowance: 35000,
    other: 20000,
    accountName: 'Blessing Okeke',
    accountNumber: '7788990011',
    bank: 'Moniepoint',
    paymentStatus: 'Pending'
  },
  {
    id: 9,
    name: 'Emeka Nwosu',
    role: 'Mobile Developer',
    base: 340000,
    transport: 45000,
    allowance: 30000,
    other: 15000,
    accountName: 'Emeka Nwosu',
    accountNumber: '8899001122',
    bank: 'GTBank',
    paymentStatus: 'Pending'
  },
  {
    id: 10,
    name: 'Zainab Abubakar',
    role: 'Data Analyst',
    base: 270000,
    transport: 35000,
    allowance: 25000,
    other: 10000,
    accountName: 'Zainab Abubakar',
    accountNumber: '9900112233',
    bank: 'Access Bank',
    paymentStatus: 'Pending'
  },
  {
    id: 11,
    name: 'Kunle Bakare',
    role: 'Sales Lead',
    base: 290000,
    transport: 50000,
    allowance: 45000,
    other: 25000,
    accountName: 'Kunle Bakare',
    accountNumber: '1122334455',
    bank: 'UBA',
    paymentStatus: 'Pending'
  },
  {
    id: 12,
    name: 'Adaeze Nwankwo',
    role: 'Customer Success',
    base: 250000,
    transport: 30000,
    allowance: 25000,
    other: 10000,
    accountName: 'Adaeze Nwankwo',
    accountNumber: '1234567800',
    bank: 'First Bank',
    paymentStatus: 'Pending'
  }
])

/* =========================================================
   FORECAST
========================================================= */

const projectedIncome = ref(18500000)
const reserves = ref(4200000)

/* =========================================================
   ADD EMPLOYEE FORM
========================================================= */

const form = ref({
  name: '',
  role: '',
  base: 0,
  transport: 0,
  allowance: 0,
  other: 0,
  accountName: '',
  accountNumber: '',
  bank: ''
})

const banks = [
  'GTBank',
  'Access Bank',
  'First Bank',
  'UBA',
  'Zenith Bank',
  'Kuda',
  'OPay',
  'Moniepoint',
  'Sterling Bank',
  'Fidelity Bank',
  'Union Bank',
  'Stanbic IBTC'
]

/* =========================================================
   COMPUTED
========================================================= */

const formTotal = computed(() => {
  return (
    Number(form.value.base) +
    Number(form.value.transport) +
    Number(form.value.allowance) +
    Number(form.value.other)
  )
})

const enriched = computed(() => {
  return employees.value.map((employee) => ({
    ...employee,
    total:
      Number(employee.base) +
      Number(employee.transport) +
      Number(employee.allowance) +
      Number(employee.other)
  }))
})

const visibleEmployees = computed(() => {
  return enriched.value.slice(0, 6)
})

const totals = computed(() => {
  const list = enriched.value

  return {
    base: list.reduce((sum, employee) => sum + employee.base, 0),

    transport: list.reduce((sum, employee) => sum + employee.transport, 0),

    allowance: list.reduce((sum, employee) => sum + employee.allowance, 0),

    other: list.reduce((sum, employee) => sum + employee.other, 0),

    allowances: list.reduce((sum, employee) => sum + employee.transport + employee.allowance, 0),

    total: list.reduce((sum, employee) => sum + employee.total, 0)
  }
})

const threeMonthObligation = computed(() => {
  return totals.value.total * 3
})

const available = computed(() => {
  return projectedIncome.value + reserves.value
})

const shortfall = computed(() => {
  return threeMonthObligation.value - available.value
})

const coverageText = computed(() => {
  if (shortfall.value <= 0) {
    return 'Fully covered by income + reserves'
  }

  return `Shortfall of ${formatNaira(shortfall.value)}`
})

const coverageClass = computed(() => {
  return shortfall.value <= 0 ? 'text-emerald-300' : 'text-amber-300'
})

/* =========================================================
   HELPERS
========================================================= */

function formatNaira(amount) {
  if (amount == null || Number.isNaN(Number(amount))) {
    return '₦0'
  }

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

function initials(name) {
  if (!name) return '?'

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/* =========================================================
   EMPLOYEE DETAILS
========================================================= */

function openEmployeeDetails(employee) {
  selectedEmployee.value = employee
  showEmployeeModal.value = true
}

function closeEmployeeDetails() {
  showEmployeeModal.value = false
  selectedEmployee.value = null
}

/* =========================================================
   ADD EMPLOYEE
========================================================= */

function openAddModal() {
  showAddModal.value = true
}

function addEmployee() {
  if (!form.value.name.trim() || !form.value.role.trim()) {
    return
  }

  employees.value.push({
    id: Date.now(),

    name: form.value.name.trim(),
    role: form.value.role.trim(),

    base: Number(form.value.base) || 0,
    transport: Number(form.value.transport) || 0,
    allowance: Number(form.value.allowance) || 0,
    other: Number(form.value.other) || 0,

    accountName: form.value.accountName.trim() || form.value.name.trim(),

    accountNumber: form.value.accountNumber.trim(),

    bank: form.value.bank,

    paymentStatus: 'Pending'
  })

  resetForm()
  showAddModal.value = false
}

function resetForm() {
  form.value = {
    name: '',
    role: '',
    base: 0,
    transport: 0,
    allowance: 0,
    other: 0,
    accountName: '',
    accountNumber: '',
    bank: ''
  }
}

/* =========================================================
   REMOVE EMPLOYEE
========================================================= */

function removeEmployee(id) {
  employees.value = employees.value.filter((employee) => employee.id !== id)

  if (selectedEmployee.value?.id === id) {
    closeEmployeeDetails()
  }
}

/* =========================================================
   PAY SALARY
========================================================= */

function paySalary(employee) {
  if (!employee) return

  employee.paymentStatus = 'Paid'
}
</script>

<template>
  <MainLayout>
    <div class="min-h-screen text-slate-800 antialiased">
      <!-- HEADER -->
      <header class="sticky top-0 z-30 border-b border-slate-100  backdrop-blur">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1 class="text-lg font-bold text-slate-900">Payroll</h1>

            <p class="text-xs text-slate-500">Manage employees and payroll obligations</p>
          </div>

          <button
            type="button"
            @click="openAddModal"
            class="inline-flex items-center gap-2 rounded-xl bg-[#074033] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#06372c] active:scale-[0.98]"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>

            Add Employee
          </button>
        </div>
      </header>

      <!-- MAIN -->
      <main class="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <!-- SUMMARY -->
        <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-medium text-slate-500">Total Employees</p>

            <p class="mt-2 text-2xl font-bold text-slate-900">
              {{ employees.length }}
            </p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-medium text-slate-500">Base Salaries</p>

            <p class="mt-2 text-2xl font-bold text-slate-900">
              {{ formatNaira(totals.base) }}
            </p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p class="text-xs font-medium text-slate-500">Allowances & Transport</p>

            <p class="mt-2 text-2xl font-bold text-slate-900">
              {{ formatNaira(totals.allowances) }}
            </p>
          </div>

          <div class="rounded-2xl border border-[#cfe3dc] bg-[#f0f8f5] p-5 shadow-sm">
            <p class="text-xs font-medium text-[#074033]">Total Monthly Payroll</p>

            <p class="mt-2 text-2xl font-bold text-[#074033]">
              {{ formatNaira(totals.total) }}
            </p>
          </div>
        </section>

        <!-- FORECAST -->
        <section class="overflow-hidden rounded-2xl bg-[#074033] p-6 text-white shadow-lg">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p class="text-sm font-medium text-white/70">Payroll Forecast</p>

              <h2 class="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {{ formatNaira(threeMonthObligation) }}
              </h2>

              <p class="mt-2 text-sm text-white/60">
                Projected payroll obligation for the next 3 months
              </p>
            </div>

            <div class="grid w-full max-w-xl grid-cols-2 gap-3">
              <div class="rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                <p class="text-xs text-white/60">Projected Income</p>

                <p class="mt-1 text-base font-semibold">
                  {{ formatNaira(projectedIncome) }}
                </p>
              </div>

              <div class="rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                <p class="text-xs text-white/60">Available Reserves</p>

                <p class="mt-1 text-base font-semibold">
                  {{ formatNaira(reserves) }}
                </p>
              </div>

              <div class="col-span-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                <p class="text-xs text-white/60">Coverage</p>

                <p class="mt-1 text-base font-semibold" :class="coverageClass">
                  {{ coverageText }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- PAYROLL + EMPLOYEES -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- BREAKDOWN -->
          <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 px-5 py-4">
              <h3 class="font-semibold text-slate-900">Payroll Breakdown</h3>

              <p class="mt-0.5 text-xs text-slate-500">{{ employees.length }} employees</p>
            </div>

            <div class="space-y-4 p-5 text-sm">
              <div class="flex justify-between">
                <span class="text-slate-500">Base salaries</span>

                <span class="font-semibold">
                  {{ formatNaira(totals.base) }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-slate-500">Transport</span>

                <span class="font-semibold">
                  {{ formatNaira(totals.transport) }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-slate-500">Allowances</span>

                <span class="font-semibold">
                  {{ formatNaira(totals.allowance) }}
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-slate-500">Other obligations</span>

                <span class="font-semibold">
                  {{ formatNaira(totals.other) }}
                </span>
              </div>

              <div class="border-t border-slate-100 pt-4">
                <div class="flex justify-between">
                  <span class="font-semibold text-slate-900"> Total Payroll </span>

                  <span class="font-bold text-[#074033]">
                    {{ formatNaira(totals.total) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="px-5 pb-5">
              <div class="rounded-xl border border-amber-200 bg-amber-50 p-3">
                <p class="text-xs font-semibold text-amber-900">Phase 1 Focus</p>

                <p class="mt-1 text-[11px] leading-4 text-amber-800/80">
                  Planning and tracking only. Payslips, tax and bank payments can be added later.
                </p>
              </div>
            </div>
          </section>

          <!-- EMPLOYEE LIST -->
          <section
            class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2"
          >
            <div class="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 class="font-semibold text-slate-900">Employees & Obligations</h3>

                <p class="mt-0.5 text-xs text-slate-500">
                  Showing {{ visibleEmployees.length }} of {{ employees.length }}
                </p>
              </div>

              <button
                v-if="employees.length > 6"
                type="button"
                @click="showAllModal = true"
                class="text-xs font-bold text-[#074033] transition hover:translate-x-0.5"
              >
                See all →
              </button>
            </div>

            <!-- EMPTY -->
            <div
              v-if="employees.length === 0"
              class="flex flex-1 flex-col items-center justify-center p-10 text-center"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <svg
                  class="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.8"
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m9-11a4 4 0 10-8 0 4 4 0 008 0zm7 11v-2a4 4 0 00-3-3.87m-1-11a4 4 0 010 7.75"
                  />
                </svg>
              </div>

              <p class="mt-3 text-sm font-semibold text-slate-800">No employees yet</p>

              <button
                type="button"
                @click="openAddModal"
                class="mt-2 text-xs font-semibold text-[#074033] hover:underline"
              >
                Add your first employee
              </button>
            </div>

            <!-- EMPLOYEES -->
            <ul v-else class="divide-y divide-slate-100">
              <li
                v-for="emp in visibleEmployees"
                :key="emp.id"
                class="group flex cursor-pointer items-center gap-3 px-5 py-3.5 transition hover:bg-[#fafcfb]"
                @click="openEmployeeDetails(emp)"
              >
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e7f1ed] text-xs font-bold text-[#074033]"
                >
                  {{ initials(emp.name) }}
                </div>

                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-semibold text-slate-900">
                    {{ emp.name }}
                  </p>

                  <p class="truncate text-xs text-slate-500">
                    {{ emp.role }}
                  </p>
                </div>

                <div class="hidden text-right sm:block">
                  <p class="text-sm font-semibold tabular-nums text-slate-900">
                    {{ formatNaira(emp.total) }}
                  </p>

                  <p class="text-[10px] text-slate-400">monthly</p>
                </div>

                <span
                  class="hidden rounded-full px-2 py-1 text-[9px] font-semibold sm:inline-flex"
                  :class="
                    emp.paymentStatus === 'Paid'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  "
                >
                  {{ emp.paymentStatus }}
                </span>

                <!-- VIEW ICON -->
                <button
                  type="button"
                  @click.stop="openEmployeeDetails(emp)"
                  class="rounded-lg p-1.5 text-slate-300 transition hover:bg-slate-100 hover:text-[#074033]"
                  title="View employee"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.8"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <!-- REMOVE -->
                <button
                  type="button"
                  @click.stop="removeEmployee(emp.id)"
                  class="rounded-lg p-1.5 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                  title="Remove employee"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            </ul>

            <!-- FOOTER -->
            <div
              v-if="employees.length > 6"
              class="border-t border-slate-100 bg-slate-50/70 px-5 py-3"
            >
              <button
                type="button"
                @click="showAllModal = true"
                class="w-full py-1 text-center text-xs font-bold text-[#074033]"
              >
                View all {{ employees.length }} employees →
              </button>
            </div>
          </section>
        </div>
      </main>

      <!-- =====================================================
     EMPLOYEE DETAILS MODAL
====================================================== -->

      <Transition name="modal">
        <div
          v-if="showEmployeeModal && selectedEmployee"
          class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm mt-15"
          @click.self="closeEmployeeDetails"
        >
          <div
            class="w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
          >
            <!-- PROFILE HEADER -->
            <div class="relative bg-[#074033] px-4 pb-4 pt-4 text-white">
              <button
                type="button"
                @click="closeEmployeeDetails"
                class="absolute right-3 top-3 rounded-lg p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div class="flex items-center gap-3 pr-7">
                <div
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold ring-1 ring-white/20"
                >
                  {{ initials(selectedEmployee.name) }}
                </div>

                <div class="min-w-0">
                  <h3 class="truncate text-base font-bold">
                    {{ selectedEmployee.name }}
                  </h3>

                  <p class="mt-0.5 truncate text-xs text-white/60">
                    {{ selectedEmployee.role }}
                  </p>

                  <span
                    class="mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[8px] font-bold"
                    :class="
                      selectedEmployee.paymentStatus === 'Paid'
                        ? 'bg-emerald-400/20 text-emerald-200'
                        : 'bg-amber-400/20 text-amber-200'
                    "
                  >
                    Salary {{ selectedEmployee.paymentStatus }}
                  </span>
                </div>
              </div>
            </div>

            <!-- DETAILS -->
            <div class="space-y-4 p-4">
              <!-- MONTHLY PAY -->
              <div class="rounded-lg border border-[#d8e7e1] bg-[#f3f8f6] px-3 py-2.5">
                <p class="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  Monthly salary obligation
                </p>

                <p class="mt-0.5 text-xl font-bold text-[#074033]">
                  {{ formatNaira(selectedEmployee.total) }}
                </p>
              </div>

              <!-- SALARY BREAKDOWN -->
              <div>
                <h4 class="mb-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Salary Breakdown
                </h4>

                <div class="space-y-2 text-xs">
                  <div class="flex justify-between">
                    <span class="text-slate-500">Base Salary</span>
                    <span class="font-semibold text-slate-800">
                      {{ formatNaira(selectedEmployee.base) }}
                    </span>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-slate-500">Transport</span>
                    <span class="font-semibold text-slate-800">
                      {{ formatNaira(selectedEmployee.transport) }}
                    </span>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-slate-500">Allowance</span>
                    <span class="font-semibold text-slate-800">
                      {{ formatNaira(selectedEmployee.allowance) }}
                    </span>
                  </div>

                  <div class="flex justify-between">
                    <span class="text-slate-500">Other</span>
                    <span class="font-semibold text-slate-800">
                      {{ formatNaira(selectedEmployee.other) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- BANK DETAILS -->
              <div>
                <div class="mb-2 flex items-center justify-between">
                  <h4 class="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Payment Account
                  </h4>

                  <span class="text-[8px] font-semibold text-emerald-600"> Payroll account </span>
                </div>

                <div class="overflow-hidden rounded-lg border border-slate-200">
                  <div
                    class="flex items-center justify-between border-b border-slate-100 px-3 py-2"
                  >
                    <span class="text-[10px] text-slate-500"> Account Name </span>

                    <span
                      class="max-w-[160px] truncate text-right text-[10px] font-semibold text-slate-800"
                    >
                      {{ selectedEmployee.accountName || 'Not provided' }}
                    </span>
                  </div>

                  <div
                    class="flex items-center justify-between border-b border-slate-100 px-3 py-2"
                  >
                    <span class="text-[10px] text-slate-500"> Account Number </span>

                    <span class="font-mono text-[10px] font-semibold text-slate-800">
                      {{ selectedEmployee.accountNumber || 'Not provided' }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between px-3 py-2">
                    <span class="text-[10px] text-slate-500"> Bank </span>

                    <span class="text-[10px] font-semibold text-slate-800">
                      {{ selectedEmployee.bank || 'Not provided' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- ACTIONS -->
              <div class="flex gap-2 pt-0.5">
                <button
                  type="button"
                  @click="closeEmployeeDetails"
                  class="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  type="button"
                  @click="paySalary(selectedEmployee)"
                  :disabled="selectedEmployee.paymentStatus === 'Paid'"
                  class="flex-1 rounded-lg bg-[#074033] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#06372c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {{ selectedEmployee.paymentStatus === 'Paid' ? 'Salary Paid' : 'Pay Salary' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- =====================================================
     SEE ALL EMPLOYEES
====================================================== -->

      <Transition name="modal">
        <div
          v-if="showAllModal"
          class="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm"
          @click.self="showAllModal = false"
        >
          <div
            class="flex max-h-[75vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
          >
            <!-- HEADER -->
            <div
              class="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3"
            >
              <div>
                <div class="flex items-center gap-1.5">
                  <h3 class="text-sm font-bold text-slate-900">All Employees</h3>

                  <span
                    class="rounded-full bg-[#e7f1ed] px-1.5 py-0.5 text-[8px] font-bold text-[#074033]"
                  >
                    {{ employees.length }}
                  </span>
                </div>

                <p class="mt-0.5 text-[10px] text-slate-500">
                  {{ formatNaira(totals.total) }} monthly payroll
                </p>
              </div>

              <button
                type="button"
                @click="showAllModal = false"
                class="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- EMPLOYEE CARDS -->
            <div class="flex-1 overflow-y-auto p-3">
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <article
                  v-for="emp in enriched"
                  :key="emp.id"
                  @click="openEmployeeDetails(emp)"
                  class="group cursor-pointer rounded-lg border border-slate-200 bg-white p-2.5 transition hover:border-[#cbded7] hover:bg-[#fafcfb] hover:shadow-sm"
                >
                  <div class="flex items-center gap-2.5">
                    <div
                      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e7f1ed] text-[10px] font-bold text-[#074033]"
                    >
                      {{ initials(emp.name) }}
                    </div>

                    <div class="min-w-0 flex-1">
                      <p class="truncate text-xs font-semibold text-slate-900">
                        {{ emp.name }}
                      </p>

                      <p class="truncate text-[9px] text-slate-500">
                        {{ emp.role }}
                      </p>
                    </div>

                    <svg
                      class="h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-[#074033]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.8"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>

                  <div class="mt-2 flex items-end justify-between border-t border-slate-100 pt-2">
                    <div>
                      <p class="text-[8px] font-medium uppercase tracking-wide text-slate-400">
                        Monthly
                      </p>

                      <p class="mt-0.5 text-xs font-bold text-[#074033]">
                        {{ formatNaira(emp.total) }}
                      </p>
                    </div>

                    <span
                      class="rounded-full px-1.5 py-0.5 text-[8px] font-semibold"
                      :class="
                        emp.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      "
                    >
                      {{ emp.paymentStatus }}
                    </span>
                  </div>
                </article>
              </div>
            </div>

            <!-- FOOTER -->
            <div
              class="flex shrink-0 items-center justify-between border-t border-slate-100 bg-slate-50/70 px-4 py-2.5"
            >
              <span class="text-[9px] text-slate-500"> {{ employees.length }} employees </span>

              <span class="text-[10px] font-bold text-slate-900">
                Monthly:
                <span class="text-[#074033]">
                  {{ formatNaira(totals.total) }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Transition>
      <!-- =====================================================
     ADD EMPLOYEE MODAL
====================================================== -->

      <Transition name="modal">
        <div
          v-if="showAddModal"
          class="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm"
          @click.self="showAddModal = false"
        >
          <div
            class="flex max-h-[85vh] w-full max-w-sm flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
          >
            <!-- HEADER -->
            <div
              class="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3"
            >
              <div>
                <h3 class="text-sm font-bold text-slate-900">Add Employee</h3>

                <p class="mt-0.5 text-[10px] text-slate-500">
                  Add payroll and payment information.
                </p>
              </div>

              <button
                type="button"
                @click="showAddModal = false"
                class="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- FORM -->
            <form @submit.prevent="addEmployee" class="space-y-3 overflow-y-auto p-4">
              <!-- BASIC INFORMATION -->
              <div>
                <p class="mb-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Employee Information
                </p>

                <div class="space-y-2">
                  <div>
                    <label class="mb-1 block text-[10px] font-semibold text-slate-700">
                      Full Name
                    </label>

                    <input
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="e.g. Emmanuel Okoro"
                      class="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition placeholder:text-slate-400 focus:border-[#074033] focus:ring-2 focus:ring-[#074033]/10"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-[10px] font-semibold text-slate-700">
                      Role
                    </label>

                    <input
                      v-model="form.role"
                      type="text"
                      required
                      placeholder="e.g. Software Developer"
                      class="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition placeholder:text-slate-400 focus:border-[#074033] focus:ring-2 focus:ring-[#074033]/10"
                    />
                  </div>
                </div>
              </div>

              <!-- SALARY -->
              <div>
                <p class="mb-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Salary Structure
                </p>

                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="mb-1 block text-[10px] font-semibold text-slate-700">
                      Base Salary
                    </label>

                    <input
                      v-model.number="form.base"
                      type="number"
                      min="0"
                      step="1000"
                      required
                      class="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-[#074033] focus:ring-2 focus:ring-[#074033]/10"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-[10px] font-semibold text-slate-700">
                      Transport
                    </label>

                    <input
                      v-model.number="form.transport"
                      type="number"
                      min="0"
                      step="1000"
                      class="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-[#074033] focus:ring-2 focus:ring-[#074033]/10"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-[10px] font-semibold text-slate-700">
                      Allowance
                    </label>

                    <input
                      v-model.number="form.allowance"
                      type="number"
                      min="0"
                      step="1000"
                      class="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-[#074033] focus:ring-2 focus:ring-[#074033]/10"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-[10px] font-semibold text-slate-700">
                      Other
                    </label>

                    <input
                      v-model.number="form.other"
                      type="number"
                      min="0"
                      step="1000"
                      class="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition focus:border-[#074033] focus:ring-2 focus:ring-[#074033]/10"
                    />
                  </div>
                </div>
              </div>

              <!-- PAYMENT ACCOUNT -->
              <div>
                <p class="mb-2 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Salary Payment Account
                </p>

                <div class="space-y-2">
                  <div>
                    <label class="mb-1 block text-[10px] font-semibold text-slate-700">
                      Account Name
                    </label>

                    <input
                      v-model="form.accountName"
                      type="text"
                      placeholder="e.g. Emmanuel Okoro"
                      class="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none transition placeholder:text-slate-400 focus:border-[#074033] focus:ring-2 focus:ring-[#074033]/10"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-[10px] font-semibold text-slate-700">
                      Account Number
                    </label>

                    <input
                      v-model="form.accountNumber"
                      type="text"
                      inputmode="numeric"
                      maxlength="10"
                      placeholder="10-digit account number"
                      class="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-mono outline-none transition placeholder:font-sans placeholder:text-slate-400 focus:border-[#074033] focus:ring-2 focus:ring-[#074033]/10"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-[10px] font-semibold text-slate-700">
                      Bank
                    </label>

                    <select
                      v-model="form.bank"
                      class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none transition focus:border-[#074033] focus:ring-2 focus:ring-[#074033]/10"
                    >
                      <option value="">Select bank</option>

                      <option v-for="bank in banks" :key="bank" :value="bank">
                        {{ bank }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- TOTAL -->
              <div class="flex items-center justify-between rounded-lg bg-[#f3f8f6] px-3 py-2.5">
                <span class="text-[10px] font-medium text-slate-500"> Monthly payroll </span>

                <span class="text-xs font-bold text-[#074033]">
                  {{ formatNaira(formTotal) }}
                </span>
              </div>

              <!-- ACTIONS -->
              <div class="flex gap-2 pt-0.5">
                <button
                  type="button"
                  @click="showAddModal = false"
                  class="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  class="flex-1 rounded-lg bg-[#074033] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#06372c] active:scale-[0.98]"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  </MainLayout>
</template>
