import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function Carlist() {

    const [cars , setCars] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCars();
    }, [])

    const getCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar = (link) => {
        if (window.confirm("Are you sure?")){
            fetch(link, {
                method: "DELETE"
            })
            .then(response => getCars())
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
        }
        
    }

    const handleClose = () => {
        setOpen(false);
    }

    const columns = [
        {
            Header: "Brand",
            accessor: "brand"
        },
        {
            Header: "Model",
            accessor: "model"
        },
        {
            Header: "Colour",
            accessor: "color"
        },
        {
            Header: "Year",
            accessor: "year"
        },
        {
            Header: "Fuel",
            accessor: "fuel"
        },
        {
            Header: "Price (€)",
            accessor: "price"
        },
        {
            accessor: "_links.self.href",
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => deleteCar(row.value)}>Delete</Button>
            )
        }
    ]
    
    
    return (
        <div>
            <ReactTable filterable={true} defaultPageSize={10} data={cars} columns={columns}/>
            <Snackbar 
                open={open} 
                autoHideDuration={4000} 
                onClose={handleClose} 
                message="Car deleted"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            />
        </div>
    );
}