import TaxRateConfig from '../helpers/tax-rate-config';
import IncomeTaxCalc from '../helpers/income-tax-calc';
import taxRatesMock from './fixtures/income-tax-rates.fixture';

describe('Calculate Taxable Income', () => {
  it('should calculate correct tax for income without tax', () => {
    const config = new TaxRateConfig(taxRatesMock);
    const taxCalc = new IncomeTaxCalc(config);
    const incomeYear = { from: 2020, to: 2021 };
    const income = 100;
    const taxableIncome = taxCalc.taxableIncome(incomeYear, income);
    expect(taxableIncome).toBe(0);
  });

  it('should calculate correct tax for income with only "base tax"', () => {
    const config = new TaxRateConfig(taxRatesMock);
    const taxCalc = new IncomeTaxCalc(config);
    const incomeYear = { from: 2021, to: 2022 };
    const income = 101;
    const taxableIncome = taxCalc.taxableIncome(incomeYear, income);
    expect(taxableIncome).toBe(10);
  });

  it('should calculate correct tax for income with only "base tax" and no "income_to"', () => {
    const config = new TaxRateConfig(taxRatesMock);
    const taxCalc = new IncomeTaxCalc(config);
    const incomeYear = { from: 2021, to: 2022 };
    const income = 101;
    const taxableIncome = taxCalc.taxableIncome(incomeYear, income);
    expect(taxableIncome).toBe(10);
  });

  it('should calculate correct tax for income with "base tax" and "tax_per_dollar" rule', () => {
    const config = new TaxRateConfig(taxRatesMock);
    const taxCalc = new IncomeTaxCalc(config);
    const incomeYear = { from: 2022, to: 2023 };
    const income = 300;
    const taxableIncome = taxCalc.taxableIncome(incomeYear, income);
    expect(taxableIncome).toBe(520);
  });

  it('should calculate correct tax for income with "base tax" and "tax_per_dollar" rule not applicable', () => {
    const config = new TaxRateConfig(taxRatesMock);
    const taxCalc = new IncomeTaxCalc(config);
    const incomeYear = { from: 2022, to: 2023 };
    const income = 399;
    const taxableIncome = taxCalc.taxableIncome(incomeYear, income);
    expect(taxableIncome).toBe(30);
  });
});
