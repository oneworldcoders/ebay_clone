import React from 'react';
import { shallow } from 'enzyme';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Item from '../../components/Item/item';


describe('Item with default props', () => {
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Item />)
  })

  it('displays a card element', () => {
    const card = wrapper.find(Card)
    expect(card.length).toEqual(1)
  });

  describe('card header', () => {
    let cardHeader;
    beforeEach(() => {
      cardHeader = wrapper.find(CardHeader)
    })
    it('displays a card header element', () => {
      expect(cardHeader.length).toEqual(1)
    });

    it('displays a default title with no props', () => {
      expect(cardHeader.props().title).toEqual('Title')
    });

    it('displays a default subheader with no props', () => {
      expect(cardHeader.props().subheader).toEqual('Sub-header')
    });
  })

  describe('card media', () => {
    it('displays a card media element', () => {
      const cardMedia = wrapper.find(CardMedia)
      expect(cardMedia.length).toEqual(1)
    });
  })

  describe('card content', () => {
    it('displays a card content element', () => {
      const cardContent = wrapper.find(CardContent)
      expect(cardContent.length).toEqual(1)
    });
  })
  
  describe('typography', () => {
    it('displays a typography element', () => {
      const typography = wrapper.find(Typography)
      expect(typography.length).toEqual(1)
    });
  })

  
});


describe('Item with props', () => {
  let wrapper;
  let cardHeader;
  const props = {
    title: 'Test title',
  }
  beforeEach(()=>{
    wrapper = shallow(<Item title={props.title}/>)
    cardHeader = wrapper.find(CardHeader)

  })

  describe('card header', () => {
    it('displays title passed', () => {
      expect(cardHeader.props().title).toEqual('Test title')
    });

    xit('displays subheader passed', () => {
      expect(cardHeader.props().subheader).toEqual('Test sub header')
    });
  })
});
