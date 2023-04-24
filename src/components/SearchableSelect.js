import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form'

import { useEffect, useState } from 'react';

const SearchableSelect = ({options}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredOptions, setFilteredOptions] = useState([])
    const [showDropDown, setShowDropDown] = useState(false)

    useEffect(() => {
        const filtered = options.filter((option) => 
            option.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredOptions(filtered)
    }, [searchTerm, options])

    const handleSelect = (eventKey, event) => {
        setSearchTerm(event.target.innerText)
    }

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleFocus = () => {
        setShowDropDown(true)
    }

    const handleFocusOut = () => {
        setTimeout(() => {
            setShowDropDown(false)
        }, 300)
    }

    return (
        <>
        <Form.Control
          placeholder="Select Folder"
          value={searchTerm}
          onChange={handleChange}
          onClick={handleFocus}
          onBlur={handleFocusOut}
        />
        {showDropDown && (
                <Dropdown
                onSelect={handleSelect}
                autoClose="inside"
            >
                <Dropdown.Menu 
                    onChange={handleSelect}
                    show
                >
                    {filteredOptions && filteredOptions.map((option) => {
                        return (
                            <Dropdown.Item key={option.id}>{option.title}</Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>
        )}
        </>
    )
}

export default SearchableSelect