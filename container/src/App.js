import React from 'react';
import { mount } from 'marketing/MarketingApp'; //this is the name of the remote app that we are importing. This is the name that we specified in the webpack config for marketing app. Eg: exposes: { './MarketingApp': './src/bootstrap',
import MarketingApp from './components/MarketingApp';

console.log('mount', mount);

const App = () => {
  
  return (
    <div>
      <h1>Hello, Container!</h1>
      <hr />
      <MarketingApp />
    </div>
  );
};

export default App;
