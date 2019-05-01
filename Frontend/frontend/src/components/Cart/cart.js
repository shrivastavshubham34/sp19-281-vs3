import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import uniqid from "uniqid";
import "./Cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderCount: 10,
      totalAmount: 0
    };
  }

  updateCart = e => {
    console.log("Update Cart");
    console.log(this.state.cart);
  };

  deleteItem = index => {
    console.log(index);
  };

  decrement = index => {
    console.log(index);
    let UpdatedCart = this.state.cart;
    if (UpdatedCart.drinks[index].drink_quantity > 0) {
      let newtotalAmt = 0;

      UpdatedCart.drinks[index].drink_quantity--;

      UpdatedCart.drinks.map(drink => {
        newtotalAmt += drink.drink_rate * drink.drink_quantity;
      });

      UpdatedCart.totalamount = newtotalAmt;

      this.setState({
        cart: UpdatedCart,
        totalAmount: newtotalAmt
      });
    }
  };

  increment = index => {
    console.log(index);
    let UpdatedCart = this.state.cart;
    let newtotalAmt = 0;
    UpdatedCart.drinks[index].drink_quantity++;
    UpdatedCart.drinks.map(drink => {
      newtotalAmt += drink.drink_rate * drink.drink_quantity;
    });

    UpdatedCart.totalamount = newtotalAmt;

    this.setState({
      cart: UpdatedCart,
      totalAmount: newtotalAmt
    });
  };

  componentDidMount() {
    let CART_ELB = "cart-elb-662553320.us-east-1.elb.amazonaws.com";
    let username = "sojan";

    axios
      .get(`http://${CART_ELB}/cart/${username}`)
      .then(response => {
        console.log("Status Code :", response);

        this.setState({
          cart: response.data,
          totalAmount: response.data.totalamount
        });
        console.log(this.state.cart.drinks);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log("cart", this.state.cart);

    let details = null;

    if (this.state.cart != null && this.state.cart != undefined) {
      details = this.state.cart.drinks.map((drink, index) => {
        return (
          <div class="layout-inline row">
            <div class="col col-pro layout-inline">
              <img
                src="http://static.ddmcdn.com/gif/10-kitten-cuteness-1.jpg"
                alt="kitten"
              />
              <p>{drink.drink_name}</p>
            </div>

            <div class="col col-price col-numeric align-center ">
              <p>${drink.drink_rate}</p>
            </div>

            <div class="col col-qty layout-inline">
              <a onClick={() => this.decrement(index)} class="qty qty-minus">
                -
              </a>
              <input type="numeric" value={drink.drink_quantity} />
              <a onClick={() => this.increment(index)} class="qty qty-plus">
                +
              </a>
            </div>

            <div class="col col-total col-numeric">
              {" "}
              <p> ${drink.drink_rate * drink.drink_quantity}</p>
            </div>
            <div class="col col-vat col-numeric">
              <button
                type="button"
                onClick={() => this.deleteItem(index)}
                class="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        );
      });
    }

    return (
      <div class="container">
        <div class="heading">
          <h1>Shopping Cart</h1>
        </div>

        <div class="cart transition is-open">
          <div class="table">
            <div class="layout-inline row th">
              <div class="col col-pro">DRINK</div>
              <div class="col col-price align-center ">Price</div>
              <div class="col col-qty align-center">QTY</div>
              <div class="col">Total</div>
              <div class="col">Delete</div>
            </div>

            {details}

            <div class="tf">
              <div class="row layout-inline">
                <div class="col">
                  <p>Total</p>
                </div>
                <div class="col">
                  <p>${this.state.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <button onClick={this.updateCart} class="btn btn-update">
            Update cart
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(Cart);
