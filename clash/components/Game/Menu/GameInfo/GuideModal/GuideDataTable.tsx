import React from 'react';

import styles from './GuideModal.module.css';

interface Props {
  items: { label: string; value: string }[];
  title?: string;
  description?: string;
}

const GuideDataTable = ({ items, title, description }: Props) => {
  return (
    <>
      {title && <h2 className={styles.shortcuts_table_title}>{title}</h2>}
      {description && <p className={styles.shortcuts_table_description}>{description}</p>}
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
