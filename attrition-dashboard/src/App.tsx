
import { useEffect, useState } from 'react';
import DepartmentChart from './components/DepartmentChart';
import MonthlyTrendChart from './components/MonthlyTrendChart';

import {
  getDepartmentSummary,
  type DepartmentSummary,
} from './services/dashboardService';

import {
  getMonthlyResignations,
  type MonthlyRecord,
} from './services/monthlyTrendService';

import './App.css';

function App() {
  const [departments, setDepartments] = useState<DepartmentSummary[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [departmentResults, monthlyResults] = await Promise.all([
          getDepartmentSummary(),
          getMonthlyResignations(),
        ]);

        setDepartments(departmentResults);
        setMonthlyData(
        [...monthlyResults].sort((a, b) =>
        a.YearMonth.localeCompare(b.YearMonth)
        )
        );
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load dashboard data.'
        );
      } finally {
        setLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  const totalResignations = departments.reduce(
    (sum, item) => sum + item.Resignations,
    0
  );

  const highestDepartment = departments.reduce<DepartmentSummary | null>(
    (highest, item) =>
      !highest || item.Resignations > highest.Resignations
        ? item
        : highest,
    null
  );

  if (loading) {
    return (
      <main className="dashboard">
        <p>Loading dashboard data...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard">
        <h1>HR Retention Intelligence</h1>
        <p className="error-message">Could not load data: {error}</p>
        <p>Check that Flask is running at http://127.0.0.1:5000.</p>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">RESEARCH DASHBOARD</p>
          <h1>HR Retention Intelligence</h1>
          <p>Southern Province Apparel Industry</p>
        </div>
        <span className="status">API connected</span>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <p>Recorded Resignations</p>
          <h2>{totalResignations.toLocaleString()}</h2>
          <span>Records in department summary</span>
        </article>

        <article className="summary-card">
          <p>Departments</p>
          <h2>{departments.length}</h2>
          <span>Departments represented</span>
        </article>

        <article className="summary-card">
          <p>Highest Count</p>
          <h2>
            {highestDepartment?.Resignations.toLocaleString() ?? '—'}
          </h2>
          <span>
            {highestDepartment?.Department ?? 'No data available'}
          </span>
        </article>
      </section>

      <section className="panel">
        <h2>Resignations by Department</h2>
        <p className="panel-description">
          Counts of recorded resignation events by department.
        </p>

        {departments.length > 0 ? (
          <DepartmentChart data={departments} />
        ) : (
          <p>No department data is available.</p>
        )}
      </section>

      <section className="panel">
        <h2>Monthly Resignation Trend</h2>
        <p className="panel-description">
          Number of recorded resignations per month.
        </p>

        {monthlyData.length > 0 ? (
          <MonthlyTrendChart data={monthlyData} />
        ) : (
          <p>No monthly data is available.</p>
        )}
      </section>

      <footer>
        Academic research prototype · Descriptive analysis, not individual
        attrition predictions
      </footer>
    </main>
  );
}

export default App;
