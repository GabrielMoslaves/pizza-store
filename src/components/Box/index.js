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
  textAlign,
  marginTop,
  fontSize,
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
        textAlign,
        marginTop,
        fontSize,
      }}
    >
      {children}
    </div>
  );
};

export default Box;
