import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import { useEffect, useState } from 'react';

const SearchableSelect = ({options, setFolder}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredOptions, setFilteredOptions] = useState([])
    const [showDropDown, setShowDropDown] = useState(false)

    useEffect(() => {
        const filtered = options.filter((option) => 
            option.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredOptions(filtered)
    }, [searchTerm, options])

    const handleSelect = (option) => {
        console.log(option)
        setFolder(option)
        setSearchTerm(option.title)
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
            <Form.Label> Page </Form.Label>
            <Form.Control
            placeholder="Select a Page"
            value={searchTerm}
            onChange={handleChange}
            onClick={handleFocus}
            onBlur={handleFocusOut}
            />
            {showDropDown && (
                <Dropdown autoClose="inside">
                    <Dropdown.Menu show>
                        {filteredOptions && filteredOptions.map((option) => {
                            return (
                                <Dropdown.Item 
                                    key={option.value} 
                                    value={option.value} 
                                    onClick={() => handleSelect(option)}>
                                    {option.title}
                                </Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </>
    )
}

export default SearchableSelect