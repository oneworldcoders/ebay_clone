import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


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

const HelloWorld = (props) => {
  const things = useSelector(state => state.things)
  const thingsList = things.map((thing) => {
    return <li>{thing.name} {thing.guid}</li>
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
