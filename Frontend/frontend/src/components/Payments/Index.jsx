import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import uniqid from "uniqid";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderCount: 0,
      orderPrice: 0
    };
  }

  componentDidMount() {
    let PAYMENT_HOST_ELB =
      "payments-elb-1248343795.us-west-2.elb.amazonaws.com";

    let username = "sojan";

    axios
      .get(`http://${PAYMENT_HOST_ELB}/wallet/${username}`)
      .then(response => {
        console.log("Status Code GET Wallet:", response);
        this.setState({ wallet: response.data[0].amount });
        console.log(this.state.wallet);
      })
      .catch(err => {
        console.log(err);
      });

    console.log("component did mount ", this.state);
    var photos = [];
    const data = {
      orderid: this.props.orderid
    };

    console.log("DATA", data);
  }

  pay() {
    let PAYMENT_HOST_ELB = "127.0.0.1";

    let PORT = 3000;
    let data = {
      username: "sojan",
      amount: this.state.cart_total
    };
    axios
      .put(`http://${PAYMENT_HOST_ELB}:${PORT}/wallet/pay`, data)
      .then(response => {
        console.log("Status Code POST Wallet:", response.status);
        console.log("response from POST Wallet:", response);
        this.setState({
          wallet: response.data.amount
        });
      });
    console.log("cart", this.state.cart);
    data = {
      username: sessionStorage.getItem("username"),
      items: this.state.cart,
      cart_total: this.state.cart_total
    };
  }

  render() {
    return (
      <div>
        {/* <div>
          <span style={{ fontSize: 25, fontWeight: 500 }}>
            My Card:{" "}
            <span style={{ fontWeight: 700 }}>${this.state.wallet}</span>
          </span>
          <span style={{ margin: 20 }}>
            <button onClick={this.pay} className="btn btn-primary">
              Pay from Card
            </button>
          </span>
        </div> */}
        <div
          className="row justify-content-center"
          style={{ marginTop: "10%" }}
        >
          <div className="col-md-6" style={{ border: "1px solid grey" }}>
            <p>Customer Name : {this.state.name}</p>
            <p>Order Count : {this.state.orderCount}</p>
            {/* {orderPrice != null ? ( */}
            <p>Order Price : {this.state.orderPrice}</p>) : ( "" )}
            <button
              type="button"
              onClick={this.getBill}
              className="btn btn-primary float-left mb-1"
            >
              Create Payment
            </button>
            <button
              type="button"
              onClick={this.getOrderDetails}
              className="btn btn-primary float-right mb-1"
            >
              Order Details
            </button>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div
            className="col-md-6"
            style={{
              border: "1px solid grey"
              //     display: isBillGenerated ? "" : "none"
            }}
          >
            <form>
              <div className="form-group">
                <label htmlFor="cardnumber">Card No</label>
                <input
                  type="text"
                  className="form-control"
                  id="cardnumber"
                  name="cardnumber"
                  placeholder="Enter Card Number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  onChange={this.amountHandler}
                  className="form-control"
                  id="amount"
                  name="amount"
                  placeholder="Enter Amount"
                  value={this.state.amount}
                />
              </div>

              <div className="form-group">
                <label htmlFor="expirydate">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="expirydate"
                  name="expirydate"
                  placeholder="MM/YY"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  placeholder="CVV"
                />
              </div>

              <button
                type="button"
                onClick={this.onSubmitHandler}
                className="btn btn-primary float-center mb-2"
              >
                Submit
              </button>
            </form>
          </div>
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
)(Payment);
