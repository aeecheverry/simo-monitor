export const MENU_ITEMS = [
    {
      title: 'Dashboard',
      icon: 'analytics',
      link: 'dashboard',
    },
    {
      title: 'E-commerce',
      icon: 'shopping_cart',
      link: 'e-commerce',
    },
    {
      title: 'Transactions',
      icon: 'backup_table',
      home: true,
      children: [
        {
          title: 'Services',
          link: 'transactions/services',
        },
        {
          title: 'Reattempts',
          link: 'transactions/reattempts',
        },
      ],
    },
    {
      title: 'Reports',
      icon: 'description',
      link: 'reports',
    },
    {
      title: 'Billing',
      icon: 'request_quote',
      link: 'billing',
    }
  ];
  