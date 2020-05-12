import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const GET_THINGS_REQUEST = 'GET_THINGS_REQUEST';
const GET_THINGS_SUCCESS = 'GET_THINGS_SUCCESS';

function getThings() {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.get('token')}`
  }
  console.log(headers);
  
  return dispatch => {
    dispatch({ type: GET_THINGS_REQUEST })
    return fetch('v1/things.json', {headers})
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

const HelloWorld = (props) => {
  const things = useSelector(state => state.thingsReducer.things)
  const thingsList = things.map((thing) => {
    return <li key={thing.name}>{thing.name} {thing.guid}</li>
  });

  const dispatch = useDispatch()

  return (
    <React.Fragment>
      Greeting : {props.greeting}
      <button className='getThingsBtn' onClick={() => dispatch(getThings())}>getThings</button>
      <ul>{thingsList}</ul>
    </React.Fragment>
  )
}

export default HelloWorld;
