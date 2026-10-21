
from pathlib import Path
import pandas as pd

DATA_FILE = (
    Path(__file__).resolve().parents[2]
    / "data"
    / "raw"
    / "Southern_Province_Apparel_Attrition_Dataset.csv"
)

def load_employee_data():
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"Dataset not found: {DATA_FILE}")

    return pd.read_csv(DATA_FILE)



def get_department_summary():
    """Count recorded resignation records by department."""
    df = load_employee_data()

    if "Department" not in df.columns:
        raise ValueError("Missing required column: Department")

    result = (
        df["Department"]
        .fillna("Unknown")
        .value_counts()
        .rename_axis("Department")
        .reset_index(name="Resignations")
        .sort_values("Resignations", ascending=False)
    )

    return result.to_dict(orient="records")


def get_resignation_reasons():
    """Count records by recorded resignation reason."""
    df = load_employee_data()

    if "Resignation_Reason" not in df.columns:
        raise ValueError(
            "Missing required column: Resignation_Reason"
        )

    result = (
        df["Resignation_Reason"]
        .fillna("Unknown")
        .value_counts()
        .rename_axis("Reason")
        .reset_index(name="Count")
    )

    return result.to_dict(orient="records")


def get_monthly_resignations():
    """Count recorded resignations by calendar month."""
    df = load_employee_data()

    if "Date_of_Resigned" not in df.columns:
        raise ValueError(
            "Missing required column: Date_of_Resigned"
        )

    dates = pd.to_datetime(
        df["Date_of_Resigned"], errors="coerce"
    )

    monthly = (
        dates.dropna()
        .dt.to_period("M")
        .value_counts()
        .sort_index()
    )

    return [
        {"Month": str(month), "Resignations": int(count)}
        for month, count in monthly.items()
    ]
