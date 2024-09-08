import TaxRateConfig from '../helpers/tax-rate-config';
import taxRatesMock from './fixtures/income-tax-rates.fixture';

describe('Tax Rate Config', () => {
  it('Get income tax rates should be undefined for non-existent income year', async () => {
    const config = new TaxRateConfig(taxRatesMock);
    // Test "from" and "to" not matching '2020-2021'.
    const taxRates = config.getIncomeTaxRates({ from: 2010, to: 2011 });
    expect(taxRates).toBeUndefined();
  });

  it('Get income tax rates should correspond to a valid income year', async () => {
    const config = new TaxRateConfig(taxRatesMock);
    const taxRates = config.getIncomeTaxRates({ from: 2021, to: 2022 });
    expect(taxRates).toEqual([
      {
        income_from: 0,
        income_to: 100,
        base_tax: 0,
      },
      {
        income_from: 101,
        base_tax: 10,
      },
    ]);
  });

  it('Get income tax years should return ordered list of income years', async () => {
    const config = await new TaxRateConfig(taxRatesMock);
    const years = config.getIncomeTaxYears();
    expect(years).toEqual([
      { from: 2020, to: 2021 },
      { from: 2021, to: 2022 },
      { from: 2022, to: 2023 },
    ]);
  });

  it('Get income tax years in reverse should return income years in reverse order', async () => {
    const config = await new TaxRateConfig(taxRatesMock);
    const years = config.getIncomeTaxYears(true); // Reversed
    expect(years).toEqual([
      { from: 2022, to: 2023 },
      { from: 2021, to: 2022 },
      { from: 2020, to: 2021 },
    ]);
  });
});
