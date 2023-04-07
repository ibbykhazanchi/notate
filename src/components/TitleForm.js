import React from 'react';

const TitleForm = ({inputValue, handleInputKeyDown, handleChange}) => {

  return (
    <form>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleInputKeyDown} // Add event handler for key down
        id="title-form"
      />
    </form>
  );
};

export default TitleForm;
