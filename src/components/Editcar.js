import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Editcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: "",
        model: "",
        color: "",
        year: "",
        price: "",
        fuel: ""
    });

    const handleClickOpen = () => {
        console.log(props.car);
        setCar({
            brand: props.car.brand,
            model: props.car.model,
            color: props.car.color,
            year: props.car.year,
            price: props.car.price,
            fuel: props.car.fuel
        })
        setOpen(true);
    };

    const handleClose = () => {
        props.updateCar(props.car._links.self.href, car);
        setCar({
            brand: "",
            model: "",
            color: "",
            year: "",
            price: "",
            fuel: ""
        })
        setOpen(false);
    };

    const handleCancelClose = () => {
        setOpen(false);
    }

    const inputChanged = event => {
        setCar({...car, [event.target.name]: event.target.value});
    };

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                Edit Car
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Brand"
                        name="brand"
                        value={car.brand}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Model"
                        name="model"
                        value={car.model}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Color"
                        name="color"
                        value={car.color}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Year"
                        name="year"
                        value={car.year}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Fuel"
                        name="fuel"
                        value={car.fuel}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Price"
                        name="price"
                        value={car.price}
                        onChange={e => inputChanged(e)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}