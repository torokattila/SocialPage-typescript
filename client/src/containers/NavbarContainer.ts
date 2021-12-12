import { useContext } from 'react';
import Swal, { SweetAlertResult } from "sweetalert2";
import { AuthContext } from '../helpers/AuthContext';

const NavbarContainer = () => {
    const { setAuthState } = useContext(AuthContext);
    
    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to log out?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        })
        .then((response: SweetAlertResult) => {
            if (response.value) {
                localStorage.removeItem('accessToken');
                setAuthState({
                    username: '',
                    id: 0,
                    status: false,
                });
                window.location.reload();
            }
        })
    }

    return {
        logout,
    }
}

export default NavbarContainer;