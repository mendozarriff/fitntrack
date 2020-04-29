import React, { Component } from 'react';
import { Container, Form} from 'react-bootstrap';

class SearchBar extends Component {

  state = {
    data : [],
    filtered: []
  }

  componentDidMount(){
    console.log(' Search bar this.props.data: ',this.props.data)
    console.log(' Search bar this.props.filtered_data: ',this.props.filtered_data)

    this.setState({
      data : this.props.data,
      filtered: this.props.filtered
    })
  }


  filterData = () => {

  }

  

  handleChange = (e) => {
    console.log(this.state.data)

    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.data;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
         // change current item to lowercase
        const lc = item.name.toLowerCase();
          // change search term to lowercase
        const filter = e.target.value.toLowerCase();
          // check to see if the current list item includes the search term
          // If it does, it will be added to newList. Using lowercase eliminates
          // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
            // If the search bar is empty, set newList to original task list
      newList = this.state.data;
    }
        // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered_data: newList
    });
  }

  
  render(){
    console.log(this.props.filtered)
    return (
      <Form>
       <Form.Group controlId="searchBar">
        <Form.Control type="text" placeholder="search exercise..." onChange={this.handleChange}  />
       </Form.Group>
      </Form>
    )
  }
}

export default SearchBar;