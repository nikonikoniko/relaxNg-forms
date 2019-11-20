import {
  values,
  curry,
  map,
  filter,
  has,
} from 'lodash/fp';

export const walkDOMUp = curry((transformFunc, node) => {
  if (!node) return '';
  if (!node.parentNode) return '';
  const p = walkDOMUp(transformFunc, node.parentNode);
  return transformFunc(node, p);
});

export const walkDOMDown = curry((transformFunc, node) => {
  const filterchildren = filter(has('tagName'));
  const children =
    node.hasChildNodes ?
      map(
        walkDOMDown(transformFunc),
        filterchildren(values(node.childNodes))
      ) : null;
  return transformFunc(node, children);
});

export default {
  walkDOMUp,
  walkDOMDown,
};
