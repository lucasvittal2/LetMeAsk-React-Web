import illustrationImg from '../assets/illustration.svg';
import { useHistory} from 'react-router-dom'
import logoImage from '../assets/logo.svg';
import googleIcon from '../assets/google-icon.svg';
import '../styles/auth.scss';
import {Button} from '../components/button';
import { useContext} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';
export function Home(){
    const history = useHistory();
    const { user } = useAuth();

     async function handleCreateroom(){
        if(!user){
           await  signInWithGoogle();
        }
        history.push("/rooms/new");
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
                    <button className="createRoom" onClick= {handleCreateroom}>
                        <img src={googleIcon} alt= "Logo do Google"/>
                        Crie sua Sala com o Google
                    </button>
                    <div className="separator">
                        Ou entre em uma sala
                    </div>
                    <form>
                        <input
                        type="text"
                        placeholder="digite o código da sala"
                        
                        />
                        <Button type = "submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )

}

function signInWithGoogle() {
    throw new Error('Function not implemented.');
}
