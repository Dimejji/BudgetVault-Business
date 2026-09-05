import { ref, computed } from 'vue'

const claims = ref([
  {
    id: 1,
    employee: 'Sarah',
    amount: 75000,
    category: 'Transportation',
    description: 'Client meeting transport',
    receipt: true,
    status: 'pending',
    date: '29 Aug 2026',
  },
  {
    id: 2,
    employee: 'Emmanuel',
    amount: 32000,
    category: 'Entertainment',
    description: 'Team lunch after sprint',
    receipt: true,
    status: 'pending',
    date: '27 Aug 2026',
  },
  {
    id: 3,
    employee: 'Ngozi',
    amount: 18500,
    category: 'Technology',
    description: 'USB-C hub for laptop',
    receipt: false,
    status: 'approved',
    date: '22 Aug 2026',
  },
  {
    id: 4,
    employee: 'Ibrahim',
    amount: 45000,
    category: 'Transportation',
    description: 'Uber to client site (3 days)',
    receipt: true,
    status: 'approved',
    date: '18 Aug 2026',
  },
  {
    id: 5,
    employee: 'Blessing',
    amount: 12000,
    category: 'Other',
    description: 'Office birthday cake',
    receipt: false,
    status: 'rejected',
    date: '15 Aug 2026',
  },
])

const isModalOpen = ref(false)

const pendingClaims = computed(() =>
  claims.value.filter((claim) => claim.status === 'pending')
)

const pendingClaimsTotal = computed(() =>
  pendingClaims.value.reduce((total, claim) => total + claim.amount, 0)
)

function addClaim({ employee, amount, category, description }) {
  const cleanEmployee = employee.trim()
  const cleanDescription = description.trim()
  const cleanAmount = Number(amount) || 0

  if (!cleanEmployee || !cleanDescription || cleanAmount <= 0) {
    return false
  }

  claims.value.unshift({
    id: Date.now(),
    employee: cleanEmployee,
    amount: cleanAmount,
    category,
    description: cleanDescription,
    receipt: false,
    status: 'pending',
    date: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
  })

  return true
}

function updateClaim(id, status) {
  const claim = claims.value.find((item) => item.id === id)
  if (claim) {
    claim.status = status
  }
}

export function useClaims() {
  return {
    claims,
    isModalOpen,
    pendingClaims,
    pendingClaimsTotal,
    addClaim,
    updateClaim,
  }
}
