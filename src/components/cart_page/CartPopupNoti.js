import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { purCloseAddToCartModal } from '../../actions';
import { imgURL } from '../../data.json';

class CartPopup extends Component {
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

    this.state = { data: dataTag };
  }

  renderAddedItem() {
    if (this.props.newItems) {
      return (
        <div className="row my-2">
          <div className="col-sm-5">
            <img
              src={this.state.data[this.props.newItems[0]].imgURL}
              className="img-fluid"
              alt={this.state.data[this.props.newItems[0]].name.toLowerCase().replace(" ", "-")}
            />
          </div>
          <div className="col-sm-7">
            <h5 className="mt-2">{this.state.data[this.props.newItems[0]].name}</h5>
            <p className="mt-0 pt-0">Size {this.props.newItems[2]}</p>
            <div className="d-flex justify-content-between">
              <p className="cart-modal-price">{+this.state.data[this.props.newItems[0]].price * +this.props.newItems[1]}$</p>
              <p className="cart-modal-qty">Qty: {this.props.newItems[1]}</p>
            </div>
          </div>
        </div>
      )
    }
  }

  renderModal() {
    return (
      <div className="container-fluid mx-2 mt-3">
        <div className="d-flex justify-content-between cart-modal-header">
          <h6 className="open-sans text-success">
            <i className="fas fa-check-circle mr-2" />
            1 item(s) has been added to your cart
          </h6>
          <button
            onClick={() => this.props.purCloseAddToCartModal()}
            className="cart-modal-close-btn"
          >
            <i className="fas fa-times mr-2"></i>
          </button>
        </div>
        <div className="row">
          <div className="col-sm-7 cart-modal-item-detail">
            {this.renderAddedItem()}
          </div>
          <div className="col-sm-5">
            My shopping Cart
            + Go to cart
            + Check out
          </div>
        </div>
        <div className="row cart-modal-recommendation-items">
          <h4>Recommendation Items</h4>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.props.isSuccessfullyAdded}
          ariaHideApp={false}
          className="cart-modal-notification"
          overlayClassName="cart-modal-notification-overlay"
        >
          {this.renderModal()}
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = ({ UserReducers }) => {
  return {
    isSuccessfullyAdded: UserReducers.isSuccessfullyAdded,
    newItems: UserReducers.newItems,
  }
}

export default connect(mapStateToProps, {
  purCloseAddToCartModal
})(CartPopup);

//TODO: On small screen cart pop up is hiden
