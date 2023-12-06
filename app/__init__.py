from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import CSRFProtect
from flask_login import LoginManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///trial.db'
app.config['SECRET_KEY'] = '24'
db = SQLAlchemy(app)
csrf = CSRFProtect(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

from app import views  # Import views at the end to avoid circular import

from app.models import User  # Import User after db is defined

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
