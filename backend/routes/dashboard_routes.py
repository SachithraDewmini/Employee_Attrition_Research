
from flask import Blueprint

from controllers.dashboard_controller import (
    departments,
    monthly,
    reasons,
)

dashboard_bp = Blueprint("dashboard", __name__)


dashboard_bp.route(
    "/department-summary", methods=["GET"]
)(departments)

dashboard_bp.route(
    "/monthly-resignations", methods=["GET"]
)(monthly)

dashboard_bp.route(
    "/resignation-reasons", methods=["GET"]
)(reasons)
