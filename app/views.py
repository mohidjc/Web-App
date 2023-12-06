from app import app
from flask import render_template, redirect, url_for, request, flash, session
from app.models import  User, Item, Order, OrderItem
from app.forms import  LogInForm, SignUpForm
from sqlalchemy import func
from app import db
from flask_login import login_user, login_required, current_user, logout_user



@app.route('/')
def index():
    cart=session.get('cart',{})
    db.create_all()
    if current_user.is_authenticated:
        orders = Order.query.filter_by(user_id=current_user.id).all()
    else:
        orders = []
    form = LogInForm()
    form1 = SignUpForm()
    # items_data = [
    # {
    #     'name': 'Item 1',
    #     'description': 'Description for Item 1',
    #     'price': 19.99,
    #     'image_url': 'https://example.com/item1.jpg',
    #     'stock': 20
    # },
    # {
    #     'name': 'Item 2',
    #     'description': 'Description for Item 2',
    #     'price': 29.99,
    #     'image_url': 'https://example.com/item2.jpg',
    #     'stock': 15
    # },
    #     # Add more items as needed
    # ]

    # for item_data in items_data:
    #     new_item = Item(**item_data)
    #     db.session.add(new_item)

    # db.session.commit()
    return render_template('home.html', form=form, form1=form1, cart=cart, orders=orders)


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    # Create database table
    with app.app_context():
        db.create_all()
    form = LogInForm()
    form1 = SignUpForm()
    # Gets the 'name' value from the submitted form
    # email = request.form.get('email')
    # Checks if there already exists an income with this name
    # existing_user = User.query.filter_by(email=email).first()
    # if existing_user:
    #     flash('Expense with the same name already exists', 'error')
    #     return redirect(url_for('index'))

    if form.validate_on_submit():
        # Form data is valid, can save it to the database
        new_user = User(
        firstname=form1.firstname.data,
        surname=form1.surname.data,
        password=form1.password.data,
        telephone=form1.telephone.data,
        email=form1.email.data
        )
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('index'))
    return redirect(url_for('index'))



    
@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LogInForm()
    form1 = SignUpForm()
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        user = User.query.filter_by(email=email).first()
        if user and user.password == password:
            login_user(user)
            flash('Login successful', 'success')
            return redirect(url_for('index')) 
        flash('Invalid email or password', 'danger')
    return redirect(url_for('index'))


@app.route('/logout')
@login_required
def logout():
    logout_user()
    session.clear()
    flash('Logout successful', 'success')
    return redirect(url_for('index'))

@app.route('/items', methods=['GET'])
def items():
    cart=session.get('cart',{})
    items = Item.query.all()
    if current_user.is_authenticated:
        orders = Order.query.filter_by(user_id=current_user.id).all()
    else:
        orders = []
    form = LogInForm() 
    form1 = SignUpForm()
    return render_template('items.html', form=form,form1=form1,items=items, cart=cart, orders=orders)



@app.route('/cart', methods=['GET'])
def cart():
    cart=session.get('cart',{})
    form = LogInForm() 
    form1 = SignUpForm()
    item_instance=Item.query.all()
    if current_user.is_authenticated:
        orders = Order.query.filter_by(user_id=current_user.id).all()
    else:
        orders = []
    items={str(item.id): item for item in item_instance}
    subtotal = 0
    for item_id, quantity in cart.items():
        item = items.get(item_id)
        if item:
            item_total = quantity * item.price
            subtotal += item_total
    rounded_subtotal = round(subtotal, 2)
    return render_template('cart.html', form=form,form1=form1, cart=cart, items=items, subtotal=rounded_subtotal, orders=orders)


@app.route('/add_to_cart/<int:item_id>', methods=['POST'])
def add_to_cart(item_id):
    cart = session.get('cart', {})
    cart[str(item_id)] = cart.get(str(item_id), 0) + 1
    session['cart'] = cart
    return redirect(url_for('items'))


@app.route('/delete_from_cart/<int:item_id>', methods=['POST'])
def delete_from_cart(item_id):
    cart = session.get('cart', {})
    
    if str(item_id) in cart:
        if cart[str(item_id)] > 1:
            cart[str(item_id)] -= 1
        else:
            cart.pop(str(item_id))
    
    session['cart'] = cart
    return redirect(url_for('cart'))



@app.route('/checkout', methods=['POST'])
@login_required
def checkout():
    cart = session.get('cart', {})
    user_id = current_user.id
    total_price = 0
    item_instance=Item.query.all()
    items={str(item.id): item for item in item_instance}
    for item_id, quantity in cart.items():
        item = items.get(item_id)
        if item:
            item_total = quantity * item.price
            total_price += item_total
    rounded_tp = round(total_price, 2)
    new_order = Order(user_id=user_id, total_price=rounded_tp)
    db.session.add(new_order)
    db.session.commit()

    for item_id, quantity in cart.items():
        item = Item.query.get(item_id)
        if item:
            item.stock -= quantity
            order_item = OrderItem(order_id=new_order.id, item_id=item_id, quantity=quantity)
            db.session.add(order_item)
    db.session.commit()
    session['cart'] = {}
    flash('Purchase successful', 'success')
    return redirect(url_for('cart'))