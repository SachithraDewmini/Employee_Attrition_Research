
export interface DepartmentSummary {
  Department: string;
  Resignations: number;
}

const API_URL = 'http://127.0.0.1:5000';

export async function getDepartmentSummary(): Promise<DepartmentSummary[]> {
  const response = await fetch(
    `${API_URL}/api/department-summary`
  );

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: DepartmentSummary[] = await response.json();

  return data.sort(
    (a, b) => b.Resignations - a.Resignations
  );
}
