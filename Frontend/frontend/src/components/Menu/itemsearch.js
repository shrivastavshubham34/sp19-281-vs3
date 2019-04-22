import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
// import {userlogin} from './../api/Api';
import Card from './card';
import 'tachyons';
import './../../stylesheets/card.css';

class ItemSearch extends Component {
  constructor() {
    super();
    this.state={
      currentPage: 1,
      itemsPerPage: 5
    }
    this.value=Math.random()*100;
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage : Number(event.target.id)
    });
    window.scrollTo(0, 0);
  }
  render() {
    console.log("No of items: ", this.props.MenuDetails);
    const { currentPage, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = this.props.MenuDetails.slice(indexOfFirstItem, indexOfLastItem);
    const TOTAL_COUNT=this.props.MenuDetails.length;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.MenuDetails.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });
    return (
    		  <div className="card-header">
              <div className="tile-container">
                 {
                  currentItem.map((items) => {
                      return(<Card items={items}/> );
                    })
                 }
              </div>
                    <ul id="page-numbers" className="pagination-style">
                      {renderPageNumbers}
                    </ul>
                    <button type="button" onClick={() =>this.props.history.push('/menu')} className="btn btn-class">Menu</button>
                    <button type="button" onClick={() =>this.props.history.push('/cart')} className="btn btn-class">Checkout</button>
              </div>
        );
	  }
	}
function mapStateToProps(state) {
    console.log("State",state);
      return {
         MenuDetails: state.MenuReducer.MenuDetails
      };
  }
export default connect(mapStateToProps, null)(ItemSearch);