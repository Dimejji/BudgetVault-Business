<script setup>
defineProps({
  settlements: {
    type: Array,
    default: () => []
  },

  filter: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits([
  'update:filter',
  'complete',
  'new-settlement'
])

const filters = ['all', 'pending', 'completed']

function setFilter(filter) {
  emit('update:filter', filter)
}

function completeSettlement(id) {
  emit('complete', id)
}

function openNewSettlement() {
  emit('new-settlement')
}

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
  <section class="space-y-6">

    <!-- =========================================
         HEADER
    ========================================== -->

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <div>
        <h2 class="text-xl font-semibold text-slate-900">
          Settlements
        </h2>

        <p class="text-sm text-slate-500 mt-0.5">
          Track money owed between the business and people
        </p>
      </div>

      <button
        type="button"
        @click="openNewSettlement"
        class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition"
      >
        + New Settlement
      </button>

    </div>


    <!-- =========================================
         FILTERS
    ========================================== -->

    <div class="flex gap-2 flex-wrap">

      <button
        v-for="item in filters"
        :key="item"
        type="button"
        @click="setFilter(item)"
        :class="[
          'px-3 py-1.5 text-sm rounded-lg capitalize transition',

          filter === item
            ? 'bg-brand-100 text-brand-700 font-medium'
            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
        ]"
      >
        {{ item }}
      </button>

    </div>


    <!-- =========================================
         SETTLEMENT LIST
    ========================================== -->

    <div
      class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
    >

      <!-- Empty State -->

      <div
        v-if="settlements.length === 0"
        class="p-12 text-center"
      >

        <div
          class="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center"
        >
          <span class="text-xl">
            💰
          </span>
        </div>

        <p class="text-sm font-medium text-slate-700">
          No settlements found
        </p>

        <p class="text-sm text-slate-500 mt-1">
          There are no settlements matching this filter.
        </p>

      </div>


      <!-- Settlement List -->

      <ul
        v-else
        class="divide-y divide-slate-100"
      >

        <li
          v-for="settlement in settlements"
          :key="settlement.id"
          class="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:bg-slate-50/60 transition"
        >

          <!-- Settlement Information -->

          <div class="flex-1 min-w-0">

            <div class="flex items-center gap-2 flex-wrap">

              <p class="font-medium text-slate-900">
                {{ settlement.description }}
              </p>

              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full font-medium',

                  settlement.status === 'pending'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                ]"
              >
                {{ settlement.status }}
              </span>

            </div>


            <p class="text-sm text-slate-500 mt-1">

              Paid by
              <strong class="text-slate-700">
                {{ settlement.person }}
              </strong>

              ·

              {{
                settlement.direction === 'business_owes'
                  ? 'Business owes ' + settlement.person
                  : settlement.person + ' owes business'
              }}

              ·

              {{ settlement.date }}

            </p>

          </div>


          <!-- Amount + Action -->

          <div
            class="flex items-center justify-between sm:justify-end gap-3 shrink-0"
          >

            <span
              class="text-lg font-semibold tabular-nums text-slate-900"
            >
              {{ formatNaira(settlement.amount) }}
            </span>


            <button
              v-if="settlement.status === 'pending'"
              type="button"
              @click="completeSettlement(settlement.id)"
              class="px-3 py-1.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
            >
              Mark Settled
            </button>

            <span
              v-else
              class="text-sm font-medium text-emerald-600"
            >
              Settled ✓
            </span>

          </div>

        </li>

      </ul>

    </div>

  </section>
</template>

