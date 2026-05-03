export interface SoftwareMetric {
  id: string;
  industry: string;
  category: 'Accounting' | 'Data Management' | 'Productivity';
  software: string;
  usageHours: number; // Avg hours per week in typical office
  efficiencyScore: number; // 0-100 scale
  lastUpdate: string;
}

export const softwareUsageData: SoftwareMetric[] = [
  { id: '1', industry: 'Finance', category: 'Accounting', software: 'Sage Pastel/200', usageHours: 40, efficiencyScore: 85, lastUpdate: '2026-01-15' },
  { id: '2', industry: 'Mining', category: 'Accounting', software: 'SAP ERP', usageHours: 35, efficiencyScore: 92, lastUpdate: '2026-01-20' },
  { id: '3', industry: 'Retail', category: 'Accounting', software: 'QuickBooks', usageHours: 25, efficiencyScore: 78, lastUpdate: '2026-02-05' },
  { id: '4', industry: 'Agriculture', category: 'Data Management', software: 'Excel (Advanced)', usageHours: 45, efficiencyScore: 95, lastUpdate: '2026-02-10' },
  { id: '5', industry: 'Public Sector', category: 'Productivity', software: 'Microsoft 365', usageHours: 30, efficiencyScore: 70, lastUpdate: '2026-02-18' },
  { id: '6', industry: 'Finance', category: 'Data Management', software: 'Power BI', usageHours: 20, efficiencyScore: 88, lastUpdate: '2026-03-01' },
  { id: '7', industry: 'Production', category: 'Accounting', software: 'Xero', usageHours: 15, efficiencyScore: 82, lastUpdate: '2026-03-12' },
  { id: '8', industry: 'Consultancy', category: 'Data Management', software: 'SQL/Access', usageHours: 18, efficiencyScore: 90, lastUpdate: '2026-03-20' },
  { id: '9', industry: 'Harare Corporate', category: 'Productivity', software: 'MS Teams/Zoom', usageHours: 12, efficiencyScore: 65, lastUpdate: '2026-04-05' },
  { id: '10', industry: 'Telecommunications', category: 'Accounting', software: 'Oracle Financials', usageHours: 38, efficiencyScore: 94, lastUpdate: '2026-04-12' },
  { id: '11', industry: 'Manufacturing', category: 'Data Management', software: 'Tableau', usageHours: 15, efficiencyScore: 80, lastUpdate: '2026-04-20' },
  { id: '12', industry: 'NGOs', category: 'Accounting', software: 'Serenic Navigator', usageHours: 32, efficiencyScore: 86, lastUpdate: '2026-04-28' },
];

export const getUsageByCategory = () => {
  const cats: Record<string, { size: number; children: { name: string; size: number }[] }> = {};
  softwareUsageData.forEach(item => {
    if (!cats[item.category]) cats[item.category] = { size: 0, children: [] };
    cats[item.category].size += item.usageHours;
    const softwareIdx = cats[item.category].children.findIndex(c => c.name === item.software);
    if (softwareIdx === -1) {
      cats[item.category].children.push({ name: item.software, size: item.usageHours });
    } else {
      cats[item.category].children[softwareIdx].size += item.usageHours;
    }
  });
  return Object.entries(cats).map(([name, data]) => ({ name, ...data }));
};

export const getIndustryBenchmarks = (category?: string) => {
  const industries: Record<string, { usageHours: number; efficiencyScore: number }> = {};
  softwareUsageData.forEach(item => {
    if (category && item.category !== category) return;
    if (!industries[item.industry]) industries[item.industry] = { usageHours: 0, efficiencyScore: 0 };
    industries[item.industry].usageHours += item.usageHours;
    industries[item.industry].efficiencyScore = Math.max(industries[item.industry].efficiencyScore, item.efficiencyScore);
  });
  return Object.entries(industries).map(([name, data]) => ({ name, ...data }));
};
