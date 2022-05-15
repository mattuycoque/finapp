import type { CategoryID } from '~~/components/categories/types'
import type { TrnID, TrnItem } from '~/components/trns/types'
import type { WalletID, WalletItem } from '~~/components/wallets/types'
import { TrnType } from '~/components/trns/types'

const fixed = 4

function getAmountInBaseRate({
  amount,
  currency,
  baseRate,
  rates,
}: {
  amount: number
  currency: string
  baseRate?: string // TODO: add typings
  rates?: Record<string, number> // TODO: add typings
}): number {
  if (!baseRate || !rates)
    return amount

  else if (baseRate !== currency)
    return Math.abs(amount / rates[currency] * rates[baseRate])

  return amount
}

function getFixedAmount({ amount, fixed }: { amount: number; fixed: number }) {
  return +amount.toFixed(fixed)
}

export function getTotal({
  baseRate,
  rates,
  transferCategoriesIds,
  trnsIds,
  trnsItems,
  walletsIds,
  walletsItems,
}: {
  baseRate?: string // TODO: add typings
  rates?: Record<string, number> // TODO: add typings
  transferCategoriesIds: CategoryID[]
  trnsIds: TrnID[]
  trnsItems: Record<TrnID, TrnItem>
  walletsIds?: WalletID[]
  walletsItems: Record<WalletID, WalletItem>
}) {
  function getFormatedAmount(amount: number, currency: string) {
    let formatedAmount = 0
    formatedAmount = getAmountInBaseRate({
      amount,
      baseRate,
      currency,
      rates,
    })

    formatedAmount = getFixedAmount({
      amount: formatedAmount,
      fixed,
    })

    return formatedAmount
  }

  // Transactions
  let incomeTransactions = 0
  let expenseTransactions = 0
  let sumTransactions = 0

  // Transfers
  let incomeTransfers = 0
  let expenseTransfers = 0
  let sumTransfers = 0

  for (const trnId of trnsIds) {
    const trn = trnsItems[trnId]

    // Transaction
    if (trn.type === TrnType.Income || trn.type === TrnType.Expense) {
      const isTransferCategory = transferCategoriesIds?.includes(trn.categoryId)
      const wallet = walletsItems[trn.walletId]
      const sum = getFormatedAmount(trn.amount, wallet.currency)

      // Income
      if (trn.type === TrnType.Income) {
        isTransferCategory
          ? incomeTransfers += sum
          : incomeTransactions += sum
      }

      // Expense
      if (trn.type === TrnType.Expense) {
        isTransferCategory
          ? expenseTransfers += sum
          : expenseTransactions += sum
      }
    }

    // Transfer v2
    else if (trn.type === TrnType.Transfer && 'incomeWalletId' in trn) {
      const incomeWallet = walletsItems[trn.incomeWalletId]
      const expenseWallet = walletsItems[trn.expenseWalletId]
      const incomeAmount = getFormatedAmount(trn.incomeAmount, incomeWallet.currency)
      const expenseAmount = getFormatedAmount(trn.expenseAmount, expenseWallet.currency)

      // Include only selected wallets
      if (walletsIds && walletsIds.length > 0) {
        // Income
        if (walletsIds.includes(trn.incomeWalletId))
          incomeTransfers += incomeAmount

        // Expense
        else if (walletsIds.includes(trn.expenseWalletId))
          expenseTransfers += expenseAmount
      }

      // Include all wallets
      else {
        incomeTransfers += incomeAmount
        expenseTransfers += expenseAmount
      }
    }

    // Transfer @deprecated
    else if (trn.type === TrnType.Transfer && 'walletFromId' in trn) {
      const incomeWallet = walletsItems[trn.walletFromId]
      const expenseWallet = walletsItems[trn.walletToId]
      const incomeAmount = getFormatedAmount(trn.amountTo, incomeWallet.currency)
      const expenseAmount = getFormatedAmount(trn.amountFrom, expenseWallet.currency)

      // Include only selected wallets
      if (walletsIds && walletsIds.length > 0) {
        // Income
        if (walletsIds.includes(trn.walletFromId))
          incomeTransfers += incomeAmount

        // Expense
        else if (walletsIds.includes(trn.walletToId))
          expenseTransfers += expenseAmount
      }

      // Include all wallets
      else {
        incomeTransfers += incomeAmount
        expenseTransfers += expenseAmount
      }
    }
  }

  // Total
  sumTransactions = incomeTransactions - expenseTransactions
  sumTransfers = incomeTransfers - expenseTransfers

  return {
    incomeTransactions,
    expenseTransactions,
    sumTransactions,

    incomeTransfers,
    expenseTransfers,
    sumTransfers,
  }
}
