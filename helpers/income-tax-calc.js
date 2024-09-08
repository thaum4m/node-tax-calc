export default function IncomeTaxCalc(taxRateConfig) {
  // Revealing module pattern hides access to "taxRateConfig".
  return {
    taxableIncome: (incomeYear, income) =>
      _taxableIncome(taxRateConfig, incomeYear, income),
  };
}

const _taxableIncome = (taxRateConfig, incomeYear, income) => {
  const taxRates = taxRateConfig.getIncomeTaxRates(incomeYear);

  let totalTax = 0;
  for (let taxRate of taxRates) {
    if (
      income >= taxRate.income_from &&
      (income <= taxRate.income_to || typeof taxRate.income_to === 'undefined')
    ) {
      totalTax += taxRate.base_tax; // Initial tax on income range.
      const rules = taxRate.rules ?? [];
      for (let rule of rules) {
        // Add additional tax based on rule.
        if (income > rule.income_above) {
          const amountAbove = income - rule.income_above;
          totalTax += amountAbove * rule.tax_per_dollar;
        }
      }
      return totalTax;
    }
  }

  return totalTax;
};
