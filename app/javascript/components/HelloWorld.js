import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';


const GET_THINGS_REQUEST = 'GET_THINGS_REQUEST';
const GET_THINGS_SUCCESS = 'GET_THINGS_SUCCESS';

function getThings() {
  console.log('Get things Action');
  return dispatch => {
    dispatch({ type: GET_THINGS_REQUEST })
    return fetch('v1/things.json')
      .then(response => response.json())
      .then(json => {dispatch(getThingsSuccess(json))})
      .catch(error => console.log(error))
  }
};

export function getThingsSuccess(json) {
  return {
    type: GET_THINGS_SUCCESS,
    json
  }
}


class HelloWorld extends React.Component {
  render () {
    const { things } = this.props;
    const thingsList = things.map((thing) => {
      return <li>{thing.name} {thing.guid}</li>
    });
    return (
      <React.Fragment>
        Greeting : {this.props.greeting}
        <button className='getThingsBtn' onClick={() => this.props.getThings()}>getThings</button>
        <ul>{thingsList}</ul>
      </React.Fragment>
    )
  }
}

const structuredSelector = createStructuredSelector({
  things: state => state.things,
});

const mapDispatchToProps = { getThings };

export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);
