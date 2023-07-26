const Box = ({
  display,
  padding,
  width,
  gap,
  justifyContent,
  alignItems,
  paddingBottom,
  paddingTop,
  children,
  maxWidth,
  minWidth,
}) => {
  return (
    <div
      style={{
        display,
        padding,
        width,
        gap,
        justifyContent,
        alignItems,
        paddingBottom,
        paddingTop,
        maxWidth,
        minWidth,
      }}
    >
      {children}
    </div>
  );
};

export default Box;
