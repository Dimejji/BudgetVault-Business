
    <template v-if="activeTab === 'settlements'">

          <div class="flex items-center justify-between">

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
              @click="openSettlementModal = true"
              class="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg"
            >
              + New Settlement
            </button>

          </div>

          <!-- Filters -->

          <div class="flex gap-2 flex-wrap">

            <button
              v-for="filter in ['all', 'pending', 'completed']"
              :key="filter"
              type="button"
              @click="settlementFilter = filter"
              :class="[
                'px-3 py-1.5 text-sm rounded-lg capitalize',
                settlementFilter === filter
                  ? 'bg-brand-100 text-brand-700 font-medium'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              ]"
            >
              {{ filter }}
            </button>

          </div>

          <!-- Settlement List -->

          <div
            class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >

            <div
              v-if="filteredSettlements.length === 0"
              class="p-12 text-center text-slate-500 text-sm"
            >
              No settlements match this filter.
            </div>

            <ul
              v-else
              class="divide-y divide-slate-100"
            >

              <li
                v-for="settlement in filteredSettlements"
                :key="settlement.id"
                class="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 hover:bg-slate-50/60"
              >

                <div class="flex-1 min-w-0">

                  <div class="flex items-center gap-2">

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

                  <p class="text-sm text-slate-500 mt-0.5">
                    Paid by
                    <strong>{{ settlement.person }}</strong>
                    ·

                    {{
                      settlement.direction === 'business_owes'
                        ? 'Business owes ' + settlement.person
                        : settlement.person + ' owes business'
                    }}

                    · {{ settlement.date }}
                  </p>

                </div>

                <div class="flex items-center gap-3 shrink-0">

                  <span class="text-lg font-semibold tabular-nums">
                    {{ formatNaira(settlement.amount) }}
                  </span>

                  <button
                    v-if="settlement.status === 'pending'"
                    type="button"
                    @click="completeSettlement(settlement.id)"
                    class="px-3 py-1.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                  >
                    Mark Settled
                  </button>

                </div>

              </li>

            </ul>

          </div>

        </template>