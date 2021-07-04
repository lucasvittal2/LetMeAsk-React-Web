import illustrationImg from '../assets/illustration.svg';
import {FormEvent, useState} from 'react';
import logoImage from '../assets/logo.svg';
import googleIcon from '../assets/google-icon.svg';
import '../styles/auth.scss';
import {Button} from '../components/button';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { database} from '../services/firebase';
export function NewRoom(){
    const [newRoom, setNewRoom] = useState('');
    const {user} = useContext(AuthContext);
    const history = useHistory();

    async function handleCreateRoom(event:FormEvent){
        event.preventDefault();
        if( newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorID: user?.id,

        });
        history.push(`/rooms/${firebaseRoom.key}`)
    }
    return(
        <div id="page-auth">
            <aside>
                <img src = {illustrationImg} alt="ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua adiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImage} alt="letmeask"/>
                    <h1>Seja Bem Vindo!</h1>
                    <h1>{user?.name}</h1>
                   <h2>Você pode Criar uma nova sala</h2>
                    <div className="separator">
                        Ou entrar em uma
                    </div>
                    <form onSubmit={handleCreateRoom}>
                        <input
                        type="text"
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value = {newRoom}
                        
                        />
                        <Button type = "submit">
                            Criar sala
                        </Button>
                    </form>
                    <p> 
                        Quer entrar numa sala existente?
                        <Link to="/">clique aqui</Link>    
                    </p>
                </div>
            </main>
        </div>
    )

}