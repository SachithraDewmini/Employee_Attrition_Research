
from flask import jsonify

from services.analysis_service import (
    department_summary,
    monthly_resignations,
    resignation_reasons,
)


def departments():
    return jsonify(department_summary())


def monthly():
    return jsonify(monthly_resignations())


def reasons():
    return jsonify(resignation_reasons())
