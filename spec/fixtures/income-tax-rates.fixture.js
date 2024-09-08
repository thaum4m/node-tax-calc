export default {
  '2020-2021': [
    {
      income_from: 0,
      income_to: 100,
      base_tax: 0,
    },
    {
      income_from: 101,
      income_to: 200,
      base_tax: 10,
    },
  ],
  '2021-2022': [
    {
      income_from: 0,
      income_to: 100,
      base_tax: 0,
    },
    {
      income_from: 101,
      base_tax: 10,
    },
  ],
  '2022-2023': [
    {
      income_from: 0,
      income_to: 100,
      base_tax: 10,
    },
    {
      income_from: 101,
      income_to: 300,
      base_tax: 20,
      rules: [{ income_above: 250, tax_per_dollar: 10 }],
    },
    {
      income_from: 301,
      income_to: 500,
      base_tax: 30,
      rules: [{ income_above: 400, tax_per_dollar: 10 }],
    },
  ],
};
