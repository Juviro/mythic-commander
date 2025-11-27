import React, { ReactNode } from 'react';

import classNames from 'classnames';
import styles from './GuideModal.module.css';

interface Props {
  items: { label: string; value: string }[];
  title?: string;
  smallLabels?: boolean;
  description?: ReactNode;
}

const GuideDataTable = ({ items, title, description, smallLabels }: Props) => {
  return (
    <>
      {title && <h2 className={styles.guide_title}>{title}</h2>}
      {description && (
        <div className={styles.shortcuts_table_description}>{description}</div>
      )}
      <table className={styles.shortcuts_table}>
        <tbody>
          {items.map(({ label, value }) => (
            <tr key={value} className={styles.shortcuts_row}>
              <td
                className={classNames(styles.shortcuts_label, {
                  [styles.shortcuts_label_small]: smallLabels,
                })}
              >
                {label}
              </td>
              <td className={styles.shortcuts_value}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GuideDataTable;
