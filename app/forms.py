from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired
from wtforms import PasswordField

class LogInForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired()])
    password = StringField('Password', validators=[DataRequired()])


class SignUpForm(FlaskForm):
    firstname = StringField('Firstname', validators=[DataRequired()])
    surname = StringField('Surname', validators=[DataRequired()])
    password = StringField('Password', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    telephone = FloatField('Telephone', validators=[DataRequired()])
    