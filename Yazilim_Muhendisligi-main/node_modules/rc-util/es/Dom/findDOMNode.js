import _typeof from "@babel/runtime/helpers/esm/typeof";
import React from 'react';
import ReactDOM from 'react-dom';
export function isDOM(node) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element
  // Since XULElement is also subclass of Element, we only need HTMLElement and SVGElement
  return node instanceof HTMLElement || node instanceof SVGElement;
}

/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
export default function findDOMNode(node) {
  if (node && _typeof(node) === 'object' && isDOM(node.nativeElement)) {
    return node.nativeElement;
  }
  if (isDOM(node)) {
    return node;
  }
  if (node instanceof React.Component) {
    return ReactDOM.findDOMNode(node);
  }
  return null;
}