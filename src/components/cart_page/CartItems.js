import React, { Component } from 'react';
import { connect } from 'react-redux';
import { imgURL } from '../../data.json';
import {
  purRemoveFromCart,
  purUpdateCart
} from '../../actions';
import CartCheckout from './CartCheckout.js';

class CartItems extends Component {
  constructor(props) {
    super(props);

    // Set up item by tag name
    const dataTag = {};

    for (let key in imgURL.products) {
      for (let keyInside in imgURL.products[key]) {
        for (let keyInsideTag in imgURL.products[key][keyInside]) {
          const productsTag = imgURL.products[key][keyInside][keyInsideTag].tag;
          dataTag[productsTag] = imgURL.products[key][keyInside][keyInsideTag];
        }
      }
    }

    this.state = {
      data: dataTag,
      showCheckout: false
    };
  }

  handleClickRemove(refID) {
    this.props.purRemoveFromCart(refID);
  }

  handleClickIncDec(e, item) {
    const newVal = item.slice();

    switch (e.target.classList[1]) {
      case "fa-minus":
        if (newVal[1] === 1) {
          return;
        }

        newVal[1] -= 1;
        break;
      case "fa-plus":
        newVal[1] += 1;
        break;
      default:
        return;
    }

    this.props.purUpdateCart(newVal);
  }

  handleClickCheckout() {
    // Hanle if items in cart to check out
    // if (this.props.inCart.length === 0) {
    //   return;
    // }

    this.setState({ showCheckout: true });

    const $containerItems = document.querySelector(".cart-item-summary");
    const $containerCheckout = document.querySelector(".cart-item-checkout");

    $containerItems.classList.add("bounceOutLeft");
    setTimeout(() => {
      $containerItems.classList.add("d-none");
      $containerCheckout.classList.remove("d-none");
      document.querySelector("#checkoutBtn").innerHTML = "PLACE ORDER";
    }, 500)
  }

  handleClickBackToOrder() {
    this.setState({ showCheckout: false });
    const $containerItems = document.querySelector(".cart-item-summary")
    const $containerCheckout = document.querySelector(".cart-item-checkout")

    $containerItems.classList.remove("d-none");
    $containerItems.classList.remove("bounceOutLeft");
    $containerItems.classList.add("bounceInLeft");
    $containerCheckout.classList.add("d-none");
    document.querySelector("#checkoutBtn").innerHTML = "PROCEED TO CHECK OUT";
  }

  renderItemsInCart() {
    const { data } = this.state;

    if (this.props.inCart.length > 0) {
      return this.props.inCart.map((item, i) => {
        return (
          <div key={i} className="row cart-item-detail">
            <div className="col-sm-4 text-center">
              <img
                src={data[item[0]].imgURL}
                className="img-fluid my-2"
                alt={data[item[0]].name.toLowerCase().replace(" ", "-")}
              />
            </div>
            <div className="col-sm-8 d-flex flex-column align-items-start">
              <div className="mb-auto">
                <h5 className="mt-2">{data[item[0]].name}</h5>
                <p className="">Size {item[2]}</p>
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <p className="cart-modal-price">{+data[item[0]].price * +item[1]}$</p>
                  <div className="">
                    <div className="text-right">
                      <i
                        className="fas fa-trash-alt mr-4"
                        onClick={() => this.handleClickRemove(item[3])}
                      />
                      <i
                        className="fas fa-minus"
                        onClick={(e) => this.handleClickIncDec(e, item)}
                      />
                      <input
                        className="border-0 text-center cart-item-qty"
                        value={item[1]}
                        disabled
                      />
                      <i
                        className="fas fa-plus"
                        onClick={(e) => this.handleClickIncDec(e, item)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    } else {
      return (
        <div className="cart-item-detail p-4">
          <h5>No item(s) in cart</h5>
        </div>
      )
    }
  }

  renderBackToOrder() {
    if (this.state.showCheckout) {
      return (
        <button
          className="btn btn-block btn-outline-secondary animated fadeInUp"
          onClick={() => this.handleClickBackToOrder()}
        >
          BACK TO ORDER
        </button>
      );
    }
  }

  renderTotal() {
    let numberOfItems = 0;
    let totalMoney = 0;

    if (this.props.inCart.length > 0) {
      numberOfItems = this.props.inCart.length;
      totalMoney = this.props.inCart.map((item) => item[1] * this.state.data[item[0]].price).reduce((acc, cur) => acc + cur);
    }

    return (
      <div className="cart-item-detail pb-3 px-3 pt-2">
        <h4>Order Summary</h4>
        <div className="d-flex justify-content-between">
          <p>Subtotal ({numberOfItems} items)</p>
          <p>{totalMoney} SGD</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Shipping fee</p>
          <p>{numberOfItems > 0 ? 30 : 0} SGD</p>
        </div>
        <div className="d-flex justify-content-between border-top mt-2 mb-1 pt-1">
          <p className="h5">Total</p>
          <p className="cart-item-total-money">{totalMoney + (numberOfItems > 0 ? 30 : 0)} SGD</p>
        </div>
        <button
          id="checkoutBtn"
          className="btn btn-block btn-secondary"
          onClick={() => this.handleClickCheckout()}
        >
          PROCEED TO CHECK OUT
        </button>
        {this.renderBackToOrder()}
      </div>
    );
  }

  render() {
    return (
      <div className="cart-item-container mt-3">
        <div className="row">
          <div className="col-sm-8 cart-item-summary animated">
            {this.renderItemsInCart()}
          </div>
          <div className="col-sm-4 animated">
            {this.renderTotal()}
          </div>
          <div className="col-sm-8 d-none cart-item-checkout animated">
            <CartCheckout />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ UserReducers }) => {
  // Store items in a list
  const inCart = Object.values(UserReducers.inCart);

  return { inCart };
}

export default connect(mapStateToProps, {
  purRemoveFromCart,
  purUpdateCart
})(CartItems);

//TODO: Show all of same categories shooes
//TODO: One button to scoll to check out on small screen
//TODO: Need pano image on cart check out
//TODO: Block access to /cart if not login
