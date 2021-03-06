import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts } from '../../actions';
import {
  FILTER_ACCESSORIES,
  FILTER_SHOES,
  FILTER_SHOES_SELECTIONS,
  FILTER_ACCESSORIES_SELECTIONS,
  FILTER_SNEAKER,
  FILTER_BOOTS,
  FILTER_CHELSEA_BOOTS
} from '../../constants'

class ProductsFilter extends Component {
  constructor(props) {
    super(props);

    // Prepare filter content and prepare previous selected filter
    let type;
    let typeArr = [];
    let prevSelection;
    let selectionArr = [];

    if (this.props.path.slice(1) === "shoes") {
      type = FILTER_SHOES;
      typeArr = Object.values(FILTER_SHOES_SELECTIONS);
      selectionArr = [
        "all",
        ...typeArr,
        FILTER_SNEAKER,
        FILTER_BOOTS,
        FILTER_CHELSEA_BOOTS
      ];

      prevSelection = selectionArr.indexOf(this.props.shoesFilterType);
    } else {
      type = FILTER_ACCESSORIES;
      typeArr = Object.values(FILTER_ACCESSORIES_SELECTIONS);
      selectionArr = [
        "all",
        ...typeArr
      ];

      prevSelection = selectionArr.indexOf(this.props.accessoriesFilterType);
    }
    typeArr.unshift("all");

    this.state = {
      filterSelected: prevSelection, // All
      filterType: type,
      filterTypeArr: typeArr
    };
  }

  componentWillReceiveProps(newProps) {
    // Check if filter type has been changed during shorcut link
    let newFilterIndex = this.state.filterSelected;

    if (newProps.shoesFilterType !== this.props.shoesFilterType) {
      this.props.filterContent.forEach((item, i) => {
        if (newProps.shoesFilterType.toLowerCase() === "drmartens") {
          newFilterIndex = 4;
        } else if (item.toLowerCase() === newProps.shoesFilterType.toLowerCase()) {
          newFilterIndex = i
        }
      })
    } else if (newProps.accessoriesFilterType !== this.props.accessoriesFilterType) {
      this.props.filterContent.forEach((item, i) => {
        if (item.toLowerCase() === newProps.accessoriesFilterType.toLowerCase()) {
          newFilterIndex = i
        }
      })
    }
    
    this.setState({ filterSelected: newFilterIndex })
  }

  handleClick(filterSelected) {
    if (filterSelected !== this.state.filterSelected) {
      this.setState({ filterSelected });
      let selectedFilter;

      switch (this.props.filterContent[filterSelected].toLowerCase()) {
        case FILTER_BOOTS:
        case FILTER_CHELSEA_BOOTS:
        case FILTER_SNEAKER:
          selectedFilter = this.props.filterContent[filterSelected].toLowerCase();
          break;
        default:
          selectedFilter = this.state.filterTypeArr[filterSelected];
      }

      this.props.filterProducts({
        type: this.state.filterType,
        selectedFilter
      });
    }
  }

  renderFilterBubbles(dataArr) {
    return (
      dataArr.map((d, i) => {
        let selectedClass;
        if (this.state.filterSelected === i) {
          selectedClass = "products-filter-selected";
        }

        return (
          <li key={i} className="mx-1 d-inline-block">
            <button
              className={"products-filter-bubbles " + selectedClass}
              onClick={() => this.handleClick(i)}
            >
              {d.toUpperCase()}
            </button>
          </li>
        );
      })
    );
  }

  render() {
    // Check if page need a filter
    if (this.props.filterContent.length === 0) {
      return <div />;
    }

    return (
      <div className="mt-5">
        <p className="open-sans text-center pb-3 italic px-3 w-75 mx-auto">{this.props.headerSentence}</p>
        <div className="products-filter-container">
          <div className="container pt-3 pb-2">
            <div className="row">
              <ul className="products-filter-list d-inline text-center">
                {this.renderFilterBubbles(this.props.filterContent)}
              </ul>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ FilterReducers }) => {
  return {
    shoesFilterType: FilterReducers.shoesFilterType,
    accessoriesFilterType: FilterReducers.accessoriesFilterType
  }
}

export default connect(mapStateToProps, { filterProducts })(ProductsFilter);
