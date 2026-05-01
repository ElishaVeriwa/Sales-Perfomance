export interface SalesRecord {
  id: string;
  region: string;
  category: string;
  sales: number;
  profit: number;
  date: string;
}

export const salesData: SalesRecord[] = [
  { id: '1', region: 'North America', category: 'Technology', sales: 45000, profit: 12100, date: '2025-01-15' },
  { id: '2', region: 'Europe', category: 'Technology', sales: 38000, profit: 9500, date: '2025-01-20' },
  { id: '3', region: 'Asia', category: 'Technology', sales: 52000, profit: 15600, date: '2025-02-05' },
  { id: '4', region: 'North America', category: 'Furniture', sales: 28000, profit: 4200, date: '2025-02-10' },
  { id: '5', region: 'Europe', category: 'Furniture', sales: 31000, profit: 5580, date: '2025-02-18' },
  { id: '6', region: 'Asia', category: 'Furniture', sales: 25000, profit: 3200, date: '2025-03-01' },
  { id: '7', region: 'North America', category: 'Office Supplies', sales: 15000, profit: 6000, date: '2025-03-12' },
  { id: '8', region: 'Europe', category: 'Office Supplies', sales: 18000, profit: 7560, date: '2025-03-20' },
  { id: '9', region: 'Asia', category: 'Office Supplies', sales: 22000, profit: 9240, date: '2025-04-05' },
  { id: '10', region: 'Europe', category: 'Technology', sales: 42000, profit: 11000, date: '2025-04-12' },
  { id: '11', region: 'Asia', category: 'Technology', sales: 61000, profit: 18000, date: '2025-04-20' },
  { id: '12', region: 'North America', category: 'Furniture', sales: 35000, profit: 7000, date: '2025-04-28' },
];

export const getCategoryBreakdown = () => {
  const cats: Record<string, { size: number; children: { name: string; size: number }[] }> = {};
  salesData.forEach(item => {
    if (!cats[item.category]) cats[item.category] = { size: 0, children: [] };
    cats[item.category].size += item.sales;
    const regionIdx = cats[item.category].children.findIndex(c => c.name === item.region);
    if (regionIdx === -1) {
      cats[item.category].children.push({ name: item.region, size: item.sales });
    } else {
      cats[item.category].children[regionIdx].size += item.sales;
    }
  });
  return Object.entries(cats).map(([name, data]) => ({ name, ...data }));
};

export const getAggregatedByRegion = (category?: string) => {
  const regions: Record<string, { sales: number; profit: number }> = {};
  salesData.forEach(item => {
    if (category && item.category !== category) return;
    if (!regions[item.region]) regions[item.region] = { sales: 0, profit: 0 };
    regions[item.region].sales += item.sales;
    regions[item.region].profit += item.profit;
  });
  return Object.entries(regions).map(([name, data]) => ({ name, ...data }));
};

export const getMonthlyTrends = (category?: string) => {
  const months: Record<string, { sales: number; profit: number }> = {};
  salesData.forEach(item => {
    if (category && item.category !== category) return;
    const month = item.date.substring(0, 7);
    if (!months[month]) months[month] = { sales: 0, profit: 0 };
    months[month].sales += item.sales;
    months[month].profit += item.profit;
  });
  return Object.entries(months).map(([date, data]) => ({ date, ...data })).sort((a, b) => a.date.localeCompare(b.date));
};
