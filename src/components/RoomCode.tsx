import copyImg from '../assets/images/copy.svg'
import logoutImg from '../assets/images/logout.svg'
import '../styles/room-code.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    const { user, signOffGoogle } = useAuth()
    const history = useHistory();

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
        toast.success('Código copiado com sucesso!');
    }

    async function signOut() {
        if (user) {
            await signOffGoogle()
        }
        history.push('/')
        document.location.reload();
        toast.success('Deslogado com sucesso!');
    }

    return (
        <div>
            <button className="room-code" onClick={copyRoomCodeToClipboard}>
                <div>
                    <img src={copyImg} alt="Copy room code" />
                </div>
                <span> Sala #{props.code}</span>
            </button>
            {user ? (
                <button className="sign-off" onClick={signOut}>
                    <div>
                        <img src={logoutImg} alt="Logout" />
                    </div>
                </button>
            ): null}
            <Toaster />
            
        </div>

    )
}