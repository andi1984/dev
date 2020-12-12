---
date: 2020-12-12T12:18:31
title: Automatic Minimum Size of Flex Items
template: blogpost.twig
---

Today I would like to talk about flexbox and the automatic minimum size of flex items.

## Example

Let us start looking at some example code:

```html
<section>
  <div>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
    diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </div>
</section>
```

```css
section {
  display: flex;
  flex-direction: column;
}

div {
  flex: 0 1 50px;
}
```

What do you think? How much will the height be of the `div` flex child? It will be the minimum size the content will need to be rendered.

## Example + Overflow container

Let's adjust the example by making the flex-child element a scroll container:

```css
div {
  flex: 0 1 50px;
  overflow-y: scroll;
}
```

What will the height be now? It will be the flex-basis of 50px.

## Explanation

Having a look into the official specs can be helpful here:

> To provide a more reasonable default minimum size for flex items, the used value of a main axis automatic minimum size on a flex item that is not a scroll container is a content-based minimum size; for scroll containers the automatic minimum size is zero, as usual.
> -- <cite>[W3C spec](https://www.w3.org/TR/css-flexbox-1/#min-size-auto)</cite>
