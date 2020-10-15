import { get } from 'lodash';
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

    const approxDownlink = get(window, 'navigator.connection.downlink', 0);

    return approxDownlink < 1.5 ? (
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
    ) : !!quote ? (
      <Quote quote={quote} />
    ) : null;
  }

  const App = <ProgrammingQuotes />;
  render(App, document.getElementById('quote'));
}
