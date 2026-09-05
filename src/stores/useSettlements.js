import { ref, computed } from 'vue'

// Module-level state so every component that calls useSettlements()
// shares the same list (acts like a tiny store without pulling in Pinia).
const settlements = ref([
  {
    id: 1,
    description: 'Office supplies',
    person: 'John',
    amount: 85000,
    direction: 'business_owes',
    status: 'pending',
    date: '28 Aug 2026',
  },
  {
    id: 2,
    description: 'Client lunch',
    person: 'Aisha',
    amount: 42000,
    direction: 'business_owes',
    status: 'pending',
    date: '26 Aug 2026',
  },
  {
    id: 3,
    description: 'Advance repayment',
    person: 'Chinedu',
    amount: 50000,
    direction: 'person_owes',
    status: 'pending',
    date: '20 Aug 2026',
  },
  {
    id: 4,
    description: 'Printer ink & paper',
    person: 'Fatima',
    amount: 28500,
    direction: 'business_owes',
    status: 'completed',
    date: '12 Aug 2026',
  },
  {
    id: 5,
    description: 'Taxi for airport run',
    person: 'Tunde',
    amount: 18500,
    direction: 'business_owes',
    status: 'completed',
    date: '05 Aug 2026',
  },
])

// Whether the "New Settlement" modal is open. Lives here (rather than in
// a component) so the header button in the parent and the modal inside
// SettlementsTab can both control it.
const isModalOpen = ref(false)

const pendingSettlements = computed(() =>
  settlements.value.filter((settlement) => settlement.status === 'pending')
)

const pendingSettlementTotal = computed(() =>
  pendingSettlements.value.reduce((total, s) => total + s.amount, 0)
)

function addSettlement({ description, person, amount, direction }) {
  const cleanDescription = description.trim()
  const cleanPerson = person.trim()
  const cleanAmount = Number(amount) || 0

  if (!cleanDescription || !cleanPerson || cleanAmount <= 0) {
    return false
  }

  settlements.value.unshift({
    id: Date.now(),
    description: cleanDescription,
    person: cleanPerson,
    amount: cleanAmount,
    direction,
    status: 'pending',
    date: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  })

  return true
}

function completeSettlement(id) {
  const settlement = settlements.value.find((item) => item.id === id)
  if (settlement) {
    settlement.status = 'completed'
  }
}

export function useSettlements() {
  return {
    settlements,
    isModalOpen,
    pendingSettlements,
    pendingSettlementTotal,
    addSettlement,
    completeSettlement,
  }
}
