
from models.employee_model import (
    get_department_summary,
    get_monthly_resignations,
    get_resignation_reasons,
)


def department_summary():
    return get_department_summary()


def monthly_resignations():
    return get_monthly_resignations()


def resignation_reasons():
    return get_resignation_reasons()
