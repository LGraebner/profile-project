import React from 'react';
import renderer from 'react-test-renderer';
 
import { ProfileView } from '../src/components/profileview/ProfileView';
//TODO Fix tests
describe('Profileview test', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<ProfileView counter={1} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});