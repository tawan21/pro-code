export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: '100%',
    maxWidth: '14rem',
    minWidth: '6rem',
    borderRadius: '5px',
    color: '#000',
    fontSize: '0.9rem',
    lineHeight: '1.75rem',
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    border: '1px solid #000000',
    boxShadow: '4px 4px 0px 0px rgba(0,0,0)',
    ':hover': {
      border: '1px solid #000000',
      boxShadow: 'none',
    },
  }),

  option: (styles) => ({
    ...styles,
    color: '#000',
    fontSize: '0.9rem',
    lineHeight: '1.75rem',
    width: '100%',
    background: '#fff',
    ':hover': {
      backgroundColor: 'lightgray',
      color: '#000',
      cursor: 'pointer',
    },
  }),
};