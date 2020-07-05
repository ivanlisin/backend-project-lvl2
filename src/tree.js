export const makeNode = (content, children) => ({
  content,
  children,
});

export const mapTree = ({ content, children }, callbackFn) => {
  const hasChildren = children.length !== 0;
  const updatedContent = callbackFn(content);
  return hasChildren
    ? {
      content: updatedContent,
      children: children.map((child) => mapTree(child, callbackFn)),
    }
    : { content: updatedContent, children: [] };
};

export const filterTree = ({ content, children }, callbackFn) => {
  if (!callbackFn(content)) {
    return null;
  }

  const hasChildren = children.length !== 0;
  return hasChildren
    ? {
      content,
      children: children
        .map((child) => filterTree(child, callbackFn))
        .filter((child) => child !== null),
    }
    : { content, children };
};

export const reduceTree = ({ content, children }, callbackFn, accumulator) => {
  const hasChildren = children.length !== 0;
  const updatedAccumulator = callbackFn(accumulator, content);
  return hasChildren
    ? children.reduce((acc, child) => reduceTree(child, callbackFn, acc), updatedAccumulator)
    : updatedAccumulator;
};

export const sumTreeBy = ({ content, children }, callbackFn) => {
  const hasChildren = children.length !== 0;
  const lowerLevelResults = hasChildren
    ? children.map((child) => sumTreeBy(child, callbackFn))
    : null;
  const result = callbackFn(content, lowerLevelResults);
  // console.debug(result);
  return result;
};
