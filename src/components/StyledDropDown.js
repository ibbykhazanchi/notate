import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form'

const StyledDropDown = () => {

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
    return (
        <StyledDropDownDiv>
            <Dropdown 
            id="dropdown-basic" autoClose={'outside'} drop='down'
            >
                <StyledDropDownToggle>
                    {<FontAwesomeIcon icon={faGear} /> }
                </StyledDropDownToggle>
                <Dropdown.Menu>
                    <Dropdown.ItemText href="#/action-3"> 
                    Root Notion Folder 
                    <Form.Control 
                        required
                        type="text" 
                        placeholder="Enter Root Folder"
                      />
                    </Dropdown.ItemText>
                </Dropdown.Menu>
            </Dropdown> 
      </StyledDropDownDiv>
    )
}

export default StyledDropDown