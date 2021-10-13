/* eslint-disable prettier/prettier */
import React, { useRef, useEffect } from 'react';
import { RegularPolygon, Transformer } from 'react-konva';
const Triangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <>
      <RegularPolygon
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={e => {
          // transformer is changing scale
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
};
export default Triangle;
