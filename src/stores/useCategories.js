import { ref } from 'vue'

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
  'Other',
]

// Shared with ExpenseClaimsTab (category dropdown) as well as CategoriesTab
// (management screen) — module-level state keeps both in sync.
const categories = ref([...defaultCategories])
const isModalOpen = ref(false)

function addCategory(name) {
  const cleanName = name.trim()
  if (!cleanName) {
    return false
  }

  const exists = categories.value.some(
    (category) => category.toLowerCase() === cleanName.toLowerCase()
  )

  if (!exists) {
    categories.value.push(cleanName)
  }

  return true
}

function removeCategory(category) {
  // Default categories cannot be deleted
  if (defaultCategories.includes(category)) {
    return
  }

  categories.value = categories.value.filter((item) => item !== category)
}

export function useCategories() {
  return {
    categories,
    defaultCategories,
    isModalOpen,
    addCategory,
    removeCategory,
  }
}
