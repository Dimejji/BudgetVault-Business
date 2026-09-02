<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AddVault from '@/components/AddVault.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

import MainLayout from '@/layouts/MainLayout.vue' // adjust path if needed
import PageHeader from '@/components/PageHeader.vue'
import Metric from '@/components/Metric.vue'
import BasePanel from '@/components/BasePanel.vue'
import ProgressTrack from '@/components/ProgressTrack.vue'
import Pill from '@/components/Pill.vue'

import { useVaultStore } from '@/stores/vaultStore'

const vaultStore = useVaultStore()

const showVaultModal = ref(false)
const editingVault = ref(null) // non-null while the modal is in "edit" mode

const openNewVaultModal = () => {
  editingVault.value = null // ensure we're in "create" mode
  showVaultModal.value = true
}

const openEditVault = (vault) => {
  editingVault.value = vault
  showVaultModal.value = true
}

const handleVaultSave = () => {
  // Nothing to do here — vaultStore.createVault/updateVault already
  // patched state, and the vaults grid below re-renders reactively.
  editingVault.value = null
}

// Vault card colour -> Pill variant. category_vaults.color is one of
// VAULT_COLORS in vaultStore.js; extend both together if you add more.
const colorToVariant = (color) => {
  const map = { emerald: 'green', gold: 'gold', blue: 'blue', purple: 'blue', rose: 'gold' }
  return map[color] || 'green'
}

const formatCurrency = (amount) =>
  '₦' + Number(amount || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })

const showDeleteDialog = ref(false)
const vaultPendingDelete = ref(null) // the vault object queued for deletion
const deleting = ref(false)
const deleteError = ref('')

function confirmDeleteVault(vault) {
  vaultPendingDelete.value = vault
  deleteError.value = ''
  showDeleteDialog.value = true
}

async function handleDeleteConfirmed() {
  if (!vaultPendingDelete.value) return
  deleting.value = true
  deleteError.value = ''
  try {
    await vaultStore.deleteVault(vaultPendingDelete.value.id)
    showDeleteDialog.value = false
    vaultPendingDelete.value = null
  } catch (err) {
    deleteError.value = err.message || 'Could not delete vault.'
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  if (!vaultStore.initialized) {
    vaultStore.fetchVaults()
  } else {
    // Already loaded from a previous visit — just make sure realtime is live
    vaultStore.subscribeToChanges()
  }
})

onUnmounted(() => {
  // Keep the subscription alive across route changes within the app;
  // only tear it down if you want a hard reset per-visit. If you'd
  // rather resubscribe fresh every time this page mounts, uncomment:
  // vaultStore.unsubscribe()
})
</script>

<template>
  <MainLayout>
    <div class="space-y-5 sm:space-y-6">
      <!-- Header -->
      <PageHeader
        eyebrow="Plan & Track"
        title="Business & Obligations"
        subtitle="Allocate Financing For Each Bills and Expenses Here!"
      >
        <template #actions>
          <div class="flex flex-col xs:flex-row gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              class="border border-bvline bg-white rounded-[11px] px-4 py-2.5 font-bold text-[12.5px] w-full sm:w-auto hover:border-green-600 hover:bg-green-50 transition"
            >
              ＋ New Bill
            </button>
          </div>
        </template>
      </PageHeader>

      <!-- bills&obligations modal  -->
      <BasePanel>
        <template #head>
          <div class="min-w-0">
            <h2 class="m-0 truncate text-[15px] font-bold text-[#17241f] sm:text-[17px]">
             Bills & Obligations
            </h2>

            <p class="mt-0.5 text-[10px] text-bvmuted">Your bills and planned Expenses</p>
          </div>

          <button
            type="button"
            class="shrink-0 whitespace-nowrap border-0 bg-transparent text-[11px] font-extrabold text-bvgreen2 transition-all duration-200 hover:translate-x-1"
          >
            View all →
          </button>
        </template>

        <!-- Budgets -->
        <div v-if="budgetStore?.budgets?.length" class="divide-y divide-[#eff0ed]">
          <!-- Budget items will go here -->
        </div>

        <!-- Empty state -->
        <div
          v-else
          class="rounded-[13px] border border-dashed border-[#dce5e1] bg-[#fafcfb] p-6 text-center"
        >
          <div class="text-[12px] font-bold text-[#26352f]">No Bills yet</div>

          <p class="mt-1 text-[10px] leading-4 text-bvmuted">
            Create your first Bill and start tracking it here.
          </p>

          <button
            type="button"
            @click="openAddBudgetModal"
            class="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-[11px] font-bold text-white transition hover:bg-emerald-700"
          >
            Add Bills
          </button>
        </div>
      </BasePanel>
      <!-- Activity + Rules -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BasePanel title="Vault activity" meta="Today">
          <div
            v-for="vault in vaultStore.vaults.slice(0, 3)"
            :key="'activity-' + vault.id"
            class="flex justify-between items-center py-3 border-b border-[#eff0ed] last:border-b-0"
          >
            <div>
              <div class="text-[12.5px] font-extrabold">{{ vault.title }}</div>
              <div class="text-[10.5px] text-bvmuted mt-0.5">
                {{ vault.status === 'completed' ? 'Fully funded' : 'In progress' }}
              </div>
            </div>
            <b class="text-[13px] text-emerald-700">{{ formatCurrency(vault.current) }}</b>
          </div>
          <p v-if="!vaultStore.vaults.length" class="text-[12px] text-bvmuted py-3">
            No activity yet.
          </p>
        </BasePanel>

        <BasePanel title="Vault rules" meta="Smart">
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <span class="text-[12px] text-bvmuted">Protect essentials first</span>
            <Pill variant="green">On</Pill>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-[#eff0ed]">
            <span class="text-[12px] text-bvmuted">Auto-save after income</span>
            <Pill variant="green">On</Pill>
          </div>
          <div class="flex justify-between items-center py-3">
            <span class="text-[12px] text-bvmuted">Release on due date</span>
            <Pill variant="gold">Review</Pill>
          </div>
        </BasePanel>
      </div>
    </div>

    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete this vault?"
      :message="
        deleteError ||
        `“${vaultPendingDelete?.title}” and its progress will be permanently removed. This can't be undone.`
      "
      confirm-text="Delete vault"
      cancel-text="Keep it"
      color="error"
      icon="mdi-trash-can-outline"
      :loading="deleting"
      @confirm="handleDeleteConfirmed"
    />
  </MainLayout>
</template>
