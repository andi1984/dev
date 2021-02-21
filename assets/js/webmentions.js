import { h, options, render, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';

function Webmention({ mention }) {
  //1. Find out the "type" of webmention from Brid.gy service cf. https://github.com/snarfed/bridgy/blob/f86503113e6d6a33552edc121b65c56b864353d8/blog_webmention.py#L203)
  if (mention['in-reply-to']) {
    // Comment
    return (
      <a href={mention.url} target="_blank">
        {mention.author.name} commented: "{mention.content.text}"
      </a>
    );
  }

  if (mention['like-of']) {
    // Like
    return (
      <a href={mention.author.url} target="_blank">
        {mention.author.name} liked this!
      </a>
    );
  }

  // Repost case
  return (
    <a href={mention.url} target="_blank">
      {mention.author.name} reposted this!
    </a>
  );
}

export default function () {
  function WebmentionsList() {
    const [mentions, setMentions] = useState([]);

    useEffect(() => {
      //1. Fetch the webmentions.io API endpoint
      fetch(
        `https://webmention.io/api/mentions.jf2?target=${window.location.href}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.children) {
            setMentions([...mentions, ...data.children]);
          }
        });
    }, []);

    //2. Returned a rendered list if there are any mentions
    if (!mentions.length) {
      return null;
    }

    return (
      <>
        <h2>Webmentions</h2>
        <ol>
          {mentions.map((mention) => (
            <li>
              <Webmention mention={mention} />
            </li>
          ))}
        </ol>
      </>
    );
  }

  const targetDOMElement = document.getElementById('webmentions');
  if (!!targetDOMElement) {
    const App = <WebmentionsList />;
    render(App, targetDOMElement);
  }
}
