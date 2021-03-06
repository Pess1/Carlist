import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcar from './Addcar';
import Editcar from './Editcar';

export default function Carlist() {

    const [cars , setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

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
            .then(_ => {
                setMsg("Car deleted");
                setOpen(true)
            })
            .catch(err => console.error(err))
        }
        
    }

    const addCar = car => {
        fetch('https://carstockrest.herokuapp.com/cars',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => getCars())
        .then(_ => {
            setMsg("New Car Added!");
            setOpen(true)
        })
        .catch(err => console.error(err))
    }

    const editCar = (link, car) => {
        fetch(link,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => getCars())
        .then(_ => {
            setMsg("Car Updated!");
            setOpen(true)
        })
        .catch(err => console.error(err))
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
            Cell: row => (<Editcar updateCar={editCar} car={row.original}/>)
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
            <Addcar addCar={addCar}/>
            <ReactTable filterable={true} defaultPageSize={10} data={cars} columns={columns}/>
            <Snackbar 
                open={open} 
                autoHideDuration={4000} 
                onClose={handleClose} 
                message={msg}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            />
        </div>
    );
}