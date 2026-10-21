
export interface MonthlyRecord {
  YearMonth: string;
  Resignations: number;
}

const API_URL = 'http://127.0.0.1:5000';

export async function getMonthlyResignations(): Promise<MonthlyRecord[]> {
  const response = await fetch(
    `${API_URL}/api/monthly-resignations`
  );

  if (!response.ok) {
    throw new Error(`Monthly API request failed: ${response.status}`);
  }

  const rawData: unknown = await response.json();

  if (!Array.isArray(rawData)) {
    throw new Error('Monthly API did not return a list of records.');
  }

  return rawData.filter(
    (item): item is MonthlyRecord =>
      item !== null &&
      typeof item === 'object' &&
      typeof item.YearMonth === 'string' &&
      typeof item.Resignations === 'number'
  );
}
