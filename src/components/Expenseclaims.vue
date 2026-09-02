
<script setup>

/* =========================================================
   PROPS
========================================================= */

defineProps({
  claims: {
    type: Array,
    default: () => []
  },

  filter: {
    type: String,
    default: 'all'
  }
})

/* =========================================================
   EMITS
========================================================= */

const emit = defineEmits([
  'update:filter',
  'update-claim',
  'new-claim'
])

/* =========================================================
   FILTERS
========================================================= */

const filters = ['all', 'pending', 'approved', 'rejected']

/* =========================================================
   ACTIONS
========================================================= */

function setFilter(filter) {
  emit('update:filter', filter)
}

function updateClaim(id, status) {
  emit('update-claim', { id, status })
}

function openNewClaim() {
  emit('new-claim')
}

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
</script>

<template>
  <template v-if="true">

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <div class="flex items-center justify-between">

      <div>
        <h2 class="text-xl font-semibold text-slate-900">
          Expense Claims
        </h2>

        <p class="text-sm text-slate-500 mt-0.5">
          Employees submit claims → Manager approves / rejects
        </p>
      </div>

      <button
        type="button"
        @click="openNewClaim"
        class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg"
      >
        + Submit Claim
      </button>

    </div>

    <!-- =====================================================
         CLAIM FILTERS
    ====================================================== -->

    <div class="flex gap-2 flex-wrap">

      <button
        v-for="filterItem in filters"
        :key="filterItem"
        type="button"
        @click="setFilter(filterItem)"
        :class="[
          'px-3 py-1.5 text-sm rounded-lg capitalize',
          filter === filterItem
            ? 'bg-brand-100 text-brand-700 font-medium'
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
        ]"
      >
        {{ filterItem }}
      </button>

    </div>

    <!-- =====================================================
         CLAIMS LIST
    ====================================================== -->

    <div
      class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
    >

      <div
        v-if="claims.length === 0"
        class="p-12 text-center text-slate-500 text-sm"
      >
        No claims match this filter.
      </div>

      <ul
        v-else
        class="divide-y divide-slate-100"
      >

        <li
          v-for="claim in claims"
          :key="claim.id"
          class="px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-4 hover:bg-slate-50/60"
        >

          <!-- Claim Information -->

          <div class="flex-1 min-w-0">

            <div class="flex items-center gap-2 flex-wrap">

              <p class="font-medium text-slate-900">
                {{ claim.description }}
              </p>

              <span
                class="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
              >
                {{ claim.category }}
              </span>

              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  claim.status === 'pending'
                    ? 'bg-amber-100 text-amber-800'
                    : claim.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                ]"
              >
                {{ claim.status }}
              </span>

            </div>

            <p class="text-sm text-slate-500 mt-1">

              {{ claim.employee }}
              ·
              {{ claim.date }}

              <span
                v-if="claim.receipt"
                class="ml-2 text-brand-600"
              >
                📎 Receipt attached
              </span>

            </p>

          </div>

          <!-- Amount + Actions -->

          <div class="flex items-center gap-3 shrink-0">

            <span class="text-lg font-semibold tabular-nums">
              {{ formatNaira(claim.amount) }}
            </span>

            <!-- Pending Actions -->

            <template v-if="claim.status === 'pending'">

              <button
                type="button"
                @click="updateClaim(claim.id, 'approved')"
                class="px-3 py-1.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
              >
                Approve
              </button>

              <button
                type="button"
                @click="updateClaim(claim.id, 'rejected')"
                class="px-3 py-1.5 text-sm font-medium bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg"
              >
                Reject
              </button>

            </template>

          </div>

        </li>

      </ul>

    </div>

  </template>
</template>

