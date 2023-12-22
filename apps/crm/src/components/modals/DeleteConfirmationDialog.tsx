import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const DeleteConfirmationDialog = ({ open, onClose, onDelete }: any) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography variant="h6" style={{ fontSize: '1.5rem' }}>
                    Confirmación
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6" style={{ fontSize: '1.2rem' }}>
                    ¿Está seguro de que desea eliminar?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    <Typography variant="h6" style={{ fontSize: '1rem' }}>
                        Cancelar
                    </Typography>
                </Button>
                <Button onClick={onDelete} color="secondary">
                    <Typography variant="h6" style={{ fontSize: '1rem' }}>
                        Borrar
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default DeleteConfirmationDialog;
