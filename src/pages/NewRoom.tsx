import illustrationImg from '../assets/illustration.svg';
import logoImage from '../assets/logo.svg';
import googleIcon from '../assets/google-icon.svg';
import '../styles/auth.scss';
import {Button} from '../components/button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function NewRoom(){
    const {user} = useContext(AuthContext);
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
                    <form>
                        <input
                        type="text"
                        placeholder="Nome da sala"
                        
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