import React, {useState} from 'react';
import styles from './AccountItem.module.css';
import PropTypes from 'prop-types';
import {
  IconContext,
  CaretRight,
  CaretDown,
} from 'phosphor-react';

/**
 * @param {*} props
 * @return {*}
 */
function AccountItem(props) {
  const [showChildren, setShowChildren] = useState(false);
  const {children, title} = props;
  return (
    <>
      <li onClick={() => {
        setShowChildren(true);
        console.log('asdf');
      }}>
        <IconContext.Provider
          value={{
            color: 'gray',
            size: '20',
            weight: 'bold',
          }}
        >
          <div className={styles.accountItem}>
            <h3>{title}</h3>
            <div>{ showChildren ? <CaretDown /> : <CaretRight />}</div>
          </div>
        </IconContext.Provider>
      </li>
      { showChildren &&
        <div
          className={styles.accountModal}
        >
          <div>
            {children}
            <button onClick={() => setShowChildren(false)}>Close</button>
          </div>
        </div>
      }
    </>
  );
}

AccountItem.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default AccountItem;
