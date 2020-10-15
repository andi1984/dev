import { h, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

import 'whatwg-fetch';

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
    const [quote, setQuote] = useState(null);
    useEffect(() => {
      // Trigger your effect
      window
        .fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
        .then((response) => response.json())
        .then(({ en: text, author }) => {
          setQuote({ text, author });
        });
      return () => {
        // Optional: Any cleanup code
      };
    }, []);

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

  const App = <ProgrammingQuotes />;
  render(App, document.getElementById('quote'));
}
