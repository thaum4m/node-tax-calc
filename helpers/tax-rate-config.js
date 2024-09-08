export default function TaxRateConfig(incomeTaxRates) {
  // Revealing module pattern hides access to "incomeTaxRates".
  return {
    // incomeYear = { from, to }
    getIncomeTaxRates: incomeYear =>
      _getIncomeTaxRates(incomeTaxRates, incomeYear),
    getIncomeTaxYears: (reverse = false) =>
      _getIncomeTaxYears(incomeTaxRates, reverse),
  };
}

const _getIncomeTaxRates = (incomeTaxRates, incomeYear) => {
  return incomeTaxRates[`${incomeYear.from}-${incomeYear.to}`];
};

/**
 * Return a list of income tax years of the form: { from, to }
 * @param {object} incomeTaxRates - Income tax rates.
 * @param {boolean} [reverse=false] - Whether to sort in descending order.
 * @return {array<object>} List of income years.
 */
const _getIncomeTaxYears = (incomeTaxRates, reverse = false) => {
  const sortOrder = reverse ? -1 : 1;
  return Object.keys(incomeTaxRates)
    .sort((a, b) => (a > b ? sortOrder : sortOrder * -1))
    .map(key => {
      const parts = key.split('-');
      return { from: parseInt(parts[0]), to: parseInt(parts[1]) };
    });
};
