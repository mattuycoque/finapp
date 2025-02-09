export default {
  common: {
    date: 'Date',
    open: 'Open',
    all: 'All',
  },

  analytics: {
    title: 'Analytics',
  },

  appName: 'Finapp',

  for: 'for',

  locale: {
    toogle: 'Toogle locale',
  },

  theme: {
    title: 'Theme',
    change: 'Change theme',
  },

  backTo: 'Back to ',
  close: 'Close',

  transfer: {
    titleMany: 'Transfers',
  },

  trnForm: {
    transferTitle: 'Transfer',
    saveTrnButton: 'Save transaction',
    calcTrnButton: 'Calculate',
    createTrnButton: 'Create transaction',
    createTransferButton: 'Create transfer',
    titleEditTrn: 'Edit transaction',
    titleCreateTrn: 'Add transaction',
    filterWalletAndCategory: 'Wallet & Category',
    filterWallet: 'Wallet only',
    filterAll: 'Everything',
    title: 'Transaction form',
    lastUsedCats: 'Show last used categories',
    description: {
      title: 'Description',
      placeholder: 'Write description...',
    },
    transfer: {
      from: 'From',
      fromLong: 'From wallet',
      to: 'To',
      toLong: 'To wallet',
    },
  },

  app: {
    version: 'Version',
    desc: 'Powerful personal finance application',
    welcome: 'Welcome to Finapp',
    lang: {
      select: 'Choose language',
      en: 'English',
      ru: 'Русский',
    },
    theme: {
      select: 'Choose style',
      dark: 'Dark',
      light: 'Light',
    },
    madeBy: {
      text: 'Made with',
      name: 'by Ilya Komichev',
    },
  },

  userLogout: 'Logout',
  loginWithGoogle: 'Login with Google',
  changeTheme: 'Change theme',
  createTrn: 'Create transaction',

  base: {
    sure: 'Are you sure?',
    yes: 'Yes',
    no: 'No',
    sort: 'Sort',
    save: 'Save',
    cancel: 'Cancel',
    dublicate: 'Dublicate',
    setFilter: 'Filter by',
    on: 'On',
    ok: 'Ok',
    off: 'Off',
    add: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    filter: 'Filter',
  },

  filter: {
    clear: 'Clear filter',
  },

  welcome: {
    firstRun: {
      text: 'Start with create base configuration of application',
      btn: 'Start',
    },
    create: {
      text: 'Start creating your own wallets, categories',
      btn: 'Let\'s go',
    },
    createFirstWallet: {
      text: 'Let\'s start with create first Wallet',
      btn: 'Create wallet',
    },
    createFirstCategory: {
      text: 'Great! Now Let\'s create first category',
      btn: 'Create category',
    },
  },

  settings: {
    title: 'Settings',
    lang: 'Language',
    options: 'Options',
    open: 'Open settings',
    customize: 'Сustomize',
    app: 'Application',
    caution: 'With caution',
    deleteButton: 'Delete my data',
  },

  wallets: {
    title: 'Wallets',
    name: 'Wallets',
    new: 'New wallet',
    showAll: 'Show all wallets',
    showOnly: 'Show only',
    sortTitle: 'Sort wallets',
    createNewTitle: 'Create wallet',
    editTitle: 'Edit Wallet',
    form: {
      name: {
        label: 'Wallet name',
        placeholder: 'Write...',
        error: 'Write wallet name',
        exist: 'Wallet with same name is exist',
      },
      colors: {
        label: 'Color',
        placeholder: 'Select color',
        error: 'Select color',
        custom: 'Custom color',
      },
      currencies: {
        label: 'Currency',
        placeholder: 'Select currency',
        error: 'Select currency',
      },
      total: {
        placeholder: 'Сash withdrawal',
      },
      save: 'Save',
    },
  },

  currency: {
    title: 'Currency',
    selectBaseTitle: 'Select base currency',
  },

  categories: {
    title: 'Categories',
    name: 'Categories',
    shortTitle: 'Cats',
    new: 'New category',
    allTitle: 'All',
    lastUsedTitle: 'Recent',
    favoriteTitle: 'Favorite',
    createNewTitle: 'Create category',
    editTitle: 'Edit category',
    form: {
      name: {
        label: 'Category name',
        placeholder: 'Write category name...',
        error: 'Write category name',
        exist: 'Category with same name is exist',
      },
      parent: {
        no: 'Root category',
        label: 'Parent category',
      },
      colors: {
        label: 'Colors',
        custom: 'Custom color',
      },
      icon: {
        label: 'Icon',
      },
      data: {
        label: 'Data',
      },
      lastUsed: 'Show in last used categories',
      quickSelector: 'Favorite category',
      childColor: 'Apply color to all child categories',
      save: 'Save',
    },
  },

  stat: {
    title: 'Statistics',
    selectedPeriod: 'Selected period',
    shortTitle: 'Stat',
    periods: 'Summary',
    balanceTitle: 'Balance',
    empty: 'No stat for this period',
    emptyDesc: 'Change filter, period or add new transactions.',
    customize: {
      showHistory: 'Show history',
      showRoundCats: 'Show round categories list',
      showCategorisChart: 'Show categories chart',
      showCategorisList: 'Show categories list',
      showcatsChartPie: 'Show categories pie chart',
      showPeriodsChart: 'Show periods chart',
    },
  },

  chart: {
    title: 'Chart',
    showMain: 'Show main chart',
    view: {
      add: 'Add',
      remove: 'Remove',
      toogle: 'Toogle chart view',
      showed: 'Showed',
      periodsName: 'periods',
      simpleTitle: 'Line view',
      groupedTitle: 'Column view',
      addGroupButton: 'Add group',
      addPeriodButton: 'Add period',
      removeGroupButton: 'Remove group',
      removePeriodButton: 'Remove period',
    },
  },

  trns: {
    inPeriodTitle: 'Transactions',
    shortTitle: 'Trns',
    history: 'History',
    more: 'Show more',
    filter: {
      showTrnsWithDesc: 'Only with description',
    },
  },

  create: {
    title: 'Create',
  },

  money: {
    incomes: 'Income',
    expenses: 'Expense',

    total: 'Net income',
    income: 'Income',
    expense: 'Expense',
    sum: 'Net income',

    transfer: 'Transfer',
    average: {
      base: 'Average',
      incomes: 'Average',
      expenses: 'Average',
    },
    averageTotal: 'Average',
    also: 'Also',
    wallets: 'Wallets',
    all: 'Net income',
  },

  dates: {
    period: 'Period',
    count: 'Count',
    twoDaysAgo: '2 days ago',
    day: {
      current: 'Today',
      today: 'Today',
      yesterday: 'Yesterday',
      simple: 'Day',
    },
    week: {
      current: 'This week',
      last: 'Last week',
      simple: 'Week',
    },
    month: {
      current: 'This month',
      last: 'Last month',
      simple: 'Month',
    },
    year: {
      current: 'This year',
      simple: 'Year',
    },
    all: {
      simple: 'All trns',
    },
  },

  alerts: {
    willDeleteEverything: 'This will delete all your wallets, categories and trns.',
  },

  buttons: {
    nextTitle: 'Next',
    prevTitle: 'Prev',
    nextStep: 'Next step',
  },

  users: {
    title: 'Users',
  },

  colors: 'Colors',
}
