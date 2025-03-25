import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ size, label }) => {
  const buttonSize = size === 'large' ? styles.large : styles.small;

  return (
    <div>
      <button className={ `${styles.button} ${buttonSize}` }>{ label }</button>
    </div>
  );
};

Button.propTypes = {
  size: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
