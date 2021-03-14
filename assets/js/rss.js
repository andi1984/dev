import { h, options, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function RSSList(props) {
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    fetch(`${process.env.rssAPIEndpoint}/api?l=5`)
      .then((res) => res.json())
      .then(setFeed);
  }, []);

  if (feed.length === 0) {
    return null;
  }

  return (
    <ol className="list list--small">
      {feed.map((item) => (
        <li key={item.id}>
          <a target="_blank" href={item.url}>
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default () => {
  const targetDOMElement = document.getElementById('rss');
  if (!!targetDOMElement) {
    const App = (
      <section>
        <h2 style={{ fontSize: '1.2rem' }}>Newest Newsfeed</h2>
        <RSSList />
      </section>
    );
    render(App, targetDOMElement);
  }
};
