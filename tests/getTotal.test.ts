import { describe, expect, it } from 'vitest'
import { categoriesItems } from '~/tests/categories.mock'
import { getTotal } from '~/components/trns/functions/getTotal'
import { getTransferCatgoryIds } from '~/components/categories/getCategories'
import { trnsItems } from '~/tests/trns.mock'
import { walletsItems } from '~/tests/wallets.mock'
import { ratesBasedOnUsd as rates } from '~/tests/rates.mock'

const transferCategoriesIds = getTransferCatgoryIds(categoriesItems)

describe('Total of Transactions', () => {
  it('Correct empty result and correct total structure', () => {
    const trnsIds = []

    const total = getTotal({
      walletsItems,
      trnsItems,
      trnsIds,
      transferCategoriesIds,
    })

    expect(total).toEqual({
      incomeTransactions: 0,
      expenseTransactions: 0,
      sumTransactions: 0,
      incomeTransfers: 0,
      expenseTransfers: 0,
      sumTransfers: 0,
    })
  })

  it('Total in RUB Wallet converted to USD', () => {
    const trnsIds = ['transactionIncomeWalletOneRUB700']
    const baseRate = 'USD'

    const total = getTotal({
      baseRate,
      rates,
      transferCategoriesIds,
      trnsIds,
      trnsItems,
      walletsItems,
    })

    expect(total.incomeTransactions).toEqual(10.8108)
    expect(total.expenseTransactions).toEqual(0)
    expect(total.sumTransactions).toEqual(10.8108)
    expect(total.incomeTransfers).toEqual(0)
    expect(total.expenseTransfers).toEqual(0)
    expect(total.sumTransfers).toEqual(0)
  })

  it('Total in RUB Wallet converted to EUR', () => {
    const trnsIds = ['transactionIncomeWalletOneRUB700']
    const baseRate = 'EUR'

    const total = getTotal({
      baseRate,
      rates,
      transferCategoriesIds,
      trnsIds,
      trnsItems,
      walletsItems,
    })

    expect(total.incomeTransactions).toEqual(10.3831)
    expect(total.expenseTransactions).toEqual(0)
    expect(total.sumTransactions).toEqual(10.3831)
    expect(total.incomeTransfers).toEqual(0)
    expect(total.expenseTransfers).toEqual(0)
    expect(total.sumTransfers).toEqual(0)
  })

  it('Total in USD Wallet converted to USD', () => {
    const trnsIds = [
      'transactionIncomeWalletCashUSD1000',
      'transactionExpenseWalletCashUSD400',
    ]
    const baseRate = 'USD'

    const total = getTotal({
      baseRate,
      rates,
      transferCategoriesIds,
      trnsIds,
      trnsItems,
      walletsItems,
    })

    expect(total.incomeTransactions).toEqual(1000)
    expect(total.expenseTransactions).toEqual(400)
    expect(total.sumTransactions).toEqual(600)
    expect(total.incomeTransfers).toEqual(0)
    expect(total.expenseTransfers).toEqual(0)
    expect(total.sumTransfers).toEqual(0)
  })

  it('Total in RUB, USD Wallets converted to EUR', () => {
    const trnsIds = [
      'transactionIncomeWalletOneRUB700',
      'transactionExpenseWalletCashUSD400',
    ]
    const baseRate = 'EUR'

    const total = getTotal({
      baseRate,
      rates,
      transferCategoriesIds,
      trnsIds,
      trnsItems,
      walletsItems,
    })

    expect(total.incomeTransactions).toEqual(10.3831)
    expect(total.expenseTransactions).toEqual(384.176)
    expect(total.sumTransactions).toEqual(-373.7929)
    expect(total.incomeTransfers).toEqual(0)
    expect(total.expenseTransfers).toEqual(0)
    expect(total.sumTransfers).toEqual(0)
  })

  it('Total in Wallet Cash USD with Transfers', () => {
    const walletsIds = ['walletCashUSD']
    const trnsIds = [
      'transactionIncomeWalletCashUSD1000',
      'transactionExpenseWalletCashUSD400',
      'transferExpenseWalletCashUSD10IncomeWalletRUB700',
      'transferExpenseWalletCreditUSD40IncomeWalletCashUSD40',
      'transferCategoryNameIncomeWalletCashUSD30',
      'transferCategoryIdExpenseWalletCashUSD30',
    ]

    const total = getTotal({
      transferCategoriesIds,
      trnsIds,
      trnsItems,
      walletsIds,
      walletsItems,
    })

    expect(total.incomeTransactions).toEqual(1000)
    expect(total.expenseTransactions).toEqual(400)
    expect(total.sumTransactions).toEqual(600)
    expect(total.incomeTransfers).toEqual(70)
    expect(total.expenseTransfers).toEqual(40)
    expect(total.sumTransfers).toEqual(30)
  })

  it('Total of Transfers when no Wallets provided', () => {
    const trnsIds = [
      'transactionIncomeWalletCashUSD1000',
      'transactionExpenseWalletCashUSD400',
      'transferExpenseWalletCreditUSD40IncomeWalletCashUSD40',
      'transferCategoryNameIncomeWalletCashUSD30',
      'transferCategoryIdExpenseWalletCashUSD30',
    ]

    const total = getTotal({
      transferCategoriesIds,
      trnsIds,
      trnsItems,
      walletsItems,
    })

    expect(total.incomeTransactions).toEqual(1000)
    expect(total.expenseTransactions).toEqual(400)
    expect(total.sumTransactions).toEqual(600)
    expect(total.incomeTransfers).toEqual(70)
    expect(total.expenseTransfers).toEqual(70)
    expect(total.sumTransfers).toEqual(0)
  })

  it('Total of Transfers with deprecated tranfer type', () => {
    const trnsIds = [
      'transferOLDExpenseWalletTransfer250',
    ]

    const total = getTotal({
      transferCategoriesIds,
      trnsIds,
      trnsItems,
      walletsItems,
    })

    expect(total.incomeTransfers).toEqual(250)
    expect(total.expenseTransfers).toEqual(250)
    expect(total.sumTransfers).toEqual(0)
  })

  it('Total of Transfers with deprecated tranfer type when no Wallets provided', () => {
    const walletsIds = ['walletDeprecatedTransferIncome']

    const trnsIds = [
      'transferOLDExpenseWalletTransfer250',
    ]

    const total = getTotal({
      transferCategoriesIds,
      trnsIds,
      trnsItems,
      walletsIds,
      walletsItems,
    })

    expect(total.incomeTransfers).toEqual(250)
    expect(total.expenseTransfers).toEqual(0)
    expect(total.sumTransfers).toEqual(250)
  })
})
