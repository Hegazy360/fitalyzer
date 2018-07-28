import React, { Component } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

function getSuggestionValue(suggestion) {
  console.log(suggestion.data.id);
  return suggestion.value;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.value}</span>
  );
}

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
     this.setState({
       value: newValue
     });
   };

  onSuggestionsFetchRequested = ({value}) => {
    axios.get('https://wger.de/api/v2/exercise/search/?format=json&limit=350&language=2&term='+value, {}, {
      headers: {
        'Authorization': "Token ab84da10dcddca08fb0a6c0a392b9a27ee7f53df"
      }
    }).then(response => {
      this.setState({suggestions: response.data.suggestions});
    }).catch(error => console.log(error))
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange,
      name: this.props.name
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
    );
  }
}

export default Search
