import React from 'react';
import styles from './table.module.sass';
import { Distance } from './table.types';

type LinkLineProps = {
  iconsDistance: Distance;
};

const LinkLine: React.FC<LinkLineProps> = React.memo(({ iconsDistance }) => {
  if (!iconsDistance) {
    return null;
  }

  return (
    <div
      style={{
        top: `${0}px`,
      }}
      className={styles.linkContainer}
    >
      <div
        style={{
          height: `${iconsDistance.deltaY}px`,
          bottom: `${iconsDistance.deltaY - 15}px`,
          right: `${21}px`,
        }}
        className={styles.line1}
      >
        <div
          style={{
            top: `${iconsDistance.deltaY}px`,
            left: `${0}px`,
          }}
          className={styles.line2}
        ></div>
      </div>
    </div>
  );
});

LinkLine.displayName = 'LinkLine';

export default LinkLine;
