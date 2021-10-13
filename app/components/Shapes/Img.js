/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef} from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';
const Img = ({ shapeProps, isSelected, onSelect, onChange, imageUrl }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [image] = useImage(imageUrl);
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <React.Fragment>
      <Image
        onClick={onSelect}
        image={image}
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
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
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
    </React.Fragment>
  );
};
export default Img;
