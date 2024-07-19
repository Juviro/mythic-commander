import React from 'react';

import styles from './GuideModal.module.css';

interface Props {
  items: { label: string; value: string }[];
  title?: string;
}

const GuideDataTable = ({ items, title }: Props) => {
  return (
    <>
      {title && <h2 className={styles.shortcuts_table_title}>{title}</h2>}
      <table className={styles.shortcuts_table}>
        {items.map(({ label, value }) => (
          <tr key={value} className={styles.shortcuts_row}>
            <td className={styles.shortcuts_label}>{label}</td>
            <td className={styles.shortcuts_value}>{value}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default GuideDataTable;
