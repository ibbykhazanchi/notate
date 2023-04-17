import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form'
import { useState } from 'react'


const StyledDropDown = ({rootNotionFolder}) => {

    const StyledDropDownDiv = styled.div`
        position: absolute;
        top: 12px;
        right: 16px;
    `
    const StyledDropDownToggle = styled(Dropdown.Toggle)`
        ::after{
            display: none;
        }
    `
    const handleChange = (event) => {
        console.log(event.target.value)
    }
    return (
        <StyledDropDownDiv>
            <Dropdown 
            id="dropdown-basic" autoClose={'outside'} drop='down'
            >
                <StyledDropDownToggle>
                    {<FontAwesomeIcon icon={faGear} /> }
                </StyledDropDownToggle>
                <Dropdown.Menu>
                    <Form.Control 
                        required
                        type="text" 
                        placeholder="Enter Root Folder"
                        value={rootNotionFolder}
                        onChange={handleChange}
                        id="rf"
                      />
                </Dropdown.Menu>
            </Dropdown> 
      </StyledDropDownDiv>
    )
}

export default StyledDropDown