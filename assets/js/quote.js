import { h, options, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

import quotes from '../data/quotes.json';

export default function () {
  function Quote({ quote }) {
    return (
      <blockquote className="blockquote--landing" cite={quote.author}>
        <q>{quote.text}</q>
      </blockquote>
    );
  }
  // Create your app
  function ProgrammingQuotes() {
    const quote = quotes.items[Math.floor(Math.random() * quotes.items.length)];

    return (
      <ReactPlaceholder
        className="blockquote--landing"
        type="text"
        rows={3}
        ready={!!quote}
        firstLaunchOnly={true}
        showLoadingAnimation={true}
      >
        <Quote quote={quote} />
      </ReactPlaceholder>
    );
  }

  const targetDOMElement = document.getElementById('quote');
  if (!!targetDOMElement) {
    const App = <ProgrammingQuotes />;
    render(App, targetDOMElement);
  }
}
