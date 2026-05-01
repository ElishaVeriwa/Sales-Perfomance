export interface SalesRecord {
  id: string;
  region: string;
  category: string;
  sales: number;
  profit: number;
  date: string;
}

export const salesData: SalesRecord[] = [
  { id: '1', region: 'North America', category: 'Technology', sales: 45000, profit: 12000, date: '2025-01-15' },
  { id: '2', region: 'Europe', category: 'Technology', sales: 38000, profit: 9500, date: '2025-01-20' },
  { id: '3', region: 'Asia', category: 'Technology', sales: 52000, profit: 15000, date: '2025-02-05' },
  { id: '4', region: 'North America', category: 'Furniture', sales: 28000, profit: 4000, date: '2025-02-10' },
  { id: '5', region: 'Europe', category: 'Furniture', sales: 31000, profit: 5500, date: '2025-02-18' },
  { id: '6', region: 'Asia', category: 'Furniture', sales: 25000, profit: 3800, date: '2025-03-01' },
  { id: '7', region: 'North America', category: 'Office Supplies', sales: 15000, profit: 6000, date: '2025-03-12' },
  { id: '8', region: 'Europe', category: 'Office Supplies', sales: 18000, profit: 7500, date: '2025-03-20' },
  { id: '9', region: 'Asia', category: 'Office Supplies', sales: 22000, profit: 9000, date: '2025-04-05' },
];

export const getAggregatedByRegion = () => {
  const regions: Record<string, { sales: number; profit: number }> = {};
  salesData.forEach(item => {
    if (!regions[item.region]) regions[item.region] = { sales: 0, profit: 0 };
    regions[item.region].sales += item.sales;
    regions[item.region].profit += item.profit;
  });
  return Object.entries(regions).map(([name, data]) => ({ name, ...data }));
};

export const getMonthlyTrends = () => {
  // Simple grouping by month string
  const months: Record<string, { sales: number; profit: number }> = {};
  salesData.forEach(item => {
    const month = item.date.substring(0, 7);
    if (!months[month]) months[month] = { sales: 0, profit: 0 };
    months[month].sales += item.sales;
    months[month].profit += item.profit;
  });
  return Object.entries(months).map(([date, data]) => ({ date, ...data })).sort((a, b) => a.date.localeCompare(b.date));
};
